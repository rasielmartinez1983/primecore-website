"use client";

import { useState } from "react";

type Photo = { id: string; description: string; dataUrl: string; createdAt: string };

export default function AdminProjectCard({
  projectId,
  projectNumber,
  title,
  meta,
  initialSummary,
  photos,
  initialHiddenIds,
}: {
  projectId: string;
  projectNumber: string;
  title: string;
  meta: string;
  initialSummary: string;
  photos: Photo[];
  initialHiddenIds: string[];
}) {
  const [hidden, setHidden] = useState<Set<string>>(new Set(initialHiddenIds));
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [summary, setSummary] = useState(initialSummary);
  const [savedSummary, setSavedSummary] = useState(initialSummary);
  const [savingSummary, setSavingSummary] = useState(false);

  async function toggleHide(photoId: string) {
    setPendingId(photoId);
    const isHidden = hidden.has(photoId);
    try {
      if (isHidden) {
        await fetch(`/api/admin/hidden-photos?photoId=${encodeURIComponent(photoId)}`, { method: "DELETE" });
        setHidden((prev) => {
          const next = new Set(prev);
          next.delete(photoId);
          return next;
        });
      } else {
        await fetch("/api/admin/hidden-photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoId }),
        });
        setHidden((prev) => new Set(prev).add(photoId));
      }
    } finally {
      setPendingId(null);
    }
  }

  async function saveSummary() {
    setSavingSummary(true);
    try {
      const res = await fetch("/api/admin/summary", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: projectId, websiteSummary: summary }),
      });
      if (res.ok) setSavedSummary(summary);
    } finally {
      setSavingSummary(false);
    }
  }

  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p className="project-meta">
        {meta} · #{projectNumber}
      </p>

      <label style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 4 }}>
        Website summary
      </label>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={3}
        style={{ width: "100%", maxWidth: 600, fontFamily: "inherit" }}
      />
      <div style={{ margin: "6px 0 18px" }}>
        <button type="button" disabled={savingSummary || summary === savedSummary} onClick={saveSummary}>
          {savingSummary ? "Saving…" : "Save summary"}
        </button>
      </div>

      {photos.length === 0 ? (
        <p className="project-meta">No photos in field-photos&rsquo; Project Photos folder yet.</p>
      ) : (
        <div className="project-photo-grid">
          {photos.map((photo) => {
            const isHidden = hidden.has(photo.id);
            return (
              <div key={photo.id} style={{ position: "relative" }}>
                <a href={photo.dataUrl} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.dataUrl}
                    alt={photo.description || title}
                    loading="lazy"
                    style={{ opacity: isHidden ? 0.35 : 1 }}
                  />
                </a>
                <button
                  type="button"
                  disabled={pendingId === photo.id}
                  onClick={() => toggleHide(photo.id)}
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    right: 4,
                    fontSize: 11,
                    padding: "2px 4px",
                  }}
                >
                  {pendingId === photo.id ? "…" : isHidden ? "Show" : "Hide"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
