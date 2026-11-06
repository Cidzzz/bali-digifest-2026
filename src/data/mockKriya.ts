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
    confidence_level: "High (96%)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: true,
      fumigation_required: true
    },
    required_documents: [
      {
        document_name: "Sertifikat V-Legal / SVLK",
        reason: "Wajib untuk seluruh ekspor kriya kayu Indonesia sesuai Permendag RI No. 8/2024 guna menjamin legalitas sumber kayu tropis."
      },
      {
        document_name: "Fumigasi Standar ISPM 15",
        reason: "Perlakuan wajib biosekuriti karantina untuk mencegah organisme pengganggu tumbuhan pada kayu alami tujuan AS, Uni Eropa, dan Australia."
      }
    ],
    packaging_advice: "Bungkus bubble wrap 3 lapis, beri pelindung sudut busa padat, dan kemas dalam peti kayu (wooden crate) kering bersertifikat ISPM-15.",
    export_notes: "Kayu Suar aman diekspor. Wajib menyertakan sertifikat V-Legal (SVLK) dan perlakuan fumigasi standar ISPM 15 untuk tujuan AS, Uni Eropa, dan Australia."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 1.850.000 - Rp 2.500.000",
      export_retail_usd: "$180 - $260 USD",
      suggested_fob_usd: "$95 - $130 USD"
    },
    craftsmanship_score: 94,
    estimated_production_days: 14,
    value_drivers: [
      "14 hari pemahatan tangan manual bertingkat",
      "Kayu suar solid tanpa sambungan lem",
      "Karakter taksu mitologi Hindu Bali autentik"
    ],
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
    confidence_level: "High (98%)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    required_documents: [
      {
        document_name: "Deklarasi Pewarna Alam Non-Toksik",
        reason: "Memenuhi standar keamanan bahan tekstil ramah lingkungan (OEKO-TEX / REACH) pasar global."
      },
      {
        document_name: "Surat Keterangan Kerajinan Tradisional",
        reason: "Membuktikan tekstil buatan tangan ATBM pengrajin lokal untuk fasilitas tarif bea masuk preferensial."
      }
    ],
    packaging_advice: "Lipat rapi dengan kertas bebas asam (acid-free tissue paper), masukkan ke dalam pouch katun ber-silica gel, lalu kotak karton tebal.",
    export_notes: "Kain tenun sutra alami bebas dari regulasi CITES. Kemasan ekspor disarankan menggunakan silica gel anti-kelembaban dan sertifikat pewarna non-toksik."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 1.200.000 - Rp 1.750.000",
      export_retail_usd: "$120 - $180 USD",
      suggested_fob_usd: "$65 - $90 USD"
    },
    craftsmanship_score: 96,
    estimated_production_days: 21,
    value_drivers: [
      "21 hari penenunan manual ATBM",
      "Pewarna alami daun tarum ramah lingkungan",
      "Serat kepompong sutra murbei alami"
    ],
    digital_certificate: {
      certificate_id: "KL-BALI-2026-END02",
      artisan_attribution: "Kelompok Penenun Tradisional Sidemen, Karangasem - Bali",
      verification_hash: "0x3D7E8B1A9F4C2018"
    }
  }
};

