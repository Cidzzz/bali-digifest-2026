import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { MOCK_GARUDA_ANALYSIS, MOCK_ENDEK_ANALYSIS, MOCK_PERAK_ANALYSIS } from "@/data/mockKriya";

const SYSTEM_INSTRUCTION = `You are KriyaLoka AI, an elite Balinese Cultural Heritage & International Export Compliance Specialist.
Your mission is to empower Balinese artisans to export their handmade crafts globally without intermediaries.

You will receive an image of a Balinese handicraft (woodcarving, silver jewelry, textile/endek, painting, stone/bamboo) and an optional voice/text note from the artisan.

You MUST respond strictly with a valid JSON object matching the provided JSON schema. No markdown backticks, no markdown wrapping, no explanation text outside the JSON.

Rules:
1. Category must be one of: "Woodcraft", "Silver & Jewelry", "Textile & Weaving", "Painting & Classic Art", "Bamboo & Fiber".
2. Regency must be one of the 9 regencies of Bali: "Gianyar", "Klungkung", "Karangasem", "Bangli", "Denpasar", "Badung", "Buleleng", "Tabanan", "Jembrana".
3. Provide culturally rich, philosophical storytelling in 4 languages: English, Japanese, Chinese Mandarin, and Bahasa Indonesia.
4. Recommend the most accurate BTKI 2026 HS Code (6 to 8 digits) and identify timber legalities (SVLK), CITES restrictions, and fumigation needs (ISPM 15).
5. Estimate fair local retail (IDR) and global export retail (USD).`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType = "image/jpeg", userNotes = "", mockPreset } = body;

    // Fast response for Judge Presets or fallback mock
    if (mockPreset === "garuda") {
      return NextResponse.json(MOCK_GARUDA_ANALYSIS);
    }
    if (mockPreset === "endek") {
      return NextResponse.json(MOCK_ENDEK_ANALYSIS);
    }
    if (mockPreset === "perak") {
      return NextResponse.json(MOCK_PERAK_ANALYSIS);
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback to mock data if API key is not configured yet
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      console.warn("GEMINI_API_KEY is not configured. Returning Garuda mock data.");
      return NextResponse.json(MOCK_GARUDA_ANALYSIS);
    }

    if (!imageBase64) {
      return NextResponse.json(
        { error: "imageBase64 is required" },
        { status: 400 }
      );
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const ai = new GoogleGenAI({ apiKey });

    const promptText = `Analyze this Balinese handicraft image.
Artisan's additional note: "${userNotes || "Tidak ada catatan tambahan."}"

Extract cultural heritage, 4-language storytelling, HS code & export compliance, and fair valuation. Return pure JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: promptText },
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType,
              },
            },
          ],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim() || "{}";
    const parsedData = JSON.parse(text);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("KriyaLoka API Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze handicraft", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
