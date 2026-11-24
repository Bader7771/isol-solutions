// The existing WebP derivatives retain the source path in their filenames.
export function imageVariants(path) {
  const stem = path.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-]/g, "_");
  return `/assets/optimized/${stem}-480.webp 480w, /assets/optimized/${stem}.webp 1200w`;
}
