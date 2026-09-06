import { Download, Eye, FilePlus2, Moon, Save, Sun } from "lucide-react";
import { Button } from "./ui";

type Props = {
  lastSaved: string;
  onNew: () => void;
  onSave: () => void;
  onPreview: () => void;
  onExport: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export function ProposalHeader({ lastSaved, onNew, onSave, onPreview, onExport, theme, onToggleTheme }: Props) {
  return <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-black/90"><div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3"><div><p className="text-lg font-black text-slate-950 dark:text-white">ProposalFlow</p><p className="text-xs text-slate-500 dark:text-neutral-400">{lastSaved || "Draft belum disimpan"}</p></div><div className="flex flex-wrap gap-2"><button type="button" aria-label="Toggle dark mode" onClick={onToggleTheme} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900">{theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}</button><Button variant="secondary" onClick={onNew}><FilePlus2 size={16} /> New Proposal</Button><Button variant="secondary" onClick={onSave}><Save size={16} /> Save</Button><Button variant="secondary" onClick={onPreview}><Eye size={16} /> Preview</Button><Button onClick={onExport}><Download size={16} /> Export PDF</Button></div></div></header>;
}
