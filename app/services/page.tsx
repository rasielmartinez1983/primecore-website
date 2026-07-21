import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "Services | PrimeCore Power Solutions",
  description: "Protection and control services across transmission and distribution substations.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <HeroBackground />
        <div className="wrap">
          <h1>Services</h1>
          <p>
            Our work centers on protection and control — the systems that keep a substation, and
            the grid around it, safe and reliable.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div className="card" key={s.key}>
                <p className="card-index">0{i + 1}</p>
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
