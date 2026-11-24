# Migration checklist
- Flask GET /health returns status and local ISO timestamp.
- Flask POST /submit-devis trims six fields, validates name, email and message, inserts into devis_requests in SQLite, then attempts STARTTLS SMTP to both configured recipients. Notification failure preserves the successful submission.
- Catalog operations previously ran in the browser. The cleaned JSON contains metadata, a category map and an ordered product array with nested specifications, document paths, images and advantages. Preserve every field.
- Keep the offline cleaning pipeline (normalization, deduplication, validation, quarantine and reports), processed JS companion and image optimization utility unchanged.
- Recover original layouts from 9fd253f. Keep newer routes and contact configuration. Check both legacy and newer query parameters.
- Verify data hashes, API, quote persistence, frontend and production build before retiring Flask.
