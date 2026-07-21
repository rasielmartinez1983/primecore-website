"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-bg" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none">
          <path
            d="M100 10 L60 190 M100 10 L140 190 M75 60 L125 60 M68 100 L132 100 M62 140 L138 140 M100 10 L100 40 M70 40 L130 40 M55 190 L145 190"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="wrap">
        <Link href="/" className="logo-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="PrimeCore Power Solutions" />
        </Link>
        <nav className="site-nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
