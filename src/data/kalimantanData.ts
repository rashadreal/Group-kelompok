import { 
  Hotspot, 
  AirQualityStation, 
  FdrsZone, 
  CommunityReport, 
  PreventionGuide, 
  SourceAttribution,
  KalimantanProvince 
} from '../types/environmental';

export const KALIMANTAN_PROVINCES: KalimantanProvince[] = [
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara',
];

export const INITIAL_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-viirs-01',
    latitude: -2.3142,
    longitude: 113.8821,
    brightness: 348.6,
    scanDate: '2026-11-01',
    scanTime: '13:42 UTC',
    satellite: 'VIIRS/S-NPP',
    confidence: 'high',
    confidenceScore: 92,
    frp: 38.4,
    province: 'Kalimantan Tengah',
    regency: 'Kabupaten Pulang Pisau',
    district: 'Kec. Kahayan Hilir',
    isPeatland: true,
    status: 'active',
    source: 'NASA FIRMS',
  },
  {
    id: 'hs-viirs-02',
    latitude: -2.4819,
    longitude: 112.9103,
    brightness: 334.2,
    scanDate: '2026-11-01',
    scanTime: '13:42 UTC',
    satellite: 'VIIRS/S-NPP',
    confidence: 'high',
    confidenceScore: 88,
    frp: 29.1,
    province: 'Kalimantan Tengah',
    regency: 'Kabupaten Kotawaringin Timur',
    district: 'Kec. Mentaya Hilir Selatan (Sampit)',
    isPeatland: true,
    status: 'active',
    source: 'KLHK SiPongi+',
  },
  {
    id: 'hs-viirs-03',
    latitude: -1.7245,
    longitude: 109.9854,
    brightness: 322.8,
    scanDate: '2026-11-01',
    scanTime: '10:15 UTC',
    satellite: 'NOAA-20',
    confidence: 'nominal',
    confidenceScore: 74,
    frp: 18.2,
    province: 'Kalimantan Barat',
    regency: 'Kabupaten Ketapang',
    district: 'Kec. Matan Hilir Selatan',
    isPeatland: true,
    status: 'under_patrol',
    source: 'NASA FIRMS',
  },
  {
    id: 'hs-modis-04',
    latitude: -0.1241,
    longitude: 109.4328,
    brightness: 315.4,
    scanDate: '2026-11-01',
    scanTime: '06:30 UTC',
    satellite: 'Aqua/MODIS',
    confidence: 'nominal',
    confidenceScore: 68,
    frp: 14.5,
    province: 'Kalimantan Barat',
    regency: 'Kabupaten Kubu Raya',
    district: 'Kec. Sungai Raya',
    isPeatland: true,
    status: 'contained',
    source: 'BMKG Hotspot',
  },
  {
    id: 'hs-viirs-05',
    latitude: -3.4215,
    longitude: 114.7319,
    brightness: 341.0,
    scanDate: '2026-11-01',
    scanTime: '13:40 UTC',
    satellite: 'VIIRS/S-NPP',
    confidence: 'high',
    confidenceScore: 89,
    frp: 32.7,
    province: 'Kalimantan Selatan',
    regency: 'Kabupaten Banjar',
    district: 'Kec. Gambut / Liang Anggang',
    isPeatland: true,
    status: 'active',
    source: 'KLHK SiPongi+',
  },
  {
    id: 'hs-viirs-06',
    latitude: -0.6389,
    longitude: 116.8821,
    brightness: 318.0,
    scanDate: '2026-11-01',
    scanTime: '07:20 UTC',
    satellite: 'NOAA-20',
    confidence: 'nominal',
    confidenceScore: 62,
    frp: 11.3,
    province: 'Kalimantan Timur',
    regency: 'Kabupaten Kutai Kartanegara',
    district: 'Kec. Muara Kaman',
    isPeatland: false,
    status: 'under_patrol',
    source: 'NASA FIRMS',
  },
  {
    id: 'hs-modis-07',
    latitude: 2.9124,
    longitude: 117.3821,
    brightness: 309.2,
    scanDate: '2026-11-01',
    scanTime: '05:10 UTC',
    satellite: 'Terra/MODIS',
    confidence: 'low',
    confidenceScore: 48,
    frp: 7.9,
    province: 'Kalimantan Utara',
    regency: 'Kabupaten Bulungan',
    district: 'Kec. Tanjung Palas',
    isPeatland: false,
    status: 'contained',
    source: 'BMKG Hotspot',
  },
  {
    id: 'hs-viirs-08',
    latitude: -1.9542,
    longitude: 113.4312,
    brightness: 355.2,
    scanDate: '2026-11-01',
    scanTime: '13:44 UTC',
    satellite: 'VIIRS/S-NPP',
    confidence: 'high',
    confidenceScore: 96,
    frp: 45.1,
    province: 'Kalimantan Tengah',
    regency: 'Kabupaten Katingan',
    district: 'Kec. Katingan Hilir',
    isPeatland: true,
    status: 'active',
    source: 'NASA FIRMS',
  }
];

