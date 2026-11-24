# Migration verification

The original page layouts and stylesheet come from commit 9fd253f. Recovery checkpoint f9bcab5 includes the pre-replacement pages, scripts, product files, asset relationships, cleanup reports and the migration in progress.

- The catalog contains 34 products in six categories. The JSON SHA-256 is 084528815c8171f91642cc139987644214f1ac37042dccbafc5c9f65f2714e1f. Both existing cleaned JavaScript files are retained as historical data artifacts. Java reads only the JSON.
- The quotation API retains the SQLite table, legacy route, successful response, and store-before-notify behavior. Validation now also checks field lengths and email syntax. Mail uses a plain-text body with all submitted fields. Recipient configuration is server-side.
- The health route retains its status and local ISO timestamp. The former browser contact integration now goes through Spring Boot to the existing SheetMonkey form.
- The React frontend uses the original stylesheet and logo. Search, facets, sort, image zoom, documents, product-aware WhatsApp and email links, company pages and the contact form use the retained public routes. The project supplied no verified Facebook or Instagram destinations.
- Compared the legacy health, empty-request and successful quote responses using isolated storage. Java tests compare the complete catalog and every detail response to the source file. Browser checks exercise all 34 products, all six category pages, image and document URLs, company pages, navigation and submissions.
- Notification content and the notification failure path were tested with a mail test double. Contact forwarding used a local HTTP receiver. Live delivery requires the deployment’s SMTP credentials and external contact service.
