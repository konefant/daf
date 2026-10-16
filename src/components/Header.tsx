"use client";
import Link from "next/link";
import { useBox } from "@/lib/box-context";

export default function Header() {
  const { box } = useBox();
  return (
    <header className="wrap head-bar">
      <Link href="/" className="logo" aria-label="DAF's customizable box">
        DAF&apos;s<small>customizable box</small>
      </Link>
      <nav>
        <Link href="/">Accueil</Link>
        <Link href="/creer-ma-box">Crée ta box</Link>
        <Link href="/catalogue">Catalogue</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/envoi" className="cart" aria-label={`Ma box : ${box.selected.length} produit(s)`}>
          🛍️{box.selected.length > 0 && <span className="badge">{box.selected.length}</span>}
        </Link>
      </nav>
    </header>
  );
}
