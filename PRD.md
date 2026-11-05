# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Nama Produk: **KriyaLoka**
**Tagline:** *From Local Hands to Global Lands: AI Export & Cultural Storytelling Copilot for Balinese Artisans*  
**Kompetisi:** AI Web Innovation Challenge – Bali DigiFest 2026  
**Kategori Ruang Lingkup:** Business & MSME Digitalization & Bali Smart Society  
**Target Rilis MVP (Stage 1):** 6 November 2026 (Tag: `v1.0-submission`)  
**Status Dokumen:** *Ready for Development (Single Source of Truth)*

---

## 1. Executive Summary & Latar Belakang Masalah

### 1.1 Problem Statement (Masalah Nyata di Bali)
Pulau Bali memiliki ribuan pengrajin kriya tradisional (ukiran kayu Gianyar, kerajinan perak Celuk, tenun Endek Sidemen, lukisan klasik Kamasan, hingga anyaman bambu Bangli). Meskipun produk mereka memiliki nilai seni tinggi, mayoritas pengrajin terjebak pada penjualan lokal dengan margin rendah ke tengkulak karena 3 hambatan utama menuju pasar global/ekspor:
1. **Hilangnya Nilai Filosofis Budaya (*Storytelling Gap*):** Turis mancanegara dan *buyer* global bersedia membayar harga premium karena cerita dan filosofi budaya di balik karya seni Bali. Namun, pengrajin lokal mengalami kendala bahasa dan literasi digital untuk menuliskan narasi filosofis dalam bahasa asing.
2. **Kebingungan Kepatuhan Ekspor (*Export Compliance Barrier*):** Pengrajin tidak memahami klasifikasi **HS Code (*Harmonized System*)** Bea Cukai, aturan pembatasan material internasional (misal: regulasi CITES untuk kayu/cangkang tertentu, syarat fumigasi ISPM 15), serta cara menentukan harga jual ekspor (FOB/Retail) dalam mata uang asing (USD/EUR/JPY).
3. **Hambatan Penggunaan AI Konvensional (*Prompting Barrier*):** Pengrajin desa tidak memiliki keahlian *prompt engineering* untuk menggunakan ChatGPT atau mencari ribuan baris tabel HS Code di Google secara manual.

### 1.2 Solusi yang Ditawarkan (Value Proposition)
**KriyaLoka** adalah aplikasi web berbasis *Zero-Prompt Multimodal AI* yang dirancang khusus untuk pengrajin kriya Bali. Pengrajin cukup **mengunggah 1 foto karya kriya** mereka dan **memberikan catatan singkat (teks atau rekaman suara dalam bahasa Indonesia/Bali sehari-hari)**. 

Dalam satu kali klik, AI KriyaLoka akan memproses input visual dan konteks lokal tersebut menjadi **4 Output Terstruktur**:
1. **Cultural Heritage & Visual Recognition:** Identifikasi otomatis jenis kriya, asal desa kerajinan di Bali, material, serta makna filosofis motif/ukiran.
2. **Multilingual Storytelling & Marketplace Listing:** *Copywriting* premium dalam 4 bahasa (Inggris, Jepang, Mandarin, Indonesia) lengkap dengan *SEO tags* untuk Etsy/Shopify/Instagram.
3. **Export Readiness & HS Code Copilot:** Rekomendasi kode HS 6–8 digit, cek kepatuhan material ekspor (peringatan fumigasi/CITES), dan estimasi panduan pengemasan aman.
4. **Global Fair-Price Estimator & Instant Micro-Catalog:** Estimasi rentang harga jual global (USD & IDR) berdasarkan kompleksitas pengerjaan serta pembuatan kartu sertifikat digital (*Digital Authenticity Card*) siap unduh/bagikan.

---

## 2. Target Pengguna & Persona Juri

### 2.1 Target Pengguna Utama (End-User)
* **Pengrajin Kriya & UMKM Bali:** Pengrajin kayu, perak, tekstil, keramik, dan lukisan di sentra kerajinan Bali (Gianyar, Klungkung, Bangli, Denpasar, Badung) yang ingin memasarkan produknya ke turis asing atau pasar ekspor.
* **Koperasi Desa / Bumdes / Eksportir UMKM:** Pendamping UMKM yang membutuhkan kurasi katalog cepat untuk pameran internasional.

