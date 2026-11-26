import React, { lazy, Suspense, useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { fetchCatalog, fetchCompany, fetchContent, fetchProduct } from './api';
import { SiteLayout } from './layouts/Shell';
import { metadata, resolve, normalizePath } from './app/routes';
import { PageHero } from './components/Editorial';
import './styles/design.css';
import './styles/shell.css';
import './features/products/catalog.css';
import './features/business/home.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';

const Home = lazy(() => import('./features/business/Home'));
const businessPage = name => lazy(() => import('./features/business/Pages').then(module => ({ default: module[name] })));
const Listing = businessPage('Listing');
const Editorial = businessPage('Editorial');
const Project = businessPage('Project');
const Privacy = businessPage('Privacy');
const Catalog = lazy(() => import('./Catalog'));
const Detail = lazy(() => import('./pages/Detail'));
const Enquiry = lazy(() => import('./features/contact/EnquiryPage'));

const path = normalizePath(location.pathname);
const params = new URLSearchParams(location.search);

function Loading() {
  return <p className="shell loading-state" role="status"><LoaderCircle aria-hidden="true" />Chargement…</p>;
}

function Site({ content, company, data, product }) {
  const route = resolve(path, content, data, product, params);
  const contact = company.contact;
  useEffect(() => {
    metadata(route, contact);
  }, []);

  let body;
  switch (route.view) {
    case 'home': body = <Home content={content} contact={contact} />; break;
    case 'list': body = <Listing {...route} />; break;
    case 'editorial': body = <Editorial {...route} />; break;
    case 'project': body = <Project project={route.page} projects={content.projects} contact={contact} />; break;
    case 'catalog': body = <Catalog data={data} params={params} />; break;
    case 'detail':
      body = <Detail p={product} contact={contact} related={data.products
        .filter(item => item.category_id === product.category_id && item.product_id !== product.product_id).slice(0, 3)} />;
      break;
    case 'contact': body = <Enquiry contact={contact} initialDescription={params.get('service') || ''} />; break;
    case 'privacy': body = <Privacy contact={contact} />; break;
    default:
      body = <main id="main-content"><PageHero label="Page indisponible" title={route.title} summary={route.summary} />
        <div className="shell block"><a className="action" href="/">Retour à l’accueil</a></div>
      </main>;
  }

  return <SiteLayout route={route} contact={contact} content={content} product={product}>
    <Suspense fallback={<Loading />}>{body}</Suspense>
  </SiteLayout>;
}

function App() {
  const [values, setValues] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cleanProduct = path.startsWith('/produits/');
    const product = cleanProduct || path === '/produit.html';
    const catalog = product || path === '/catalogue.html' || path === '/categorie.html';
    const id = cleanProduct ? path.slice('/produits/'.length) : params.get('id');
    const work = product && id ? fetchProduct(decodeProductId(id)).catch(failure => {
      if (failure.status === 404) return null;
      throw failure;
    }) : null;
    Promise.all([fetchContent(), fetchCompany(), catalog ? fetchCatalog() : null, work])
      .then(([content, company, data, productRecord]) => setValues({ content, company, data, product: productRecord }))
      .catch(failure => setError(failure.message));
  }, []);

  if (values) return <Site {...values} />;
  return <SiteLayout route={{ view: 'loading', path }}>
    {error ? <main className="shell block" role="alert">
      <h1>{error}</h1><p className="page-summary">Vous pouvez réessayer de charger la page.</p>
      <div className="block"><button className="action" onClick={() => location.reload()}>Réessayer</button></div>
    </main> : <Loading />}
  </SiteLayout>;
}

function decodeProductId(id) {
  if (!path.startsWith('/produits/')) return id;
  try { return decodeURIComponent(id); } catch { return id; }
}

createRoot(document.getElementById('root')).render(<App />);
