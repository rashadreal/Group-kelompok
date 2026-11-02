import React from 'react';
import { TRUSTED_SOURCES } from '../data/kalimantanData';
import { ExternalLink, CheckCircle, Database, Satellite, ShieldCheck, Radio } from 'lucide-react';

interface TrustedSourcesSectionProps {
  lang: 'id' | 'en';
}

export const TrustedSourcesSection: React.FC<TrustedSourcesSectionProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Database className="w-7 h-7 text-cyan-400" />
          <span>{lang === 'id' ? 'Sumber Resmi & Metodologi Pemantauan' : 'Official Data Sources & Geospatial Methodology'}</span>
        </h1>
        <p className="mt-1.5 text-sm text-slate-400 max-w-3xl">
          {lang === 'id'
            ? 'Seluruh data titik api (hotspot), indeks kemudahan terbakar (FDRS), dan mutu udara (ISPU/PM2.5) dirujuk secara real-time dari instansi resmi pemerintah Republik Indonesia dan lembaga sains antariksa internasional.'
            : 'All thermal hotspots, fire weather danger ratings, and air quality indices are referenced directly from official Indonesian government authorities and international space agencies.'}
        </p>
      </div>

      {/* Hero Visual Spotlight */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <div className="h-64 sm:h-80 w-full overflow-hidden">
          <img
            src="/src/assets/images/kalimantan_peatland_satellite_1793592332077.jpg"
            alt="Kalimantan Borneo Tropical Peatland Satellite View"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Satellite className="w-4 h-4" />
            <span>Earth Observation · Borneo Kalimantan Corridor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white max-w-2xl">
            {lang === 'id' ? 'Multi-Sensor Terpadu: Sensor Optik, Termal, & Stasiun Darat' : 'Integrated Multi-Sensor Architecture: Thermal, Optical & In-Situ SPKU'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl">
            {lang === 'id'
              ? 'Menggabungkan resolusi tinggi 375-meter dari sensor VIIRS (Suomi-NPP & NOAA-20), sensor MODIS 1-km (Terra & Aqua), dengan stasiun cuaca permukaan BMKG dan SPKU KLHK untuk meminimalkan false alarm.'
              : 'Synthesizing high-resolution 375m VIIRS thermal infrared anomalies with in-situ BMKG meteorological stations and KLHK continuous particulate monitors to maximize detection precision.'}
          </p>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRUSTED_SOURCES.map((src) => (
          <div
            key={src.id}
            className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 uppercase">
                  ✓ {src.status.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {src.updateFrequency}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{src.name}</h3>
              <div className="text-xs font-semibold text-amber-400/90 mb-3">{src.authority}</div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {src.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">Official Portal</span>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>{lang === 'id' ? 'Kunjungi Portal' : 'Open Website'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {/* BNPB Geoportal */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 uppercase">
                ✓ CONNECTED
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Daily Disaster Log
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-1">BNPB (Badan Nasional Penanggulangan Bencana)</h3>
            <div className="text-xs font-semibold text-amber-400/90 mb-3">National Disaster Management Agency</div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Geoportal Data Bencana Indonesia (DIBI) providing emergency mobilization logs, water bombing helicopter deployments, and provincial disaster declaration statuses.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-500">Official Portal</span>
            <a
              href="https://bnpb.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>{lang === 'id' ? 'Kunjungi Portal' : 'Open Website'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Methodology & Calibration Specs */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'id' ? 'Metodologi & Verifikasi Ilmiah' : 'Scientific Methodology & Telemetry Standards'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            <div className="font-bold text-amber-400 font-mono text-[11px] uppercase">
              1. Hotspot Thermal Radiometry
            </div>
            <p className="leading-relaxed">
              Titik panas bukan selalu berarti kobaran api terbuka; titik panas adalah anomali suhu termal permukaan di atas 310 Kelvin. Sinyal VIIRS 375m mampu mendeteksi bara gambut awal jauh sebelum asap pekat membubung tinggi.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            <div className="font-bold text-cyan-400 font-mono text-[11px] uppercase">
              2. Indeks ISPU vs US AQI
            </div>
            <p className="leading-relaxed">
              Perhitungan ISPU Indonesia mengikuti regulasi Permen LHK No. P.14/2020 dengan waktu rata-rata 24 jam untuk PM2.5, sedangkan US AQI menggunakan algoritma NowCast untuk merespons lonjakan asap seketika.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            <div className="font-bold text-emerald-400 font-mono text-[11px] uppercase">
              3. Fire Weather Index (FWI)
            </div>
            <p className="leading-relaxed">
              BMKG mengadaptasi Canadian Forest Fire Danger Rating System (FDRS) yang menghitung kelembapan seresah (FFMC), kelembapan lapisan organik sedang (DMC), dan kekeringan tanah dalam (DC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
