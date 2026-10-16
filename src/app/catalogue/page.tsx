"use client";
import Link from "next/link";
import { useState } from "react";
import Stepper from "@/components/Stepper";
import { useBox } from "@/lib/box-context";
import { boxTotal, formatPrice } from "@/lib/pricing";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function Catalogue() {
  const { box, update, toggleProduct } = useBox();
  const [cat, setCat] = useState("Tous");
  const cur = box.currency;
  const list = cat === "Tous" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(cat));
  const chosen = PRODUCTS.filter((p) => box.selected.includes(p.id));
  const total = boxTotal(chosen.map((p) => p.price), box.name.trim().length > 0);

  return (
    <div className="wrap">
      <Stepper current={2} />
      <section className="block">
        <div className="row">
          <h2>Choisis tes produits</h2>
          <div className="seg" role="group" aria-label="Devise">
            <button aria-pressed={cur === "EUR"} onClick={() => update({ currency: "EUR" })}>EUR</button>
            <button aria-pressed={cur === "XOF"} onClick={() => update({ currency: "XOF" })}>FCFA</button>
          </div>
        </div>
        <div className="chips" role="group" aria-label="Catégories">
          {CATEGORIES.map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="grid">
          {list.map((p) => {
            const on = box.selected.includes(p.id);
            return (
              <button key={p.id} className="card" aria-pressed={on} onClick={() => toggleProduct(p.id)}>
                <span className="e" aria-hidden>{p.emoji}</span>
                <b>{p.name}</b>
                <span className="cat">{p.categories[0]}</span>
                <span className="pr">{formatPrice(p.price, cur)}</span>
                <span className="add">{on ? "✓ Dans ma box" : "+ Ajouter"}</span>
              </button>
            );
          })}
        </div>
        <div className="total" aria-live="polite">
          <div>
            <strong>{formatPrice(total, cur)}</strong>
            <small>{chosen.length} produit{chosen.length > 1 ? "s" : ""} · boîte de base incluse</small>
          </div>
          <div className="actions">
            <Link className="btn ghost" href="/creer-ma-box">← Ma boîte</Link>
            <Link className="btn" href="/envoi">Envoi &amp; carte →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