export const INITIAL_AIR_QUALITY_STATIONS: AirQualityStation[] = [
  {
    id: 'aq-palangkaraya',
    city: 'Palangka Raya',
    province: 'Kalimantan Tengah',
    coordinates: [-2.2161, 113.9139],
    ispu: 142,
    aqiUs: 154,
    category: 'Tidak Sehat',
    pm25: 68.4,
    pm10: 104.2,
    co: 1240,
    temperature: 31.8,
    humidity: 58,
    windSpeed: 14.5,
    windDirection: 135,
    windDirectionText: 'SE (Tenggara)',
    lastUpdated: '10 min ago',
    stationName: 'SPKU Bundaran Besar / BMKG Tjilik Riwut',
    source: 'KLHK ISPU-Net',
    history24h: [
      { hour: '00:00', pm25: 42, aqi: 112 },
      { hour: '04:00', pm25: 55, aqi: 134 },
      { hour: '08:00', pm25: 72, aqi: 161 },
      { hour: '12:00', pm25: 84, aqi: 172 },
      { hour: '16:00', pm25: 70, aqi: 158 },
      { hour: '20:00', pm25: 68, aqi: 154 }
    ]
  },
  {
    id: 'aq-pontianak',
    city: 'Pontianak',
    province: 'Kalimantan Barat',
    coordinates: [-0.0263, 109.3425],
    ispu: 88,
    aqiUs: 96,
    category: 'Sedang',
    pm25: 34.2,
    pm10: 62.1,
    co: 820,
    temperature: 30.5,
    humidity: 64,
    windSpeed: 11.2,
    windDirection: 180,
    windDirectionText: 'S (Selatan)',
    lastUpdated: '8 min ago',
    stationName: 'Stasiun Klimatologi Siantan BMKG',
    source: 'BMKG',
    history24h: [
      { hour: '00:00', pm25: 28, aqi: 82 },
      { hour: '04:00', pm25: 35, aqi: 98 },
      { hour: '08:00', pm25: 46, aqi: 120 },
      { hour: '12:00', pm25: 38, aqi: 104 },
      { hour: '16:00', pm25: 32, aqi: 92 },
      { hour: '20:00', pm25: 34, aqi: 96 }
    ]
  },
  {
    id: 'aq-banjarmasin',
    city: 'Banjarmasin / Banjarbaru',
    province: 'Kalimantan Selatan',
    coordinates: [-3.3194, 114.5908],
    ispu: 115,
    aqiUs: 128,
    category: 'Tidak Sehat',
    pm25: 49.8,
    pm10: 89.4,
    co: 980,
    temperature: 32.1,
    humidity: 55,
    windSpeed: 16.0,
    windDirection: 150,
    windDirectionText: 'SSE (Selatan-Tenggara)',
    lastUpdated: '12 min ago',
    stationName: 'SPKU Syamsudin Noor BMKG Banjarbaru',
    source: 'BMKG',
    history24h: [
      { hour: '00:00', pm25: 36, aqi: 101 },
      { hour: '04:00', pm25: 48, aqi: 125 },
      { hour: '08:00', pm25: 62, aqi: 148 },
      { hour: '12:00', pm25: 56, aqi: 139 },
      { hour: '16:00', pm25: 45, aqi: 121 },
      { hour: '20:00', pm25: 50, aqi: 128 }
    ]
  },
  {
    id: 'aq-sampit',
    city: 'Sampit (Kotim)',
    province: 'Kalimantan Tengah',
    coordinates: [-2.5369, 112.9554],
    ispu: 178,
    aqiUs: 188,
    category: 'Tidak Sehat',
    pm25: 86.5,
    pm10: 134.0,
    co: 1620,
    temperature: 33.2,
    humidity: 52,
    windSpeed: 18.2,
    windDirection: 120,
    windDirectionText: 'ESE (Timur-Tenggara)',
    lastUpdated: '5 min ago',
    stationName: 'SPKU H. Asan Sampit BMKG',
    source: 'KLHK ISPU-Net',
    history24h: [
      { hour: '00:00', pm25: 58, aqi: 140 },
      { hour: '04:00', pm25: 75, aqi: 165 },
      { hour: '08:00', pm25: 98, aqi: 195 },
      { hour: '12:00', pm25: 110, aqi: 205 },
      { hour: '16:00', pm25: 92, aqi: 191 },
      { hour: '20:00', pm25: 86, aqi: 188 }
    ]
  },
  {
    id: 'aq-samarinda',
    city: 'Samarinda & IKN Nusantara',
    province: 'Kalimantan Timur',
    coordinates: [-0.5022, 117.1536],
    ispu: 42,
    aqiUs: 48,
    category: 'Baik',
    pm25: 11.8,
    pm10: 24.6,
    co: 410,
    temperature: 29.4,
    humidity: 76,
    windSpeed: 9.8,
    windDirection: 60,
    windDirectionText: 'ENE (Timur-Timur Laut)',
    lastUpdated: '15 min ago',
    stationName: 'Stasiun Meteorologi Temindung BMKG',
    source: 'BMKG',
    history24h: [
      { hour: '00:00', pm25: 10, aqi: 42 },
      { hour: '04:00', pm25: 12, aqi: 45 },
      { hour: '08:00', pm25: 16, aqi: 52 },
      { hour: '12:00', pm25: 14, aqi: 50 },
      { hour: '16:00', pm25: 11, aqi: 45 },
      { hour: '20:00', pm25: 12, aqi: 48 }
    ]
  },
  {
    id: 'aq-tanjungselor',
    city: 'Tanjung Selor / Tarakan',
    province: 'Kalimantan Utara',
    coordinates: [2.8375, 117.3653],
    ispu: 35,
    aqiUs: 38,
    category: 'Baik',
    pm25: 8.9,
    pm10: 19.1,
    co: 320,
    temperature: 28.7,
    humidity: 82,
    windSpeed: 8.0,
    windDirection: 45,
    windDirectionText: 'NE (Timur Laut)',
    lastUpdated: '20 min ago',
    stationName: 'Stasiun Meteorologi Tanjung Harapan',
    source: 'BMKG',
    history24h: [
      { hour: '00:00', pm25: 8, aqi: 34 },
      { hour: '04:00', pm25: 9, aqi: 36 },
      { hour: '08:00', pm25: 11, aqi: 41 },
      { hour: '12:00', pm25: 10, aqi: 40 },
      { hour: '16:00', pm25: 8, aqi: 35 },
      { hour: '20:00', pm25: 9, aqi: 38 }
    ]
  }
];

