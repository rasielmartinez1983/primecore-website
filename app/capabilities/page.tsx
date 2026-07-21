import type { Metadata } from "next";
import { CAPABILITIES } from "@/lib/content";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "Capabilities | PrimeCore Power Solutions",
  description: "The kinds of substation protection and control work PrimeCore Power Solutions takes on.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="page-hero">
        <HeroBackground />
        <div className="wrap">
          <h1>Capabilities</h1>
          <p>
            A look at the kind of work we take on. Every substation is different — this is the
            core of what we bring to each one.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="grid-2">
            {CAPABILITIES.map((c) => (
              <div className="card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Want to see how this applies to your project?</h2>
          <p>Reach out and we&apos;ll walk through the scope together.</p>
          <a href="/contact" className="btn btn-primary">
            Contact PrimeCore
          </a>
        </div>
      </section>
    </>
  );
}
