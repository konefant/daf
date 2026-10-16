import Link from "next/link";

const STEPS = [
  { n: 1, label: "Personnalisation de la boîte", href: "/creer-ma-box" },
  { n: 2, label: "Choix des produits", href: "/catalogue" },
  { n: 3, label: "Envoi & carte", href: "/envoi" },
];

export default function Stepper({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="stepper" aria-label="Étapes">
      {STEPS.map((s) => (
        <li key={s.n} aria-current={s.n === current ? "step" : undefined} className={s.n === current ? "on" : ""}>
          <Link href={s.href}>{s.n}. {s.label}</Link>
        </li>
      ))}
    </ol>
  );
}
