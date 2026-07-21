import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "About | PrimeCore Power Solutions",
  description: "PrimeCore Power Solutions was founded by two lifelong friends with 15+ years of combined experience in substation protection and control.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <HeroBackground />
        <div className="wrap">
          <h1>About PrimeCore</h1>
          <p>
            Founded in {COMPANY.founded}, built on years of hands-on experience with the people who
            keep the grid running.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title">Two friends, one trade, one company.</h2>
          <p className="section-lead" style={{ marginBottom: 0 }}>
            PrimeCore Power Solutions was founded by two friends who&apos;ve known each other since
            they were fifteen years old. Between them, they bring more than fifteen years of
            hands-on experience in substation protection and control — work they did together, and
            separately, long before PrimeCore existed. In {COMPANY.founded}, they brought that
            experience together and started PrimeCore: a company built on the same standard of work
            they held themselves to on every job before it.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <p className="section-eyebrow">Where We Work</p>
          <h2 className="section-title">{COMPANY.serviceArea}.</h2>
          <p className="section-lead" style={{ marginBottom: 0 }}>
            PrimeCore is based in Florida, and that&apos;s where most of our work happens today. We&apos;re
            equally ready to travel for the right project, wherever it is.
          </p>
        </div>
      </section>
    </>
  );
}