export const FDRS_ZONES: FdrsZone[] = [
  {
    province: 'Kalimantan Tengah',
    riskLevel: 'Extreme / Sangat Rawan',
    fwiScore: 28.4,
    consecutiveDryDays: 14,
    ffmc: 91.2,
    dmc: 64.5,
    dc: 380,
    peatRiskIndex: 94,
    summary: 'Peat groundwater depth in Pulang Pisau and Sampit dropped past -0.45m. Highly susceptible to deep smoldering subterranean combustion.'
  },
  {
    province: 'Kalimantan Selatan',
    riskLevel: 'High / Rawan',
    fwiScore: 22.1,
    consecutiveDryDays: 11,
    ffmc: 88.6,
    dmc: 52.0,
    dc: 310,
    peatRiskIndex: 82,
    summary: 'Liang Anggang peat belt dry. High wind speeds up to 16 km/h accelerating top organic leaf litter ignition.'
  },
  {
    province: 'Kalimantan Barat',
    riskLevel: 'Moderate / Waspada',
    fwiScore: 16.8,
    consecutiveDryDays: 7,
    ffmc: 84.1,
    dmc: 38.4,
    dc: 240,
    peatRiskIndex: 65,
    summary: 'Ketapang and Kubu Raya coastal peatlands drying. Sporadic afternoon rain suppressing widespread spread.'
  },
  {
    province: 'Kalimantan Timur',
    riskLevel: 'Low / Aman',
    fwiScore: 8.4,
    consecutiveDryDays: 3,
    ffmc: 76.2,
    dmc: 21.0,
    dc: 150,
    peatRiskIndex: 28,
    summary: 'Localized convective precipitation keeping soil moisture high. Low immediate risk in Mahakam basin.'
  },
  {
    province: 'Kalimantan Utara',
    riskLevel: 'Low / Aman',
    fwiScore: 6.2,
    consecutiveDryDays: 2,
    ffmc: 72.0,
    dmc: 16.5,
    dc: 110,
    peatRiskIndex: 18,
    summary: 'Humid conditions and heavy cloud cover across Bulungan and Malinau.'
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-01',
    timestamp: '2026-11-01 16:45 WITA',
    reporterName: 'Warga Desa Tumbang Nusa',
    province: 'Kalimantan Tengah',
    regency: 'Pulang Pisau',
    latitude: -2.3381,
    longitude: 114.0412,
    smokeType: 'dense_haze',
    isPeatland: true,
    notes: 'Bau asap menyengat tercium di pinggir jalan Trans Kalimantan. Tampak kepulan asap dari lahan gambut semak belukar 300m dari pemukiman.',
    status: 'dispatched',
    manggalaAgniBrigade: 'Daops Palangka Raya Regu II'
  },
  {
    id: 'rep-02',
    timestamp: '2026-11-01 14:10 WITA',
    reporterName: 'Relawan MPA Sungai Bakau',
    province: 'Kalimantan Selatan',
    regency: 'Tanah Laut',
    latitude: -3.8124,
    longitude: 114.6543,
    smokeType: 'light_smoke',
    isPeatland: false,
    notes: 'Sisa pembakaran jerami pinggir parit, sedang dipadamkan warga bersama Babinsa.',
    status: 'resolved',
    manggalaAgniBrigade: 'Daops Banjar'
  }
];

