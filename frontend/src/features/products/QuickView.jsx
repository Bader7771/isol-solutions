import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import ProductMedia from './ProductMedia';
import { productMediaClass } from './media';

export default function QuickView({ dialog, product, onClose }) {
  if (!product) return null;
  const specs = Object.entries(product.specifications).slice(0, 3);
  return (
    <dialog ref={dialog} className="cat-dialog quick-view" onClose={onClose} aria-labelledby="quick-view-title"
      onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <div className="quick-view-inner">
        <button className="icon-button cat-close" type="button" onClick={() => dialog.current.close()} aria-label="Fermer l’aperçu"><X aria-hidden="true" /></button>
        <div className={'cat-card-photo ' + productMediaClass(product)}>
          <ProductMedia path={product.primary_image} alt={product.product_name} sizes="(max-width: 720px) 94vw, 42vw" eager />
        </div>
        <div className="quick-view-copy">
          <p className="cat-kicker">{product.brand} · {product.category_name}</p>
          <h2 id="quick-view-title">{product.product_name}</h2>
          <p>{product.short_description}</p>
          {specs.length > 0 && <dl>{specs.map(([name,value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>}
          <a className="action" href={'/produits/' + encodeURIComponent(product.slug || product.product_id)}>Voir la fiche complète <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
    </dialog>
  );
}
