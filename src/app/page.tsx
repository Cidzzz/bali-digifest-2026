"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Upload, 
  Globe, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Loader2,
  DollarSign,
  Tag,
  Camera,
  X,
  RefreshCw,
  Image as ImageIcon,
  Mic,
  MicOff
} from "lucide-react";
import { KriyaAnalysisResponse } from "@/types/kriya";
import { MOCK_GARUDA_ANALYSIS, MOCK_ENDEK_ANALYSIS, MOCK_PERAK_ANALYSIS } from "@/data/mockKriya";

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>("garuda");
  const [result, setResult] = useState<KriyaAnalysisResponse | null>(MOCK_GARUDA_ANALYSIS);
  const [activeLang, setActiveLang] = useState<"en" | "jp" | "zh" | "id">("en");
  const [copied, setCopied] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  const handlePresetClick = (preset: "garuda" | "endek" | "perak") => {
    setSelectedPreset(preset);
    setPreviewImage(null);
    let presetData = MOCK_GARUDA_ANALYSIS;
    if (preset === "garuda") presetData = MOCK_GARUDA_ANALYSIS;
    if (preset === "endek") presetData = MOCK_ENDEK_ANALYSIS;
    if (preset === "perak") presetData = MOCK_PERAK_ANALYSIS;
    setResult(presetData);
    setActiveLang("en");
    setCopied(false);
  };

  const handleCopyNarrative = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Harap unggah file gambar (.jpg, .png, .webp)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
        setPreviewImage(compressedBase64);
        setSelectedPreset(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      setCameraError("Tidak dapat mengakses kamera. Pastikan izin kamera telah diaktifkan.");
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoBase64 = canvas.toDataURL("image/jpeg", 0.85);
      setPreviewImage(photoBase64);
      setSelectedPreset(null);
      stopCamera();
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser Anda tidak mendukung Web Speech API. Silakan gunakan Google Chrome atau Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserNotes((prev) => {
          const base = prev.trim();
          return base ? `${base} ${transcript}` : transcript;
        });
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  const handleAnalyze = async () => {
    if (!previewImage && !selectedPreset) {
      alert("Harap pilih salah satu preset sampel atau unggah foto kerajinan terlebih dahulu.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep("Menganalisis motif & teknik ukir kriya Bali...");

    try {
      const timer1 = setTimeout(() => {
        setAnalysisStep("Mencocokkan klasifikasi HS-Code BTKI 2026 & regulasi ekspor...");
      }, 1500);

      const timer2 = setTimeout(() => {
        setAnalysisStep("Menyusun narasi storytelling budaya dalam 4 bahasa...");
      }, 2800);

      const payload = previewImage
        ? { imageBase64: previewImage, userNotes }
        : { mockPreset: selectedPreset, userNotes };

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!res.ok) {
        throw new Error("Gagal menganalisis gambar");
      }

      const data = await res.json();
      setResult(data);
      setActiveLang("en");
      setCopied(false);
    } catch (error) {
      console.error(error);
      alert("Terjadi kendala saat menganalisis. Menampilkan preset sampel sebagai cadangan.");
      if (selectedPreset === "garuda" || !selectedPreset) setResult(MOCK_GARUDA_ANALYSIS);
      if (selectedPreset === "endek") setResult(MOCK_ENDEK_ANALYSIS);
      if (selectedPreset === "perak") setResult(MOCK_PERAK_ANALYSIS);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans pb-20 selection:bg-[#C85A32]/20 selection:text-[#C85A32]">
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C85A32] to-[#D97706] flex items-center justify-center text-white shadow-md shadow-orange-950/10 font-bold text-xl ring-2 ring-amber-400/30">
              K
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-stone-900">
                Kriya<span className="text-[#C85A32]">Loka</span> <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-[#B45309] border border-amber-300">AI Copilot</span>
              </span>
              <p className="text-xs text-stone-500 hidden sm:block">From Local Hands to Global Lands • Bali Heritage Export Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#B45309] bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/80 shadow-2xs">
              Bali DigiFest 2026 MVP
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-300 text-[#C85A32] text-xs font-bold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Zero-Prompt Multimodal AI untuk Pengrajin Bali</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-3">
            Dari Tangan Seniman Bali Menembus Panggung Dunia
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Cukup 1 foto kerajinan. Dapatkan identifikasi filosofi motif Bali, narasi ekspor 4 bahasa, cek kepatuhan kode HS Bea Cukai, serta sertifikat keaslian digital otomatis.
          </p>
        </div>

        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D97706]" /> Mode Uji Cepat Juri (One-Click Sample)
            </span>
            <span className="text-xs text-stone-500">Pilih sampel karya autentik Bali di bawah untuk simulasi langsung:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <button
              type="button"
              onClick={() => handlePresetClick("garuda")}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                selectedPreset === "garuda"
                  ? "border-[#C85A32] bg-gradient-to-r from-orange-50/90 to-amber-50/50 ring-2 ring-[#C85A32]/30 shadow-xs"
                  : "border-stone-200/80 hover:border-amber-400 bg-stone-50/60"
              }`}
            >
              <div className="w-11 h-11 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-xl shadow-2xs">🪵</div>
              <div>
                <p className="font-bold text-xs text-stone-900">Patung Garuda Wisnu</p>
                <p className="text-[11px] text-[#B45309] font-medium">Kayu Suar • Kemenuh Gianyar</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("endek")}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                selectedPreset === "endek"
                  ? "border-[#C85A32] bg-gradient-to-r from-orange-50/90 to-amber-50/50 ring-2 ring-[#C85A32]/30 shadow-xs"
                  : "border-stone-200/80 hover:border-amber-400 bg-stone-50/60"
              }`}
            >
              <div className="w-11 h-11 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-xl shadow-2xs">🧵</div>
              <div>
                <p className="font-bold text-xs text-stone-900">Tenun Ikat Endek</p>
                <p className="text-[11px] text-[#B45309] font-medium">Sutra Alami • Sidemen Karangasem</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("perak")}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                selectedPreset === "perak"
                  ? "border-[#C85A32] bg-gradient-to-r from-orange-50/90 to-amber-50/50 ring-2 ring-[#C85A32]/30 shadow-xs"
                  : "border-stone-200/80 hover:border-amber-400 bg-stone-50/60"
              }`}
            >
              <div className="w-11 h-11 rounded-lg bg-amber-100/70 border border-amber-300 flex items-center justify-center text-xl shadow-2xs">💍</div>
              <div>
                <p className="font-bold text-xs text-stone-900">Bros Bunga Sandat</p>
                <p className="text-[11px] text-[#B45309] font-medium">Perak 925 • Celuk Sukawati</p>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-8 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#C85A32]" /> Unggah Foto Kerajinan Kriya Bali
            </h3>
            <span className="text-xs text-stone-500">Mendukung JPG, PNG, WEBP (Maks 5MB)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    processFile(e.target.files[0]);
                  }
                  e.target.value = "";
                }}
                accept="image/*"
                className="hidden"
              />

              {previewImage ? (
                <div className="relative rounded-xl border border-stone-200 overflow-hidden bg-stone-50 aspect-video flex items-center justify-center group">
                  <img
                    src={previewImage}
                    alt="Preview Karya Kriya"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-white/90 text-stone-900 text-xs font-semibold hover:bg-white transition flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Ganti Foto
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewImage(null)}
                      className="px-3 py-1.5 rounded-lg bg-red-600/90 text-white text-xs font-semibold hover:bg-red-600 transition flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[190px] ${
                    isDragging
                      ? "border-[#C85A32] bg-orange-50/50"
                      : "border-stone-200 hover:border-[#C85A32]/60 hover:bg-stone-50/70"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-[#C85A32] flex items-center justify-center mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-stone-800 mb-1">
                    Klik untuk pilih foto atau seret ke area ini
                  </p>
                  <p className="text-[11px] text-stone-500 mb-4">
                    Kompresi otomatis di browser untuk respons AI ultra-cepat
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C85A32]" />
                    Ambil dari Kamera Langsung
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Catatan Pengrajin (Opsional):
                  </label>
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    disabled={!speechSupported}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                      isRecording
                        ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                    } ${!speechSupported ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    title={speechSupported ? "Rekam suara pengrajin dalam Bahasa Indonesia" : "Web Speech API tidak didukung browser ini"}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-3.5 h-3.5 text-red-500" />
                        <span>Merekam... Klik Berhenti</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Bicara (Suara ID)</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Misal: Ukiran Garuda kayu suar utuh tanpa sambungan, pengerjaan 14 hari, modal bahan Rp 450.000..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] transition resize-none placeholder:text-stone-400 text-stone-800"
                />
                {isRecording && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                    Mendengarkan suara pengrajin... Ucapkan detail karya dalam Bahasa Indonesia.
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-[#C85A32] to-[#D97706] hover:from-[#B45309] hover:to-[#B45309] active:scale-[0.99] text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{analysisStep || "Menganalisis Karya Kriya..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analisis & Buat Paket Ekspor (AI)</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2">
                  Memeriksa filosofi budaya Bali, HS Code BTKI 2026, dan sertifikat digital
                </p>
              </div>
            </div>
          </div>
        </div>

        {isCameraOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between p-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#C85A32]" />
                  <h4 className="font-bold text-sm text-stone-900">Ambil Foto Karya Kriya</h4>
                </div>
                <button
                  onClick={stopCamera}
                  className="w-8 h-8 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-stone-950 flex flex-col items-center justify-center relative min-h-[300px]">
                {cameraError ? (
                  <div className="text-center p-6 text-red-400 text-xs">
                    <p>{cameraError}</p>
                    <button
                      onClick={stopCamera}
                      className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-lg text-xs"
                    >
                      Tutup
                    </button>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-h-[360px] object-cover rounded-lg"
                  />
                )}
              </div>

              {!cameraError && (
                <div className="p-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C85A32] hover:bg-[#B45309] text-white shadow flex items-center gap-2 transition cursor-pointer"
                  >
                    <Camera className="w-4 h-4" /> Ambil Foto
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Area */}
        {result && (
          <div className="space-y-6">
            {/* Top Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cultural Heritage Card */}
              <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200/60">
                      {result.cultural_heritage.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-[#C85A32] text-xs font-bold border border-orange-200/80">
                      📍 {result.cultural_heritage.origin_village}, {result.cultural_heritage.regency}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Skor Keaslian Budaya: {result.valuation_and_certificate.craftsmanship_score}%</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                  {result.cultural_heritage.craft_name}
                </h2>
                <p className="text-xs text-stone-500 mb-4">
                  Material Pokok: <span className="font-semibold text-stone-800">{result.cultural_heritage.primary_material}</span>
                </p>

                <div className="p-4 rounded-xl bg-orange-50/40 border border-orange-100 space-y-2 mb-4">
                  <p className="text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Filosofi Makna Budaya (Taksu Seni Bali):
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{result.cultural_heritage.philosophical_meaning}"
                  </p>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {result.cultural_heritage.cultural_significance}
                </p>
              </div>

              {/* Valuation & Export Pricing Card */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-600" /> Estimasi Harga Ekspor
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                      Fair Global Value
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100/80">
                      <p className="text-[11px] text-stone-500 font-medium">Pasar Ekspor Global (Retail USD):</p>
                      <p className="text-2xl font-extrabold text-emerald-700">
                        {result.valuation_and_certificate.fair_price_estimate.export_retail_usd}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-stone-500">Rekomendasi FOB Grosir:</span>
                      <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                        {result.valuation_and_certificate.fair_price_estimate.suggested_fob_usd}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-stone-500">Estimasi Ritel Lokal (Bali):</span>
                      <span className="text-xs font-semibold text-stone-700">
                        {result.valuation_and_certificate.fair_price_estimate.local_retail_idr}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  <p className="font-bold mb-0.5 text-[#B45309]">Sertifikat Keaslian Terbit:</p>
                  <p className="font-mono text-stone-700 font-semibold">{result.valuation_and_certificate.digital_certificate.certificate_id}</p>
                </div>
              </div>
            </div>

            {/* Middle Section: Storytelling 4 Languages */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#C85A32]" />
                  <h3 className="font-bold text-base text-stone-900">Katalog Ekspor & Storytelling Budaya Multilingual</h3>
                </div>

                <div className="flex items-center gap-1.5 bg-stone-100/90 p-1 rounded-xl border border-stone-200/80">
                  <button
                    type="button"
                    onClick={() => setActiveLang("en")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeLang === "en"
                        ? "bg-white text-[#C85A32] shadow-sm ring-1 ring-stone-200"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("jp")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeLang === "jp"
                        ? "bg-white text-[#C85A32] shadow-sm ring-1 ring-stone-200"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    🇯🇵 日本語
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("zh")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeLang === "zh"
                        ? "bg-white text-[#C85A32] shadow-sm ring-1 ring-stone-200"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    🇨🇳 中文
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("id")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeLang === "id"
                        ? "bg-white text-[#C85A32] shadow-sm ring-1 ring-stone-200"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
                    }`}
                  >
                    🇮🇩 Indonesia
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-bold text-stone-900 text-base sm:text-lg">
                    {result.storytelling[activeLang]?.title || result.storytelling.en.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleCopyNarrative(`${result.storytelling[activeLang]?.title || result.storytelling.en.title}\n\n${result.storytelling[activeLang]?.narrative || result.storytelling.en.narrative}`)}
                    className="text-xs self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-amber-400 bg-white hover:bg-stone-50 text-stone-700 font-medium transition shadow-2xs cursor-pointer active:scale-95"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C85A32]" />}
                    <span>{copied ? "Tersalin ke Clipboard!" : "Salin Judul & Narasi"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/70 p-4 rounded-xl border border-stone-200/70">
                  {result.storytelling[activeLang]?.narrative || result.storytelling.en.narrative}
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

              <div className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 rounded-2xl p-6 border-2 border-amber-300/80 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 to-transparent pointer-events-none rounded-bl-full" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#D97706]" /> Digital Authenticity Card
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-[#B45309] border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                      BALI HERITAGE VERIFIED
                    </span>
                  </div>

                  <div className="border-2 border-dashed border-amber-400/80 p-5 rounded-xl bg-white/90 mb-4 text-center shadow-xs">
                    <div className="flex justify-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-[#B45309] flex items-center justify-center text-xs font-bold">
                        ⚜️
                      </div>
                    </div>
                    <p className="text-[10px] tracking-widest uppercase text-[#B45309] font-bold mb-1">
                      Dinas Perindustrian & Koperasi Provinsi Bali
                    </p>
                    <h4 className="font-serif font-bold text-lg text-stone-900 mb-1">
                      Certificate of Cultural Authenticity
                    </h4>
                    <p className="text-xs text-stone-600 mb-3">
                      Sertifikat Verifikasi Keaslian & Standar Ekspor Kriya Tradisional Bali
                    </p>

                    <div className="text-left bg-stone-50 border border-stone-200/70 p-3 rounded-lg text-[11px] space-y-1 font-mono">
                      <div><span className="text-stone-400">Cert ID:</span> <span className="font-semibold text-stone-800">{result.valuation_and_certificate.digital_certificate.certificate_id}</span></div>
                      <div><span className="text-stone-400">Attribution:</span> <span className="font-semibold text-stone-800">{result.valuation_and_certificate.digital_certificate.artisan_attribution}</span></div>
                      <div><span className="text-stone-400">Cryptographic Hash:</span> <span className="text-[#C85A32] font-semibold">{result.valuation_and_certificate.digital_certificate.verification_hash}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={handlePrintCertificate}
                    className="flex-1 bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 active:scale-[0.99] text-white text-xs font-bold py-3 rounded-xl shadow transition cursor-pointer"
                  >
                    Cetak / Simpan PDF Sertifikat
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