### 2.2 Persona Penguji (Juri Bali DigiFest 2026)
* **Kebutuhan Juri:** Menguji aplikasi dalam waktu < 2 menit tanpa instalasi dan tanpa registrasi akun yang rumit.
* **Bukti yang Dicari Juri:** Membuktikan bahwa AI benar-benar memproses gambar dan input secara *real-time* (bukan *hardcoded*), memiliki relevansi kuat dengan Bali, dan menghasilkan output terstruktur yang tidak bisa ditiru oleh *chatbot* biasa.

---

## 3. Alur Pengguna Utama (*Core User Journey*)

Alur dirancang menggunakan konsep **Clean-Start Single Page Flow** agar juri dapat langsung menguji fungsi utama sejak halaman pertama dibuka:

```
[1. Buka Web KriyaLoka] 
       │
       ├──> (Opsi A: Juri/User Cepat) Klik tombol "Coba Sampel Kriya Bali" (Tersedia 3 preset foto + konteks)
       │
       └──> (Opsi B: Input Mandiri) Upload Foto Produk + Ketik/Rekam Suara singkat (misal: "Ukiran Garuda kayu suar, 14 hari")
       │
[2. Klik "Analisis & Buat Paket Ekspor (AI)"]
       │
[3. AI Multimodal Pipeline Bekerja (Loading State Interaktif 3-6 detik)]
       │
[4. Dashboard Hasil Analisis (4 Tab/Bagian Terstruktur)]
       ├── Tab 1: Filosofi Budaya & Identifikasi Visual Bali
       ├── Tab 2: Copywriting Multibahasa (EN, JP, CN, ID) + One-Click Copy
       ├── Tab 3: Panduan Ekspor, HS Code & Kalkulator Harga Global (USD/IDR)
       └── Tab 4: Kartu Sertifikat & Katalog Digital (Siap Download PDF/PNG & QR Code)
```

---

## 4. Spesifikasi Fitur MVP (MoSCoW Prioritization)

### 4.1 MUST HAVE (Wajib Selesai Sebelum 6 November)

#### F1. Multimodal Input Panel + "1-Click Judge Sample Presets"
* **Upload Gambar:** Mendukung format `.jpg`, `.jpeg`, `.png`, `.webp` (maksimal 5MB) dengan *image preview* dan kompresi otomatis di sisi klien (*client-side compression*) sebelum dikirim ke API agar cepat.
* **Konteks Pengrajin (Teks & Voice-to-Text):** *Text area* sederhana tempat pengrajin menuliskan detail singkat (bahan, lama pengerjaan, ukuran, harga modal lokal) dilengkapi tombol **Rekam Suara (Web Speech API)** berbahasa Indonesia agar ramah pengrajin.
* **3 Tombol Preset Sampel Juri (KRUSIAL):** Tombol instan yang langsung mengisi foto dan deskripsi sampel asli Bali:
  1. *Sampel 1:* Patung Ukiran Kayu Garuda Wisnu (Kemenuh, Gianyar).
  2. *Sampel 2:* Kain Tenun Endek Motif Gringsing/Cepuk (Sidemen, Karangasem).
  3. *Sampel 3:* Bros Perak Filigree Motif Bunga Kamboja (Celuk, Sukawati).

#### F2. AI Cultural & Visual Analyzer
* Mendeteksi kategori kerajinan, material utama, teknik pembuatan (misal: *hand-carved*, *lost-wax casting*, *ikat weaving*), dan sentra asal kerajinan di Bali.
* Menyusun narasi **Filosofi Budaya Bali (*Taksu & Makna Motif*)** yang menjelaskan arti simbolis dari objek di dalam foto.

#### F3. Multilingual Storytelling Generator
* Menghasilkan judul produk dan cerita produk (*storytelling copywriting*) dalam **4 bahasa**:
  * **English** (Target: Pasar AS, Eropa, Australia – gaya bahasa *Etsy/Artisan Gallery*).
  * **Japanese / 日本語** (Target: Pasar Jepang yang sangat menghargai kerajinan tangan tradisional).
  * **Mandarin / 中文** (Target: Pasar Tiongkok/Singapura).
  * **Bahasa Indonesia** (Target: Pasar domestik premium & kolektor).
