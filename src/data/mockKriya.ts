import { KriyaAnalysisResponse } from "@/types/kriya";

export const MOCK_GARUDA_ANALYSIS: KriyaAnalysisResponse = {
  cultural_heritage: {
    craft_name: "Patung Ukir Garuda Wisnu Kencana",
    category: "Woodcraft",
    origin_village: "Desa Mas, Ubud",
    regency: "Gianyar",
    primary_material: "Kayu Suar (Albizia saman)",
    philosophical_meaning: "Melambangkan kesetiaan, perlindungan kosmik, dan kekuatan dharma memelihara tatanan alam semesta.",
    cultural_significance: "Karya warisan pemahat tradisional Gianyar yang dikerjakan dengan pahatan tangan detail bertingkat."
  },
  storytelling: {
    en: {
      title: "Sacred Guardian: Balinese Hand-Carved Suar Garuda",
      narrative: "Carved from a single block of sustainably sourced Suar wood by master sculptors of Mas Village, this majestic sculpture depicts Garuda, the mythical bird and celestial mount of Lord Vishnu. In Balinese Hindu philosophy, Garuda embodies absolute loyalty, fearlessness, and the eternal fight against injustice. Every feather is chiseled by hand across 14 days of meticulous devotion.",
      short_desc: "Masterpiece hand-carved Garuda sculpture from Gianyar, Bali in solid suar wood."
    },
    jp: {
      title: "神聖なる守護者：バリ島マス村の手彫りガルーダ像",
      narrative: "芸術の村として知られるバリ島マス村の熟練彫刻師によって、持続可能なスアール木の一枚板から彫り出されたガルーダ像です。ヒンドゥー教の教えにおいて、ガルーダはヴィシュヌ神の聖なる乗り物であり、忠誠と悪を打ち破る勇気の象徴です。14日間かけて緻密に彫り込まれた羽のディテールは、バリの精神性と工芸美の結晶です。",
      short_desc: "バリ島マス村の伝統工芸士による天然スアール木の手彫りガルーダ神聖像。"
    },
    zh: {
      title: "神圣守护者：巴厘岛传统手雕苏木迦楼罗神鸟",
      narrative: "由巴厘岛著名雕刻之乡玛斯村（Mas Village）手工艺大师采用整块环保苏木（Suar Wood）历经14天手工精雕细琢而成。迦楼罗是印度教三大主神之一毗湿奴的神圣坐骑，在巴厘文化中象征着忠贞不渝的品格、勇气以及战胜邪恶的光明力量。",
      short_desc: "巴厘岛吉安雅名师亲手雕刻，珍贵苏木迦楼罗护佑艺术摆件。"
    },
    id: {
      title: "Pelindung Semesta: Patung Ukir Garuda Kayu Suar Asli Desa Mas",
      narrative: "Dipahat dengan ketelitian tinggi oleh empu pemahat Desa Mas Gianyar dari sebilah kayu suar utuh pilihan. Patung ini mengabadikan Sang Garuda, wahana Dewa Wisnu yang mencerminkan keteguhan hati, loyalitas tanpa batas, serta komitmen memelihara harmoni jagat raya.",
      short_desc: "Karya ukiran kayu suar autentik dari Gianyar dengan pahatan detail khas seniman Bali."
    },
    seo_tags: ["balinese wood carving", "garuda statue", "sustainable suar wood", "gianyar artisan", "ubud handmade decor"]
  },
  export_compliance: {
    hs_code_recommendation: "4420.10.00",
    hs_description: "Statuettes and other ornaments, of wood (BTKI 2026)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: true,
      fumigation_required: true
    },
    export_notes: "Kayu Suar aman diekspor. Wajib menyertakan sertifikat V-Legal (SVLK) dan perlakuan fumigasi standar ISPM 15 untuk tujuan AS, Uni Eropa, dan Australia."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 1.850.000 - Rp 2.500.000",
      export_retail_usd: "$180 - $260 USD",
      suggested_fob_usd: "$95 - $130 USD"
    },
    craftsmanship_score: 94,
    digital_certificate: {
      certificate_id: "KL-BALI-2026-GWK01",
      artisan_attribution: "Sentra Ukir Desa Mas, Gianyar - Bali",
      verification_hash: "0x8F9C4A2E7B1D0456"
    }
  }
};

