export type Currency = "EUR" | "XOF";

export const FCFA_PER_EUR = 655.957; // parité fixe
export const BOX_BASE_PRICE = 8;
export const PERSONALIZATION_PRICE = 4;

export function formatPrice(eur: number, currency: Currency): string {
  if (currency === "EUR") {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(eur);
  }
  const fcfa = Math.round((eur * FCFA_PER_EUR) / 5) * 5;
  return `${fcfa.toLocaleString("fr-FR")} FCFA`;
}

export function boxTotal(productPrices: number[], hasName: boolean): number {
  return BOX_BASE_PRICE + productPrices.reduce((a, b) => a + b, 0) + (hasName ? PERSONALIZATION_PRICE : 0);
}