* Dilengkapi tombol **"Copy to Clipboard"** pada setiap bahasa dan rekomendasi *Hashtags / SEO Keywords*.

#### F4. Export Compliance, HS Code & Smart Pricing Engine
* **Rekomendasi HS Code:** Menampilkan kode HS 6 digit internasional dan 8 digit BTKI Indonesia (contoh: `4420.19` untuk patung kayu tropis, `7113.11` untuk perhiasan perak, `5208.42` untuk kain tenun ikat) beserta tingkat keyakinan (*confidence level*).
* **Cek Regulasi & Dokumen Ekspor:** Memberikan daftar ceklis kepatuhan berdasarkan material yang terdeteksi di foto (misal: Kayu wajib sertifikat SVLK/V-Legal & fumigasi ISPM-15; Perak wajib deklarasi kadar logam).
* **Kalkulator Estimasi Harga Ekspor:** Menghitung estimasi harga jual *Retail Global* (USD) dan *Wholesale/FOB* (USD) beserta konversi IDR, disertai rincian persentase *Artisan Premium Value* (nilai tambah dari keunikan budaya dan jam kerja tangan).

#### F5. Printable "Bali Artisan Authenticity Certificate" / Micro-Catalog
* Menampilkan pratinjau kartu sertifikat keaslian karya (*Digital Certificate of Cultural Authenticity*) yang memuat foto produk, nama pengrajin/desa, ringkasan filosofi budaya dalam bahasa Inggris, dan QR Code yang dapat dicetak untuk diselipkan ke dalam paket pengiriman ekspor.

### 4.2 SHOULD HAVE (Dikerjakan di Hari ke-3/4 jika waktu memungkinkan)
* **Interactive Price Adjuster:** Slider sederhana di mana pengguna bisa mengubah "Jam Kerja (Hari)" atau "Harga Modal (Rp)" dan melihat harga rekomendasi USD berubah secara dinamis.
* **Riwayat Analisis Lokal (`localStorage`):** Menyimpan 3 hasil analisis terakhir di browser tanpa perlu login database yang membebani juri.

### 4.3 WON'T HAVE (Di Luar Scope Tahap 1 untuk Menghemat Waktu)
* Sistem autentikasi pengguna (Login/Register dengan password) — *biarkan terbuka langsung agar juri tidak terhambat*.
* Payment gateway atau transaksi jual-beli langsung di dalam platform.
* Integrasi API langsung ke pengiriman DHL/FedEx (cukup panduan dan kalkulasi AI).

---

## 5. Arsitektur Teknis & Alur Data

### 5.1 Rekomendasi Tech Stack (Cepat, Modern, Gratis untuk Deployment)
* **Frontend & Full-stack Framework:** Next.js 14/15 (App Router) dengan TypeScript & Tailwind CSS + Lucide Icons + Shadcn UI.
* **AI Model / API:** **Google Gemini 2.5 Flash API** (via `@google/genai` SDK) atau **OpenAI GPT-4o-mini**.
  * *Alasan Pemilihan:* Mendukung input **Multimodal (Image + Text)** secara *native*, kecepatan respons sangat tinggi (< 4 detik), dan mendukung fitur **Structured Outputs (`responseSchema` JSON)** sehingga format output tidak pernah rusak.
* **Speech Recognition:** Browser Native `webkitSpeechRecognition` / Web Speech API (gratis, tanpa latensi server tambahan, langsung mengubah suara bahasa Indonesia menjadi teks).
* **Database / Storage (Opsional/Ringan):** Supabase (PostgreSQL + Storage) atau `localStorage` untuk menyimpan katalog yang dibagikan.
* **Hosting:** Vercel (terhubung langsung ke GitHub untuk CI/CD otomatis).

### 5.2 Diagram Arsitektur Sistem (Untuk Bab 6 Proposal & README)

