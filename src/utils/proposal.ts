import { addDays, format } from "date-fns";
import type { Proposal } from "../types/proposal";

export const uid = () => crypto.randomUUID();

export const emptyProposal = (): Proposal => ({
  proposalNumber: `PROP-${format(new Date(), "yyyyMMdd")}-${Math.floor(Math.random() * 900 + 100)}`,
  proposalDate: format(new Date(), "yyyy-MM-dd"),
  validUntil: format(addDays(new Date(), 14), "yyyy-MM-dd"),
  title: "Website Development Proposal",
  currency: "IDR",
  taxRate: 0,
  additionalCost: 0,
  template: "modern",
  company: { name: "", logo: "", address: "", email: "", phone: "", website: "" },
  client: { companyName: "", picName: "", email: "", phone: "", address: "" },
  project: { name: "", description: "", objectives: "" },
  scope: ["UI/UX Design", "Website Development", "Deployment"].map((title) => ({ id: uid(), title })),
  deliverables: ["Source code", "Responsive website", "Deployment documentation"].map((title) => ({ id: uid(), title })),
  timeline: [{ id: uid(), phase: "Discovery & Design", startDate: "", endDate: "", duration: "7 days", notes: "Requirement alignment and interface design." }],
  pricing: [{ id: uid(), item: "Website Development", description: "Design and build responsive company profile website", quantity: 1, unit: "project", price: 15000000, discount: 0 }],
  paymentTerms: { downPayment: "50%", schedule: "50% before project start, 50% before handover", dueDate: "7 days after invoice", method: "Bank transfer", bankInfo: "" },
  terms: "Revisions are included up to two rounds per milestone. Additional requests outside the agreed scope will be quoted separately.",
  notes: "Thank you for the opportunity. We are ready to discuss and refine this proposal.",
  preparedBy: { name: "", title: "", company: "", signature: "" },
  clientApproval: { name: "", title: "", company: "", signature: "" },
});

export const blankPricingItem = () => ({ id: uid(), item: "", description: "", quantity: 1, unit: "item", price: 0, discount: 0 });
export const blankTimelineItem = () => ({ id: uid(), phase: "", startDate: "", endDate: "", duration: "", notes: "" });
