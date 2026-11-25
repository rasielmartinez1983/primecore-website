"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="logo-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="PrimeCore Power Solution" />
        </Link>
        <nav className="site-nav" aria-label="Main">
          {NAV.filter((item) => item.href !== "/").map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a href={`tel:${COMPANY.phoneHref}`} className="header-phone">
            {COMPANY.phone}
          </a>
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
