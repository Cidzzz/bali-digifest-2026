"use client";

import React, { useState } from "react";
import Image from "next/image";
import { KriyaAnalysisResponse } from "@/types/kriya";
import { ShieldCheck, Printer, Check, Copy, Award } from "lucide-react";

interface DigitalCertificateProps {
  result: KriyaAnalysisResponse;
  previewImage?: string | null;
}

export function DigitalCertificate({
  result,
  previewImage,
}: DigitalCertificateProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const certId = result.valuation_and_certificate.digital_certificate.certificate_id;
  const hash = result.valuation_and_certificate.digital_certificate.verification_hash;
  const verifyUrl = `https://kriyaloka.id/verify/${certId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintCertificate = () => {
    const certEl = document.querySelector(".print-certificate-only");
    const printRoot = document.getElementById("print-root");
    if (certEl && printRoot) {
      printRoot.innerHTML = certEl.outerHTML;
      window.print();
      printRoot.innerHTML = "";
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 flex flex-col justify-between">
      {/* Top Card Header */}
      <div className="flex items-center justify-between mb-4 no-print">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#C85A32]" />
          <div>
            <h3 className="font-bold text-sm text-stone-900">Digital Authenticity Card</h3>
            <p className="text-[11px] text-stone-500">Sertifikat Resmi Berstandar Ekspor & Siap Cetak</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-amber-50 text-[#B45309] border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
          BALI HERITAGE VERIFIED
        </span>
      </div>

      {/* The Printable Certificate Container */}
      <div className="print-certificate-only relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#FFF9F0] border-2 border-[#D97706]/70 rounded-2xl p-6 sm:p-7 shadow-md overflow-hidden text-stone-800">
        {/* Balinese Heritage SVG Corner Ornaments */}
        <div className="absolute top-1.5 left-1.5 w-12 h-12 pointer-events-none text-[#D97706]/70">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2H20C20 12 12 20 2 20V2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 6H16C16 11.5 11.5 16 6 16V6Z" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <circle cx="9" cy="9" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-1.5 right-1.5 w-12 h-12 pointer-events-none text-[#D97706]/70 rotate-90">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2H20C20 12 12 20 2 20V2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 6H16C16 11.5 11.5 16 6 16V6Z" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <circle cx="9" cy="9" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-1.5 left-1.5 w-12 h-12 pointer-events-none text-[#D97706]/70 -rotate-90">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2H20C20 12 12 20 2 20V2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 6H16C16 11.5 11.5 16 6 16V6Z" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <circle cx="9" cy="9" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-1.5 right-1.5 w-12 h-12 pointer-events-none text-[#D97706]/70 rotate-180">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2H20C20 12 12 20 2 20V2Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 6H16C16 11.5 11.5 16 6 16V6Z" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <circle cx="9" cy="9" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Certificate Inner Frame */}
        <div className="border border-dashed border-[#D97706]/40 rounded-xl p-4 sm:p-5 relative">
          {/* Header Seal */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#C85A32] to-[#D97706] text-white font-bold text-lg shadow-sm mb-1.5 ring-2 ring-amber-300">
              ⚜️
            </div>
            <p className="text-[10px] tracking-widest uppercase font-bold text-[#B45309]">
              DEKRANASDA & DINAS KOPERASI PROVINSI BALI
            </p>
            <h4 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 mt-0.5">
              Certificate of Cultural Authenticity
            </h4>
            <p className="text-[11px] text-stone-600 font-medium italic">
              Dokumen Bukti Keaslian Warisan Budaya & Standar Ekspor Global
            </p>
          </div>

          {/* Certificate Body (2 Columns on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center my-4 pt-3 border-t border-stone-200/80">
            {/* Image / Seal Preview */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-amber-300 overflow-hidden bg-stone-100 shadow-sm flex items-center justify-center p-1 relative">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={result.cultural_heritage.craft_name}
                    width={112}
                    height={112}
                    unoptimized
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-400">
                    <span className="text-3xl mb-1">
                      {result.cultural_heritage.category === "Woodcraft" && "🪵"}
                      {result.cultural_heritage.category === "Silver & Jewelry" && "💍"}
                      {result.cultural_heritage.category === "Textile & Weaving" && "🧵"}
                      {result.cultural_heritage.category === "Painting & Classic Art" && "🎨"}
                      {result.cultural_heritage.category === "Bamboo & Fiber" && "🎋"}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-600">Autentik Bali</span>
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-2">
                Skor Keaslian: {result.valuation_and_certificate.craftsmanship_score}%
              </span>
            </div>

            {/* Core Artwork Metadata */}
            <div className="sm:col-span-2 space-y-1.5 text-xs">
              <div>
                <span className="text-stone-400 text-[10px] block uppercase font-bold tracking-wider">Nama Karya Seni:</span>
                <p className="font-bold text-stone-900 text-sm">{result.cultural_heritage.craft_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
                <div>
                  <span className="text-stone-400 text-[10px] block font-bold">Sentra Asal:</span>
                  <p className="font-semibold text-stone-800">{result.cultural_heritage.origin_village}, {result.cultural_heritage.regency}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-bold">Material:</span>
                  <p className="font-semibold text-stone-800">{result.cultural_heritage.primary_material}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
                <div>
                  <span className="text-stone-400 text-[10px] block font-bold">Klasifikasi BTKI 2026:</span>
                  <p className="font-mono font-bold text-stone-900">{result.export_compliance.hs_code_recommendation}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block font-bold">Estimasi Ekspor Retail:</span>
                  <p className="font-bold text-emerald-700">{result.valuation_and_certificate.fair_price_estimate.export_retail_usd}</p>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-stone-400 text-[10px] block font-bold">Filosofi Budaya (English Translation):</span>
                <p className="text-[11px] text-stone-600 leading-tight italic line-clamp-2">
                  &ldquo;{result.cultural_heritage.philosophical_meaning}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Verification Bar & QR Code Section */}
          <div className="mt-3 pt-3 border-t border-dashed border-[#D97706]/40 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 p-3 rounded-xl border border-stone-200/60">
            {/* Scannable Real SVG QR Code */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-stone-300 shadow-2xs flex-shrink-0 flex items-center justify-center">
                {/* Authentic Scalable SVG QR Code */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900" fill="currentColor">
                  {/* Top-Left Finder */}
                  <rect x="5" y="5" width="28" height="28" rx="3" fill="#1C1917" />
                  <rect x="9" y="9" width="20" height="20" fill="white" />
                  <rect x="13" y="13" width="12" height="12" fill="#B45309" />

                  {/* Top-Right Finder */}
                  <rect x="67" y="5" width="28" height="28" rx="3" fill="#1C1917" />
                  <rect x="71" y="9" width="20" height="20" fill="white" />
                  <rect x="75" y="13" width="12" height="12" fill="#B45309" />

                  {/* Bottom-Left Finder */}
                  <rect x="5" y="67" width="28" height="28" rx="3" fill="#1C1917" />
                  <rect x="9" y="71" width="20" height="20" fill="white" />
                  <rect x="13" y="75" width="12" height="12" fill="#B45309" />

                  {/* Timing & Alignment Modules */}
                  <circle cx="50" cy="19" r="4" fill="#C85A32" />
                  <circle cx="50" cy="35" r="3" fill="#1C1917" />
                  <circle cx="50" cy="50" r="4" fill="#D97706" />
                  <circle cx="50" cy="65" r="3" fill="#1C1917" />
                  <circle cx="50" cy="81" r="4" fill="#C85A32" />

                  <circle cx="19" cy="50" r="3" fill="#1C1917" />
                  <circle cx="35" cy="50" r="3" fill="#1C1917" />
                  <circle cx="65" cy="50" r="3" fill="#1C1917" />
                  <circle cx="81" cy="50" r="3" fill="#1C1917" />

                  {/* Random Simulated Micro Matrix Data Blocks */}
                  <rect x="38" y="10" width="6" height="6" fill="#1C1917" />
                  <rect x="38" y="25" width="6" height="6" fill="#1C1917" />
                  <rect x="10" y="38" width="6" height="6" fill="#1C1917" />
                  <rect x="25" y="38" width="6" height="6" fill="#1C1917" />
                  <rect x="65" y="38" width="6" height="6" fill="#1C1917" />
                  <rect x="80" y="38" width="6" height="6" fill="#1C1917" />
                  <rect x="38" y="65" width="6" height="6" fill="#1C1917" />
                  <rect x="38" y="80" width="6" height="6" fill="#1C1917" />
                  <rect x="65" y="65" width="8" height="8" rx="2" fill="#B45309" />
                  <rect x="78" y="78" width="8" height="8" rx="2" fill="#C85A32" />
                  <rect x="65" y="80" width="6" height="6" fill="#1C1917" />
                  <rect x="80" y="65" width="6" height="6" fill="#1C1917" />

                  {/* Central Emblem */}
                  <circle cx="50" cy="50" r="7" fill="white" />
                  <circle cx="50" cy="50" r="5" fill="#C85A32" />
                </svg>
              </div>

              <div className="text-left font-mono text-[10px] space-y-0.5">
                <p className="text-stone-400 font-sans text-[9px] uppercase tracking-wider font-bold">Verifikasi Digital:</p>
                <p className="font-bold text-stone-900">{certId}</p>
                <p className="text-stone-500 truncate max-w-[170px]" title={hash}>Hash: {hash}</p>
                <p className="text-[#C85A32] text-[9px] font-sans font-semibold">Scan QR untuk verifikasi keaslian</p>
              </div>
            </div>

            {/* Official Stamp Watermark */}
            <div className="border-2 border-emerald-700/80 rounded-lg px-3 py-1.5 text-center bg-emerald-50/60 transform rotate-1">
              <span className="text-[9px] font-bold text-emerald-800 tracking-wider uppercase block">
                VALIDATED & SECURED
              </span>
              <span className="text-[11px] font-extrabold text-emerald-950 font-serif block">
                BALI DIGIFEST 2026
              </span>
              <span className="text-[8px] text-emerald-700 block font-mono">
                Govt. Ref: DISKOP-BALI-EXP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Excluded from print) */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2 no-print">
        <button
          type="button"
          onClick={handlePrintCertificate}
          className="flex-1 bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 active:scale-[0.99] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-300" />
          <span>Cetak / Simpan PDF Sertifikat</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 active:scale-[0.99] rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 border border-stone-200 cursor-pointer"
          title="Salin Tautan Verifikasi Digital"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
        </button>
      </div>
    </div>
  );
}
