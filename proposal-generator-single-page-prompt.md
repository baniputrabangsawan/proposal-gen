# Prompt AI — Proposal Generator Single Page

Buat sebuah website **Proposal Generator satu halaman (single-page application)** menggunakan **React + TypeScript + Vite**, **TanStack Query**, **TanStack Form**, **Tailwind CSS**, **shadcn/ui**, **Lucide Icons**, dan **Framer Motion**. Gunakan desain modern, minimalis, profesional, dan responsif seperti SaaS modern.

Seluruh proses pembuatan proposal harus dilakukan dalam **satu halaman tanpa dashboard dan tanpa perpindahan halaman**.

## 1. Header

Tambahkan:
- Logo / nama aplikasi
- Tombol New Proposal
- Tombol Save
- Tombol Preview
- Tombol Export PDF

## 2. Informasi Proposal

Field:
- Nomor proposal otomatis
- Tanggal proposal
- Masa berlaku proposal
- Judul proposal

## 3. Informasi Perusahaan

Field:
- Nama perusahaan
- Logo
- Alamat
- Email
- Nomor telepon
- Website

## 4. Informasi Klien

Field:
- Nama perusahaan klien
- Nama PIC
- Email
- Telepon
- Alamat

## 5. Project Overview

Field:
- Nama proyek
- Deskripsi proyek
- Tujuan proyek

## 6. Scope of Work

Pengguna dapat:
- Menambah pekerjaan
- Menghapus pekerjaan
- Mengurutkan pekerjaan

Contoh:
- UI/UX Design
- Website Development
- Admin Dashboard
- SEO Setup
- Deployment
- Maintenance

## 7. Deliverables

Pengguna dapat menambahkan daftar hasil pekerjaan yang akan diberikan kepada klien.

## 8. Timeline

Buat timeline proyek sederhana dengan:
- Tahap pekerjaan
- Tanggal mulai
- Tanggal selesai
- Durasi
- Keterangan

## 9. Pricing / Penawaran Harga

Gunakan tabel dinamis dengan kolom:
- Item
- Description
- Quantity
- Unit
- Price
- Discount
- Total
- Delete

Pengguna dapat menambah item tanpa batas.

Hitung otomatis:
- Subtotal
- Discount
- Tax
- Additional Cost
- Grand Total

Default currency **IDR**, tetapi sediakan pilihan:
- IDR
- USD
- SGD
- AUD
- EUR

Gunakan currency formatter yang benar.

## 10. Payment Terms

Field:
- Down Payment
- Termin pembayaran
- Jatuh tempo
- Metode pembayaran
- Informasi rekening

## 11. Terms & Conditions

Sediakan text editor untuk memasukkan ketentuan proyek.

## 12. Notes

Tambahkan area catatan tambahan untuk klien.

## 13. Signature

Buat dua bagian.

### Prepared By
- Nama
- Jabatan
- Perusahaan
- Tanda tangan

### Client Approval
- Nama
- Jabatan
- Perusahaan
- Tanda tangan

## 14. AI Proposal Assistant

Tambahkan panel AI kecil di halaman yang dapat menerima catatan kasar pengguna.

Contoh input:

> Buat website company profile untuk perusahaan konstruksi, 10 halaman, admin CMS, SEO, pengerjaan 30 hari, harga Rp15 juta.

AI harus dapat menghasilkan:
- Project Overview
- Objectives
- Scope of Work
- Deliverables
- Timeline
- Deskripsi pricing
- Terms & Conditions

AI tidak boleh menentukan harga sendiri jika pengguna belum memberikan harga.

Tambahkan action:
- Generate Proposal
- Improve Writing
- Make Professional
- Shorten
- Expand
- Fix Grammar

Buat arsitektur AI provider-agnostic agar nantinya dapat menggunakan OpenAI, Anthropic, Gemini, atau provider lain melalui API.

## 15. Live Preview

Gunakan layout desktop dua kolom:

```text
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│     Proposal Editor      │      Live Preview        │
│                          │                          │
│                          │                          │
└──────────────────────────┴──────────────────────────┘
```

Bagian kiri digunakan untuk mengedit proposal.

Bagian kanan menampilkan proposal profesional secara realtime seperti dokumen A4.

Setiap perubahan pada editor harus langsung terlihat pada preview.

Pada mobile gunakan tab:

```text
Editor | Preview
```

## 16. PDF Export

Tambahkan tombol:

**Export PDF**

PDF harus mengikuti tampilan Live Preview dan memiliki format dokumen profesional ukuran A4.

Gunakan:
- `@react-pdf/renderer`, atau
- `jsPDF`

Pastikan:
- Layout tidak terpotong
- Page break benar
- Typography konsisten
- Logo tampil dengan benar
- Pricing table tetap rapi
- Signature tampil dengan benar

## 17. Autosave

Simpan draft otomatis menggunakan:
- LocalStorage, atau
- IndexedDB

Data tidak boleh hilang ketika browser direfresh.

Tambahkan:
- Autosave debounce
- Last saved indicator
- Reset proposal
- Confirmation sebelum menghapus seluruh draft

## 18. Template

Sediakan pilihan tampilan:
- Modern
- Minimal
- Corporate

Pergantian template hanya mengubah desain preview, bukan data proposal.

Template harus menggunakan struktur data proposal yang sama.

## 19. Design System

Gunakan gaya visual:
- Background abu-abu sangat muda
- Card putih
- Border tipis
- Shadow sangat halus
- Rounded 8–12px
- Typography Inter
- Spacing luas
- Primary color biru atau indigo
- Hierarki typography jelas
- Form bersih dan ringkas
- Sticky header bila diperlukan
- Hindari gradient berlebihan
- Hindari UI yang terlalu ramai