export const PREVENTION_GUIDES: PreventionGuide[] = [
  {
    id: 'guide-pltb',
    title: 'Zero Burning Agriculture (PLTB - Pembukaan Lahan Tanpa Bakar)',
    titleId: 'Pembukaan Lahan Tanpa Bakar (PLTB)',
    category: 'farmers',
    summary: 'Safe, sustainable biological soil enrichment alternatives that prevent catastrophic peatland runaway fires.',
    summaryId: 'Metode ramah lingkungan menyiapkan lahan tanpa menyulut api pada tanah gambut.',
    bulletPoints: [
      'Use mechanical shredding or hand chopping for agricultural brush and residue rather than burning.',
      'Apply bio-decomposer inoculants (Trichoderma / EM4) to accelerate organic compost breakdown into nutrient-rich humus within 14-21 days.',
      'Maintain perimeter buffer trenches to retain rainwater and preserve root moisture.',
      'Strictly avoid burning under any circumstances on peat layers deeper than 50 cm.'
    ],
    bulletPointsId: [
      'Gunakan metode perencekan mekanis atau pencacahan manual untuk gulma dan sisa ranting.',
      'Semprotkan mikroorganisme dekomposer (misal Trichoderma / EM4) agar seresah terurai jadi pupuk organik dalam 14–21 hari.',
      'Buat parit perimeter penampung air untuk menjaga kelembapan tanah lapisan atas.',
      'Dilarang keras menyulut api pembersih lahan di atas lapisan tanah gambut.'
    ],
    lawReference: 'UU No. 32/2009 Pasal 69 & Permentan No. 05/2018'
  },
  {
    id: 'guide-canal-blocking',
    title: 'Peatland Rewetting & Canal Blocking (Sekat Kanal)',
    titleId: 'Pembasahan Lahan Gambut & Sekat Kanal',
    category: 'plantations',
    summary: 'Maintaining the groundwater table above -0.40m is the single most effective barrier against subterranean fire.',
    summaryId: 'Mempertahankan Tinggi Muka Air Tanah (TMAT) gambut di atas -40 cm agar gambut tetap jenuh air.',
    bulletPoints: [
      'Inspect canal blocks (sekat kanal) weekly to ensure water does not excessively drain into main rivers during dry spells.',
      'Check dipwells and automated telemetry gauges (SESAME/BRGM gauges) for water table drops below 40 cm.',
      'Prepare deep well pumps (sumur bor) with minimum discharge of 5 liters/second within high-risk concession blocks.',
      'Create 10-meter bare mineral soil firebreaks between plantations and community borders.'
    ],
    bulletPointsId: [
      'Inspeksi pintu sekat kanal setiap minggu untuk mencegah pengeringan berlebih ke sungai utama.',
      'Pantau pipa sumur pantau (dipwell) agar tinggi muka air tidak surut melampaui batas kritis -40 cm.',
      'Siagakan sumur bor darurat dengan debit minimal 5 liter/detik pada blok-blok rawan terbakar.',
      'Sediakan sekat bakar (firebreak) selebar 10 meter berupa tanah mineral bersih.'
    ],
    lawReference: 'PP No. 57/2016 jo PP No. 71/2014 & Standar BRGM'
  },
  {
    id: 'guide-community-response',
    title: 'Community Patrol & Early Smoke Detection',
    titleId: 'Patroli Mandiri Masyarakat Peduli Api (MPA)',
    category: 'community',
    summary: 'Community Early Detection dramatically lowers the cost and devastation of peatland fires before they reach subterranean smolder.',
    summaryId: 'Deteksi dini asap sebelum api masuk ke lapisan dalam gambut (sub-surface fire).',
    bulletPoints: [
      'Conduct daily patrols between 11:00 and 16:00 during peak heat hours.',
      'Report any white wispy smoke immediately via Siaga Karhutla or local Manggala Agni Daops.',
      'Carry portable backpack pumps (jet shooters) for immediate dousing of ember spots before wind gusts escalate flames.',
      'Enforce community ban on tossing cigarette butts along dry roadside peat bushes.'
    ],
    bulletPointsId: [
      'Lakukan patroli rutin regu MPA pada rentang jam rawan panas terik (11.00 - 16.00 WIB/WITA).',
      'Laporkan kepulan asap tipis putih sesegera mungkin sebelum api merambat ke bawah permukaan.',
      'Siapkan jet shooter (pompa punggung) untuk pemadaman langsung bara api sebelum ditiup angin.',
      'Terapkan sanksi desa dan larangan tegas membuang puntung rokok di semak belukar kering.'
    ],
    lawReference: 'Peraturan Dirjen PPI KLHK No. P.3/PPI/SET/KUM.1/1/2018'
  },
  {
    id: 'guide-health-haze',
    title: 'Public Health & Haze Protection (Protokol ISPU)',
    titleId: 'Perlindungan Kesehatan Kabut Asap (Protokol ISPU)',
    category: 'schools',
    summary: 'Health safety guidelines for schools, infants, and vulnerable citizens during elevated PM2.5 haze events.',
    summaryId: 'Pedoman keselamatan ISPU Tidak Sehat bagi anak sekolah, lansia, dan penderita asma.',
    bulletPoints: [
      'When ISPU > 100 (PM2.5 > 35 µg/m³): Sensitive groups (asthma, pregnant women, elderly) must wear certified N95/KN95 respirators outdoors.',
      'When ISPU > 200 (PM2.5 > 150 µg/m³): Cancel outdoor sports, switch schools to hybrid/online learning, seal room windows with wet cloths.',
      'Operate indoor HEPA air filtration or DIY wet towel air filters to capture toxic microscopic PM2.5 soot particles.',
      'Drink at least 2.5 liters of clean water daily to assist mucosal clearing of respiratory particulates.'
    ],
    bulletPointsId: [
      'Jika ISPU > 100: Wajib gunakan masker respirator bersertifikat N95/KN95 (bukan masker kain tipis).',
      'Jika ISPU > 200: Hentikan kegiatan olahraga luar ruangan, alihkan pembelajaran sekolah secara daring.',
      'Tutup celah ventilasi dengan kain basah jika tidak ada air purifier berfilter HEPA.',
      'Konsumsi air putih minimal 2.5 liter per hari untuk membantu pengeluaran partikulat dari saluran pernapasan.'
    ],
    lawReference: 'Keputusan Menkes RI No. HK.01.07/MENKES/679/2019'
  }
];