export const MOCK_BATIK_ANALYSIS: KriyaAnalysisResponse = {
  cultural_heritage: {
    craft_name: "Kain Batik Tulis Tradisional Motif Bali",
    category: "Textile & Weaving",
    origin_village: "Desa Tohpati, Denpasar Timur",
    regency: "Denpasar",
    primary_material: "Kain Katun Primissima Halus & Lilin Malam Nabati",
    philosophical_meaning: "Ragam ornamen floral dan fauna dewata mencerminkan filosofi Tri Hita Karana, mengabadikan keselarasan antara manusia dan kelestarian alam Bali.",
    cultural_significance: "Karya batik tulis tangan canting murni oleh seniman Bali, memadukan corak ukir klasik Bali dengan teknik perintangan malam tradisional nusantara."
  },
  storytelling: {
    en: {
      title: "Sacred Flora: Authentic Balinese Hand-Drawn Batik Textile",
      narrative: "Created in the artisan enclave of Tohpati, this authentic hand-drawn batik cloth is crafted using traditional hot-wax canting pens. Each motif celebrates Balinese botanical flora and sacred geometries, carrying harmonious prayers for balance and serenity across living spaces.",
      short_desc: "Masterpiece hand-drawn batik on premium cotton from Tohpati, Bali."
    },
    jp: {
      title: "聖なる草花：バリ島トパティ村の手描き伝統バティック布",
      narrative: "バリ島バティック工芸の中心地トパティにて、熟練の職人が伝統的な真鍮製チャンティン（蝋筆）を用いて一枚一枚手作業で描いた逸品です。バリ特有の豊かな自然と精神性を表す草花文様が、空間に調和と安らぎをもたらします。",
      short_desc: "バリ島トパティ村の工芸作家による天然ろうけつ染め高級手描きバティック。"
    },
    zh: {
      title: "神韵织彩：巴厘岛托帕蒂纯手工蜡染艺术织物",
      narrative: "产自巴厘岛著名的蜡染之乡托帕蒂村，工艺师手持传统铜壶蜡刀（Canting），以纯天然蜂蜡与植物染料在高级纯棉布上一笔一划精心绘制而成，融合了巴厘岛传统的花草图腾与万物和谐的灵性祈愿。",
      short_desc: "巴厘岛非遗手绘蜡染工艺，纯棉植物染艺术珍品。"
    },
    id: {
      title: "Puspa Dewata: Kain Batik Tulis Halus Khas Bali",
      narrative: "Dikerjakan dengan teknik batik canting tulis tangan murni oleh perajin Tohpati. Mengusung corak flora dewata yang melambangkan keanggunan, ketenangan jiwa, dan kelestarian alam nusantara.",
      short_desc: "Kain batik tulis katun primissima dengan ornamen khas Bali bernilai seni tinggi."
    },
    seo_tags: ["balinese batik", "hand drawn batik tulis", "tohpati artisan fabric", "traditional balinese textile", "indonesian wax resist art"]
  },
  export_compliance: {
    hs_code_recommendation: "5208.52.00",
    hs_description: "Woven fabrics of cotton, containing 85% or more by weight of cotton, printed/batik (BTKI 2026)",
    confidence_level: "High (97%)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    required_documents: [
      {
        document_name: "Deklarasi Bebas Senyawa Azo & Formalin",
        reason: "Memenuhi regulasi uji keamanan bahan tekstil global (EU REACH & US CPSIA)."
      },
      {
        document_name: "Certificate of Origin (COO / SKA Form D/AK)",
        reason: "Memberikan fasilitas tarif preferensial 0% untuk ekspor ke pasar ASEAN, Australia, dan Asia Pasifik."
      }
    ],
    packaging_advice: "Lapisi dengan kertas bebas asam, bungkus sleeve katun ramah lingkungan dengan kantong silica gel anti-jamur, lalu masukkan ke dalam karton ekspor berkekuatan ganda.",
    export_notes: "Batik berbahan katun dengan pewarna non-toksik bebas dari pembatasan CITES/SVLK. Pastikan pencantuman label perawatan kain (care label) berbahasa Inggris."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 850.000 - Rp 1.450.000",
      export_retail_usd: "$95 - $160 USD",
      suggested_fob_usd: "$50 - $85 USD"
    },
    craftsmanship_score: 95,
    estimated_production_days: 12,
    value_drivers: [
      "100% canting tulis tangan tanpa cap cetak",
      "Pewarna ramah lingkungan tahan luntur",
      "Kain katun primissima rajut rapat"
    ],
    digital_certificate: {
      certificate_id: "KL-BALI-2026-BTK04",
      artisan_attribution: "Sentra Batik Tradisional Tohpati, Denpasar - Bali",
      verification_hash: "0x7E4B1C9D2F0A3845"
    }
  }
};

