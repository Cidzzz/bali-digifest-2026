# PANDUAN KERJA XAVIER (FRONTEND DEVELOPER)
**Proyek:** KriyaLoka AI (Bali DigiFest 2026)  
**Tujuan:** Slicing UI Web MVP Single Page yang cepat, estetik khas Bali modern, dan siap diuji juri dalam 1 klik.

---

## 🎯 1. TUGAS UTAMA XAVIER
Xavier fokus membangun antarmuka pengguna (Frontend) menggunakan **Next.js (App Router) + Tailwind CSS + Lucide Icons**.

*Catatan Alur Tim:*
- Xavier bisa langsung membangun struktur layout dan fungsi interaktif menggunakan **Mock Data** hari ini tanpa menunggu desain Figma selesai 100%.
- Zayyan sedang merancang UI di Figma agar tampilan tidak terkesan "AI Slop". Begitu desain Figma Zayyan siap, Xavier tinggal menyelaraskan styling, tata letak detail, dan token warna Tailwind sesuai acuan Figma Zayyan.
- Xavier **TIDAK PERLU** menunggu backend Agung selesai. Gunakan **Mock Data JSON** di bagian bawah dokumen ini agar UI langsung bisa tampil dan dites hari ini.

---

## 🧱 2. KOMPONEN UI YANG HARUS DIBUAT

### A. Hero Section (Header)
- Judul: **KriyaLoka**
- Tagline: *"AI Export & Cultural Storytelling Copilot for Balinese Artisans"*
- Deskripsi singkat: *"Ubah foto kerajinan tangan Bali menjadi narasi budaya 4 bahasa, kode HS ekspor, dan sertifikat keaslian digital dalam 1 klik."*

### B. Input Panel (Area Masukan Pengrajin/Juri)
1. **Area Upload Foto Produk:**
   - Mendukung Drag & Drop atau ambil dari kamera HP/laptop.
   - Preview gambar setelah dipilih.
2. **Input Catatan Pengrajin (Opsional):**
   - Textarea sederhana: misal *"Patung Garuda kayu suar, pengerjaan 14 hari"*.
   - Tombol mikrofon untuk fitur rekam suara (pakai Web Speech API jika sempat).
3. **⭐ FITUR PALING KRUSIAL: 3 Tombol Preset Sampel Juri**
   - Pasang 3 tombol cepat tepat di bawah box upload:
     - 🔘 *Coba Sampel 1: Patung Kayu Garuda (Gianyar)*
     - 🔘 *Coba Sampel 2: Tenun Endek Motif Gringsing (Karangasem)*
     - 🔘 *Coba Sampel 3: Bros Perak Celuk (Sukawati)*
   - *Behavior:* Ketika juri klik salah satu tombol ini, foto sampel otomatis terisi dan langsung memicu proses analisis!
4. **Tombol Eksekusi:**
   - Tombol besar bertuliskan: **"Analisis & Buat Paket Ekspor (AI)"**.
   - Tambahkan animasi loading interaktif saat diproses (3–5 detik), contoh: *"Menganalisis motif ukiran Bali...", "Mencocokkan regulasi HS Code..."*.

### C. Output Dashboard (Tampilan Hasil Analisis - 4 Bagian)
*Jangan tampilkan hasil seperti chat bubble bot WhatsApp! Buat bergaya Dashboard Profesional:*

1. **Card 1: Identitas Kriya & Filosofi Budaya**
   - Tampilkan badge: Asal Desa di Bali, Material, Tingkat Kerumitan (Skor 1-10).
   - Penjelasan filosofi makna motif dalam Bahasa Indonesia & Inggris.
2. **Card 2: Storytelling Multibahasa (4 Bahasa)**
   - Gunakan Tab: 🇬🇧 English | 🇯🇵 日本語 | 🇨🇳 中文 | 🇮🇩 Indonesia.
   - Di tiap tab ada judul produk + deskripsi cerita puitis.
   - Tombol **"Salin Teks" (Copy to Clipboard)**.
3. **Card 3: Panduan Ekspor & Estimasi Harga**
   - **Badge HS Code:** Tampilkan kode internasional (6-digit) & kode BTKI (8-digit).
   - **Checklist Regulasi:** Misal: SVLK/V-Legal untuk kayu, sertifikat fumigasi.
   - **Kotak Harga:** Rentang harga retail global (USD) vs harga lokal (IDR).
