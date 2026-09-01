import assert from "node:assert/strict";
import { calculatePricing, lineTotal } from "../src/utils/pricing.ts";

const items = [
  { id: "1", item: "Design", description: "", quantity: 2, unit: "day", price: 100, discount: 10 },
  { id: "2", item: "Build", description: "", quantity: 1, unit: "project", price: 300, discount: 0 },
];

assert.equal(lineTotal(items[0]), 190);
assert.deepEqual(calculatePricing(items, 10, 25), {
  subtotal: 500,
  discountTotal: 10,
  taxableAmount: 490,
  taxTotal: 49,
  additionalCost: 25,
  grandTotal: 564,
});

console.log("pricing ok");
