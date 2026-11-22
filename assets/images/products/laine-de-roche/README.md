# Images — Catégorie Laine de Roche

Chaque produit de la catégorie possède son propre dossier nommé d'après son `id`
dans `products-data.js`. Un fichier `main.png` (image de remplacement temporaire)
est déjà présent dans chaque dossier et est référencé par le champ `image` du produit.

## Comment ajouter les vraies images (sans casser le code)

1. Ouvrez le dossier du produit concerné (ex : `rockwool-rockfacade/`).
2. Remplacez simplement le fichier `main.png` par la vraie photo du produit
   **en conservant exactement le nom `main.png`**.
   - Formats conseillés : `.png`, `.jpg` ou `.webp` (si vous changez l'extension,
     mettez à jour le champ `image` du produit dans `products-data.js`).
   - Dimensions conseillées : 1000 × 1000 px minimum, fond neutre.
3. (Optionnel) Pour une future galerie, ajoutez d'autres images dans le même dossier
   (`gallery-1.png`, `gallery-2.png`, …). Le champ `images` est déjà prêt dans les
   données produit.

Aucune modification de code n'est nécessaire tant que le nom `main.png` est conservé.

## Correspondance dossier ⇄ produit

| Dossier                         | Produit                        |
|---------------------------------|--------------------------------|
| `rockwool-rockfacade/`          | Rockwool Rockfaçade            |
| `rockwool-rockmur-kraft/`       | Rockwool Rockmur Kraft         |
| `rockwool-rocksono-base/`       | Rockwool RockSono Base         |
| `rockwool-rocksate-duo-plus/`   | Rockwool Rocksate Duo Plus     |
| `rockwool-sonorock-plus/`       | Rockwool Sonorock Plus         |
| `volcalis-comfort-panneau/`     | Volcalis Comfort Panneau       |
| `volcalis-comfort-rouleau/`     | Volcalis Comfort Rouleau       |
| `terrawool-tw150/`              | Terrawool TW150                |
| `glasrock-panneau-kraft/`       | Glasrock Panneau Kraft         |
