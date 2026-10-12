export type Product = { id: string; name: string; price: number; emoji: string; category: string };

// Prix en euros (fictifs). À remplacer par tes vrais produits.
export const PRODUCTS: Product[] = [
  { id: "bougie", name: "Bougie parfumée", price: 12, emoji: "🕯️", category: "Bien-être" },
  { id: "mug", name: "Mug personnalisé", price: 14, emoji: "☕", category: "Personnalisé" },
  { id: "bracelet", name: "Bracelet doré", price: 18, emoji: "📿", category: "Bijoux" },
  { id: "gloss", name: "Gloss et baume", price: 9, emoji: "💄", category: "Beauté" },
  { id: "pyjama", name: "Pyjama satin", price: 29, emoji: "🌙", category: "Vêtements" },
  { id: "peluche", name: "Peluche douce", price: 16, emoji: "🧸", category: "Peluches" },
  { id: "parfum", name: "Parfum", price: 35, emoji: "🌸", category: "Parfums" },
  { id: "fleurs", name: "Fleurs artificielles", price: 11, emoji: "💐", category: "Décoration" },
  { id: "livre", name: "Livre", price: 15, emoji: "📖", category: "Livres" },
  { id: "masque", name: "Masque cheveux", price: 13, emoji: "🧴", category: "Beauté" },
];

export const BOX_COLORS = [
  { name: "Prune", hex: "#882953" },
  { name: "Rose poudré", hex: "#e4a0b4" },
  { name: "Rose clair", hex: "#f0c2cb" },
  { name: "Lilas", hex: "#9b7fd6" },
  { name: "Doré", hex: "#c9a24d" },
];