export const MOCK_ENDEK_ANALYSIS: KriyaAnalysisResponse = {
  cultural_heritage: {
    craft_name: "Kain Tenun Endek Mastuli Pewarna Alam",
    category: "Textile & Weaving",
    origin_village: "Desa Sidemen",
    regency: "Karangasem",
    primary_material: "Serat Sutra Alam & Pewarna Nabati (Indigofera)",
    philosophical_meaning: "Motif mastuli melambangkan kemurnian jiwa, keharmonisan ikatan keluarga, dan pelindung spiritual pemakainya.",
    cultural_significance: "Tenunan ikat pakan tradisional yang diwariskan turun-temurun menggunakan alat tenun bukan mesin (ATBM)."
  },
  storytelling: {
    en: {
      title: "Woven Heritage: Authentic Sidemen Handwoven Silk Endek",
      narrative: "Created in the serene valley of Sidemen, Karangasem, this authentic Endek silk textile is masterfully woven using heritage back-strap looms. Colored with natural botanicals, its geometric motifs carry ancient blessings of serenity and protection against negative energies.",
      short_desc: "Authentic natural-dyed silk Endek handwoven in Sidemen, Bali."
    },
    jp: {
      title: "織りの遺産：シドゥメン村の天然草木染め手織りシルク・エンデッ",
      narrative: "静寂に包まれた東バリ・シドゥメン渓谷の女性織工によって、伝統的な手織り機（ATBM）で丁寧に織り上げられた本物のエンデッ織物です。藍などの天然植物染料で染められた絹糸が、穏やかな調和と家族の繁栄を祈る幾何学文様を描き出します。",
      short_desc: "東バリ・シドゥメン村の職人が天然染料とシルクで織り上げた伝統エンデッ。"
    },
    zh: {
      title: "织锦传承：巴厘岛希德曼纯手工植物染蚕丝恩德克织物",
      narrative: "产自巴厘岛东部幽美的希德曼（Sidemen）手织村落，织娘运用非遗手拉织布机，耗费数周以天然蓼蓝草木染料浸染蚕丝精心编织而成，纹饰蕴含家族安康与护佑平安的美好祝愿。",
      short_desc: "巴厘岛非遗手织工艺，纯天然草木染蚕丝高端艺术织物。"
    },
    id: {
      title: "Tenun Warisan: Kain Endek Sutra Sidemen Pewarna Alami",
      narrative: "Ditenun oleh perajin wanita Desa Sidemen Karangasem dengan alat tenun tradisional. Memadukan kelembutan benang sutra dengan keindahan warna daun tarum (indigo) yang ramah lingkungan.",
      short_desc: "Kain tenun ikat sutra khas Sidemen dengan pewarnaan alami bernilai seni tinggi."
    },
    seo_tags: ["balinese ikat", "endek sidemen", "handwoven silk", "natural dyed textile", "indonesian heritage fabric"]
  },
  export_compliance: {
    hs_code_recommendation: "5007.20.00",
    hs_description: "Woven fabrics of silk, containing 85% or more by weight of silk (BTKI 2026)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    export_notes: "Kain tenun sutra alami bebas dari regulasi CITES. Kemasan ekspor disarankan menggunakan silica gel anti-kelembaban dan sertifikat pewarna non-toksik."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 1.200.000 - Rp 1.750.000",
      export_retail_usd: "$120 - $180 USD",
      suggested_fob_usd: "$65 - $90 USD"
    },
    craftsmanship_score: 96,
    digital_certificate: {
      certificate_id: "KL-BALI-2026-END02",
      artisan_attribution: "Kelompok Penenun Tradisional Sidemen, Karangasem - Bali",
      verification_hash: "0x3D7E8B1A9F4C2018"
    }
  }
};