export const TRUSTED_SOURCES: SourceAttribution[] = [
  {
    id: 'src-bmkg',
    name: 'BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)',
    authority: 'Government of Indonesia',
    description: 'Official Fire Danger Rating System (FDRS), wind vectors, rainfall anomalies, and national air quality PM2.5 monitoring stations.',
    updateFrequency: 'Updated every 1 to 3 hours',
    status: 'live',
    url: 'https://www.bmkg.go.id'
  },
  {
    id: 'src-sipongi',
    name: 'KLHK SiPongi+ (Kementerian Lingkungan Hidup dan Kehutanan)',
    authority: 'Directorate of Forest Fire Management, Indonesia',
    description: 'Official Indonesian forest fire monitoring platform integrating NOAA, Terra/Aqua MODIS, SNPP/VIIRS, and ground patrol logs.',
    updateFrequency: 'Near Real-Time (Satellite Overpasses)',
    status: 'live',
    url: 'https://sipongi.menlhk.go.id'
  },
  {
    id: 'src-nasa',
    name: 'NASA FIRMS (Fire Information for Resource Management System)',
    authority: 'NASA Earth Applied Sciences & LANCE',
    description: 'Global thermal anomaly and active fire telemetry from VIIRS (375m) and MODIS (1km) sensors with Fire Radiative Power (MW).',
    updateFrequency: 'Real-time passes (Within 3 hours of acquisition)',
    status: 'live',
    url: 'https://firms.modaps.eosdis.nasa.gov'
  },
  {
    id: 'src-brgm',
    name: 'BRGM (Badan Restorasi Gambut dan Mangrove)',
    authority: 'Peatland Restoration Agency of Indonesia',
    description: 'Groundwater table telemetry (TMA), canal blocking monitoring, and vulnerable Peat Hydrological Unit (KHG) risk maps.',
    updateFrequency: 'Daily Telemetry & Field Reports',
    status: 'connected',
    url: 'https://brgm.go.id'
  },
  {
    id: 'src-openmeteo',
    name: 'Open-Meteo Air Quality & Atmospheric Model',
    authority: 'Copernicus & European Centre for Medium-Range Weather Forecasts (ECMWF)',
    description: 'High-resolution atmospheric particulate PM2.5, PM10, Carbon Monoxide, and wind direction model across Borneo.',
    updateFrequency: 'Hourly live synchronization',
    status: 'live',
    url: 'https://open-meteo.com'
  }
];

