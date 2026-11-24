// Deterministic derivative names keep all source image relationships in the cleaned JSON.
export const optimizedImage = (path) =>
  `assets/optimized/${path.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-]/g, "_")}.webp`;
export const imageSet = (path) =>
  `${optimizedImage(path).replace(/\.webp$/, "-480.webp")} 480w, ${optimizedImage(path)} 1200w`;
