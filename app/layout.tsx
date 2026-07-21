import type { Metadata } from "next";
import "./styles.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "PrimeCore Power Solutions | Substation Protection & Control",
  description:
    "PrimeCore Power Solutions provides protection and control services for electrical substations, from transmission to distribution. Based in Florida, available nationwide.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
