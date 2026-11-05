import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const sttModel = process.env.STT_MODEL_NAME || "gemini/gemini-2.5-flash";
    const sttEndpoint =
      process.env.STT_ENDPOINT ||
      "https://r.dwiai.web.id/v1/audio/transcriptions";

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const upstreamFormData = new FormData();
    upstreamFormData.append("file", file, "recording.webm");
    upstreamFormData.append("model", sttModel);
    upstreamFormData.append("language", "id");

    const upstreamRes = await fetch(sttEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: upstreamFormData,
      signal: AbortSignal.timeout(30000),
    });

    if (!upstreamRes.ok) {
      const errText = await upstreamRes.text();
      console.error("STT upstream error:", upstreamRes.status, errText);
      return NextResponse.json(
        { error: `STT service error (${upstreamRes.status})` },
        { status: upstreamRes.status }
      );
    }

    const data = await upstreamRes.json();
    return NextResponse.json({
      text: data.text || "",
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Transcription error:", err?.message || String(error));
    return NextResponse.json(
      { error: "Gagal memproses transkripsi suara" },
      { status: 500 }
    );
  }
}
