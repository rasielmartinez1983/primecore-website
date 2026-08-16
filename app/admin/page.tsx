import type { Metadata } from "next";
import { fetchCompletedProjects, fetchProjectPhotos } from "@/lib/projectsData";
import { getHiddenPhotoIds } from "@/lib/hiddenPhotos";
import AdminProjectCard from "@/components/AdminProjectCard";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const metadata: Metadata = { title: "Admin | PrimeCore Power Solutions" };

// Not part of the public site's ISR cache -- an admin curating photos wants
// to see (reasonably) current state, not a page that could've been prebuilt
// minutes ago. The underlying field-photos/ops-local fetches still cache
// for 60s each (see lib/projectsData.ts), which is plenty fresh for this.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [projects, hiddenIds] = await Promise.all([fetchCompletedProjects(), getHiddenPhotoIds()]);

  const withPhotos = await Promise.all(
    projects.map(async (p) => ({
      ...p,
      // Unfiltered here (unlike the public /projects page) -- the admin
      // needs to see already-hidden photos too, to be able to un-hide them.
      photos: await fetchProjectPhotos(p.name, p.substation),
    }))
  );

  return (
    <section className="block">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ margin: 0 }}>Admin</h1>
          <AdminLogoutButton />
        </div>
        <p className="project-meta" style={{ marginBottom: 24 }}>
          Hiding a photo here only affects primecoreps.com -- it stays untouched in field-photos. Deleting it in
          field-photos later has no effect on this site either way once you&rsquo;ve set it here.
        </p>

        {withPhotos.length === 0 ? (
          <div className="project-empty">No completed (Invoiced/Paid) projects yet.</div>
        ) : (
          <div className="project-list">
            {withPhotos.map((p) => (
              <AdminProjectCard
                key={p.projectNumber}
                projectId={p.id}
                projectNumber={p.projectNumber}
                title={p.substation || p.name}
                meta={[p.client, p.substation && p.name !== p.substation ? p.name : null].filter(Boolean).join(" · ")}
                initialSummary={p.websiteSummary || ""}
                photos={p.photos}
                initialHiddenIds={p.photos.filter((photo) => hiddenIds.has(photo.id)).map((photo) => photo.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
