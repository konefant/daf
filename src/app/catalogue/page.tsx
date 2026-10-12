import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/pricing";

export const metadata = { title: "Catalogue — DAF's" };

export default function Catalogue() {
  return (
    <div className="wrap">
      <section className="block">
        <h2>Le catalogue</h2>
        <p className="sub">Des produits à glisser dans ta box. Les prix sont fictifs pour l&apos;instant.</p>
        <div className="grid">
          {PRODUCTS.map((p) => (
            <article className="card" key={p.id}>
              <span className="e" aria-hidden>{p.emoji}</span>
              <b>{p.name}</b>
              <span className="cat">{p.category}</span>
              <span className="pr">{formatPrice(p.price, "EUR")} · {formatPrice(p.price, "XOF")}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