Gunakan:
- Skeleton loading
- Empty state
- Error state
- Toast notification
- Confirmation dialog
- Tooltip bila diperlukan

## 20. Technical Architecture

Gunakan:

- React
- TypeScript
- Vite
- TanStack Query
- TanStack Form
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion
- Zod
- Zustand jika diperlukan
- date-fns
- @react-pdf/renderer atau jsPDF

Semua aplikasi tetap berada pada satu route:

```text
/
```

Jangan membuat:
- Dashboard
- Login
- Register
- Client management page
- Settings page
- Analytics page
- Routing kompleks

Fokus hanya pada fungsi utama:

```text
Pengguna membuka website
↓
Mengisi proposal
↓
Melihat preview realtime
↓
Menyimpan draft
↓
Export PDF
```

## 21. Struktur Project

Gunakan struktur modular:

```text
src/
├── components/
│   ├── proposal-header.tsx
│   ├── company-form.tsx
│   ├── client-form.tsx
│   ├── project-form.tsx
│   ├── scope-builder.tsx
│   ├── deliverables-builder.tsx
│   ├── timeline-builder.tsx
│   ├── pricing-builder.tsx
│   ├── payment-terms.tsx
│   ├── terms-editor.tsx
│   ├── notes-editor.tsx
│   ├── signature-form.tsx
│   ├── ai-assistant.tsx
│   └── proposal-preview.tsx
│
├── hooks/
├── stores/
├── schemas/
├── types/
├── utils/
├── lib/
└── App.tsx
```

Jangan membuat satu file `App.tsx` yang berisi seluruh aplikasi.

Pisahkan:
- UI
- Business logic
- State
- Validation
- Pricing calculation
- PDF generation
- AI service
- Storage logic

## 22. Data Model

Buat TypeScript types yang jelas untuk:

```ts
Proposal
Company
Client
Project
ScopeItem
Deliverable
TimelineItem
PricingItem
PaymentTerms
Signature
ProposalTemplate
```

Gunakan Zod schema untuk validasi data proposal.

## 23. Pricing Engine

Pisahkan logic kalkulasi harga dari UI.

Formula utama:

```text
lineTotal = quantity × unitPrice
subtotal = total seluruh lineTotal
discountTotal = discount
taxTotal = taxableAmount × taxRate
grandTotal = subtotal - discountTotal + taxTotal + additionalCost
```

Pastikan kalkulasi tidak bergantung pada formatted currency string.

Gunakan angka mentah untuk perhitungan dan formatter hanya saat rendering.

## 24. State Management

Gunakan TanStack Form untuk state form utama.

Gunakan Zustand hanya untuk global UI state jika benar-benar diperlukan, seperti:
- Active template
- Preview mode
- Mobile editor/preview tab
- AI panel state

Hindari duplicated state.

## 25. Performance

Implementasikan:
- Component memoization bila diperlukan
- Debounced autosave
- Minimal unnecessary re-render
- Dynamic import untuk library PDF jika berat
- Efficient form subscription
- Image compression untuk logo
- Lazy load komponen yang tidak dibutuhkan pada initial render

## 26. UX Proposal Builder

Utamakan kecepatan penggunaan.

Pengguna harus dapat membuat proposal tanpa memahami sistem terlebih dahulu.

Gunakan:
- Input label jelas
- Placeholder relevan
- Add item button yang mudah ditemukan
- Delete action yang tidak mengganggu
- Drag-and-drop hanya jika benar-benar meningkatkan UX
- Real-time calculation
- Real-time preview
- Sticky pricing summary jika cocok
- Keyboard-friendly form

## 27. Responsive

### Desktop

Gunakan editor dan preview berdampingan.

### Tablet

Gunakan proporsi fleksibel atau collapsible preview.

### Mobile

Gunakan tab:

```text
Editor | Preview
```

Form harus tetap nyaman digunakan pada viewport kecil.

Pricing table pada mobile dapat berubah menjadi card layout jika tabel terlalu sempit.

## 28. Error Handling

Tangani:
- Data LocalStorage rusak
- PDF generation gagal
- Logo gagal dibaca
- AI API gagal
- Invalid numeric input
- Empty proposal
- Unsupported image format

Jangan membuat aplikasi crash karena data tidak valid.

## 29. Security

Walaupun aplikasi utama berjalan client-side:
- Jangan hardcode API key
- Gunakan environment variable
- Jangan expose secret AI provider key langsung ke browser production
- Buat abstraction API untuk integrasi AI
- Validasi semua AI response
- Sanitasi text input jika dirender menjadi HTML
- Validasi upload logo
- Batasi ukuran file

## 30. Prioritas Implementasi

Kerjakan dengan urutan:

```text
1. Setup React + TypeScript + Vite
2. Tailwind + shadcn/ui
3. Data model + Zod schema
4. Main single-page layout
5. Proposal form sections
6. Pricing engine
7. Live preview
8. Autosave
9. Proposal templates
10. PDF export
11. AI assistant
12. Responsive optimization
13. Error handling
14. Performance optimization
15. Final UI polish
```

## Requirement Akhir

Hasil akhir harus berupa **Proposal Generator yang benar-benar dapat digunakan**, bukan sekadar mockup.

Prioritaskan:
- Kecepatan membuat proposal
- Live preview
- Perhitungan harga otomatis
- Autosave
- PDF export
- AI generation
- Responsive design
- Clean architecture
- Type safety
- Maintainable code

Jangan menambahkan dashboard, authentication, backend kompleks, analytics, atau halaman tambahan kecuali benar-benar dibutuhkan untuk menjalankan fitur Proposal Generator.

Aplikasi hanya memiliki **satu halaman utama** dan seluruh workflow proposal dilakukan di halaman tersebut.