```
+-----------------------------------------------------------------------+
|                        USER / JURI (Web Browser)                      |
|  [Upload Foto Kriya / Pilih Sampel] + [Input Teks / Rekam Suara ID]   |
+-----------------------------------+-----------------------------------+
                                    | (1) HTTP POST /api/analyze
                                    |     (Base64 Image + User Context)
                                    v
+-----------------------------------------------------------------------+
|                     NEXT.JS BACKEND API ROUTE                         |
|  - Validasi Input & Sanitasi Ukuran Gambar                            |
|  - Injeksi Local Knowledge Base (Data Sentra Kriya Bali & Tabel HS)   |
|  - Konstruksi System Prompt + Strict JSON Schema                      |
+-----------------------------------+-----------------------------------+
                                    | (2) Multimodal API Call
                                    v
+-----------------------------------------------------------------------+
|                 MULTIMODAL AI ENGINE (Gemini 2.5 Flash)               |
|  - Computer Vision: Deteksi Material, Motif, Teknik & Kompleksitas    |
|  - Cultural LLM: Ekstraksi Filosofi Budaya Bali & Terjemahan 4 Bahasa |
|  - Export Reasoning: Pemetaan HS Code, Regulasi Material & Valuasi    |
+-----------------------------------+-----------------------------------+
                                    | (3) Validated Structured JSON
                                    v
+-----------------------------------------------------------------------+
|                        FRONTEND UI DASHBOARD                          |
|  [Kartu Filosofi] [Copywriting 4 Bahasa] [HS Code & Harga] [Katalog]  |
+-----------------------------------------------------------------------+
```

---

## 6. Spesifikasi AI Implementation (Panduan untuk AI Engineer)

Bagian ini menjawab langsung kriteria **AI Relevance & Implementation (25% bobot nilai)** dan pertanyaan saat **Technical Verification**.

### 6.1 Rancangan System Prompt
Gunakan *System Prompt* berikut pada backend API:

```text
Anda adalah "KriyaLoka AI", sistem pakar budaya kriya Bali (Balinese Traditional Craftsmanship) sekaligus konsultan ekspor UMKM internasional.

Tugas Anda adalah menganalisis foto produk kerajinan tangan Bali beserta catatan singkat dari pengrajin, lalu menghasilkan data terstruktur dalam format JSON yang valid.

Panduan Analisis:
1. IDENTIFIKASI VISUAL & BUDAYA BALI:
   - Kenali jenis kerajinan, material utama, teknik pembuatan, dan estimasi desa/sentra kerajinan di Bali yang relevan (contoh: Kemenuh/Mas Gianyar untuk ukiran kayu, Celuk untuk perak, Sidemen/Tenganan untuk tenun Endek/Gringsing, Kamasan untuk lukisan klasik, Bona/Tegalalang untuk anyaman).
   - Jelaskan filosofi budaya Bali (makna simbolis motif, nilai Taksu, atau fungsi kultural) secara akurat dan menghormati tradisi lokal.

2. MULTILINGUAL STORYTELLING (4 BAHASA):
   - Buat judul dan deskripsi pemasaran berkelas internasional yang menonjolkan keaslian buatan tangan (handcrafted in Bali) dan filosofi budayanya dalam Bahasa Inggris (EN), Jepang (JP), Mandarin Sederhana (CN), dan Indonesia (ID).

3. KEPATUHAN EKSPOR & HS CODE:
   - Tentukan rekomendasi kode HS (Harmonized System) 6 digit internasional dan 8 digit BTKI Indonesia yang paling tepat berdasarkan material dan fungsi barang.
   - Berikan peringatan regulasi material (contoh: kayu memerlukan SVLK/V-Legal dan fumigasi ISPM-15; produk kulit/kerang memerlukan pemeriksaan CITES; perhiasan memerlukan deklarasi logam mulia).

4. VALUASI HARGA GLOBAL:
   - Hitung estimasi harga jual wajar di pasar global (USD) untuk kategori Wholesale (FOB) dan Retail (Etsy/Boutique) dengan mempertimbangkan tingkat kerumitan visual, waktu pengerjaan, dan nilai seni budaya Bali.
```

### 6.2 Strict JSON Output Schema (`responseSchema`)
Frontend dan AI Engineer **wajib** menyepakati kontrak JSON ini di Hari ke-1 agar pengerjaan UI dan Backend bisa berjalan paralel tanpa saling tunggu:

```json
{
  "craft_identity": {
    "product_Title": "string (Nama produk profesional)",
    "category": "string (Misal: Wood Carving / Silver Filigree / Ikat Weaving)",
    "detected_materials": ["string"],
    "crafting_technique": "string",
    "origin_village_bali": "string (Misal: Desa Mas, Ubud, Gianyar)",
    "complexity_score": "number (Skala 1-10)",
    "cultural_philosophy_id": "string (Penjelasan filosofi motif dalam Bahasa Indonesia)",
    "cultural_philosophy_en": "string (Penjelasan filosofi motif dalam Bahasa Inggris)"
  },
  "multilingual_listings": {
    "en": {
      "title": "string",
      "story_description": "string",
      "seo_tags": ["string"]
    },
    "jp": {
      "title": "string",
      "story_description": "string"
    },
    "cn": {
      "title": "string",
      "story_description": "string"
    },
    "id": {
      "title": "string",
      "story_description": "string"
    }
  },
  "export_compliance": {
    "hs_code_6digit": "string (Contoh: 4420.19)",
    "btki_code_8digit": "string (Contoh: 4420.19.00)",
    "hs_description": "string (Deskripsi resmi kategori HS Code)",
    "confidence_level": "string (High / Medium)",
    "required_documents": [
      {
        "document_name": "string (Contoh: Sertifikat SVLK / V-Legal)",
        "reason": "string (Alasan mengapa dokumen ini wajib untuk material tersebut)"
      }
    ],
    "packaging_advice": "string (Saran pengemasan aman untuk pengiriman internasional)"
  },
  "pricing_estimation": {
    "estimated_production_days": "number",
    "local_base_price_idr": "number",
    "recommended_fob_usd": {
      "min": "number",
      "max": "number"
    },
    "recommended_global_retail_usd": {
      "min": "number",
      "max": "number"
    },
    "value_drivers": ["string (Alasan mengapa produk ini bernilai tinggi di pasar global)"]
  }
}
```

### 6.3 Error Handling & Fallback (Wajib untuk Technical Verification)
* **Validasi Gambar:** Jika pengguna mengunggah foto yang sama sekali bukan barang kerajinan/produk (misal: foto layar kosong atau *selfie*), AI memberikan pesan ramah untuk mengunggah foto produk kriya, atau tetap menganalisis objek di dalam foto sebagai simulasi.
* **API Timeout / Quota Fallback:** Jika API utama mengalami *timeout* (> 15 detik), tampilkan pesan *error* yang jelas beserta tombol *"Retry Analysis"*.

---

## 7. Panduan Desain UI/UX (Untuk Designer)

* **Tema Visual:** *Modern Balinese Heritage* — memadukan warna hangat khas Bali:
  * *Primary:* Terracotta / Merah Bata Majapahit (`#C85A32` atau `#B45309`)
  * *Secondary / Accent:* Emas Prada (`#D97706`) & Hijau Ubud (`#15803D`)
  * *Background:* Kertas Lontar Hangat / Warm Cream (`#FAF8F5`) dengan teks gelap (`#1C1917`) agar sangat nyaman dibaca.
* **Prinsip "Anti-Chatbot Look":** Jangan tampilkan hasil AI seperti gelembung percakapan (*chat bubble*). Tampilkan hasil menggunakan:
  * **Badges & Pills** untuk Material, Asal Desa di Bali, dan Tingkat Kompleksitas.
  * **Highlight Card** bergaya dokumen resmi untuk bagian **HS Code & Regulasi Ekspor**.
  * **Language Switcher Tabs** (🇬🇧 EN | 🇯🇵 JP | 🇨🇳 CN | 🇮🇩 ID) untuk *Copywriting*.
  * **Certificate Card Preview** berbingkai ornamen tipis khas Bali untuk fitur sertifikat keaslian produk.

---

## 8. Pembagian Tugas Tim & Timeline 5 Hari (1 – 6 Nov 2026)

