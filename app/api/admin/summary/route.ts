import { NextRequest, NextResponse } from "next/server";

// Proxies a summary edit from /admin to primecore-ops-local's internal
// write endpoint -- Ops stays the single source of truth for the text
// (see lib/projectsData.ts's file header for why), this route just forwards
// the edit server-side so OPS_INTERNAL_API_KEY never reaches the browser.
export async function PATCH(req: NextRequest) {
  const baseUrl = process.env.OPS_LOCAL_URL;
  const apiKey = process.env.OPS_INTERNAL_API_KEY;
  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: "OPS_LOCAL_URL / OPS_INTERNAL_API_KEY aren't set on the server." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const id = String(body.id || "");
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/internal/project-website-summary`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-internal-api-key": apiKey },
      body: JSON.stringify({ id, websiteSummary: body.websiteSummary || null }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return NextResponse.json({ error: data.error || "Ops rejected the update." }, { status: res.status });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.warn("admin/summary: request to ops-local failed:", e);
    return NextResponse.json({ error: "Could not reach Ops." }, { status: 502 });
  }
}
