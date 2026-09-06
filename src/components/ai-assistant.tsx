import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { Proposal } from "../types/proposal";
import { generateProposalFromNotes, transformWriting } from "../lib/ai-service";
import { Button, Card, TextArea } from "./ui";

export function AiAssistant({ proposal, onChange }: { proposal: Proposal; onChange: (proposal: Proposal) => void }) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const actions = ["Generate Proposal", "Improve Writing", "Make Professional", "Shorten", "Expand", "Fix Grammar"];

  const run = (action: string) => {
    const fallbackNotes = "Buat website company profile 10 halaman, admin CMS, SEO basic, pengerjaan 30 hari, harga Rp15 juta.";
    if (action === "Generate Proposal") {
      onChange(generateProposalFromNotes(proposal, notes.trim() || fallbackNotes));
      setStatus(notes.trim() ? "Proposal dibuat dari catatan kasar." : "Proposal contoh dibuat. Isi catatan kasar untuk hasil yang lebih sesuai.");
      return;
    }

    const source = proposal.project.description || notes;
    if (!source.trim()) {
      setStatus("Isi Project Description atau catatan kasar dulu.");
      return;
    }
    onChange({ ...proposal, project: { ...proposal.project, description: transformWriting(source, action) } });
    setStatus(`${action} diterapkan ke Project Description.`);
  };

  return <Card title="AI Proposal Assistant"><div className="grid gap-3"><TextArea label="Catatan kasar" placeholder="Buat website company profile... harga Rp15 juta" value={notes} onChange={(event) => setNotes(event.target.value)} /><div className="flex flex-wrap gap-2">{actions.map((action) => <Button key={action} variant={action === "Generate Proposal" ? "primary" : "secondary"} onClick={() => run(action)}><Sparkles size={14} />{action}</Button>)}</div>{status && <p className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-900">{status}</p>}<p className="text-xs text-slate-500">Provider-agnostic stub: siap diganti API OpenAI, Anthropic, Gemini, atau provider lain via backend/proxy aman.</p></div></Card>;
}
