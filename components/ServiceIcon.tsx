// Simple line icons for the service cards (see SERVICES[].icon in
// lib/content.ts). Decorative only -- the card title says what it is.
const PATHS: Record<string, React.ReactNode> = {
  pulse: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </>
  ),
  panel: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h6M9 11h6M9 15h3" />
    </>
  ),
  turbine: (
    <>
      <path d="M12 12v10M12 12l-7-4M12 12l7-4M12 12V3" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  tower: <path d="M4 21V9l4-3 4 3v12M12 21V5l4-2 4 2v16M2 21h20" />,
  battery: (
    <>
      <rect x="3" y="7" width="16" height="12" rx="1.5" />
      <path d="M21 11v4M7 7V5h2v2M13 7V5h2v2M8 13h4M10 11v4" />
    </>
  ),
};

export default function ServiceIcon({ name }: { name: string }) {
  return (
    <span className="service-icon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {PATHS[name] || PATHS.pulse}
      </svg>
    </span>
  );
}
