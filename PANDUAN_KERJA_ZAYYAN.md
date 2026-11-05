# PANDUAN KERJA ZAYYAN (UI/UX DESIGNER & PROPOSAL LEAD)
**Proyek:** KriyaLoka AI (Bali DigiFest 2026)  
**Tujuan:** Mendesain UI/UX KriyaLoka di Figma agar berkarakter autentik Bali modern (Anti-AI Slop), menyusun Proposal Resmi PDF A4 (PAS 5 HALAMAN ISI), serta menyiapkan foto sampel & AI Disclosure.

---

## 🎯 1. PERAN & TANGGUNG JAWAB ZAYYAN
Zayyan memegang 2 pilar penting: **Kualitas Visual Produk (UI/UX di Figma)** dan **Dokumen Penjurian (Proposal 5 Halaman Pas)**.
1. **Desain Figma (UI/UX):** Merancang antarmuka web modern khas Bali di Figma agar Xavier punya acuan visual yang matang, bukan sekadar tampilan AI template/slop.
2. **Proposal PDF A4 (Max 5 Hal Isi):** Menulis dan menata layout naskah proposal resmi di Google Docs / Canva.
3. **Aset Foto Sampel:** Menyiapkan 3 foto sampel kerajinan asli Bali (kayu, kain endek, perak).
4. **Dokumen AI Disclosure:** Mengisi draf kepatuhan transparansi model AI (Lampiran C Guidebook).

---

## 🎨 2. PANDUAN DESAIN FIGMA (ANTI-AI SLOP)
*Strategi Tim: Xavier & Agung akan membangun fungsionalitas web terlebih dahulu dengan struktur dasar. Zayyan mendesain di Figma, lalu Xavier tinggal menyelaraskan styling & token warna sesuai desain Figma Zayyan.*

### A. Konsep Visual: *Modern Balinese Heritage*
- **Nuansa:** Elegan, bersih, hangat, mencerminkan kerajinan tangan kelas dunia, bukan web korporat kaku.
- **Palet Warna:**
  - *Primary (Dominan):* Terracotta / Merah Bata Candi Majapahit (`#C85A32` / `#B45309`)
  - *Accent (Aksen Mewah):* Emas Prada Bali (`#D97706` / `#F59E0B`)
  - *Background:* Kertas Lontar Hangat / Warm Cream (`#FAF8F5`) — hindari putih polos yang menyilaukan.
  - *Surface/Card:* Putih gading bersih dengan bayangan lembut (*soft subtle shadow*).

### B. Layar / Frame yang Perlu Dibuat di Figma (Single Page Flow):
1. **Hero Header:** Logo KriyaLoka + tagline puitis tentang mengangkat karya pengrajin Bali ke pasar dunia.
2. **Input Card (Area Pengrajin/Juri):**
   - Box upload foto (drag & drop / kamera).
   - Textbox catatan singkat + tombol mikrofon.
   - **3 Tombol Quick Preset Juri:** Desain tombol cepat (Patung Garuda Mas, Tenun Endek Sidemen, Perak Celuk).
   - Tombol utama CTA: *"Analisis & Buat Paket Ekspor (AI)"*.
3. **Dashboard Hasil Analisis (4 Modul Rapi):**
   - *Modul 1: Identitas Budaya* (Badge desa asal, material, filosofi motif Bali).
   - *Modul 2: Storytelling Tab 4 Bahasa* (Tab pemilih bendera/bahasa: EN, JP, CN, ID + tombol copy).
   - *Modul 3: Kartu Kepatuhan Ekspor* (Tampilan kode HS 8-digit BTKI, status sertifikat SVLK/fumigasi, rentang harga USD).
   - *Modul 4: Digital Authenticity Certificate* (Desain sertifikat berbingkai motif Bali tipis + QR Code, tombol download/print).

---

## 📸 3. SIAPKAN 3 FOTO SAMPEL RESMI BALI
Cari gambar jernih & autentik:
1. **Sampel 1 (Kayu):** Patung ukir kayu Garuda Wisnu Kencana / Barong (Desa Mas/Kemenuh, Gianyar).
2. **Sampel 2 (Tekstil):** Kain Tenun Endek / motif Gringsing (Sidemen, Karangasem).
3. **Sampel 3 (Perak):** Perhiasan/bros perak filigree motif kamboja (Desa Celuk, Sukawati).
*Kirim foto ini ke grup tim agar Xavier bisa langsung pasang di kode web.*

---

## 📄 4. STRUKTUR PROPOSAL RESMI (PAS 5 HALAMAN ISI)
*Aturan ketat panitia: Halaman isi tidak boleh melebihi 5 halaman.*

- **Halaman 1:**
  - Bab 1: Masalah & Urgensi di Bali (Krisis ekspor pengrajin, kendala bahasa asing, kebingungan HS Code, data ekspor BPS Bali).
  - Bab 2: Target Pengguna (Pengrajin desa, koperasi kriya, buyer internasional).
- **Halaman 2:**
  - Bab 3: Solusi KriyaLoka (Zero-prompt multimodal copilot).
  - Bab 4: Implementasi AI (Gemini Flash Vision + Structured JSON + integrasi dataset regulasi BTKI/SVLK).
- **Halaman 3:**
  - Bab 5: Fitur Utama MVP & 3 Preset Juri.
  - Bab 6: Arsitektur Sistem (Diagram alur: User -> Next.js -> Gemini Vision -> Output Dashboard).
- **Halaman 4:**
  - Bab 7: Diferensiasi Produk (*Mengapa Google Lens & ChatGPT Biasa Kalah Telak*).
  - Bab 8: Dampak Ekonomi & Sosial (Mendukung misi Bank Indonesia & BPD Bali untuk UMKM Go-Export).
- **Halaman 5:**
  - Bab 9: Roadmap Pasca-Lomba.
  - Bab 10: Profil Tim (Agung, Xavier, Zayyan) + Tautan Live Web Vercel & Repo GitHub + Commit Hash.

---

## 📋 5. DRAFT DOKUMEN AI DISCLOSURE (LAMPIRAN C)
- Model AI: Google Gemini 1.5 Flash API (Multimodal Vision & JSON Schema).
- Bagian buatan AI: Analisis visual material, terjemahan narasi 4 bahasa, ekstraksi kode HS & rentang harga.
- Bagian buatan manusia: Desain UI/UX Figma (Zayyan), Frontend Next.js (Xavier), Backend API & Arsitektur (Agung).

---

## ⏰ TIMELINE ZAYYAN
- **Rabu Malam (Hari ini):**
  - Desain wireframe/komponen utama di Figma.
  - Tulis draf Bab 1–4 di Google Docs.
- **Kamis Siang (Besok):**
  - Tuntaskan desain Figma agar Xavier bisa poles CSS-nya.
  - Selesaikan Bab 5–10 Proposal & masukkan screenshot web asli.
- **Kamis Sore (Besok 17:00 WITA):**
  - Finalisasi PDF (A4, pas 5 halaman isi), export dengan nama `AIWIC2026_NamaTim_KriyaLoka.pdf`. Siap submit!
