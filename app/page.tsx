import Link from "next/link";
import { COMPANY, SERVICES, STATS, EQUIPMENT_BRANDS } from "@/lib/content";
import { fetchCompletedProjects, fetchProjectPhotos } from "@/lib/projectsData";
import { getHiddenPhotoIds } from "@/lib/hiddenPhotos";

// Recent projects come from the same source as the Projects page, so the
// home page never shows a job that isn't published there.
export const revalidate = 60;

export default async function HomePage() {
  let recent: { key: string; title: string; meta: string; summary: string | null; photo: string | null; alt: string }[] = [];
  try {
    const [projects, hiddenIds] = await Promise.all([fetchCompletedProjects(), getHiddenPhotoIds()]);
    recent = await Promise.all(
      projects.slice(0, 3).map(async (p) => {
        const photos = (await fetchProjectPhotos(p.name, p.substation)).filter((ph) => !hiddenIds.has(ph.id));
        return {
          key: p.projectNumber,
          title: p.substation || p.name,
          meta: [p.client, p.substation && p.name !== p.substation ? p.name : null].filter(Boolean).join(" · "),
          summary: p.websiteSummary || null,
          photo: photos[0]?.dataUrl || null,
          alt: photos[0]?.description || p.substation || p.name,
        };
      })
    );
  } catch {
    recent = [];
  }

  return (
    <>
      <section className="hero hero-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src="/substation-photos/1000004792.JPG" alt="" aria-hidden="true" />
        <div className="wrap hero-inner">
          <p className="hero-pill">Protection &amp; control · Florida · Nationwide</p>
          <h1>Protection &amp; Control Testing and Commissioning</h1>
          <p className="lead">
            We test, commission and upgrade relay and control systems for utilities, contractors and renewable
            projects — from wind farms to transmission.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Get a quote
            </Link>
            <Link href="/services" className="btn btn-glass">
              See what we do
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="wrap stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <p className="num">{s.num}</p>
              <p className="label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="brands-strip">
        <div className="wrap brands-inner">
          <p className="brands-title">Equipment we test and test with</p>
          <ul className="brands-list">
            {EQUIPMENT_BRANDS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="section-head center">
            <h2 className="section-title">What we do</h2>
            <p className="section-lead">
              The full protection and control scope, handled by the same two people from prework to sign-off.
            </p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s) => (
              <Link href="/services" className="card photo-card" key={s.key}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.photo} alt={s.title} loading="lazy" />
                <div className="photo-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="card-link">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="block">
          <div className="wrap">
            <div className="section-head row">
              <h2 className="section-title">Recent projects</h2>
              <Link href="/projects" className="text-link">
                All projects →
              </Link>
            </div>
            <div className="grid-3 plain">
              {recent.map((p) => (
                <article className="project-tile" key={p.key}>
                  {p.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo} alt={p.alt} loading="lazy" />
                  )}
                  {p.meta && <p className="tile-meta">{p.meta}</p>}
                  <h3>{p.title}</h3>
                  {p.summary && <p>{p.summary}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="block alt">
        <div className="wrap split">
          <div>
            <h2 className="section-title">Two friends. One trade.</h2>
            <p className="section-lead">
              PrimeCore was founded by two technicians who have known each other since they were fifteen. You talk to
              the people doing the work — the same two who quote the job, test your panels and sign off the results.
            </p>
            <ul className="checks">
              <li>Prework done before the outage</li>
              <li>Itemized proposals, task by task</li>
              <li>Our own Doble and Megger test equipment</li>
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="split-photo" src="/substation-photos/1000000421.JPG" alt="Substation yard with power transformer" />
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="cta-card">
            <div>
              <h2>Have an outage coming up?</h2>
              <p>
                Send us the station, scope and dates. You get an itemized proposal with every task, the hours and
                what&apos;s not included.
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-dark">
                Request a quote
              </Link>
              <a href={`tel:${COMPANY.phoneHref}`} className="cta-phone">
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
