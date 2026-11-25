import Link from "next/link";
import { COMPANY, SERVICES } from "@/lib/content";
import ServiceIcon from "@/components/ServiceIcon";
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
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-pill">Protection &amp; control · Florida · Nationwide</p>
            <h1>Reliable substations start with tested protection.</h1>
            <p className="lead">
              We test, commission and upgrade relay and control systems for utilities, contractors and renewable
              projects — from wind farms to transmission.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-primary">
                Get a quote
              </Link>
              <Link href="/services" className="btn btn-soft">
                See services
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <p className="num">15+</p>
                <p className="label">years combined experience</p>
              </div>
              <div>
                <p className="num">FPL</p>
                <p className="label">standards &amp; documentation</p>
              </div>
              <div>
                <p className="num">50</p>
                <p className="label">states we can work in</p>
              </div>
            </div>
          </div>
          <div className="hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-photo" src="/substation-photos/1000004793.JPG" alt="Substation yard under a blue sky" />
            <div className="hero-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/substation-photos/1000003982.JPG" alt="Wind turbine" />
              <div>
                <p className="float-title">Renewables ready</p>
                <p className="float-sub">Wind &amp; solar interconnections</p>
              </div>
            </div>
          </div>
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
              <Link href="/services" className="card" key={s.key}>
                <ServiceIcon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
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
          <img className="split-photo" src="/substation-photos/1000006301.JPG" alt="Relay panels in a substation control house" />
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
