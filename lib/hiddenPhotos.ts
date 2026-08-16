import { prisma } from "@/lib/prisma";

// Thin wrapper around the HiddenPhoto table (see prisma/schema.prisma) --
// the one piece of state primecore-website owns itself, independent of
// field-photos/ops-local. Used by the public /projects page (to skip
// hidden ids) and by /admin (to hide/unhide and to show which photos are
// currently hidden).

export async function getHiddenPhotoIds(): Promise<Set<string>> {
  const rows = await prisma.hiddenPhoto.findMany({ select: { photoId: true } });
  return new Set(rows.map((r: { photoId: string }) => r.photoId));
}

export async function hidePhoto(photoId: string): Promise<void> {
  await prisma.hiddenPhoto.upsert({
    where: { photoId },
    create: { photoId },
    update: {},
  });
}

export async function unhidePhoto(photoId: string): Promise<void> {
  await prisma.hiddenPhoto.delete({ where: { photoId } }).catch(() => {
    // Already gone -- fine, unhide is idempotent.
  });
}
