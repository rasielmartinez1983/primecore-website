// Signs/verifies the /admin login cookie using the Web Crypto API
// (globalThis.crypto) -- works in both Node route handlers and Edge
// middleware with one implementation, same approach as primecore-ops-local's
// lib/session.ts. There's only one admin (a single shared password, per
// how this was scoped -- no per-user accounts), so the token doesn't carry
// an id, just an expiry: anyone holding a validly-signed, unexpired cookie
// is treated as the admin.

export const ADMIN_SESSION_COOKIE = "pc_website_admin";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

const encoder = new TextEncoder();

function getSecret(): string {
  // Falls back to a fixed dev-only value so `next dev` works without an
  // env var set -- production MUST set WEBSITE_ADMIN_SESSION_SECRET
  // (a random string, e.g. `openssl rand -hex 32`) or every admin session
  // becomes forgeable using this well-known fallback.
  return process.env.WEBSITE_ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const b of arr) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64: string): Uint8Array {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(b64.length / 4) * 4, "=");
  const str = atob(padded);
  const arr = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

export async function createAdminSessionToken(): Promise<string> {
  const expires = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payloadB64 = toBase64Url(encoder.encode(JSON.stringify({ exp: expires })));
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(sig)}`;
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  try {
    const key = await getKey();
    const valid = await crypto.subtle.verify("HMAC", key, fromBase64Url(sigB64), encoder.encode(payloadB64));
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
