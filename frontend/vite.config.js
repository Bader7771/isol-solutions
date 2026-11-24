import { defineConfig } from "vite";
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
export default defineConfig({
  server: { proxy },
  preview: { proxy },
  plugins: [
    {
      name: "page-routes",
      configureServer: legacyRoutes,
      configurePreviewServer: legacyRoutes,
    },
  ],
});