export const MOCK_BAMBOO_ANALYSIS: KriyaAnalysisResponse = {
  cultural_heritage: {
    craft_name: "Anyaman Bambu Sokasi Tradisional Bali",
    category: "Bamboo & Fiber",
    origin_village: "Desa Tigawasa",
    regency: "Buleleng",
    primary_material: "Bambu Tali (Gigantochloa apus) & Serat Bambu Alami",
    philosophical_meaning: "Anyaman silang melambangkan kebersamaan masyarakat Bali (Menyama Braya) yang saling menopang dan menguatkan kerukunan sosial.",
    cultural_significance: "Keahlian anyam presisi tinggi yang digunakan dalam upacara adat dan kini menjadi produk kriya dekorasi interior ramah lingkungan berkelas ekspor."
  },
  storytelling: {
    en: {
      title: "Sustainable Weave: Authentic Balinese Handwoven Bamboo Sokasi",
      narrative: "Handcrafted in the highland heritage village of Tigawasa, this exquisite bamboo container (sokasi) is woven with micro-fine bamboo strips harvested sustainably. Celebrated for both sacred ceremonies and mindful eco-friendly homes, its seamless geometric interlocking exemplifies Balinese community solidarity.",
      short_desc: "Eco-friendly handwoven bamboo craft from Tigawasa highland village, Bali."
    },
    jp: {
      title: "持続可能な編み工芸：バリ島ティガワサ村の伝統手編み竹籠ソカシ",
      narrative: "北バリ高地のティガワサ村にて、持続可能に採取された天然竹を極細に裂いて緻密に編み上げた伝統の竹籠「ソカシ」です。バリの儀礼用具としての神聖さと、現代の環境配慮型ライフスタイルに調和する美しさを兼ね備えています。",
      short_desc: "バリ島北部の高地ティガワサ村の職人が手編みした天然竹工芸品。"
    },
    zh: {
      title: "竹韵天成：巴厘岛提加瓦萨纯手工竹编艺术器皿",
      narrative: "产自巴厘岛北部古村提加瓦萨（Tigawasa），手工艺人精选本地优质生态竹材，以极细竹篾经由多重精密穿插编织而成，不仅用于巴厘传统典礼，更成为契合全球环保潮流的自然家居艺术臻品。",
      short_desc: "巴厘岛非遗手编生态竹艺，纯手工天然环保家居器物。"
    },
    id: {
      title: "Anyaman Lestari: Wadah Sokasi Bambu Asli Tigawasa",
      narrative: "Dianyam rapat oleh perajin Desa Tigawasa Buleleng dengan bilah bambu pilihan. Menggabungkan fungsi wadah upacara dengan estetika kriya ramah lingkungan yang diminati pasar ekspor global.",
      short_desc: "Anyaman bambu halus khas Tigawasa dengan ketahanan alami dan nilai guna tinggi."
    },
    seo_tags: ["balinese bamboo craft", "sokasi tigawasa", "sustainable bamboo", "handwoven basketry", "eco friendly bali decor"]
  },
  export_compliance: {
    hs_code_recommendation: "4602.11.00",
    hs_description: "Basketwork, wickerwork and other articles of bamboo (BTKI 2026)",
    confidence_level: "High (96%)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    required_documents: [
      {
        document_name: "Sertifikat Fitosanitari (KT-2)",
        reason: "Sertifikasi karantina tumbuhan dari Badan Karantina Indonesia guna menjamin produk bebas dari serangga dan hama hayati."
      },
      {
        document_name: "Surat Keterangan Produk Berkelanjutan (Eco-Friendly Declaration)",
        reason: "Memenuhi preferensi rantai pasok hijau (Green Supply Chain) buyer di Uni Eropa, Skandinavia, dan Jepang."
      }
    ],
    packaging_advice: "Bungkus pouch kain berpori kering, tambahkan silica gel food-grade untuk menjaga kelembaban di bawah 14%, dan kemas dalam master carton berlapis poliuretan.",
    export_notes: "Produk anyaman bambu wajib menyertakan sertifikat fitosanitari dan pengeringan optimal untuk mencegah jamur selama pengiriman laut kontainer."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 350.000 - Rp 650.000",
      export_retail_usd: "$45 - $85 USD",
      suggested_fob_usd: "$22 - $40 USD"
    },
    craftsmanship_score: 92,
    estimated_production_days: 7,
    value_drivers: [
      "Anyaman bilah bambu mikro 1.5mm sangat presisi",
      "Perendaman dan pengawetan alami bebas zat kimia beracun",
      "Material bambu tali berkelanjutan 100% biodegradable"
    ],
    digital_certificate: {
      certificate_id: "KL-BALI-2026-BMB06",
      artisan_attribution: "Sentra Anyaman Bambu Tigawasa, Buleleng - Bali",
      verification_hash: "0x4D8E2A1F7C9B6053"
    }
  }
};