| Hari | AI Engineer | Full-Stack Developer | UI/UX & Proposal Designer |
| :--- | :--- | :--- | :--- |
| **Hari 1 (1 Nov)** | • Buat API Key Gemini/OpenAI.<br>• Uji *System Prompt* & *JSON Schema* di atas menggunakan 3 foto sampel kerajinan Bali.<br>• Buat data referensi ringkas kode HS kerajinan (Kayu, Perak, Tekstil, Lukisan, Keramik, Anyaman) untuk disuntikkan ke prompt. | • Buat repo GitHub + `.gitignore` + `.env.example`.<br>• Setup project Next.js + Tailwind.<br>• Deploy kerangka awal ke Vercel.<br>• Sepakati struktur JSON dari PRD Bab 6.2. | • Kumpulkan 3 foto sampel kerajinan Bali resolusi bagus (Kayu, Endek, Perak).<br>• Buat desain UI 1 halaman utama di Figma.<br>• Mulai tulis Bab 1, 2, dan 3 Proposal (Problem, Target User, Solution). |
| **Hari 2 (2 Nov)** | • Bangun API route `/api/analyze` yang menerima `imageBase64` dan `userNotes`.<br>• Pastikan respons selalu berbentuk JSON valid sesuai skema. | • Bangun komponen Upload Foto + Tombol 3 Sampel Preset Juri.<br>• Integrasikan Web Speech API (input suara Bahasa Indonesia). | • Desain layout kartu Sertifikat Keaslian Produk & Diagram Arsitektur.<br>• Tulis Bab 4, 5, dan 6 Proposal (AI Implementation, MVP Features, Architecture). |
| **Hari 3 (3 Nov)** | • Kalibrasi akurasi harga USD/IDR dan ketepatan kode HS.<br>• Tambahkan *error handling* jika gambar rusak atau API gagal. | • Bangun 4 komponen hasil analisis (Filosofi, Tab 4 Bahasa, Kartu HS Code & Harga, serta Katalog Sertifikat).<br>• Tambahkan fitur *Copy Text* & *Print/Download Certificate*. | • Tulis Bab 7, 8, dan 9 Proposal (Innovation, Impact, Tech Disclosure).<br>• Siapkan template `README.md` dan dokumen AI Disclosure. |
| **Hari 4 (4 Nov)** | • Lakukan *stress test* dengan 10 foto barang acak di sekitar rumah (untuk simulasi saat juri menguji dengan foto mereka sendiri).<br>• Finalisasi teks penjelasan teknis di Proposal & README. | • Poles tampilan *mobile responsive* & animasi *loading state* (misal: *"Menganalisis motif budaya Bali...", "Mencocokkan kode HS Bea Cukai..."*).<br>• Pastikan tidak ada *secret key* di kode publik. | • Ambil *screenshot* aplikasi asli yang sudah berjalan di Vercel.<br>• Masukkan *screenshot* ke dalam Proposal PDF (maks. 5 halaman isi). |
| **Hari 5–6 (5–6 Nov)** | • Cek sisa kuota API agar aman selama masa penjurian.<br>• Siapkan poin penjelasan kode untuk sesi Technical Verification. | • Buat *Git Tag* / *Release* `v1.0-submission` dan catat *commit hash*-nya.<br>• Cek ulang URL Vercel dari perangkat berbeda (mode Incognito). | • Export PDF dengan nama `AIWIC2026_NamaTim_KriyaLoka.pdf`.<br>• Cek seluruh daftar **Checklist Bab 13** di buku panduan dan kirim submission! |

---

## 9. Checklist Kepatuhan Guidebook Bali DigiFest 2026

Sebelum melakukan *submit* pada tanggal 6 November, pastikan seluruh poin berikut berstatus **PASS**:
- [ ] **URL MVP Aktif & Tanpa Login Rumit:** Juri bisa langsung membuka URL dan menguji fitur AI dalam 1 klik melalui tombol *Sampel Kriya Bali* maupun upload foto sendiri.
- [ ] **Keamanan Repository (`.env.example`):** File `.env` tidak pernah ter-commit ke GitHub. Tersedia file `.env.example` berisi `GEMINI_API_KEY=your_api_key_here`.
- [ ] **Version Locking:** Repository memiliki *tag/release* `v1.0-submission` dan *commit hash* dicantumkan di Proposal Bab 10.
- [ ] **Batas Halaman Proposal:** Proposal berformat PDF A4, maksimal **5 halaman isi** (di luar *cover* dan lampiran).
- [ ] **Kelengkapan AI Disclosure:** Mencantumkan model AI yang dipakai (misal: Gemini 2.5 Flash), *framework* (Next.js, Tailwind), serta penggunaan *AI Coding Assistant* (Gemini/Cursor/Copilot) secara jujur dan transparan.