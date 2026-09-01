import type { Proposal } from "../types/proposal";
import { calculatePricing, formatCurrency, lineTotal } from "../utils/pricing";
import { cn } from "./ui";

export function ProposalPreview({ proposal }: { proposal: Proposal }) {
  const summary = calculatePricing(proposal.pricing, proposal.taxRate, proposal.additionalCost);
  const template = {
    modern: "border-indigo-100",
    minimal: "border-slate-100 shadow-none",
    corporate: "border-slate-300",
  }[proposal.template];

  return <article id="proposal-preview" className={cn("a4-preview relative z-10 mx-auto box-border max-w-full bg-white p-6 shadow-xl xl:p-10", template)}>
    <div className="flex items-start justify-between gap-6 border-b border-slate-200 pb-8">
      <div>{proposal.company.logo && <img src={proposal.company.logo} alt="Company logo" className="mb-4 h-14 max-w-40 object-contain" />}<h1 className="text-3xl font-black text-slate-950">{proposal.title || "Proposal"}</h1><p className="mt-2 text-sm text-slate-500">{proposal.proposalNumber} • {proposal.proposalDate} • Valid until {proposal.validUntil}</p></div>
      <div className="text-right text-sm text-slate-600"><p className="font-bold text-slate-900">{proposal.company.name || "Your Company"}</p><p>{proposal.company.email}</p><p>{proposal.company.phone}</p><p>{proposal.company.website}</p></div>
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-2"><Info title="Prepared for" lines={[proposal.client.companyName, proposal.client.picName, proposal.client.email, proposal.client.phone, proposal.client.address]} /><Info title="Prepared by" lines={[proposal.company.name, proposal.company.address, proposal.company.email]} /></div>
    <Section title="Project Overview"><h3 className="text-lg font-bold text-slate-950">{proposal.project.name || "Project Name"}</h3><p>{proposal.project.description || "Project description will appear here."}</p><p className="mt-3 font-semibold text-slate-800">Objectives</p><p>{proposal.project.objectives}</p></Section>
    <Section title="Scope of Work"><ul className="grid gap-2">{proposal.scope.filter((item) => item.title).map((item) => <li key={item.id} className="rounded-lg border border-slate-200 px-3 py-2">{item.title}</li>)}</ul></Section>
    <Section title="Deliverables"><ul className="grid gap-2 md:grid-cols-2">{proposal.deliverables.filter((item) => item.title).map((item) => <li key={item.id} className="rounded-lg bg-slate-50 px-3 py-2">{item.title}</li>)}</ul></Section>
    <Section title="Timeline"><div className="grid gap-3">{proposal.timeline.map((item) => <div key={item.id} className="grid gap-1 border-l-2 border-indigo-500 pl-4"><p className="font-bold text-slate-900">{item.phase || "Phase"} <span className="font-normal text-slate-500">{item.duration}</span></p><p className="text-sm text-slate-500">{item.startDate} - {item.endDate}</p><p>{item.notes}</p></div>)}</div></Section>
    <Section title="Pricing"><div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full border-collapse text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Item</th><th className="p-3">Qty</th><th className="p-3">Price</th><th className="p-3 text-right">Total</th></tr></thead><tbody>{proposal.pricing.map((item) => <tr key={item.id} className="border-t border-slate-200"><td className="p-3"><p className="font-semibold text-slate-900">{item.item || "Pricing item"}</p><p className="text-xs text-slate-500">{item.description}</p></td><td className="p-3">{item.quantity} {item.unit}</td><td className="p-3">{formatCurrency(item.price, proposal.currency)}</td><td className="p-3 text-right font-semibold">{formatCurrency(lineTotal(item), proposal.currency)}</td></tr>)}</tbody></table></div><div className="ml-auto mt-4 grid max-w-xs gap-2 text-sm"><Row label="Subtotal" value={formatCurrency(summary.subtotal, proposal.currency)} /><Row label="Discount" value={formatCurrency(summary.discountTotal, proposal.currency)} /><Row label="Tax" value={formatCurrency(summary.taxTotal, proposal.currency)} /><Row label="Additional Cost" value={formatCurrency(summary.additionalCost, proposal.currency)} /><Row label="Grand Total" value={formatCurrency(summary.grandTotal, proposal.currency)} strong /></div></Section>
    <Section title="Payment Terms"><Info title="" lines={[`Down payment: ${proposal.paymentTerms.downPayment}`, `Termin: ${proposal.paymentTerms.schedule}`, `Due: ${proposal.paymentTerms.dueDate}`, `Method: ${proposal.paymentTerms.method}`, proposal.paymentTerms.bankInfo]} /></Section>
    <Section title="Terms & Notes"><p>{proposal.terms}</p><p className="mt-3 text-slate-500">{proposal.notes}</p></Section>
    <div className="mt-12 grid gap-8 md:grid-cols-2"><Signature title="Prepared By" name={proposal.preparedBy.name} role={proposal.preparedBy.title} company={proposal.preparedBy.company || proposal.company.name} /><Signature title="Client Approval" name={proposal.clientApproval.name} role={proposal.clientApproval.title} company={proposal.clientApproval.company || proposal.client.companyName} /></div>
  </article>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-8 text-sm leading-6 text-slate-600"><h2 className="mb-3 text-base font-black uppercase tracking-wide text-slate-950">{title}</h2>{children}</section>;
}

function Info({ title, lines }: { title: string; lines: string[] }) {
  return <div className="text-sm leading-6 text-slate-600">{title && <p className="mb-1 font-bold uppercase tracking-wide text-slate-900">{title}</p>}{lines.filter(Boolean).map((line) => <p key={line}>{line}</p>)}</div>;
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={cn("flex justify-between gap-6", strong && "border-t border-slate-200 pt-2 text-lg font-black text-slate-950")}><span>{label}</span><span>{value}</span></div>;
}

function Signature({ title, name, role, company }: { title: string; name: string; role: string; company: string }) {
  return <div><p className="font-bold text-slate-950">{title}</p><div className="mt-14 border-t border-slate-300 pt-3"><p className="font-semibold text-slate-900">{name || "Name"}</p><p className="text-sm text-slate-500">{role} {company && `• ${company}`}</p></div></div>;
}
