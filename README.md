# KriyaLoka AI (Bali DigiFest 2026)

> **From Local Hands to Global Lands: AI Export & Cultural Storytelling Copilot for Balinese Artisans**

KriyaLoka adalah aplikasi web berbasis *Zero-Prompt Multimodal AI* yang dirancang khusus untuk memfasilitasi pengrajin kriya tradisional Bali (Gianyar, Celuk, Sidemen, Kamasan) menembus pasar global dan mematuhi regulasi ekspor.

---

## 🚀 Fitur Unggulan
1. **Multimodal Visual & Cultural Recognition**: Deteksi material, asal desa kriya, dan filosofi seni Bali dari foto karya.
2. **Multilingual Storytelling**: Narasi budaya & katalog produk otomatis dalam 4 bahasa (English, Japanese, Chinese Mandarin, Bahasa Indonesia).
3. **Export Readiness & HS Code Copilot**: Rekomendasi kode HS 8-digit BTKI, verifikasi kepatuhan material (SVLK, CITES, fumigasi ISPM 15).
4. **Global Fair-Price Estimator**: Estimasi rentang harga pasar ekspor (USD & IDR).
5. **Digital Authenticity Certificate**: Sertifikat keaslian kriya ber-QR Code siap cetak/unduh.
6. **One-Click Judge Presets**: 3 tombol preset sampel (Patung Garuda Mas, Tenun Endek Sidemen, Bros Perak Celuk) untuk pengujian cepat juri.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16+ (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **AI Multimodal & Vision**: Google Gemini 2.5 Flash / Custom Multimodal Gateway (`ag/gemini-3.8-flash-low`)
- **Speech-to-Text Engine**: OpenAI-compatible Whisper / Gemini Audio Transcriptions Endpoint (`/v1/audio/transcriptions`)
- **Testing**: Bun Test Suite
- **Deployment**: Vercel

---

## 📜 AI & Technical Disclosure (Bali DigiFest 2026)

Sesuai ketentuan transparansi Guidebook AI Web Innovation Challenge Bali DigiFest 2026 (Lampiran C):

### 1. Model & Layanan AI yang Digunakan
- **Multimodal Visual & Cultural Recognition**: Google Gemini Flash API (`ag/gemini-3.8-flash-low` via AI Gateway) untuk analisis citra karya seni kriya Bali dan ekstraksi terstruktur (JSON Contract).
- **Speech Recognition / Voice-to-Text**: Endpoint transkripsi multimodal audio (`gemini/gemini-2.5-flash` via `/v1/audio/transcriptions`) dan browser native fallback (Web Speech API) untuk memproses rekaman suara pengrajin berbahasa Indonesia.
- **AI Coding Assistant**: Digunakan selama proses pengembangan (Gemini CLI / Codex) untuk scaffolding kode, penataan skema TypeScript, dan penulisan test suite regresi.

### 2. Pembagian Komponen Buatan AI vs Manusia
- **Komponen Dihasilkan AI (*AI-Generated*)**:
  - Analisis komputer vision terhadap material kriya, teknik ukir/tenun, dan sentra kerajinan Bali.
  - Narasi puitis *cultural storytelling* multibahasa (English, Japanese, Chinese Mandarin, Bahasa Indonesia).
  - Klasifikasi estimasi kode HS Bea Cukai (BTKI 2026) dan rentang valuasi ekspor global.
- **Komponen Buatan Tim Manusia (*Human-Engineered*)**:
  - Konsep orisinal solusi, alur pengguna (*Clean-Start Single Page Flow*), dan dokumen PRD.
  - Desain antarmuka *Modern Balinese Heritage* di Figma dengan token warna Terracotta (`#C85A32`), Emas Prada (`#D97706`), dan Kertas Lontar (`#FAF8F5`).
  - Arsitektur sistem full-stack Next.js 16 App Router, penanganan state audio MediaRecorder, kompresi gambar sisi klien (Canvas API), dan isolasi cetak sertifikat 1-halaman A4.
  - Basis pengetahuan kepabeanan BTKI 2026, regulasi sertifikasi SVLK/V-Legal, karantina ISPM 15, dan data sentra kriya khas kabupaten di Bali.

---

## 📦 Setup & Menjalankan Lokal

```bash
# Clone repository
git clone git@github.com:Cidzzz/bali-digifest-2026.git
cd bali-digifest-2026

# Install dependensi
bun install

# Konfigurasi environment
cp .env.example .env.local
# Masukkan GEMINI_API_KEY Anda di .env.local

# Jalankan server development
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.
