import type { Proposal } from "../types/proposal";
import { uid } from "../utils/proposal";

const hasPrice = (text: string) => /(?:rp|idr|usd|sgd|aud|eur|\$)\s?\d|\d+\s?(?:juta|million|k)/i.test(text);

export const generateProposalFromNotes = (proposal: Proposal, notes: string): Proposal => {
  const duration = notes.match(/(\d+)\s?(hari|days|minggu|weeks|bulan|months)/i)?.[0] ?? "30 days";
  const price = notes.match(/(?:rp|idr)\s?([\d.,]+)\s?(juta)?/i);
  const amount = price ? Number(price[1].replace(/\D/g, "")) * (price[2] ? 1_000_000 : 1) : 0;

  return {
    ...proposal,
    project: {
      name: proposal.project.name || "Website Development Project",
      description: `Project berdasarkan catatan: ${notes}`,
      objectives: "Membangun solusi digital yang profesional, mudah dikelola, responsif, dan siap digunakan oleh tim klien.",
    },
    scope: ["Discovery & requirement mapping", "UI/UX design", "Frontend development", "CMS/admin setup", "SEO basic setup", "Deployment"].map((title) => ({ id: uid(), title })),
    deliverables: ["Website responsive", "Admin/CMS access", "SEO-ready pages", "Deployment handover", "Basic usage documentation"].map((title) => ({ id: uid(), title })),
    timeline: [
      { id: uid(), phase: "Planning", startDate: "", endDate: "", duration: "3 days", notes: "Scope confirmation and content checklist." },
      { id: uid(), phase: "Design & Development", startDate: "", endDate: "", duration, notes: "Interface design, implementation, and internal testing." },
      { id: uid(), phase: "Handover", startDate: "", endDate: "", duration: "2 days", notes: "Deployment, review, and documentation." },
    ],
    pricing: hasPrice(notes) ? [{ id: uid(), item: "Project package", description: "Package generated from user notes", quantity: 1, unit: "project", price: amount, discount: 0 }] : proposal.pricing,
    terms: "Timeline starts after down payment, required materials, and written approval are received. Additional scope changes will be estimated separately.",
  };
};

export const transformWriting = (value: string, action: string) => {
  if (!value.trim()) return value;
  if (action === "Shorten") return value.split(".").slice(0, 2).join(".").trim();
  if (action === "Expand") return `${value}\n\nThis section can be refined further with measurable milestones, acceptance criteria, and clear ownership between both parties.`;
  return value.replace(/\s+/g, " ").trim();
};
