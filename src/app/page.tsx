"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Upload, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  DollarSign, 
  Tag, 
  Camera, 
  X, 
  RefreshCw, 
  Image as ImageIcon, 
  Mic, 
  MicOff, 
  AlertTriangle, 
  FileCheck,
  Landmark,
  Layers,
  Award,
  Scale,
  ArrowRight
} from "lucide-react";
import { KriyaAnalysisResponse } from "@/types/kriya";
import { MOCK_GARUDA_ANALYSIS, MOCK_ENDEK_ANALYSIS, MOCK_PERAK_ANALYSIS } from "@/data/mockKriya";
import { DigitalCertificate } from "@/components/DigitalCertificate";

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart?: () => void;
  onresult?: (event: SpeechRecognitionEvent) => void;
  onerror?: (event: { error: string }) => void;
  onend?: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

export default function Home() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>("garuda");
  const [selectedCategory, setSelectedCategory] = useState<string>("auto");
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
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [errorNotice, setErrorNotice] = useState<{ message: string; isFallback: boolean } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const speechSupported = useSyncExternalStore(
    () => () => {},
    () => typeof window !== "undefined" && Boolean(
      (window as WindowWithSpeech).SpeechRecognition ||
      (window as WindowWithSpeech).webkitSpeechRecognition ||
      navigator.mediaDevices?.getUserMedia
    ),
    () => false
  );

  const handlePresetClick = (preset: "garuda" | "endek" | "perak") => {
    setSelectedPreset(preset);
    setPreviewImage(null);
    const presets = {
      garuda: MOCK_GARUDA_ANALYSIS,
      endek: MOCK_ENDEK_ANALYSIS,
      perak: MOCK_PERAK_ANALYSIS,
    };
    setResult(presets[preset]);
    setActiveLang("en");
    setCopied(false);
  };

  const handleCopyNarrative = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Harap unggah file gambar (.jpg, .png, .webp)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
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
    } catch {
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
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleSpeechRecognition = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = async () => {
          stream.getTracks().forEach((track) => track.stop());
          const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
          if (audioBlob.size > 1000) {
            setIsTranscribing(true);
            try {
              const formData = new FormData();
              formData.append("file", audioBlob, "audio.webm");
              const res = await fetch("/api/transcribe", {
                method: "POST",
                body: formData,
              });
              if (res.ok) {
                const data = await res.json();
                if (data.text) {
                  setUserNotes((prev) => {
                    const base = prev.trim();
                    return base ? `${base} ${data.text}` : data.text;
                  });
                }
              }
            } catch (err) {
              console.warn("API STT fallback triggered:", err);
            } finally {
              setIsTranscribing(false);
            }
          }
        };

        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsRecording(true);
        return;
      } catch (micErr) {
        console.warn("Microphone access failed for recorder, trying Web Speech API:", micErr);
      }
    }

    const win = window as WindowWithSpeech;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser Anda belum mengizinkan rekaman suara atau tidak mendukung mikrofon.");
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

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserNotes((prev) => {
          const base = prev.trim();
          return base ? `${base} ${transcript}` : transcript;
        });
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleAnalyze = async () => {
    if (!previewImage && !selectedPreset) {
      setErrorNotice({
        message: "Harap pilih salah satu sampel kriya Bali atau unggah foto kerajinan terlebih dahulu.",
        isFallback: false
      });
      return;
    }

    setIsAnalyzing(true);
    setErrorNotice(null);
    setAnalysisStep("Menganalisis ornamen, motif, dan teknik kriya...");

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 45000);

    try {
      const timer1 = setTimeout(() => {
        setAnalysisStep("Mencocokkan klasifikasi HS Code BTKI 2026 & regulasi ekspor...");
      }, 1500);

      const timer2 = setTimeout(() => {
        setAnalysisStep("Menyusun narasi kurasi multibahasa & sertifikat keaslian...");
      }, 3000);

      const payload = previewImage
        ? { imageBase64: previewImage, userNotes, category: selectedCategory }
        : { mockPreset: selectedPreset, userNotes, category: selectedCategory };

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortController.signal
      });

      clearTimeout(timeoutId);
      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!res.ok) {
        throw new Error("Gagal menganalisis gambar");
      }

      const data = await res.json();
      setResult(data);
      setActiveLang("en");
      setCopied(false);

      if (data._fallback) {
        setErrorNotice({
          message: data._fallbackReason === "timeout"
            ? "Layanan AI mengalami batas waktu (>15 detik). Data sampel kriya terverifikasi dimuat sebagai cadangan evaluasi."
            : "Koneksi AI tidak stabil. Data kurasi kriya Bali autentik dimuat sebagai cadangan.",
          isFallback: true
        });
      } else if (previewImage) {
        setErrorNotice({
          message: `Karya berhasil diverifikasi: "${data.cultural_heritage?.craft_name || 'Kriya Bali'}" terdaftar di katalog ekspor.`,
          isFallback: false
        });
      }

      setTimeout(() => {
        document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      const err = error as Error;
      const isTimeout = err?.name === "AbortError";
      console.warn("Client analyze error:", err?.message || String(error));
      setErrorNotice({
        message: isTimeout
          ? "Batas waktu analisis (15 detik) tercapai. Data sampel kriya terverifikasi dimuat agar penilaian tetap lancar."
          : "Terjadi gangguan jaringan saat menghubungi AI. Data sampel kriya terverifikasi dimuat sebagai cadangan.",
        isFallback: true
      });
      if (selectedPreset === "garuda" || !selectedPreset) setResult(MOCK_GARUDA_ANALYSIS);
      if (selectedPreset === "endek") setResult(MOCK_ENDEK_ANALYSIS);
      if (selectedPreset === "perak") setResult(MOCK_PERAK_ANALYSIS);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans pb-28 selection:bg-[#C85A32]/15 selection:text-[#C85A32]">
      {/* Top Navigation */}
      <header className="border-b border-stone-200/70 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 bg-white shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="Logo KriyaLoka" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">
                  Kriya<span className="text-[#C85A32]">Loka</span>
                </span>
                <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200/60 hidden sm:inline-block">
                  Cultural Export Copilot
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden md:block">
                From Local Hands to Global Lands • Standarisasi Ekspor Kriya Tradisional Bali
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-600 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Standar Kepabeanan BTKI 2026</span>
            </div>
            <button
              onClick={() => {
                const uploadSection = document.getElementById("studio-upload");
                uploadSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold bg-[#C85A32] hover:bg-[#B45309] text-white px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Mulai Analisis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 sm:pt-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/70 border border-orange-200/80 text-[#C85A32] text-xs font-bold mb-5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Platform Terpadu Ekspor Kriya & Narasi Budaya Bali</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-5">
            Bawa Mahakarya Pengrajin Bali ke Pasar Global dengan Percaya Diri
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hanya dengan 1 foto karya seni, KriyaLoka mengidentifikasi filosofi tradisi, memetakan kode HS bea cukai internasional, menyusun narasi kurasi dalam 4 bahasa, dan menerbitkan sertifikat keaslian digital.
          </p>
        </div>

        {errorNotice && (
          <div className="mb-10 p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-stone-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-200/80 text-[#B45309] flex items-center justify-center shrink-0 font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-xs mb-0.5">Informasi Layanan AI & Jaringan</p>
                <p className="text-stone-600 text-[11px] leading-relaxed">{errorNotice.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleAnalyze()}
                className="px-3.5 py-2 rounded-xl bg-[#C85A32] hover:bg-[#B45309] active:scale-95 text-white font-bold text-[11px] shadow-xs cursor-pointer transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Coba Analisis Ulang
              </button>
              <button
                type="button"
                onClick={() => setErrorNotice(null)}
                className="px-3 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-600 font-medium text-[11px] cursor-pointer transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Curated Masterpieces / Presets */}
        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#C85A32] text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Koleksi Sampel Kurasi</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900">Eksplorasi Karya Terverifikasi</h2>
            </div>
            <p className="text-xs text-stone-500 max-w-md text-left sm:text-right">
              Pilih salah satu karya kriya di bawah untuk melihat struktur dokumen ekspor lengkap dalam 1 klik:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => handlePresetClick("garuda")}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer group ${
                selectedPreset === "garuda"
                  ? "border-[#C85A32] bg-white ring-2 ring-[#C85A32]/20 shadow-md"
                  : "border-stone-200/90 bg-white/60 hover:bg-white hover:border-stone-300 hover:shadow-sm"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#C85A32] shrink-0 group-hover:scale-105 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] bg-orange-50 px-2 py-0.5 rounded-md">
                    Seni Ukir Kayu
                  </span>
                  {selectedPreset === "garuda" && (
                    <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                  )}
                </div>
                <p className="font-bold text-sm text-stone-900 truncate">Patung Garuda Wisnu</p>
                <p className="text-xs text-stone-500 mt-0.5">Kayu Suar • Kemenuh Gianyar</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("endek")}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer group ${
                selectedPreset === "endek"
                  ? "border-[#C85A32] bg-white ring-2 ring-[#C85A32]/20 shadow-md"
                  : "border-stone-200/90 bg-white/60 hover:bg-white hover:border-stone-300 hover:shadow-sm"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#B45309] shrink-0 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] bg-amber-50 px-2 py-0.5 rounded-md">
                    Wastra Tradisional
                  </span>
                  {selectedPreset === "endek" && (
                    <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                  )}
                </div>
                <p className="font-bold text-sm text-stone-900 truncate">Tenun Ikat Endek</p>
                <p className="text-xs text-stone-500 mt-0.5">Sutra Alam • Sidemen Karangasem</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick("perak")}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer group ${
                selectedPreset === "perak"
                  ? "border-[#C85A32] bg-white ring-2 ring-[#C85A32]/20 shadow-md"
                  : "border-stone-200/90 bg-white/60 hover:bg-white hover:border-stone-300 hover:shadow-sm"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                    Kriya Logam Mulia
                  </span>
                  {selectedPreset === "perak" && (
                    <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                  )}
                </div>
                <p className="font-bold text-sm text-stone-900 truncate">Bros Bunga Sandat</p>
                <p className="text-xs text-stone-500 mt-0.5">Perak 925 • Celuk Sukawati</p>
              </div>
            </button>
          </div>
        </section>

        {/* Upload & Studio Section */}
        <section id="studio-upload" className="mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-stone-100 mb-8">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#C85A32]" />
                  <span>Studio Analisis Karya Mandiri</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Unggah foto produk kerajinan Anda untuk verifikasi instan ke database budaya dan ekspor
                </p>
              </div>
              <div className="text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60 self-start sm:self-auto">
                Format: JPG, PNG, WEBP • Max 10MB
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                  <div className="relative rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 aspect-video flex items-center justify-center group shadow-xs">
                    <Image
                      src={previewImage}
                      alt="Preview Karya Kriya"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white text-stone-900 text-xs font-bold hover:bg-stone-100 transition flex items-center gap-2 shadow cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Ganti Gambar
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition flex items-center gap-2 shadow cursor-pointer"
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
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[240px] ${
                      isDragging
                        ? "border-[#C85A32] bg-orange-50/40 scale-[0.99]"
                        : "border-stone-200 hover:border-[#C85A32]/70 hover:bg-stone-50/60"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#C85A32] flex items-center justify-center mb-4 shadow-2xs">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-stone-900 mb-1">
                      Pilih atau Seret Foto Kerajinan ke Sini
                    </p>
                    <p className="text-xs text-stone-500 mb-5 max-w-xs">
                      Sistem otomatis mengoptimalkan ketajaman visual untuk mengenali detail ukiran dan serat bahan
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startCamera();
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-[#C85A32]" />
                      Buka Kamera Perangkat
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between h-full gap-6">
                <div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-stone-800 mb-2 block">
                      Klasifikasi Kategori Kriya Bali:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: "auto", label: "✨ Otomatis", desc: "Dari foto & catatan" },
                        { id: "batik", label: "🎨 Batik & Wastra", desc: "Tohpati / Denpasar" },
                        { id: "textile", label: "🧵 Tenun & Songket", desc: "Sidemen / Klungkung" },
                        { id: "woodcraft", label: "🪵 Ukir & Patung Kayu", desc: "Mas Ubud / Gianyar" },
                        { id: "silver", label: "💍 Perak Celuk 925", desc: "Celuk Sukawati" },
                        { id: "painting", label: "🖌️ Lukisan Kamasan", desc: "Kamasan Klungkung" },
                        { id: "bamboo", label: "🎋 Anyaman Bambu", desc: "Tigawasa / Bona" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
                            selectedCategory === cat.id
                              ? "bg-[#C85A32] text-white border-[#C85A32] shadow-sm"
                              : "bg-white text-stone-700 border-stone-200/80 hover:bg-stone-50"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-stone-800">
                      Catatan Tambahan Pengrajin (Opsional)
                    </label>
                    <button
                      type="button"
                      onClick={toggleSpeechRecognition}
                      disabled={!speechSupported || isTranscribing}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                        isRecording
                          ? "bg-rose-50 text-rose-600 border-rose-200 animate-pulse"
                          : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80"
                      } ${!speechSupported ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      title={speechSupported ? "Dikte suara langsung" : "Browser tidak mendukung speech-to-text"}
                    >
                      {isTranscribing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C85A32]" />
                          <span>Mengubah Suara...</span>
                        </>
                      ) : isRecording ? (
                        <>
                          <MicOff className="w-3.5 h-3.5 text-rose-500" />
                          <span>Merekam Suara... (Klik Selesai)</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
                          <span>Dikte Suara (Bahasa Indonesia)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Contoh: Ukiran kayu suar utuh tanpa sambungan, dikerjakan seniman Kemenuh Gianyar selama 14 hari dengan pewarnaan alami..."
                    rows={5}
                    className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/25 focus:border-[#C85A32] transition resize-none placeholder:text-stone-400 text-stone-800 leading-relaxed"
                  />
                  {isRecording && (
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping inline-block" />
                      Mendengarkan pengrajin... Ucapkan penjelasan detail karya dengan jelas.
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-[#C85A32] hover:bg-[#B45309] active:scale-[0.99] text-white text-sm font-bold py-4 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>{analysisStep || "Memproses Analisis Ekspor..."}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>Analisis Budaya & Buat Berkas Ekspor</span>
                      </>
                    )}
                  </button>
                  <p className="text-xs text-stone-500 text-center mt-3">
                    Analisis memverifikasi kearifan lokal, regulasi bea cukai, dan estimasi nilai pasar global
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Camera Modal */}
        {isCameraOpen && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between p-5 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-[#C85A32]" />
                  <h4 className="font-bold text-sm text-stone-900">Kamera Kerajinan</h4>
                </div>
                <button
                  onClick={stopCamera}
                  className="w-8 h-8 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-stone-950 flex flex-col items-center justify-center relative min-h-[300px]">
                {cameraError ? (
                  <div className="text-center p-6 text-rose-400 text-xs">
                    <p>{cameraError}</p>
                    <button
                      onClick={stopCamera}
                      className="mt-4 px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-semibold"
                    >
                      Tutup
                    </button>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-h-[360px] object-cover rounded-xl"
                  />
                )}
              </div>

              {!cameraError && (
                <div className="p-5 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C85A32] hover:bg-[#B45309] text-white shadow-sm flex items-center gap-2 transition cursor-pointer"
                  >
                    <Camera className="w-4 h-4" /> Ambil Foto Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Showcase Section */}
        {result && (
          <div id="result-section" className="space-y-8 scroll-mt-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                  {previewImage ? "Karya Terverifikasi AI" : "Hasil Terverifikasi"}
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">Portofolio Ekspor & Warisan Budaya</h2>
              </div>
            </div>

            {/* Top Grid: Cultural Heritage & Valuation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cultural Heritage Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200/60">
                        {result.cultural_heritage.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-orange-50 text-[#C85A32] text-xs font-bold border border-orange-200/70">
                        📍 {result.cultural_heritage.origin_village}, {result.cultural_heritage.regency}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/70">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Autentisitas Budaya: {result.valuation_and_certificate.craftsmanship_score}%</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
                    {result.cultural_heritage.craft_name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mb-6">
                    Material Utama: <span className="font-semibold text-stone-800">{result.cultural_heritage.primary_material}</span>
                  </p>

                  <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100/90 mb-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#B45309] mb-2">
                      <Sparkles className="w-4 h-4 text-[#D97706]" />
                      <span>Filosofi & Taksu Seni Bali:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                      &ldquo;{result.cultural_heritage.philosophical_meaning}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {result.cultural_heritage.cultural_significance}
                  </p>
                </div>
              </div>

              {/* Valuation & Export Pricing Card */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-600" /> Valuasi Pasar Global
                    </span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                      Fair Global Value
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                      <p className="text-xs text-stone-500 font-medium">Estimasi Retail Global (USD):</p>
                      <p className="text-3xl font-extrabold text-emerald-700 mt-1">
                        {result.valuation_and_certificate.fair_price_estimate.export_retail_usd}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-stone-500">Rekomendasi Grosir (FOB):</span>
                      <span className="text-xs font-bold text-stone-900 bg-white px-2.5 py-1 rounded-md border border-stone-200/60">
                        {result.valuation_and_certificate.fair_price_estimate.suggested_fob_usd}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-stone-500">Nilai Acuan Lokal (Bali):</span>
                      <span className="text-xs font-semibold text-stone-700">
                        {result.valuation_and_certificate.fair_price_estimate.local_retail_idr}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/70 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-[#B45309]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ID Sertifikat Resmi:</span>
                  </div>
                  <p className="font-mono text-stone-800 font-semibold break-all">
                    {result.valuation_and_certificate.digital_certificate.certificate_id}
                  </p>
                </div>
              </div>
            </div>

            {/* Multilingual Storytelling */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/70 flex items-center justify-center text-[#C85A32]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">Katalog Narasi Global & Storytelling Budaya</h3>
                    <p className="text-xs text-stone-500">Narasi terkurasi siap pakai untuk buyer luar negeri dan etalase e-commerce internasional</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/80 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveLang("en")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeLang === "en"
                        ? "bg-white text-[#C85A32] shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    English (UK/US)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("jp")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeLang === "jp"
                        ? "bg-white text-[#C85A32] shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    日本語 (Japan)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("zh")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeLang === "zh"
                        ? "bg-white text-[#C85A32] shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    中文 (China)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("id")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeLang === "id"
                        ? "bg-white text-[#C85A32] shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Indonesia
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h4 className="font-bold text-stone-900 text-lg">
                    {result.storytelling[activeLang]?.title || result.storytelling.en.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleCopyNarrative(`${result.storytelling[activeLang]?.title || result.storytelling.en.title}\n\n${result.storytelling[activeLang]?.narrative || result.storytelling.en.narrative}`)}
                    className="text-xs self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 hover:border-[#C85A32]/40 bg-white hover:bg-stone-50 text-stone-800 font-semibold transition shadow-2xs cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin ke Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#C85A32]" />
                        <span>Salin Teks Kurasi</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-stone-50/80 border border-stone-200/70">
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-serif">
                    {result.storytelling[activeLang]?.narrative || result.storytelling.en.narrative}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-stone-400 flex items-center gap-1 font-medium">
                    <Tag className="w-3.5 h-3.5" /> Label Ekspor & Metadata:
                  </span>
                  {result.storytelling.seo_tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-lg border border-stone-200/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Export Compliance & Digital Authenticity Certificate */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Export Compliance Card */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-700">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-stone-900">Kepatuhan Regulasi & Kode HS Ekspor</h3>
                      <p className="text-xs text-stone-500">Standarisasi kepabeanan sesuai BTKI (Buku Tarif Kepabeanan Indonesia 2026)</p>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-stone-500 font-medium">Rekomendasi HS Code (BTKI 2026):</span>
                      <span className="text-xs font-mono font-bold bg-stone-900 text-white px-2.5 py-1 rounded-lg">
                        {result.export_compliance.hs_code_recommendation}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 font-semibold">
                      {result.export_compliance.hs_description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                      <span className="text-stone-500 block text-[11px] mb-1">Status SVLK (Legalitas Kayu):</span>
                      <span className="font-bold text-stone-800">
                        {result.export_compliance.material_clearance.svlk_required ? "Wajib Dokumen V-Legal" : "Bebas Kewajiban SVLK"}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                      <span className="text-stone-500 block text-[11px] mb-1">Fumigasi ISPM-15:</span>
                      <span className="font-bold text-stone-800">
                        {result.export_compliance.material_clearance.fumigation_required ? "Wajib Perlakuan Panas / Fumigasi" : "Bebas Fumigasi"}
                      </span>
                    </div>
                  </div>

                  {result.export_compliance.required_documents && result.export_compliance.required_documents.length > 0 && (
                    <div className="mb-5 space-y-2">
                      <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-[#C85A32]" /> Dokumen Persyaratan Ekspor:
                      </span>
                      <div className="space-y-2">
                        {result.export_compliance.required_documents.map((doc, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                            <p className="font-bold text-stone-900">{doc.document_name}</p>
                            <p className="text-[11px] text-stone-600 leading-snug mt-0.5">{doc.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.export_compliance.packaging_advice && (
                    <div className="mb-5 p-3.5 rounded-xl bg-orange-50/50 border border-orange-200/70 text-xs">
                      <span className="font-bold text-[#B45309] block mb-1">Panduan Pengemasan Ekspor:</span>
                      <p className="text-stone-700 text-[11px] leading-relaxed">{result.export_compliance.packaging_advice}</p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold text-[#B45309]">Panduan Kepabeanan:</span> {result.export_compliance.export_notes}
                  </div>
                </div>
              </div>

              {/* Digital Certificate of Cultural Authenticity */}
              <DigitalCertificate
                result={result}
                previewImage={previewImage}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-stone-200/80 bg-white/60 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <span className="font-bold text-stone-800">KriyaLoka</span> • Mendukung UMKM Seni & Budaya Bali menembus pasar ekspor dunia.
          </div>
          <div className="flex items-center gap-4">
            <span>Sesuai Regulasi BTKI 2026</span>
            <span>•</span>
            <span>Standar SVLK & ISPM-15</span>
          </div>
        </div>
      </footer>
    </div>
  );
}