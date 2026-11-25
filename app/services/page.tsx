import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, TESTING } from "@/lib/content";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata: Metadata = {
  title: "Services | PrimeCore Power Solutions",
  description:
    "Protection & control testing and commissioning: relays, transformers, breakers, CTs/PTs, SCADA, settings changes, panel replacements and renewable interconnections.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1>Services</h1>
          <p>
            Protection &amp; control testing and commissioning for utility and renewable substations — from the
            relay panel to the equipment in the yard.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">Testing &amp; commissioning</h2>
            <p className="section-lead">
              Every test is documented and delivered in the format the utility requires.
            </p>
          </div>
          <div className="grid-3">
            {TESTING.map((t) => (
              <div className="card" key={t.key}>
                <ServiceIcon name={t.icon} />
                <h3>{t.title}</h3>
                <p>{t.intro}</p>
                <ul className="card-list">
                  {t.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">Project services</h2>
            <p className="section-lead">The work around the testing — before, during and after the outage.</p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s) => (
              <div className="card" key={s.key}>
                <ServiceIcon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Need testing for an upcoming outage?</h2>
          <p>Send us the station, scope and dates — we&apos;ll answer with an itemized proposal.</p>
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}
