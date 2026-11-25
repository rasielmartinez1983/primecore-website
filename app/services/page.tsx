import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | PrimeCore Power Solutions",
  description: "Protection and control services across transmission and distribution substations.",
};

// Left blank for now on purpose (Nov 2026) -- only the page header shows.
// The service list itself lives in lib/content.ts (SERVICES) and is still
// shown on the home page.
export default function ServicesPage() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1>Services</h1>
      </div>
    </section>
  );
}
