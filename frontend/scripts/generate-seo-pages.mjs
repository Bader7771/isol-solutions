import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const out = resolve(import.meta.dirname, '../dist');
const origin = (process.env.PUBLIC_SITE_URL || 'https://isolmaroc.com').replace(/\/$/, '');
const [template, catalog, content, register] = await Promise.all([
  readFile(resolve(out, 'index.html'), 'utf8'),
  readFile(resolve(root, 'data/processed/products_clean.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'backend/src/main/resources/content/site.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'backend/src/main/resources/content/project-register.json'), 'utf8').then(JSON.parse),
]);
const pages = [
  ['/', 'ISOL SOLUTIONS — Isolation & aménagement', 'Isolation acoustique et thermique, santé et aménagement technique au Maroc.', '/assets/images/LOGO.png', 'Organization'],
  ['/catalogue.html', 'Catalogue de produits d’isolation au Maroc', 'Matériaux, caractéristiques techniques et documentation des produits ISOL SOLUTIONS.', '/assets/images/LOGO.png', 'CollectionPage'],
  ['/contact', 'Demander une visite technique', 'Présentez votre projet, sa ville, sa surface et son calendrier à notre équipe technique.', '/assets/images/LOGO.png', 'ContactPage'],
  ['/expertises', 'Expertises techniques au Maroc', 'Santé, acoustique, isolation thermique et enveloppe, BTP et aménagement.', '/assets/images/LOGO.png', 'CollectionPage'],
  ['/secteurs', 'Secteurs d’intervention', 'Solutions pour la santé, l’hôtellerie, l’industrie, les bureaux et le bâtiment.', '/assets/images/LOGO.png', 'CollectionPage'],
  ['/guides', 'Guides techniques d’isolation', 'Repères pratiques pour préparer vos projets d’isolation et d’aménagement au Maroc.', '/assets/images/LOGO.png', 'CollectionPage'],
  ['/realisations', 'Réalisations ISOL SOLUTIONS', 'Références de chantier communicables après autorisation de publication.', '/assets/images/LOGO.png', 'CollectionPage'],
  ['/methode', 'Méthode & qualité', 'Préparation, exécution, contrôles et réception des travaux.', '/assets/images/LOGO.png', 'WebPage'],
  ['/a-propos', 'À propos d’ISOL SOLUTIONS', 'Isolation et aménagement technique pour les professionnels au Maroc.', '/assets/images/LOGO.png', 'AboutPage'],
  ['/en', 'Technical room preparation in Morocco', 'Construction and fit-out coordination for medical equipment installations in Morocco.', '/assets/images/LOGO.png', 'WebPage'],
  ['/confidentialite.html', 'Confidentialité', 'Informations sur le traitement des demandes et documents transmis.', '/assets/images/LOGO.png', 'WebPage'],
];
for (const [base, key] of [['/expertises', 'services'], ['/secteurs', 'sectors'], ['/guides', 'guides']]) {
  for (const page of content[key] || []) pages.push([`${base}/${page.slug}`, `${page.title} | ISOL SOLUTIONS`, page.summary, '/assets/images/LOGO.png', base === '/guides' ? 'Article' : 'WebPage']);
}
for (const product of catalog.products || []) {
  const path = `/produits/${product.slug || product.product_id}`;
  pages.push([path, `${product.product_name} | ISOL SOLUTIONS`, product.short_description, `/${product.primary_image}`, 'Product']);
}
for (const entry of register) {
  if (!entry.approvedForPublication || !entry.commissioningPartyWrittenApproval || (entry.hospital && !entry.hospitalWrittenApproval)) continue;
  const p = entry.reference;
  pages.push([`/realisations/${p.slug}`, `${p.title} | ISOL SOLUTIONS`, p.context, '/assets/images/LOGO.png', 'Article']);
}
const escape = (value) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
for (const [path, title, description, image, type] of pages) {
  const canonical = new URL(path, origin).href;
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@type': type, name: title, description, url: canonical, image: new URL(image, origin).href });
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(description)}">`)
    .replace('</head>', `<link rel="canonical" href="${escape(canonical)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:type" content="website"><meta property="og:image" content="${escape(new URL(image, origin).href)}"><script type="application/ld+json">${jsonLd}</script></head>`);
  const directory = resolve(out, `.${path}`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
console.log(`Generated server-readable SEO shells for ${pages.length} public routes.`);
