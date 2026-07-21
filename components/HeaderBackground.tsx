"use client";

import { useEffect, useState } from "react";

// Same rotating/crossfading substation photo effect as the hero sections,
// scaled down to sit in the black strip between the logo and the nav links.
const HEADER_PHOTOS = [
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

const HEADER_TILES = 3;

export default function HeaderBackground() {
  const [photoIndexes, setPhotoIndexes] = useState(() =>
    Array.from({ length: HEADER_TILES }, (_, i) => i % HEADER_PHOTOS.length)
  );
  const [fadingTile, setFadingTile] = useState<number | null>(null);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      const tile = tick % HEADER_TILES;
      tick += 1;
      setFadingTile(tile);
      setTimeout(() => {
        setPhotoIndexes((prev) => {
          const next = [...prev];
          next[tile] = (Math.max(...prev) + 1) % HEADER_PHOTOS.length;
          return next;
        });
        setFadingTile(null);
      }, 700);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-bg" aria-hidden="true">
      {photoIndexes.map((photoIdx, tile) => (
        <img
          key={tile}
          src={HEADER_PHOTOS[photoIdx]}
          alt=""
          style={{ opacity: fadingTile === tile ? 0 : undefined }}
        />
      ))}
    </div>
  );
}
