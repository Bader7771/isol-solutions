import { cpSync, createReadStream, rmSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const frontendDir = resolve(fileURLToPath(import.meta.url), "..");
const repoDir = resolve(frontendDir, "..");

const assetMounts = [
  ["/assets/images", resolve(repoDir, "assets/images")],
  ["/assets/optimized", resolve(repoDir, "assets/optimized")],
  ["/data_produits", resolve(repoDir, "data_produits")],
];

const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const proxy = Object.fromEntries(
  ["/api", "/health", "/submit-devis"].map((path) => [
    path,
    process.env.API_ORIGIN || "http://127.0.0.1:5000",
  ]),
);
const routes =
  /^\/(?:catalogue|categorie|produit|apropos|services|contact|diagnostic|blog|article-isolation-phonique|confidentialite)\.html(?:\?|$)/;

function legacyRoutes(server) {
  server.middlewares.use((req, res, next) => {
    if (routes.test(req.url)) req.url = "/index.html";
    next();
  });
}

function serveMountedAssets(server) {
  server.middlewares.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const rawPath = (req.url || "").split("?")[0];
    let pathname;
    try {
      pathname = decodeURIComponent(rawPath);
    } catch {
      return next();
    }
    for (const [prefix, targetDir] of assetMounts) {
      if (!pathname.startsWith(prefix + "/")) continue;
      const rel = pathname.slice(prefix.length + 1);
      const filePath = resolve(targetDir, rel);
      if (!filePath.startsWith(targetDir + sep)) return next();
      try {
        const stats = statSync(filePath);
        if (!stats.isFile()) return next();
        res.statusCode = 200;
        res.setHeader("Content-Length", stats.size);
        res.setHeader(
          "Content-Type",
          mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
        );
        if (req.method === "HEAD") {
          res.end();
        } else {
          createReadStream(filePath).pipe(res);
        }
        return;
      } catch {
        return next();
      }
    }
    next();
  });
}

function mountedAssetsPlugin() {
  let outDir = resolve(frontendDir, "dist");
  return {
    name: "mounted-assets",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    configureServer: serveMountedAssets,
    configurePreviewServer: serveMountedAssets,
    closeBundle() {
      for (const [prefix, targetDir] of assetMounts) {
        const dest = resolve(outDir, prefix.slice(1));
        let isDir = false;
        try {
          isDir = statSync(dest).isDirectory();
        } catch {
          isDir = false;
        }
        if (!isDir) {
          rmSync(dest, { force: true });
          cpSync(targetDir, dest, { recursive: true });
        }
      }
    },
  };
}

export default defineConfig({
  server: { proxy },
  preview: { proxy },
  plugins: [
    mountedAssetsPlugin(),
    {
      name: "page-routes",
      configureServer: legacyRoutes,
      configurePreviewServer: legacyRoutes,
    },
  ],
});
