import React, { useState } from "react";
import { imageVariants } from "./media.js";

export default function ProductMedia({ path, alt, sizes, eager = false, id }) {
  const [failed, setFailed] = useState(null);
  return (
    <img
      id={id}
      src={"/" + path}
      srcSet={failed === path ? undefined : imageVariants(path)}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(path)}
    />
  );
}
