"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";
import HeaderBackground from "@/components/HeaderBackground";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <HeaderBackground />
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