export const MOCK_PERAK_ANALYSIS: KriyaAnalysisResponse = {
  cultural_heritage: {
    craft_name: "Bros Filigree Perak Bunga Sandat",
    category: "Silver & Jewelry",
    origin_village: "Desa Celuk, Sukawati",
    regency: "Gianyar",
    primary_material: "Perak Murni 925 (Sterling Silver)",
    philosophical_meaning: "Bunga Sandat (Kenanga) melambangkan kerendahan hati, keharuman budi pekerti luhur, dan keanggunan abadi wanita Bali.",
    cultural_significance: "Teknik krawangan (filigree) khas seniman perak Celuk yang menuntut pemuntiran kawat perak mikro dengan presisi tinggi."
  },
  storytelling: {
    en: {
      title: "Floral Elegance: Celuk Artisan 925 Silver Sandat Brooch",
      narrative: "Handcrafted in the legendary silversmith village of Celuk, this brooch reinterprets the fragrant Sandat flower into fine 925 sterling silver filigree. Delicate silver wires are twisted and soldered over flame by generational goldsmiths, embodying eternal grace and gentle nobility.",
      short_desc: "Intricate 925 sterling silver filigree flower brooch from Celuk Village, Bali."
    },
    jp: {
      title: "花の優美：チュルク村銀細工職人による925シルバー・サンダットブローチ",
      narrative: "数百年の伝統を誇る銀細工の村チュルクにて、極細の925スターリングシルバー線を丹念に撚り合わせて作られたフィリグリー（線細工）ブローチです。高貴な香りを放つサンダット（イランイラン）の花をモチーフとし、謙虚さと不変の優美さを象徴しています。",
      short_desc: "バリ島チュルク村の銀細工名匠による925シルバー製フィリグリー工芸品。"
    },
    zh: {
      title: "花语雅韵：巴厘岛车禄村925纯银花丝金兰花胸针",
      narrative: "来自巴厘岛银器艺术之都车禄村（Celuk），手艺人将细如发丝的925纯银丝线经手工盘卷、焊接成优雅的巴厘传统三达花（Sandat）。其香气历久不散，寓意谦逊纯良与永恒的高贵雅致。",
      short_desc: "巴厘岛非遗级手工银丝镶嵌工艺，925纯银典雅花卉胸针。"
    },
    id: {
      title: "Keanggunan Puspa: Bros Perak 925 Filigree Motif Bunga Sandat",
      narrative: "Dikerjakan oleh pande perak Desa Celuk Gianyar dengan teknik filigree yang rumit. Menampilkan keindahan bunga sandat yang melambangkan keharuman akhlak dan keanggunan sejati.",
      short_desc: "Bros perak 925 buatan tangan perajin Celuk dengan detail filigree sangat halus."
    },
    seo_tags: ["celuk silversmith", "balinese silver brooch", "925 filigree jewelry", "handmade silver bali", "sandat flower pin"]
  },
  export_compliance: {
    hs_code_recommendation: "7113.11.00",
    hs_description: "Articles of jewelry and parts thereof, of silver (BTKI 2026)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    export_notes: "Perhiasan perak 925 bebas regulasi kehutanan. Pastikan terdapat cap stempel '925' pada fisik barang dan menyertakan sertifikat uji kadar logam."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 650.000 - Rp 950.000",
      export_retail_usd: "$65 - $110 USD",
      suggested_fob_usd: "$35 - $55 USD"
    },
    craftsmanship_score: 93,
    digital_certificate: {
      certificate_id: "KL-BALI-2026-SIL03",
      artisan_attribution: "Komunitas Pande Perak Celuk, Gianyar - Bali",
      verification_hash: "0x1A2B3C4D5E6F7890"
    }
  }
};
