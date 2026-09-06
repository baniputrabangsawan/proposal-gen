import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import type { Proposal } from "./types/proposal";
import { emptyProposal } from "./utils/proposal";
import { clearDraft, loadDraft, saveDraft } from "./utils/storage";
import { ProposalHeader } from "./components/proposal-header";
import { ProposalEditor } from "./components/proposal-editor";
import { ProposalPreview } from "./components/proposal-preview";
import { Button } from "./components/ui";

export default function App() {
  const [proposal, setProposal] = useState<Proposal>(() => loadDraft(emptyProposal()));
  const [lastSaved, setLastSaved] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const [previewOnly, setPreviewOnly] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useForm({ defaultValues: proposal });

  useEffect(() => {
    const id = window.setTimeout(() => {
      saveDraft(proposal);
      setLastSaved(`Autosaved ${new Date().toLocaleTimeString()}`);
    }, 600);
    return () => window.clearTimeout(id);
  }, [proposal]);

  const newProposal = () => {
    if (!confirm("Hapus seluruh draft dan buat proposal baru?")) return;
    clearDraft();
    setProposal(emptyProposal());
    setLastSaved("Draft reset");
    setNotice("Proposal baru dibuat.");
  };

  const saveNow = () => {
    try {
      saveDraft(proposal);
      const time = new Date().toLocaleTimeString();
      setLastSaved(`Saved ${time}`);
      setNotice(`Draft tersimpan ${time}.`);
      alert("Draft tersimpan.");
    } catch {
      setNotice("Draft gagal disimpan. Storage browser mungkin penuh atau diblokir.");
    }
  };

  const showPreview = () => {
    setMobileTab("preview");
    setPreviewOnly(true);
    setNotice("Mode preview aktif.");
    window.setTimeout(() => document.getElementById("proposal-preview")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const exportPdf = () => {
    setMobileTab("preview");
    setPreviewOnly(true);
    setNotice("Pilih Save as PDF di print dialog.");
    window.setTimeout(() => window.print(), 100);
  };

  return <div className={theme}>
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-black dark:text-neutral-100">
    <ProposalHeader lastSaved={lastSaved} onNew={newProposal} onSave={saveNow} onPreview={showPreview} onExport={exportPdf} theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
    {notice && <div className="mx-auto mt-3 max-w-[1600px] px-4"><div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"><span>{notice}</span>{previewOnly && <button type="button" className="font-bold underline" onClick={() => setPreviewOnly(false)}>Kembali ke editor</button>}</div></div>}
    <main className={previewOnly ? "mx-auto grid max-w-[1000px] gap-4 px-4 py-4" : "mx-auto grid max-w-full gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,640px)_minmax(0,1fr)]"}>
      <div className="flex gap-2 lg:hidden"><Button variant={mobileTab === "editor" ? "primary" : "secondary"} onClick={() => { setMobileTab("editor"); setPreviewOnly(false); }}>Editor</Button><Button variant={mobileTab === "preview" ? "primary" : "secondary"} onClick={showPreview}>Preview</Button></div>
      {!previewOnly && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={mobileTab === "preview" ? "hidden min-w-0 lg:block" : "block min-w-0"}><ProposalEditor proposal={proposal} onChange={setProposal} /></motion.div>}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={mobileTab === "editor" && !previewOnly ? "hidden min-w-0 lg:block" : "block min-w-0"}><div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-950"><ProposalPreview proposal={proposal} /></div></motion.div>
    </main>
    </div>
  </div>;
}
