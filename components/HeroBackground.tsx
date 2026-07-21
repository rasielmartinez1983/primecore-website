"use client";

import { useEffect, useState } from "react";

// Real substation/transmission-line photography, faded and rotating behind
// the hero text — same treatment as the Home tab background in PrimeCore
// Ops (public/substation-photos/*.JPG, radial-gradient mask so the grid
// fades into the page instead of showing hard edges, slow crossfade so it
// never distracts from the copy in front of it).
const HERO_PHOTOS = [
  "1000000421.JPG",
  "1000000422.JPG",
  "1000000423.JPG",
  "1000003982.JPG",
  "1000003984.JPG",
  "1000003986.JPG",
  "1000004789.JPG",
  "1000004792.JPG",
  "1000004793.JPG",
  "1000006234.JPG",
  "1000006301.JPG",
  "1000006305.JPG",
  "1000006313.JPG",
].map((name) => `/substation-photos/${name}`);

const HERO_TILES = 5;

export default function HeroBackground() {
  const [photoIndexes, setPhotoIndexes] = useState(() =>
    Array.from({ length: HERO_TILES }, (_, i) => i % HERO_PHOTOS.length)
  );
  const [fadingTile, setFadingTile] = useState<number | null>(null);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      const tile = tick % HERO_TILES;
      tick += 1;
      setFadingTile(tile);
      setTimeout(() => {
        setPhotoIndexes((prev) => {
          const next = [...prev];
          next[tile] = (Math.max(...prev) + 1) % HERO_PHOTOS.length;
          return next;
        });
        setFadingTile(null);
      }, 700);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hero-bg" aria-hidden="true">
        {photoIndexes.map((photoIdx, tile) => (
          <img
            key={tile}
            src={HERO_PHOTOS[photoIdx]}
            alt=""
            style={{ opacity: fadingTile === tile ? 0 : undefined }}
          />
        ))}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
    </>
  );
}
