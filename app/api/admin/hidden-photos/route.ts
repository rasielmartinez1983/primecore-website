import { NextRequest, NextResponse } from "next/server";
import { hidePhoto, unhidePhoto } from "@/lib/hiddenPhotos";

// Auth is already enforced by middleware.ts for everything under
// /api/admin/* (except /api/admin/login) -- nothing extra needed here.

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const photoId = String(body.photoId || "");
  if (!photoId) {
    return NextResponse.json({ error: "photoId is required." }, { status: 400 });
  }
  await hidePhoto(photoId);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const photoId = req.nextUrl.searchParams.get("photoId") || "";
  if (!photoId) {
    return NextResponse.json({ error: "photoId is required." }, { status: 400 });
  }
  await unhidePhoto(photoId);
  return NextResponse.json({ ok: true });
}
