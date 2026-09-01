import type { Currency, PricingItem, PricingSummary } from "../types/proposal";

export const lineTotal = (item: PricingItem) => Math.max(0, item.quantity * item.price - item.discount);

export const calculatePricing = (items: PricingItem[], taxRate: number, additionalCost: number): PricingSummary => {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const discountTotal = items.reduce((sum, item) => sum + item.discount, 0);
  const taxableAmount = Math.max(0, subtotal - discountTotal);
  const taxTotal = taxableAmount * (taxRate / 100);
  const grandTotal = taxableAmount + taxTotal + additionalCost;
  return { subtotal, discountTotal, taxableAmount, taxTotal, additionalCost, grandTotal };
};

export const formatCurrency = (value: number, currency: Currency) => new Intl.NumberFormat(currency === "IDR" ? "id-ID" : "en-US", {
  style: "currency",
  currency,
  maximumFractionDigits: currency === "IDR" ? 0 : 2,
}).format(value || 0);
