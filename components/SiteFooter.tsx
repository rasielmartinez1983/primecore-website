import { COMPANY } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="PrimeCore Power Solutions" />
          <p>
            Protection and control for electrical substations, from transmission to distribution.{" "}
            {COMPANY.serviceArea}.
          </p>
        </div>
        <div className="foot-contact">
          <div>
            <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
          </div>
          <div>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="foot-bottom">
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
