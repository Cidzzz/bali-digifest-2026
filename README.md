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
- **AI Engine**: Google Gemini Flash Vision API
- **Deployment**: Vercel

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
