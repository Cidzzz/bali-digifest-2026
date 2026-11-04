"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Upload, 
  Globe, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Copy, 
  DollarSign,
  Tag
} from "lucide-react";
import { KriyaAnalysisResponse } from "@/types/kriya";
import { MOCK_GARUDA_ANALYSIS, MOCK_ENDEK_ANALYSIS, MOCK_PERAK_ANALYSIS } from "@/data/mockKriya";

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>("garuda");
  const [result, setResult] = useState<KriyaAnalysisResponse | null>(MOCK_GARUDA_ANALYSIS);
  const [activeLang, setActiveLang] = useState<"en" | "jp" | "zh" | "id">("en");
  const [copied, setCopied] = useState(false);

  const handlePresetClick = (preset: "garuda" | "endek" | "perak") => {
    setSelectedPreset(preset);
    if (preset === "garuda") setResult(MOCK_GARUDA_ANALYSIS);
    if (preset === "endek") setResult(MOCK_ENDEK_ANALYSIS);
    if (preset === "perak") setResult(MOCK_PERAK_ANALYSIS);
  };

  const handleCopyNarrative = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans pb-20">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C85A32] to-[#D97706] flex items-center justify-center text-white shadow-md font-bold text-xl">
              K
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-stone-900">
                Kriya<span className="text-[#C85A32]">Loka</span> <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">AI</span>
              </span>
              <p className="text-xs text-stone-500 hidden sm:block">AI Export & Cultural Storytelling Copilot for Balinese Artisans</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
              Bali DigiFest 2026 MVP
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#C85A32] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Prompt Multimodal AI untuk Pengrajin Bali</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-3">
            Dari Tangan Seniman Bali Menembus Panggung Dunia
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Cukup 1 foto kerajinan. Dapatkan identifikasi filosofi motif Bali, narasi ekspor 4 bahasa, cek kepatuhan kode HS Bea Cukai, serta sertifikat keaslian digital otomatis.
          </p>
        </div>

        {/* Judge Quick Presets */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Mode Uji Cepat Juri (One-Click Sample)
            </span>
            <span className="text-xs text-stone-500">Klik salah satu sampel di bawah untuk evaluasi instan:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handlePresetClick("garuda")}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                selectedPreset === "garuda"
                  ? "border-[#C85A32] bg-orange-50/60 ring-2 ring-orange-200"
                  : "border-stone-200 hover:border-stone-300 bg-stone-50"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-orange-200/60 flex items-center justify-center text-lg">🪵</div>
              <div>
                <p className="font-semibold text-xs text-stone-900">Patung Garuda Wisnu</p>
                <p className="text-[11px] text-stone-500">Kayu Suar • Gianyar</p>
              </div>
            </button>

            <button
              onClick={() => handlePresetClick("endek")}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                selectedPreset === "endek"
                  ? "border-[#C85A32] bg-orange-50/60 ring-2 ring-orange-200"
                  : "border-stone-200 hover:border-stone-300 bg-stone-50"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-200/60 flex items-center justify-center text-lg">🧵</div>
              <div>
                <p className="font-semibold text-xs text-stone-900">Tenun Ikat Endek</p>
                <p className="text-[11px] text-stone-500">Sutra Alami • Sidemen</p>
              </div>
            </button>

            <button
              onClick={() => handlePresetClick("perak")}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                selectedPreset === "perak"
                  ? "border-[#C85A32] bg-orange-50/60 ring-2 ring-orange-200"
                  : "border-stone-200 hover:border-stone-300 bg-stone-50"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-amber-200/60 flex items-center justify-center text-lg">💍</div>
              <div>
                <p className="font-semibold text-xs text-stone-900">Bros Bunga Sandat</p>
                <p className="text-[11px] text-stone-500">Perak 925 • Celuk Sukawati</p>
              </div>
            </button>
          </div>
        </div>

        {/* Results Area */}
        {result && (
          <div className="space-y-6">
            {/* Top Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cultural Heritage Card */}
              <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold">
                      {result.cultural_heritage.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-orange-100 text-[#C85A32] text-xs font-semibold">
                      {result.cultural_heritage.origin_village}, {result.cultural_heritage.regency}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> Skor Keaslian {result.valuation_and_certificate.craftsmanship_score}%
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  {result.cultural_heritage.craft_name}
                </h2>
                <p className="text-xs text-stone-500 mb-4">
                  Material Pokok: <span className="font-medium text-stone-800">{result.cultural_heritage.primary_material}</span>
                </p>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-2 mb-4">
                  <p className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" /> Filosofi Makna Budaya:
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                    "{result.cultural_heritage.philosophical_meaning}"
                  </p>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {result.cultural_heritage.cultural_significance}
                </p>
              </div>

              {/* Valuation & Export Pricing Card */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Estimasi Harga Ekspor
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                      Fair Global Value
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs text-stone-500">Pasar Ekspor Global (Retail USD):</p>
                      <p className="text-2xl font-extrabold text-stone-900 text-emerald-600">
                        {result.valuation_and_certificate.fair_price_estimate.export_retail_usd}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100">
                      <p className="text-xs text-stone-500">Rekomendasi Grosir / FOB:</p>
                      <p className="text-sm font-bold text-stone-800">
                        {result.valuation_and_certificate.fair_price_estimate.suggested_fob_usd}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100">
                      <p className="text-xs text-stone-500">Estimasi Ritel Lokal (Bali):</p>
                      <p className="text-sm font-semibold text-stone-600">
                        {result.valuation_and_certificate.fair_price_estimate.local_retail_idr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  <p className="font-semibold mb-0.5">Sertifikat Keaslian Terbit:</p>
                  <p className="font-mono text-stone-700">{result.valuation_and_certificate.digital_certificate.certificate_id}</p>
                </div>
              </div>
            </div>

            {/* Middle Section: Storytelling 4 Languages */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#C85A32]" />
                  <h3 className="font-bold text-base text-stone-900">Katalog Ekspor & Storytelling Budaya Multilingual</h3>
                </div>

                {/* Language Tabs */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveLang("en")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeLang === "en" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => setActiveLang("jp")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeLang === "jp" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    🇯🇵 日本語
                  </button>
                  <button
                    onClick={() => setActiveLang("zh")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeLang === "zh" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    🇨🇳 中文
                  </button>
                  <button
                    onClick={() => setActiveLang("id")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeLang === "id" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    🇮🇩 Indonesia
                  </button>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 text-base sm:text-lg">
                    {result.storytelling[activeLang].title}
                  </h4>
                  <button
                    onClick={() => handleCopyNarrative(result.storytelling[activeLang].narrative)}
                    className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Tersalin!" : "Salin Narasi"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {result.storytelling[activeLang].narrative}
                </p>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Tags:
                  </span>
                  {result.storytelling.seo_tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Grid: Export Compliance & Certificate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export Compliance Card */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base text-stone-900">Kepatuhan Regulasi & Kode HS Ekspor</h3>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-stone-500 font-medium">Rekomendasi HS Code (BTKI 2026):</span>
                    <span className="text-xs font-mono font-bold bg-stone-900 text-white px-2 py-0.5 rounded">
                      {result.export_compliance.hs_code_recommendation}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium">
                    {result.export_compliance.hs_description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                    <span className="text-stone-500 block text-[11px]">Sertifikat SVLK:</span>
                    <span className="font-semibold text-stone-800">
                      {result.export_compliance.material_clearance.svlk_required ? "⚠️ Diperlukan (V-Legal)" : "✅ Bebas SVLK"}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                    <span className="text-stone-500 block text-[11px]">Fumigasi ISPM 15:</span>
                    <span className="font-semibold text-stone-800">
                      {result.export_compliance.material_clearance.fumigation_required ? "⚠️ Perlu Fumigasi Kayu" : "✅ Bebas Fumigasi"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-500 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                  <span className="font-semibold text-amber-900">Catatan Bea Cukai:</span> {result.export_compliance.export_notes}
                </p>
              </div>

              {/* Certificate Preview Card */}
              <div className="bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 rounded-2xl p-6 border border-amber-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> Digital Authenticity Card
                    </span>
                    <span className="text-[10px] font-mono bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-500">
                      VERIFIED
                    </span>
                  </div>

                  <div className="border border-dashed border-amber-300 p-4 rounded-xl bg-white/70 mb-4 text-center">
                    <p className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold mb-1">
                      Kemenkumham & Dinas Koperasi Bali
                    </p>
                    <h4 className="font-serif font-bold text-lg text-stone-900 mb-1">
                      Certificate of Authenticity
                    </h4>
                    <p className="text-xs text-stone-600 mb-3">
                      Karya Asli Terverifikasi Warisan Budaya Bali
                    </p>

                    <div className="text-left bg-stone-50 p-2.5 rounded text-[11px] space-y-1 font-mono">
                      <div><span className="text-stone-400">ID:</span> {result.valuation_and_certificate.digital_certificate.certificate_id}</div>
                      <div><span className="text-stone-400">Origin:</span> {result.valuation_and_certificate.digital_certificate.artisan_attribution}</div>
                      <div><span className="text-stone-400">Hash:</span> {result.valuation_and_certificate.digital_certificate.verification_hash}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Cetak / Simpan PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
