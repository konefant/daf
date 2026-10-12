# DAF's Customizable Box

Boutique de box cadeaux personnalisables (France, Mali, Sénégal), construite avec Next.js, TypeScript et React Three Fiber (3D).

## Lancer en local
```bash
npm install
npm run dev
```
Puis ouvrir http://localhost:3000

## Structure
- `src/app/` : les pages (accueil, catalogue, creer-ma-box, contact)
- `src/components/` : Header, BoxViewer (boîte 3D)
- `src/lib/` : produits, calcul des prix et devises
- `public/` : logo et images
- `docs/` : cahier des charges

## Déploiement
Netlify, automatique à chaque push sur `main` (voir `netlify.toml`).
