import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Digital business cards: static pages in public/card, served at
  // /card/<name> (the QR codes point here) without the site header/footer.
  async rewrites() {
    return [{ source: "/card/:name([a-z-]+)", destination: "/card/:name.html" }];
  },
  async headers() {
    return [
      {
        source: "/card/:file*.vcf",
        headers: [{ key: "Content-Type", value: "text/vcard; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
