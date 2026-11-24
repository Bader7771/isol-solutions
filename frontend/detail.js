export function renderDetail(currentProduct, cat, relatedProducts) {
            // ── SEO: Page title dynamique
            const pageTitle = currentProduct.title + ' — ' + (cat ? cat.title : '') + ' | Isolsolutions';
            document.title = pageTitle;
            document.getElementById('page-title').textContent = pageTitle;

            // ── SEO: Meta description dynamique
            const metaContent = currentProduct.shortDesc + ' Isolsolutions — expert isolation acoustique et thermique au Maroc.';
            document.getElementById('meta-description').setAttribute('content', metaContent);

            // ── SEO: Open Graph
            document.getElementById('og-title').setAttribute('content', currentProduct.title + ' | Isolsolutions');
            document.getElementById('og-description').setAttribute('content', currentProduct.shortDesc);
            if (currentProduct.image) {
                document.getElementById('og-image').setAttribute('content', currentProduct.image);
            }

            // ── SEO: Twitter Card
            document.getElementById('twitter-title').setAttribute('content', currentProduct.title + ' | Isolsolutions');
            document.getElementById('twitter-description').setAttribute('content', currentProduct.shortDesc);

            // ── SEO: Canonical URL
            const canonicalURL = window.location.origin + window.location.pathname + '?id=' + productId;
            document.getElementById('canonical-link').setAttribute('href', canonicalURL);

            // ── SEO: JSON-LD Product Schema
            const productSchema = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": currentProduct.title,
                "description": currentProduct.fullDesc,
                "image": currentProduct.image || '',
                "brand": { "@type": "Brand", "name": "Isolsolutions" },
                "manufacturer": {
                    "@type": "Organization",
                    "name": "Isolsolutions",
                    "url": "https://www.isolsolutions.ma"
                },
                "category": cat ? cat.title : '',
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "priceCurrency": "MAD",
                    "seller": {
                        "@type": "Organization",
                        "name": "Isolsolutions"
                    }
                }
            };
            document.getElementById('json-ld-product').textContent = JSON.stringify(productSchema, null, 2);

            // ── SEO: JSON-LD Breadcrumb Schema
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "index.html" },
                    { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "index.html#solutions" },
                    { "@type": "ListItem", "position": 3, "name": cat ? cat.title : '', "item": "categorie.html?cat=" + currentProduct.category },
                    { "@type": "ListItem", "position": 4, "name": currentProduct.title }
                ]
            };
            document.getElementById('json-ld-breadcrumb').textContent = JSON.stringify(breadcrumbSchema, null, 2);

            // ── Breadcrumb visible
            document.getElementById('breadcrumb-category').textContent = cat ? cat.title : '';
            document.getElementById('breadcrumb-cat-link').href = 'categorie.html?cat=' + currentProduct.category;
            document.getElementById('breadcrumb-product').textContent = currentProduct.title;

            // ── Product info
            const productImg = document.getElementById('product-image');
            productImg.src = currentProduct.image || 'assets/images/solution-images/panneaux-acoustiques.png';
            productImg.alt = currentProduct.title + ' — Isolsolutions isolation acoustique thermique';
            document.getElementById('product-badge').textContent = currentProduct.badge;
            document.getElementById('product-category-label').textContent = cat ? cat.title : '';
            document.getElementById('product-title').textContent = currentProduct.title;
            document.getElementById('product-description').textContent = currentProduct.fullDesc;

            // ── Specs table
            if (currentProduct.specs) {
                const tbody = document.querySelector('#specs-table tbody');
                Object.entries(currentProduct.specs).forEach(function (entry) {
                    const tr = document.createElement('tr');
                    tr.innerHTML = '<td class="spec-label">' + entry[0] + '</td><td class="spec-value">' + entry[1] + '</td>';
                    tbody.appendChild(tr);
                });
            }

            // ── Fiche technique principale (premier PDF ou placeholder)
            const btnDownload = document.getElementById('btn-download');
            if (currentProduct.fichesPDF && currentProduct.fichesPDF.length > 0) {
                btnDownload.href = currentProduct.fichesPDF[0].path;
                btnDownload.setAttribute('download', '');
                btnDownload.setAttribute('target', '_blank');
                btnDownload.title = currentProduct.fichesPDF[0].label;

                // Fiches supplémentaires
                if (currentProduct.fichesPDF.length > 1) {
                    const dsContainer = document.getElementById('product-datasheets');
                    dsContainer.style.display = 'block';
                    const dsTitle = document.createElement('p');
                    dsTitle.style.cssText = 'font-size:0.85rem; color: var(--text-muted, #999); margin-bottom:0.5rem;';
                    dsTitle.textContent = 'Autres fiches disponibles :';
                    dsContainer.appendChild(dsTitle);
                    currentProduct.fichesPDF.slice(1).forEach(function (pdf) {
                        const a = document.createElement('a');
                        a.href = pdf.path;
                        a.setAttribute('target', '_blank');
                        a.setAttribute('download', '');
                        a.style.cssText = 'display:block; font-size:0.82rem; margin-bottom:0.25rem; color: var(--primary, #0047AB); text-decoration:underline;';
                        a.innerHTML = '📄 ' + pdf.label;
                        dsContainer.appendChild(a);
                    });
                }
            } else {
                // Pas de fiche PDF disponible — désactivation élégante
                btnDownload.href = 'index.html#contact';
                btnDownload.title = 'Contactez-nous pour recevoir la fiche technique';
                btnDownload.innerHTML = btnDownload.innerHTML.replace('Télécharger la fiche technique', 'Demandez la fiche technique');
            }

            // ── Advantages
            const advGrid = document.getElementById('advantages-grid');
            if (currentProduct.advantages) {
                currentProduct.advantages.forEach(function (adv, i) {
                    const card = document.createElement('div');
                    card.className = 'advantage-card';
                    card.style.animationDelay = (i * 0.1) + 's';
                    card.innerHTML =
                        '<div class="advantage-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
                        '<p class="advantage-card__text">' + adv + '</p>';
                    advGrid.appendChild(card);
                });
            }

            // ── Related products (même catégorie, produit différent)
            const related = relatedProducts.filter(function (p) { return p.id !== currentProduct.id; }).slice(0, 3);
            const relGrid = document.getElementById('related-grid');
            related.forEach(function (product) {
                const card = document.createElement('a');
                card.href = 'produit.html?id=' + product.id;
                card.className = 'product-mini-card';
                card.innerHTML =
                    '<div class="product-mini-card__image">' +
                    '<img src="' + (product.image || 'assets/images/solution-images/panneaux-acoustiques.png') + '" alt="' + product.title + ' — Isolsolutions" loading="lazy">' +
                    '<span class="product-mini-card__badge">' + product.badge + '</span>' +
                    '</div>' +
                    '<div class="product-mini-card__content">' +
                    '<h3 class="product-mini-card__title">' + product.title + '</h3>' +
                    '<p class="product-mini-card__desc">' + product.shortDesc + '</p>' +
                    '<span class="product-mini-card__cta">Voir le produit <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
                    '</div>';
                relGrid.appendChild(card);
            });

            // ── Modal product name
            document.getElementById('modal-product-name').textContent = currentProduct.title;

}
