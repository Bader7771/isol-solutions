# Isolmaroc

Isolmaroc is a Java 25 and React application for browsing insulation products, downloading technical documents and requesting quotations. Spring Boot serves the production frontend and REST API on the same origin. Existing public page names and product links resolve to React routes.

## Layout

| Location | Purpose |
|---|---|
| `backend/src/main/java/ma/isolmaroc` | Spring MVC controllers, catalog and notification services, validated requests, SQLite repository and error handling |
| `backend/src/main/resources` | Application settings and public company information |
| `frontend/src` | JSX pages, shared catalog components, original stylesheet and API client |
| `frontend/public` | Links to existing image and document directories, copied by Vite at build time |
| `data/processed/products_clean.json` | Read-only catalog source loaded by Jackson at startup |
| `data` | Preserved source files, processed companion, schema, staging, quality reports and quarantine |
| `assets/images`, `assets/optimized`, `data_produits` | Logos, images and product technical documents |
| `backend/devis.db` | Local quotation database, excluded from Git |

## Development

Install JDK 25, Maven 3.9 and Node.js 22 or 24 with npm. Set `JAVA_HOME` to the JDK 25 installation. Run these commands in separate terminals from the repository root.

```sh
cd backend
mvn spring-boot:run
```

```sh
cd frontend
npm ci
npm run dev
```

Open the localhost address printed by Vite, normally port 5173. Vite proxies API requests to port 5000. On systems where that port is occupied, set `PORT` on the backend and `API_ORIGIN` on Vite.

## Production build

```sh
cd frontend
npm ci
npm test
npm run build
cd ../backend
mvn clean package
java -jar target/isolmaroc-1.0.0.jar
```

Open `http://localhost:5000/`. Deploy the JAR, the Vite build directory and the original catalog file together. Start the JAR from `backend/` with the layout above or supply absolute paths through environment variables. The SQLite directory must be writable and persistent.

## Configuration

Spring reads exported environment variables and an optional local `backend/.env`. Copy `.env.example` in that directory to configure SMTP. Keep credentials on the server.

| Variable | Purpose and default |
|---|---|
| PORT | HTTP port, 5000 |
| FRONTEND_DIST | Production frontend, ../frontend/dist |
| CATALOG_FILE | Cleaned JSON, ../data/processed/products_clean.json |
| QUOTES_DB | SQLite file, devis.db |
| CORS_ORIGINS | Comma-separated allowed origins, http://localhost:5173 |
| SMTP_SERVER, SMTP_PORT | STARTTLS mail server, smtp.gmail.com on 587 |
| SMTP_USERNAME, SMTP_PASSWORD | SMTP credentials. With an empty username, quotes are stored without sending notifications |
| NOTIFICATION_EMAILS | Comma-separated recipients, defaulting to the existing Isolmaroc notification addresses |
| CONTACT_ENDPOINT | SheetMonkey form destination, defaulting to the existing project endpoint |
| API_ORIGIN | Vite development and preview proxy target, http://127.0.0.1:5000 |

## REST API

| Method | Path | Result |
|---|---|---|
| GET | /health | Status and ISO timestamp |
| GET | /api/catalog | Metadata, categories and complete ordered product records |
| GET | /api/products | Product list. Optional q, category and sort parameters. Sort accepts default, az, za and documents |
| GET | /api/products/categories | Category map keyed by category ID |
| GET | /api/products/{id} | Cleaned product with specifications, image references and document paths |
| GET | /api/company | Public identity, services and contact channels |
| GET | /api/contact | Public contact information |
| POST | /api/contact | Validated contact request forwarded to the configured contact service |
| POST | /api/devis or /submit-devis | Store a quote and attempt a notification |

Both POST operations accept JSON with required strings `nom`, `email`, `message` and optional strings `telephone`, `entreprise`, `produit`. A quotation is committed before notification delivery. Invalid requests return 400, missing products return 404 and contact forwarding failures return 502.

## Verification

Run `mvn test` in backend and `npm test` in frontend. The tests compare Java responses with the preserved catalog, verify image and document relationships, exercise filtering and sorting, check quotation links and verify SQLite persistence and notification behavior.

The Chromium integration suite is `frontend/tests/site.mjs`. Use a dedicated local server with an empty SMTP username, temporary QUOTES_DB, and CONTACT_ENDPOINT set to http://127.0.0.1:18533/contact. The suite starts its own local receiver there. Set TEST_BASE_URL to the local server, ISOL_TEST_DATABASE to temporary, PLAYWRIGHT_MODULE to the installed Playwright index.mjs and optionally CHROME_PATH to a Chromium executable. Run `node frontend/tests/site.mjs` from the repository root.
