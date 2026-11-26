// The existing WebP derivatives retain the source path in their filenames.
export function imageVariants(path) {
  const stem = path.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-]/g, "_");
  return `/assets/optimized/${stem}-480.webp 480w, /assets/optimized/${stem}.webp 1200w`;
}

export function productMediaClass(product) {
  const path = product.primary_image;
  const specimen = path.includes('/products/laine-de-roche/') ||
    path.endsWith('/1743145388089.png') ||
    path.endsWith('/6863dc04885effcd26c69a13f661b83e.jpg');
  return specimen ? 'product-media--specimen' : '';
}
