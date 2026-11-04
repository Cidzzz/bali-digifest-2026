export interface CulturalHeritage {
  craft_name: string;
  category: "Woodcraft" | "Silver & Jewelry" | "Textile & Weaving" | "Painting & Classic Art" | "Bamboo & Fiber";
  origin_village: string;
  regency: "Gianyar" | "Klungkung" | "Karangasem" | "Bangli" | "Denpasar" | "Badung" | "Buleleng" | "Tabanan" | "Jembrana";
  primary_material: string;
  philosophical_meaning: string;
  cultural_significance: string;
}

export interface Storytelling {
  en: { title: string; narrative: string; short_desc: string };
  jp: { title: string; narrative: string; short_desc: string };
  zh: { title: string; narrative: string; short_desc: string };
  id: { title: string; narrative: string; short_desc: string };
  seo_tags: string[];
}

export interface ExportDocument {
  document_name: string;
  reason: string;
}

export interface ExportCompliance {
  hs_code_recommendation: string;
  hs_description: string;
  confidence_level?: string;
  material_clearance: {
    is_restricted: boolean;
    cites_warning: string | null;
    svlk_required: boolean;
    fumigation_required: boolean;
  };
  required_documents?: ExportDocument[];
  packaging_advice?: string;
  export_notes: string;
}

export interface ValuationAndCertificate {
  fair_price_estimate: {
    local_retail_idr: string;
    export_retail_usd: string;
    suggested_fob_usd: string;
  };
  craftsmanship_score: number;
  estimated_production_days?: number;
  value_drivers?: string[];
  digital_certificate: {
    certificate_id: string;
    artisan_attribution: string;
    verification_hash: string;
  };
}

export interface KriyaAnalysisResponse {
  cultural_heritage: CulturalHeritage;
  storytelling: Storytelling;
  export_compliance: ExportCompliance;
  valuation_and_certificate: ValuationAndCertificate;
}
