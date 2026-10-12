import Link from "next/link";

export default function Header() {
  return (
    <header className="wrap head-bar">
      <Link href="/" className="logo" aria-label="DAF's customizable box">
        DAF&apos;s<small>customizable box</small>
      </Link>
      <nav>
        <Link href="/catalogue">Catalogue</Link>
        <Link href="/creer-ma-box">Crée ta box</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
