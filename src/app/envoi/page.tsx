"use client";
import Link from "next/link";
import Stepper from "@/components/Stepper";
import { useBox } from "@/lib/box-context";
import { BOX_BASE_PRICE, PERSONALIZATION_PRICE, boxTotal, formatPrice } from "@/lib/pricing";
import { PRODUCTS } from "@/lib/products";

export default function Envoi() {
  const { box, update } = useBox();
  const cur = box.currency;
  const chosen = PRODUCTS.filter((p) => box.selected.includes(p.id));
  const hasName = box.name.trim().length > 0;
  const total = boxTotal(chosen.map((p) => p.price), hasName);

  return (
    <div className="wrap">
      <Stepper current={3} />
      <div className="builder">
        <div className="panel">
          <h2>Envoi &amp; carte</h2>
          <div className="field"><label htmlFor="rc">Prénom du destinataire</label>
            <input id="rc" type="text" value={box.recipient} onChange={(e) => update({ recipient: e.target.value })} /></div>
          <div className="field"><label htmlFor="ct">Pays de livraison</label>
            <select id="ct" value={box.country} onChange={(e) => update({ country: e.target.value })}>
              <option>France</option><option>Mali</option><option>Sénégal</option>
            </select></div>
          <div className="field"><label htmlFor="ci">Ville</label>
            <input id="ci" type="text" value={box.city} onChange={(e) => update({ city: e.target.value })} /></div>
          <div className="field"><label htmlFor="ad">Adresse ou point de repère</label>
            <input id="ad" type="text" value={box.address} onChange={(e) => update({ address: e.target.value })} /></div>
          <div className="field"><label htmlFor="cm">Message de la carte</label>
            <textarea id="cm" rows={4} maxLength={300} value={box.cardMessage} onChange={(e) => update({ cardMessage: e.target.value })} placeholder="Joyeux anniversaire ma belle…" /></div>
        </div>

        <div className="panel">
          <div className="row">
            <h2>Ma box</h2>
            <div className="seg" role="group" aria-label="Devise">
              <button aria-pressed={cur === "EUR"} onClick={() => update({ currency: "EUR" })}>EUR</button>
              <button aria-pressed={cur === "XOF"} onClick={() => update({ currency: "XOF" })}>FCFA</button>
            </div>
          </div>
          <ul className="recap">
            <li><span>Boîte « {box.name.trim() || "sans prénom"} »</span><span>{formatPrice(BOX_BASE_PRICE, cur)}</span></li>
            {hasName && <li><span>Personnalisation</span><span>{formatPrice(PERSONALIZATION_PRICE, cur)}</span></li>}
            {chosen.map((p) => (<li key={p.id}><span>{p.emoji} {p.name}</span><span>{formatPrice(p.price, cur)}</span></li>))}
          </ul>
          {chosen.length === 0 && <p className="sub">Aucun produit pour l&apos;instant. <Link href="/catalogue"><u>Choisir des produits</u></Link></p>}
          <div className="total">
            <div><strong>{formatPrice(total, cur)}</strong><small>Livraison vers {box.country} calculée ensuite</small></div>
            <button className="btn" disabled title="La commande en ligne arrive bientôt">Valider (bientôt)</button>
          </div>
          <p style={{ marginTop: 14 }}><Link href="/catalogue">← Modifier mes produits</Link></p>
        </div>
      </div>
    </div>
  );
}
