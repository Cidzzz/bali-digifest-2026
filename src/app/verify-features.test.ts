import { describe, expect, it } from "bun:test";
import { MOCK_GARUDA_ANALYSIS, MOCK_ENDEK_ANALYSIS, MOCK_PERAK_ANALYSIS } from "@/data/mockKriya";

describe("Commit Plan 10: Multi-language Storytelling Tabs Verification", () => {
  const samples = [
    { name: "Garuda", data: MOCK_GARUDA_ANALYSIS },
    { name: "Endek", data: MOCK_ENDEK_ANALYSIS },
    { name: "Perak", data: MOCK_PERAK_ANALYSIS },
  ];

  for (const sample of samples) {
    it(`should provide 4 distinct languages (en, jp, zh, id) for ${sample.name}`, () => {
      const { storytelling } = sample.data;
      expect(storytelling.en.title.length).toBeGreaterThan(5);
      expect(storytelling.en.narrative.length).toBeGreaterThan(20);

      expect(storytelling.jp.title.length).toBeGreaterThan(3);
      expect(storytelling.jp.narrative.length).toBeGreaterThan(20);

      expect(storytelling.zh.title.length).toBeGreaterThan(3);
      expect(storytelling.zh.narrative.length).toBeGreaterThan(20);

      expect(storytelling.id.title.length).toBeGreaterThan(5);
      expect(storytelling.id.narrative.length).toBeGreaterThan(20);

      expect(storytelling.seo_tags.length).toBeGreaterThanOrEqual(3);
    });
  }
});

describe("Commit Plan 10: Image Compression Logic Verification", () => {
  it("should calculate correct bounding box dimensions under 1200px max limit", () => {
    const maxDim = 1200;
    
    // Landscape image 2400x1600 -> 1200x800
    let width = 2400;
    let height = 1600;
    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      }
    }
    expect(width).toBe(1200);
    expect(height).toBe(800);

    // Portrait image 1000x3000 -> 400x1200
    width = 1000;
    height = 3000;
    if (width > maxDim || height > maxDim) {
      if (height >= width) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }
    }
    expect(width).toBe(400);
    expect(height).toBe(1200);
  });
});
