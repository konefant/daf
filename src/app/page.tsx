import Image from "next/image";
import Link from "next/link";
import HeroBox from "@/components/HeroBox";

export default function Home() {
  return (
    <div className="wrap">
      <section className="splash">
        <h1>Ce n&apos;est pas une boîte comme les autres. C&apos;est ma boîte.</h1>
        <div className="splash-box"><HeroBox /></div>
        <Image className="splash-logo" src="/logo.jpg" alt="Logo DAF's customizable box" width={96} height={96} priority />
        <Link className="btn" href="/creer-ma-box">Crée ta box</Link>
      </section>
    </div>
  );
}