export const EMERGENCY_HOTLINES = [
  {
    region: 'Kalimantan Tengah (Kalteng)',
    name: 'Posko Siaga Karhutla BPBD Kalteng / Manggala Agni Daops Palangka Raya',
    phone: '(0536) 3226992 / 0811-5201-112',
    address: 'Jl. Tjilik Riwut Km. 3.5, Palangka Raya'
  },
  {
    region: 'Kalimantan Barat (Kalbar)',
    name: 'Manggala Agni Daops Pontianak & Ketapang',
    phone: '(0561) 743912 / (0534) 3037210',
    address: 'Jl. Ahmad Yani, Pontianak'
  },
  {
    region: 'Kalimantan Selatan (Kalsel)',
    name: 'Manggala Agni Daops Banjar & BPBD Kalsel',
    phone: '(0511) 4782910 / Call Center 112',
    address: 'Jl. Panglima Batur No. 1, Banjarbaru'
  },
  {
    region: 'Kalimantan Timur (Kaltim)',
    name: 'Manggala Agni Daops Paser & Samarinda',
    phone: '(0543) 21114 / 0821-5000-8811',
    address: 'Komp. Kehutanan, Samarinda'
  },
  {
    region: 'Nasional (KLHK)',
    name: 'Layanan Pengaduan Karhutla KLHK RI',
    phone: '0812-9000-115 / Halo KLHK 1500-115',
    address: 'Gedung Manggala Wanabakti, Jakarta'
  }
];
