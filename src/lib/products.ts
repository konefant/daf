export type Product = { id: string; name: string; price: number; emoji: string; categories: string[] };

// [id, nom, prix en €, emoji, catégories] — prix fictifs, à remplacer par tes vrais produits.
const RAW: [string, string, number, string, string[]][] = [
  ["bougie", "Bougie parfumée", 12, "🕯️", ["Bien-être", "Décoration", "Pour elle"]],
  ["mug", "Mug personnalisé", 14, "☕", ["Couple", "Pour lui", "Pour elle", "Décoration"]],
  ["bracelet", "Bracelet doré", 18, "📿", ["Bijoux", "Pour elle"]],
  ["gloss", "Gloss et baume", 9, "💄", ["Beauté", "Pour elle"]],
  ["pyjama", "Pyjama satin", 29, "🌙", ["Bien-être", "Pour elle"]],
  ["peluche", "Peluche douce", 16, "🧸", ["Enfants", "Couple"]],
  ["parfum", "Parfum femme", 35, "🌸", ["Parfums", "Beauté", "Pour elle"]],
  ["fleurs", "Fleurs artificielles", 11, "💐", ["Décoration", "Couple", "Pour elle"]],
  ["livre", "Livre", 15, "📖", ["Pour lui", "Pour elle"]],
  ["masque", "Masque cheveux", 13, "🧴", ["Beauté", "Bien-être", "Pour elle"]],
  ["palette", "Palette maquillage", 24, "🎨", ["Beauté", "Pour elle"]],
  ["vernis", "Vernis à ongles", 7, "💅", ["Beauté", "Pour elle"]],
  ["the", "Coffret thé", 14, "🍵", ["Bien-être", "Couple"]],
  ["bain", "Bain moussant", 10, "🛁", ["Bien-être", "Pour elle"]],
  ["colliers", "Colliers duo", 22, "💞", ["Couple", "Bijoux"]],
  ["bougies-love", "Bougies duo Love", 19, "❤️", ["Couple", "Décoration"]],
  ["parfum-h", "Eau de parfum homme", 38, "🧔", ["Parfums", "Pour lui"]],
  ["portecles", "Porte-clés cuir", 8, "🔑", ["Pour lui", "Couple"]],
  ["puzzle", "Puzzle enfants", 12, "🧩", ["Enfants"]],
  ["histoires", "Livre d'histoires", 11, "📚", ["Enfants"]],
  ["doudou", "Doudou lapin", 17, "🐰", ["Enfants"]],
  ["boucles", "Boucles d'oreilles", 15, "✨", ["Bijoux", "Pour elle"]],
];

export const PRODUCTS: Product[] = RAW.map(([id, name, price, emoji, categories]) => ({
  id, name, price, emoji,
  categories: price <= 12 ? [...categories, "Petit prix"] : categories,
}));

export const CATEGORIES = ["Tous", "Beauté", "Couple", "Enfants", "Bien-être", "Bijoux", "Parfums", "Décoration", "Pour elle", "Pour lui", "Petit prix"];

export type FontKey = "chic" | "sans" | "script";
export const FONT_OPTIONS: { key: FontKey; label: string; file: string; size: number }[] = [
  { key: "chic", label: "Calligraphie chic", file: "/fonts/great-vibes.woff", size: 0.46 },
  { key: "sans", label: "Moderne sans-serif", file: "/fonts/dm-sans.woff", size: 0.3 },
  { key: "script", label: "Élégante script", file: "/fonts/dancing-script.woff", size: 0.38 },
];
export const TEXT_COLORS = [
  { name: "Bordeaux", hex: "#7a1f43" },
  { name: "Doré", hex: "#c9a24d" },
  { name: "Noir", hex: "#111111" },
];
export const BOX_COLORS = [
  { name: "Rose poudré", hex: "#f2a7bb" },
  { name: "Blanc soie", hex: "#fbf7f4" },
  { name: "Noir", hex: "#1c1c1c" },
  { name: "Beige nude", hex: "#dcc3ab" },
];
