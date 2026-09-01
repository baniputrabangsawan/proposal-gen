import { z } from "zod";

const text = z.string().catch("");
const number = z.coerce.number().finite().min(0).catch(0);

const signatureSchema = z.object({
  name: text,
  title: text,
  company: text,
  signature: text,
});

export const proposalSchema = z.object({
  proposalNumber: text,
  proposalDate: text,
  validUntil: text,
  title: text,
  currency: z.enum(["IDR", "USD", "SGD", "AUD", "EUR"]).catch("IDR"),
  taxRate: number,
  additionalCost: number,
  template: z.enum(["modern", "minimal", "corporate"]).catch("modern"),
  company: z.object({
    name: text,
    logo: text,
    address: text,
    email: text,
    phone: text,
    website: text,
  }),
  client: z.object({
    companyName: text,
    picName: text,
    email: text,
    phone: text,
    address: text,
  }),
  project: z.object({
    name: text,
    description: text,
    objectives: text,
  }),
  scope: z.array(z.object({ id: text, title: text })).catch([]),
  deliverables: z.array(z.object({ id: text, title: text })).catch([]),
  timeline: z.array(z.object({
    id: text,
    phase: text,
    startDate: text,
    endDate: text,
    duration: text,
    notes: text,
  })).catch([]),
  pricing: z.array(z.object({
    id: text,
    item: text,
    description: text,
    quantity: number,
    unit: text,
    price: number,
    discount: number,
  })).catch([]),
  paymentTerms: z.object({
    downPayment: text,
    schedule: text,
    dueDate: text,
    method: text,
    bankInfo: text,
  }),
  terms: text,
  notes: text,
  preparedBy: signatureSchema,
  clientApproval: signatureSchema,
});
