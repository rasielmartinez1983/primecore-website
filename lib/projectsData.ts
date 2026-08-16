// Server-only cross-app lookups for the public "Projects" page: pulls
// finished (Invoiced/Paid) jobs from primecore-ops-local and, per
// project, its "Project Photos" wrap-up shots from primecore-field-
// photos. This site has no database of its own -- Ops is the source of
// truth for which projects are done, field-photos is the source of truth
// for the photos.
//
// Same server-to-server shared-secret pattern every other PrimeCore app
// already uses for this (see primecore-ops-local's /api/internal/*
// routes and primecore-homepage's ops_client.py, which this mirrors) --
// OPS_INTERNAL_API_KEY is read from process.env here, inside a Server
// Component/route, so it's never sent to the browser. Fails soft
// everywhere: a missing env var, an unreachable app, or a bad response
// just means an empty/partial gallery, never a broken page for a site
// visitor.

export type CompletedProject = {
  // Ops's internal database id -- only used server-to-server by /admin to
  // save the website summary back to Ops (see app/api/admin/summary/route.ts).
  // Never rendered on the public /projects page; projectNumber is the join
  // key everywhere else (matching field-photos' photos, etc.).
  id: string;
  projectNumber: string;
  name: string;
  substation: string | null;
  client: string | null;
  status: string;
  startDate: string | null;
  targetDate: string | null;
  invoicedAt: string | null;
  websiteSummary: string | null;
};

export type ProjectPhoto = {
  id: string;
  description: string;
  dataUrl: string;
  createdAt: string;
};

function internalHeaders(): HeadersInit {
  return { "x-internal-api-key": process.env.OPS_INTERNAL_API_KEY || "" };
}

export async function fetchCompletedProjects(): Promise<CompletedProject[]> {
  const baseUrl = process.env.OPS_LOCAL_URL;
  const apiKey = process.env.OPS_INTERNAL_API_KEY;
  if (!baseUrl || !apiKey) {
    console.warn(
      `projectsData: completed-projects lookup skipped -- OPS_LOCAL_URL ${baseUrl ? "set" : "MISSING"}, OPS_INTERNAL_API_KEY ${apiKey ? "set" : "MISSING"}`
    );
    return [];
  }

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/internal/completed-projects`, {
      headers: internalHeaders(),
      // Portfolio content, not a live dashboard -- 60s of staleness is
      // fine and still saves hitting Ops on every single page view, while
      // letting a freshly-Invoiced project or newly-uploaded photo show
      // up on the site well within a minute instead of up to an hour.
      // See the page's own revalidate export for the matching page-level
      // cache.
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`projectsData: completed-projects returned HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.projects || [];
  } catch (e) {
    console.warn("projectsData: completed-projects request failed:", e);
    return [];
  }
}

export async function fetchProjectPhotos(name: string, substation?: string | null): Promise<ProjectPhoto[]> {
  const baseUrl = process.env.FIELD_PHOTOS_URL;
  const apiKey = process.env.OPS_INTERNAL_API_KEY;
  if (!baseUrl || !apiKey || (!name && !substation)) return [];

  try {
    const params = new URLSearchParams({ project: name || "", substation: substation || "" });
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/internal/project-photos?${params}`, {
      headers: internalHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`projectsData: project-photos lookup for "${name}" returned HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.photos || [];
  } catch (e) {
    console.warn(`projectsData: project-photos request failed for "${name}":`, e);
    return [];
  }
}
