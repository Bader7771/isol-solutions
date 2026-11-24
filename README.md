# Isolmaroc / Isolsolutions

A responsive, quotation-based catalog built with the existing HTML, CSS, and vanilla JavaScript stack. The client-approved palette uses industrial orange (`#EC802D`), black (`#171717`), white (`#FFFFFF`), and supporting grays. The original company logo is retained. No cart, checkout, pricing, or stock claims are added.

## Run locally

Requires Python 3 and a modern browser. Node.js 20+ is used for tests and production packaging; the website has no npm runtime dependencies.

```sh
npm run dev
```

Open http://localhost:8080. Run this in the project root so the cleaned data and documents can be fetched. Opening HTML directly with `file://` does not support the module/data loading flow.

## Build and verify

```sh
npm test
npm run build
npm run preview
```

The production-ready static files are written to `dist/`. The preview runs at http://localhost:8081. Deploy the **contents of `dist/`** to a static host; do not publish the repository root, backend files, or environment files.

The build checks JavaScript syntax, unique product IDs, category relationships, and source image/document files. It copies the cleaned JSON without alteration and writes its SHA-256 into `dist/build-info.json`. It also renders the homepage and an initial catalog into the generated HTML for readers/crawlers before JavaScript enhancement. Search and technical details are enhanced in the browser; product titles, descriptions, and Product JSON-LD reflect the selected record.

## Data and interface

- `data/processed/products_clean.json` is the single runtime source: 34 products in six categories.
- `assets/js/catalog-data.js` loads and caches the JSON and implements search, filtering, facets, and sorting.
- `assets/js/components.js` shares the navigation, footer, contact controls, and product cards across pages.
- `assets/js/app.js` handles the catalog, category routes, product details, and form behavior.
- `assets/js/marketing.js` shares homepage rendering between the browser and production build.
- `assets/ui.css` contains the complete shared design system and responsive rules.
- `assets/js/config.js` holds the existing public contact information and form endpoint.
- `catalogue.html` lists the complete catalog. Existing `categorie.html?cat=…` and `produit.html?id=…` links continue to work.
- Original data exports, source images, PDF documents, and the Flask backend are retained.

Filter options come from explicit dataset values: category, brand, `Matière`, `Application`, `Classement au feu`, and thickness. No material or application is inferred when its field is absent. Multiple choices within a facet use OR; facets combine with AND. URL query parameters preserve selections, sorting, and search on reload. Default ordering follows the source dataset.

Homepage featured products are selected programmatically from the first four categories, without hardcoded product records. Every detail page uses all of the product's specifications, advantages, and available documents. Image zoom is available; gallery thumbnails appear if the source contains multiple images.

## Contact configuration

The existing WhatsApp number is `212619949817` and the public email is `contact@isolmaroc.ma`. Product quote links prepare the real product name and the `Référence` specification when present. Links open WhatsApp or the visitor's email client; the visitor chooses whether to send.

The general inquiry form retains the existing SheetMonkey endpoint and field names. It validates required fields and consent, prevents duplicate submits, shows success only after an HTTP success response, and preserves input with an email fallback on failure. The privacy page explains this transmission. Live endpoint/account delivery must be checked by the account owner; the automated tests use simulated responses and send no real requests.

Instagram and Facebook were not configured in the original project. Their slots exist in `assets/js/config.js` and render automatically once verified profile URLs are supplied. All four floating controls remain visible. When a social URL is empty, that control clearly discloses that its official link has not been supplied; it does not open a guessed account. Verified values automatically become external profile links.

The existing Flask API can still be run with `backend/requirements.txt`; its SMTP settings are required for its email notifications. The redesigned WhatsApp/email quotation flow and SheetMonkey contact form do not require this API.

## Images

`assets/optimized/` contains WebP derivatives for display; original files and cleaned data paths are untouched. Product card image URLs derive deterministically from each original path. The nine rock-wool source images were documented placeholders containing the same Rockwool logo; their display derivatives now come from their own attached manufacturer PDFs. `assets/image-sources.json` records the exact document, page, image index, and type. Eight use genuine product or application imagery; GlassRock uses its own manufacturer logo, clearly labeled because its PDF contains no product photo. The original dataset and placeholder files remain untouched. Responsive 480px and 1200px assets are available, with lazy loading outside the leading visual. To regenerate them after adding source imagery:

```sh
python3 -m pip install pillow "pypdf[crypto]"
python3 scripts/optimize-images.py
npm run build
```

## Optional browser checks

`tests/browser.mjs` uses Playwright and Chrome. Install Playwright in your development environment or point `PLAYWRIGHT_MODULE` to its `index.mjs`. Set `CHROME_PATH` when Chrome is not in the macOS default location. Start the production preview first.

```sh
TEST_BASE_URL=http://localhost:8081 node tests/browser.mjs
```

The suite checks all 34 detail pages and document paths, combined filters, live search, sorting, URL persistence, image zoom, navigation, mocked contact-form responses, reduced motion, and layouts at 320, 390, 768, 1024, 1280, and 1440 pixels. Screenshots and a report are written to the ignored `test-results/` directory.

## Reference-led UI transformation

The supplied Hollis screenshot is now available and was inspected directly. Every rendered route uses the new `assets/ui.css` design system and full-width page layout. The earlier `modern.css` and `interface.css` files are retained as prior work but are no longer loaded. The new layouts use the client-approved palette from `assets/brand.css`, with light neutral surfaces, industrial-orange actions, and the unchanged company logo.

`assets/js/catalog-view.js` shares catalog rendering and pill-style filter markup between the browser and production build. The layout uses an open material showcase, rounded white filter panel, compact four-column product grid, and per-product quotation circles. The homepage has a new material-led composition; product information is presented in two panels and modular detail sections. Resources, articles, and privacy pages share the same visual language.

All four social controls remain visible. Instagram and Facebook cannot open official profiles until verified URLs are supplied; the repository and the company’s live footer only contained placeholders or generic platform homepages. These controls show a clear unavailable message rather than opening invented accounts.

## Full-width layout and hero slideshow

The outer site canvas has been removed from all rendered HTML routes. The page body is white, the header and footer extend to the viewport edges, and the content uses internal gutters only. The footer has a dark treatment. The original logo asset and cleaned product JSON are unchanged.

`assets/js/hero.js` owns the homepage's single background slideshow. It reuses five local insulation/application photographs, crossfades every six seconds using 1.2-second opacity transitions, preloads the next image, pauses while offscreen or the document is hidden, and disables automatic motion for `prefers-reduced-motion`. Manual image selection and a pause/resume button are included. The homepage's French headline and CTA destinations are preserved.

## Complete website routes

The current site includes `apropos.html`, `services.html`, and `contact.html` in addition to the original homepage, catalog/category, product, resource, article, privacy, and diagnostic entry points. Existing homepage anchors continue to work. `assets/js/company-content.js` shares the company’s existing service descriptions; `assets/js/company-pages.js` renders the standalone pages. The same contact form component and endpoint are used on the homepage and contact route. Service inquiry buttons prefill the selected service in the contact form.

Product cards now show the original short description and a real technical attribute alongside separate details and WhatsApp quotation actions. The category shortcut strip is generated from the cleaned categories and counts. The mobile filter panel includes an apply action to return to the results. Product information uses a sticky section navigator whose active state follows selected anchors.

Run `npm run test:site` with the same Playwright configuration described above for route integration, service/contact prefill, mocked contact submission, category shortcuts, details navigation, and responsive checks of all page types. Test form submissions are mocked and do not send company messages.
