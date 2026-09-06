import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return <button type={type} className={cn("inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50", variant === "primary" && "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200", variant === "secondary" && "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900", variant === "ghost" && "text-slate-600 hover:bg-slate-100 dark:text-neutral-300 dark:hover:bg-neutral-900", className)} {...props} />;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"><h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-neutral-400">{title}</h2>{children}</section>;
}

export function Field({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className={cn("grid gap-1 text-sm text-slate-600 dark:text-neutral-300", className)}><span>{label}</span><input className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-800" {...props} /></label>;
}

export function TextArea({ label, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return <label className={cn("grid gap-1 text-sm text-slate-600 dark:text-neutral-300", className)}><span>{label}</span><textarea className="min-h-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-800" {...props} /></label>;
}

export function Select({ label, children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  return <label className={cn("grid gap-1 text-sm text-slate-600 dark:text-neutral-300", className)}><span>{label}</span><select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:ring-neutral-800" {...props}>{children}</select></label>;
}
