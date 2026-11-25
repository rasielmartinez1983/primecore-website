import Link from "next/link";
import { COMPANY, NAV } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="PrimeCore Power Solutions" />
          <p>
            Protection and control for utility and renewable substations, from transmission to distribution.{" "}
            {COMPANY.serviceArea}.
          </p>
        </div>
        <nav className="foot-nav" aria-label="Footer">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="foot-contact">
          <div>
            <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
          </div>
          <div>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
          <div>Miami, Florida</div>
        </div>
      </div>
      <div className="wrap">
        <div className="foot-bottom">
          &copy; {new Date().getFullYear()} PrimeCore Power Solution LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
