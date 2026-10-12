"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BOX_COLORS, PRODUCTS } from "@/lib/products";
import { BOX_BASE_PRICE, PERSONALIZATION_PRICE, boxTotal, formatPrice, type Currency } from "@/lib/pricing";

const BoxViewer = dynamic(() => import("@/components/BoxViewer"), {
  ssr: false,
  loading: () => <p style={{ padding: 24 }}>Chargement de la 3D…</p>,
});

export default function CreerMaBox() {
  const [name, setName] = useState("");
  const [color, setColor] = useState(BOX_COLORS[0].hex);
  const [ribbon, setRibbon] = useState("#f0c2cb");
  const [sel, setSel] = useState<string[]>([]);
  const [cur, setCur] = useState<Currency>("EUR");

  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const prices = PRODUCTS.filter((p) => sel.includes(p.id)).map((p) => p.price);
  const total = boxTotal(prices, name.trim().length > 0);

  return (
    <div className="wrap">
      <section className="block">
        <h2>Crée ta box</h2>
        <p className="sub">Tourne la boîte avec ton doigt ou ta souris, change les couleurs et écris un prénom dessus.</p>
        <div className="builder">
          <div className="stage">
            <div className="canvas"><BoxViewer color={color} ribbon={ribbon} name={name.trim()} /></div>
            <div className="field">
              <label htmlFor="nm">Prénom ou surnom sur la boîte</label>
              <input id="nm" type="text" maxLength={14} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex : Fanta, Ma Chérie…" />
            </div>
            <div className="field">
              <span className="lbl">Couleur de la boîte</span>
              <div className="sw" role="group" aria-label="Couleur de la boîte">
                {BOX_COLORS.map((c) => (
                  <button key={c.hex} title={c.name} aria-label={c.name} aria-pressed={color === c.hex} style={{ background: c.hex }} onClick={() => setColor(c.hex)} />
                ))}
              </div>
            </div>
            <div className="field">
              <span className="lbl">Couleur du ruban</span>
              <div className="sw" role="group" aria-label="Couleur du ruban">
                {BOX_COLORS.concat([{ name: "Blanc", hex: "#ffffff" }]).map((c) => (
                  <button key={c.hex} title={c.name} aria-label={c.name} aria-pressed={ribbon === c.hex} style={{ background: c.hex }} onClick={() => setRibbon(c.hex)} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3>Tes produits</h3>
              <div className="seg" role="group" aria-label="Devise">
                <button aria-pressed={cur === "EUR"} onClick={() => setCur("EUR")}>EUR</button>
                <button aria-pressed={cur === "XOF"} onClick={() => setCur("XOF")}>FCFA</button>
              </div>
            </div>
            <div className="grid">
              {PRODUCTS.map((p) => (
                <button key={p.id} className="card" aria-pressed={sel.includes(p.id)} onClick={() => toggle(p.id)}>
                  <span className="e" aria-hidden>{p.emoji}</span>
                  <b>{p.name}</b>
                  <span className="pr">{formatPrice(p.price, cur)}</span>
                </button>
              ))}
            </div>
            <div className="total" aria-live="polite">
              <div>
                <strong>{formatPrice(total, cur)}</strong>
                <small>
                  {sel.length} produit{sel.length > 1 ? "s" : ""} · boîte {formatPrice(BOX_BASE_PRICE, cur)}
                  {name.trim() ? ` · personnalisation ${formatPrice(PERSONALIZATION_PRICE, cur)}` : ""} · livraison calculée ensuite
                </small>
              </div>
              <button className="btn" disabled title="Le panier arrive bientôt">Ajouter au panier (bientôt)</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
