import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="wrap">
      <div className="hero">
        <div>
          <h1>Ce n&apos;est pas une boîte comme les autres. C&apos;est ma boîte.</h1>
          <p>Choisis tes produits, écris un prénom ou un surnom sur la boîte, et offre un cadeau qui ressemble vraiment à la personne. Livraison en France, au Mali et au Sénégal.</p>
          <Link className="btn" href="/creer-ma-box">Crée ta box en 3D</Link>
        </div>
        <Image src="/logo.jpg" alt="Logo DAF's customizable box" width={800} height={800} priority />
      </div>
    </div>
  );
}
