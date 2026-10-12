import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAF's Customizable Box",
  description: "Crée ta box cadeau personnalisée et offre-la en France, au Mali et au Sénégal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <footer className="wrap foot">DAF&apos;s Customizable Box · Livraison en France, au Mali et au Sénégal · Version de démonstration</footer>
      </body>
    </html>
  );
}
