import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { Proposal } from "../types/proposal";
import { generateProposalFromNotes, transformWriting } from "../lib/ai-service";
import { Button, Card, TextArea } from "./ui";

export function AiAssistant({ proposal, onChange }: { proposal: Proposal; onChange: (proposal: Proposal) => void }) {
  const [notes, setNotes] = useState("");
  const actions = ["Generate Proposal", "Improve Writing", "Make Professional", "Shorten", "Expand", "Fix Grammar"];

  const run = (action: string) => {
    if (action === "Generate Proposal") onChange(generateProposalFromNotes(proposal, notes));
    else onChange({ ...proposal, project: { ...proposal.project, description: transformWriting(proposal.project.description, action) } });
  };

  return <Card title="AI Proposal Assistant"><div className="grid gap-3"><TextArea label="Catatan kasar" placeholder="Buat website company profile... harga Rp15 juta" value={notes} onChange={(event) => setNotes(event.target.value)} /><div className="flex flex-wrap gap-2">{actions.map((action) => <Button key={action} variant={action === "Generate Proposal" ? "primary" : "secondary"} onClick={() => run(action)}><Sparkles size={14} />{action}</Button>)}</div><p className="text-xs text-slate-500">Provider-agnostic stub: siap diganti API OpenAI, Anthropic, Gemini, atau provider lain via backend/proxy aman.</p></div></Card>;
}
