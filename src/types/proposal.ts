export type Currency = "IDR" | "USD" | "SGD" | "AUD" | "EUR";
export type ProposalTemplate = "modern" | "minimal" | "corporate";

export type Company = {
  name: string;
  logo: string;
  address: string;
  email: string;
  phone: string;
  website: string;
};

export type Client = {
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  address: string;
};

export type Project = {
  name: string;
  description: string;
  objectives: string;
};

export type ScopeItem = { id: string; title: string };
export type Deliverable = { id: string; title: string };

export type TimelineItem = {
  id: string;
  phase: string;
  startDate: string;
  endDate: string;
  duration: string;
  notes: string;
};

export type PricingItem = {
  id: string;
  item: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
};

export type PaymentTerms = {
  downPayment: string;
  schedule: string;
  dueDate: string;
  method: string;
  bankInfo: string;
};

export type Signature = {
  name: string;
  title: string;
  company: string;
  signature: string;
};

export type Proposal = {
  proposalNumber: string;
  proposalDate: string;
  validUntil: string;
  title: string;
  currency: Currency;
  taxRate: number;
  additionalCost: number;
  template: ProposalTemplate;
  company: Company;
  client: Client;
  project: Project;
  scope: ScopeItem[];
  deliverables: Deliverable[];
  timeline: TimelineItem[];
  pricing: PricingItem[];
  paymentTerms: PaymentTerms;
  terms: string;
  notes: string;
  preparedBy: Signature;
  clientApproval: Signature;
};

export type PricingSummary = {
  subtotal: number;
  discountTotal: number;
  taxableAmount: number;
  taxTotal: number;
  additionalCost: number;
  grandTotal: number;
};
