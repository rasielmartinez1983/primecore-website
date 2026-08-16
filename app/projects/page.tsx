import type { Metadata } from "next";
import HeroBackground from "@/components/HeroBackground";
import { fetchCompletedProjects, fetchProjectPhotos } from "@/lib/projectsData";

export const metadata: Metadata = {
  title: "Projects | PrimeCore Power Solutions",
  description: "A look at finished protection and control work from PrimeCore Power Solutions.",
};

// Portfolio content, not a live dashboard -- re-fetch from ops.primecore/
// field-photos at most once a minute (see lib/projectsData.ts's matching
// fetch-level revalidate) instead of on every single page view.
export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await fetchCompletedProjects();

  // Photos are fetched per-project, server-side, in parallel -- fine at
  // the handful-of-projects-a-year scale this company operates at.
  const withPhotos = await Promise.all(
    projects.map(async (p) => ({
      ...p,
      photos: await fetchProjectPhotos(p.name, p.substation),
    }))
  );

  return (
    <>
      <section className="page-hero">
        <HeroBackground />
        <div className="wrap">
          <h1>Projects</h1>
          <p>
            A look at finished protection and control work — substations we&rsquo;ve helped bring online,
            retrofit, and keep running.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          {withPhotos.length === 0 ? (
            <div className="project-empty">
              Project photos are on the way — check back soon.
            </div>
          ) : (
            <div className="project-list">
              {withPhotos.map((p) => (
                <div className="project-card" key={p.projectNumber}>
                  <h3>{p.substation || p.name}</h3>
                  <p className="project-meta">
                    {[p.client, p.substation && p.name !== p.substation ? p.name : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {p.websiteSummary && <p className="project-summary">{p.websiteSummary}</p>}
                  {p.photos.length > 0 && (
                    <div className="project-photo-grid">
                      {p.photos.map((photo) => (
                        <a key={photo.id} href={photo.dataUrl} target="_blank" rel="noopener noreferrer">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.dataUrl} alt={photo.description || p.substation || p.name} loading="lazy" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
