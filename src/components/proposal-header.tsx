import { Download, Eye, FilePlus2, Save } from "lucide-react";
import { Button } from "./ui";

type Props = {
  lastSaved: string;
  onNew: () => void;
  onSave: () => void;
  onPreview: () => void;
  onExport: () => void;
};

export function ProposalHeader({ lastSaved, onNew, onSave, onPreview, onExport }: Props) {
  return <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3"><div><p className="text-lg font-black text-slate-950">ProposalFlow</p><p className="text-xs text-slate-500">{lastSaved || "Draft belum disimpan"}</p></div><div className="flex flex-wrap gap-2"><Button variant="secondary" onClick={onNew}><FilePlus2 size={16} /> New Proposal</Button><Button variant="secondary" onClick={onSave}><Save size={16} /> Save</Button><Button variant="secondary" onClick={onPreview}><Eye size={16} /> Preview</Button><Button onClick={onExport}><Download size={16} /> Export PDF</Button></div></div></header>;
}
