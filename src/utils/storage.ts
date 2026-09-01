import { proposalSchema } from "../schemas/proposal-schema";
import type { Proposal } from "../types/proposal";

const key = "proposal-generator:draft";

export const loadDraft = (fallback: Proposal) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? proposalSchema.parse(JSON.parse(raw)) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const saveDraft = (proposal: Proposal) => localStorage.setItem(key, JSON.stringify(proposal));
export const clearDraft = () => localStorage.removeItem(key);