export const MOCK_KAMASAN_ANALYSIS: KriyaAnalysisResponse = {
  cultural_heritage: {
    craft_name: "Lukisan Wayang Kamasan Klasik",
    category: "Painting & Classic Art",
    origin_village: "Desa Kamasan",
    regency: "Klungkung",
    primary_material: "Kain Blacu Katun Tradisional & Pigmen Mineral Batu Tulang (Pere)",
    philosophical_meaning: "Mengisahkan epos Mahabharata dan Ramayana tentang keteguhan menjalankan kewajiban moral (Dharma) di atas godaan angkara murka.",
    cultural_significance: "Gaya seni lukis klasik tertua dan paling murni di Bali sejak abad ke-16, dilindungi sebagai Warisan Budaya Takbenda Nasional."
  },
  storytelling: {
    en: {
      title: "Epic Lore: Authentic 16th-Century Kamasan Wayang Classical Painting",
      narrative: "Preserved across generations in the royal village of Kamasan, Klungkung, this classical painting adheres to the revered Balinese wayang style developed in the 16th-century courts. Created using mineral stone pigments on unbleached cotton, it depicts legendary Hindu epics where dharma triumphs over chaos.",
      short_desc: "Classical Balinese Kamasan wayang painting using traditional mineral pigments."
    },
    jp: {
      title: "神話の叙事詩：バリ島カマサン村の伝統古典ワヤン絵画",
      narrative: "16世紀のゲルゲル王朝時代から続くバリ絵画の発祥地カマサン村にて、代々受け継がれてきた古典技法で描かれた細密ワヤン画です。天然の鉱物顔料と未漂白の綿布を用い、善が悪に打ち勝つヒンドゥー叙事詩の教えを伝えています。",
      short_desc: "バリ島クルンクン県カマサン村の伝統工芸士による天然鉱物顔料の古典ワヤン画。"
    },
    zh: {
      title: "史诗神韵：巴厘岛卡玛桑16世纪传统哇扬古典画",
      narrative: "源自巴厘岛克隆孔王国的艺术发源地卡玛桑村（Kamasan），严格遵循自16世纪流传至今的巴厘传统皮影画派技法。画家采用天然矿石颜料与原色棉布，以繁复的手绘线条再现摩诃婆罗多史诗中正义战胜邪恶的辉煌篇章。",
      short_desc: "巴厘岛非遗级古典皮影画，天然矿物颜料纯手工史诗画作。"
    },
    id: {
      title: "Wiracarita Klasik: Lukisan Tradisional Wayang Kamasan Klungkung",
      narrative: "Dilukis oleh seniman Desa Kamasan dengan gaya klasik warisan era Kerajaan Gelgel. Memanfaatkan pigmen alami dari bebatuan mineral dan perekat tradisional di atas kain blacu.",
      short_desc: "Lukisan klasik gaya wayang Kamasan dengan pigmen warna alami warisan abad ke-16."
    },
    seo_tags: ["kamasan painting", "balinese classical art", "wayang art", "traditional balinese painting", "klungkung heritage art"]
  },
  export_compliance: {
    hs_code_recommendation: "9701.21.00",
    hs_description: "Paintings, drawings and pastels, executed entirely by hand (BTKI 2026)",
    confidence_level: "High (99%)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    required_documents: [
      {
        document_name: "Surat Rekomendasi Karya Seni Rupa Non-Cagar Budaya",
        reason: "Membuktikan karya adalah kreasi seni rupa orisinil kontemporer perajin hidup, bukan artefak purbakala terlarang ekspor."
      },
      {
        document_name: "Certificate of Authenticity (COA) bertanda tangan seniman",
        reason: "Persyaratan appraisal galeri dan kolektor seni internasional di Eropa dan Amerika Utara."
      }
    ],
    packaging_advice: "Gulung dengan tabung pelindung silinder tebal (hard mailing tube) berlapis membran kedap air atau kemas dalam bingkai kayu ganda bersertifikat aman benturan.",
    export_notes: "Kategori karya seni lukis tangan murni (HS 9701) menikmati pembebasan tarif bea masuk di sebagian besar negara tujuan WTO."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 1.500.000 - Rp 3.200.000",
      export_retail_usd: "$160 - $350 USD",
      suggested_fob_usd: "$90 - $180 USD"
    },
    craftsmanship_score: 97,
    estimated_production_days: 18,
    value_drivers: [
      "Teknik pewarnaan mineral alami 7 tahapan klasik",
      "Karakter wayang pakem warisan Kerajaan Klungkung",
      "Kain blacu katun celup kanji tradisional tahan puluhan tahun"
    ],
    digital_certificate: {
      certificate_id: "KL-BALI-2026-KMS05",
      artisan_attribution: "Sanggar Seni Lukis Klasik Kamasan, Klungkung - Bali",
      verification_hash: "0x9C2E4A7B1D5F8032"
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
    confidence_level: "High (95%)",
    material_clearance: {
      is_restricted: false,
      cites_warning: null,
      svlk_required: false,
      fumigation_required: false
    },
    required_documents: [
      {
        document_name: "Sertifikat Kadar Logam 925 (Assay Certificate)",
        reason: "Menjamin kemurnian perak 92.5% sesuai standar internasional perhiasan mulia."
      },
      {
        document_name: "Invoice & Packing List Rinci dengan Stempel 925",
        reason: "Persyaratan verifikasi kepabeanan internasional untuk produk perhiasan bernilai tinggi."
      }
    ],
    packaging_advice: "Kemas dalam kotak perhiasan beludru anti-oksidasi, lapisi bubble wrap tahan guncangan, dan gunakan segel tamper-evident.",
    export_notes: "Perhiasan perak 925 bebas regulasi kehutanan. Pastikan terdapat cap stempel '925' pada fisik barang dan menyertakan sertifikat uji kadar logam."
  },
  valuation_and_certificate: {
    fair_price_estimate: {
      local_retail_idr: "Rp 650.000 - Rp 950.000",
      export_retail_usd: "$65 - $110 USD",
      suggested_fob_usd: "$35 - $55 USD"
    },
    craftsmanship_score: 93,
    estimated_production_days: 5,
    value_drivers: [
      "Puntiran kawat mikro perak murni 925",
      "Keahlian turun-temurun pande Celuk",
      "Motif puspa sandat filosofi keanggunan Bali"
    ],
    digital_certificate: {
      certificate_id: "KL-BALI-2026-SIL03",
      artisan_attribution: "Komunitas Pande Perak Celuk, Gianyar - Bali",
      verification_hash: "0x1A2B3C4D5E6F7890"
    }
  }
};
