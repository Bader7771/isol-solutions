import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const origin = (process.env.PUBLIC_SITE_URL || 'https://isolmaroc.com').replace(/\/$/, '');
const [catalog, content, register] = await Promise.all([
  readFile(resolve(root, 'data/processed/products_clean.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'backend/src/main/resources/content/site.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'backend/src/main/resources/content/project-register.json'), 'utf8').then(JSON.parse),
]);
const paths = new Set(['/', '/catalogue.html', '/expertises', '/secteurs', '/guides', '/realisations', '/methode', '/a-propos', '/contact', '/en', '/confidentialite.html']);
for (const [base, key] of [['/expertises', 'services'], ['/secteurs', 'sectors'], ['/guides', 'guides']]) {
  for (const item of content[key] || []) paths.add(`${base}/${item.slug}`);
}
for (const product of catalog.products || []) paths.add(`/produits/${product.slug || product.product_id}`);
for (const category of Object.keys(catalog.categories || {})) paths.add(`/categorie.html?cat=${encodeURIComponent(category)}`);
for (const entry of register) {
  if (!entry.approvedForPublication || !entry.commissioningPartyWrittenApproval || (entry.hospital && !entry.hospitalWrittenApproval)) continue;
  paths.add(`/realisations/${entry.reference.slug}`);
}
const xmlEscape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...paths].map(path => `  <url><loc>${xmlEscape(origin + path)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(resolve(import.meta.dirname, '../public/sitemap.xml'), xml);
