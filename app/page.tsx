import Link from "next/link";
import { COMPANY, SERVICES } from "@/lib/content";
import HeroBackground from "@/components/HeroBackground";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <HeroBackground />
        <div className="wrap">
          <p className="hero-eyebrow">Substation Protection &amp; Control</p>
          <h1>Keeping the grid protected, from transmission to distribution.</h1>
          <p className="lead">
            PrimeCore Power Solutions provides protection and control services for electrical
            substations. {COMPANY.serviceArea}.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
            <Link href="/services" className="btn btn-outline">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-title">Protection and control, done right.</h2>
          <p className="section-lead">
            We work across the full range of substation work — from high-voltage transmission
            tie-ins down to the distribution substations that serve the end customer.
          </p>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div className="card" key={s.key}>
                <p className="card-index">0{i + 1}</p>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <Link href="/services" className="card-link">
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="stats">
            <div className="stat">
              <p className="num">15+</p>
              <p className="label">Years of combined experience</p>
            </div>
            <div className="stat">
              <p className="num">2</p>
              <p className="label">Founders, side by side since day one</p>
            </div>
            <div className="stat">
              <p className="num">50</p>
              <p className="label">States we&apos;re ready to work in</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Have a project coming up?</h2>
          <p>Tell us what you need — we&apos;ll take it from there.</p>
          <Link href="/contact" className="btn btn-primary">
            Contact PrimeCore
          </Link>
        </div>
      </section>
    </>
  );
}