4. **Card 4: Sertifikat Keaslian Digital (Printable)**
   - Desain kartu mewah berbingkai motif Bali tipis: Foto produk, nama karya, nama pengrajin/desa, stempel "Verified Balinese Craftsmanship", dan QR Code.
   - Tombol: **"Cetak / Simpan Sertifikat (PDF/PNG)"**.

---

## 🎨 3. PANDUAN WARNA & TEMA
Gunakan tema **Modern Balinese Heritage**:
- Background: Warm Cream / Kertas Lontar (`#FAF8F5` atau `bg-stone-50`)
- Primary (Aksen Utama): Terracotta / Bata Majapahit (`#C85A32` atau `text-amber-800`)
- Aksen Mewah: Emas Prada (`#D97706` atau `text-amber-500`)
- Card Background: Putih bersih (`bg-white`) dengan border halus (`border-stone-200`) dan rounded-2xl.

---

## 📦 4. MOCK DATA (Gunakan ini untuk tes tampilan sekarang!)
Simpan data ini di file lokal (misal: `src/data/mockResult.ts`):

```json
{
  "craft_identity": {
    "product_Title": "Patung Ukir Kayu Garuda Wisnu Kencana",
    "category": "Wood Carving",
    "detected_materials": ["Kayu Suar Alami (Albizia Saman)"],
    "crafting_technique": "Hand-carved Traditional Chisel",
    "origin_village_bali": "Desa Mas, Ubud, Gianyar",
    "complexity_score": 9,
    "cultural_philosophy_id": "Melambangkan pembebasan, kesetiaan tanpa pamrih, dan perlindungan spiritual dalam mitologi Hindu Bali.",
    "cultural_philosophy_en": "Embodying liberation, unconditional devotion, and divine spiritual protection in Balinese mythology."
  },
  "multilingual_listings": {
    "en": {
      "title": "Masterpiece Hand-Carved Balinese Suar Wood Garuda Statue",
      "story_description": "Handcrafted by hereditary master carvers in Mas Village, Ubud. This sacred Garuda sculpture captures the timeless spirit of courage and spiritual freedom."
    },
    "jp": {
      "title": "バリ島伝統職人手彫り スアール木製 ガルーダ神像",
      "story_description": "ウブド・マス村の熟練職人が神聖な木材から彫り出した逸品。精神の解放と守護を象徴するバリ伝統美術工芸品です。"
    },
    "cn": {
      "title": "巴厘岛传统手雕苏木神鹰迦楼罗造像",
      "story_description": "由乌布马斯村世家工匠纯手工精雕细刻，融合巴厘岛千年神话底蕴，象征勇气与解脱的精神殿堂之作。"
    },
    "id": {
      "title": "Patung Kayu Suar Garuda Bali Mahakarya Desa Mas",
      "story_description": "Dipahat secara turun-temurun oleh maestro ukir Desa Mas, Gianyar. Mahakarya ini merefleksikan nilai luhur keberanian dan taksu seni ukir Bali."
    }
  },
  "export_compliance": {
    "hs_code_6digit": "4420.19",
    "btki_code_8digit": "4420.19.00",
    "hs_description": "Statuettes and other ornaments, of wood",
    "confidence_level": "High (95%)",
    "required_documents": [
      {
        "document_name": "Sertifikat V-Legal / SVLK",
        "reason": "Wajib untuk seluruh ekspor kerajinan kayu dari Indonesia guna menjamin kelestarian hutan."
      },
      {
        "document_name": "Fumigasi Standar ISPM-15",
        "reason": "Mencegah hama kayu tropis saat pengiriman kontainer internasional."
      }
    ],
    "packaging_advice": "Bungkus bubble wrap 3 lapis, lapisi foam corner protection, dan gunakan peti kayu (wooden crate) kering."
  },
  "pricing_estimation": {
    "estimated_production_days": 14,
    "local_base_price_idr": 450000,
    "recommended_fob_usd": { "min": 65, "max": 90 },
    "recommended_global_retail_usd": { "min": 140, "max": 220 },
    "value_drivers": [
      "14 hari pengerjaan manual murni",
      "Kayu suar solid tanpa sambungan",
      "Nilai filosofi budaya autentik Bali"
    ]
  }
}
```

---

## 🤝 5. TITIK INTEGRASI DENGAN AGUNG
Begitu backend Agung siap, Xavier cukup mengganti fungsi pemicu analisis:
```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ imageBase64, userNotes })
});
const data = await response.json();
// set state data ke UI!
```
Selesai! Xavier bisa gas pol sekarang.
