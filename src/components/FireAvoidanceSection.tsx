import React, { useState } from 'react';
import { PREVENTION_GUIDES, EMERGENCY_HOTLINES } from '../data/kalimantanData';
import { 
  ShieldCheck, 
  Flame, 
  Droplets, 
  PhoneCall, 
  Sliders, 
  AlertOctagon, 
  BookOpen, 
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface FireAvoidanceSectionProps {
  lang: 'id' | 'en';
  onOpenReportModal: () => void;
}

export const FireAvoidanceSection: React.FC<FireAvoidanceSectionProps> = ({
  lang,
  onOpenReportModal,
}) => {
  // Peat Water Table & Firebreak Interactive Calculator State
  const [waterDepthCm, setWaterDepthCm] = useState<number>(-35); // in cm (e.g. -35 cm)
  const [daysWithoutRain, setDaysWithoutRain] = useState<number>(8);
  const [windSpeed, setWindSpeed] = useState<number>(14);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Compute Peat Fire Risk
  const isDepthCritical = waterDepthCm <= -40; // BRGM standard: < -40cm triggers alert
  const drynessFactor = Math.min(100, Math.round(
    (Math.abs(waterDepthCm) / 80) * 45 + (daysWithoutRain / 20) * 35 + (windSpeed / 30) * 20
  ));

  let riskTier = 'Rendah / Low';
  let riskColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-700';
  if (drynessFactor > 75 || waterDepthCm < -45) {
    riskTier = 'KRITIS / EXTREME';
    riskColor = 'text-red-400 bg-red-950/60 border-red-700';
  } else if (drynessFactor > 45 || isDepthCritical) {
    riskTier = 'TINGGI / HIGH';
    riskColor = 'text-amber-400 bg-amber-950/60 border-amber-700';
  }

  // Mandatory firebreak clearance width in meters
  const requiredFirebreakMeters = Math.max(5, Math.round(5 + (windSpeed * 0.4) + (daysWithoutRain * 0.3)));

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {lang === 'id' ? 'Protokol Pencegahan Karhutla & Konservasi Gambut' : 'Fire Avoidance Protocols & Peatland Preservation'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400 max-w-3xl">
            {lang === 'id'
              ? 'Panduan praktis pembukaan lahan tanpa bakar (PLTB), pemantauan tinggi muka air tanah gambut (TMAT), dan sekat kanal untuk mencegah kebakaran sebelum terjadi.'
              : 'Actionable guidelines for zero-burning agriculture (PLTB), peat groundwater table regulation, and emergency firebreak engineering.'}
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-md transition-colors whitespace-nowrap self-start md:self-auto shadow-md shadow-amber-500/20"
        >
          {lang === 'id' ? '🚨 Lapor Temuan Asap / Parit Kering' : '🚨 Report Smoke or Dry Canal'}
        </button>
      </div>

      {/* Interactive Peat Water Table & Firebreak Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              {lang === 'id' ? 'Kalkulator Risiko Kedalaman Air Gambut & Sekat Bakar' : 'Peat Moisture & Firebreak Safety Calculator'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'id'
              ? 'Badan Restorasi Gambut dan Mangrove (BRGM) menetapkan batas aman Tinggi Muka Air Tanah (TMAT) gambut maksimal -40 cm. Jika air surut lebih dalam dari 40 cm, gambut kehilangan kelembapan dan sangat mudah menyala dari bara puntung atau abu.'
              : 'According to Indonesian Peatland Agency (BRGM), the critical threshold for peat groundwater is -40 cm. Once water drops deeper, organic peat moss becomes hyper-combustible.'}
          </p>

          {/* Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>{lang === 'id' ? 'Tinggi Muka Air Tanah (TMAT):' : 'Peat Groundwater Depth:'}</span>
                <span className={`font-bold tabular-nums ${isDepthCritical ? 'text-red-400' : 'text-emerald-400'}`}>
                  {waterDepthCm} cm {isDepthCritical ? '(⚠️ SURUT KRITIS)' : '(AMAN)'}
                </span>
              </div>
              <input
                type="range"
                min="-80"
                max="0"
                step="1"
                value={waterDepthCm}
                onChange={(e) => setWaterDepthCm(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>-80 cm (Kering Berbahaya)</span>
                <span className="text-amber-500 font-semibold">-40 cm (Batas Kritis BRGM)</span>
                <span>0 cm (Jenuh Air)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>{lang === 'id' ? 'Hari Tanpa Hujan Berturut-turut:' : 'Consecutive Dry Days:'}</span>
                <span className="font-bold text-amber-400 tabular-nums">{daysWithoutRain} {lang === 'id' ? 'Hari' : 'Days'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={daysWithoutRain}
                onChange={(e) => setDaysWithoutRain(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>{lang === 'id' ? 'Kecepatan Angin Permukaan:' : 'Surface Wind Speed:'}</span>
                <span className="font-bold text-cyan-400 tabular-nums">{windSpeed} km/h</span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Calculation Output Box */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'id' ? 'HASIL ANALISIS LAPANGAN' : 'FIELD THREAT EVALUATION'}
            </div>

            <div className={`p-3.5 rounded-lg border text-center my-3 ${riskColor}`}>
              <div className="text-[11px] font-mono uppercase tracking-wider">
                {lang === 'id' ? 'Indeks Kerentanan Api Gambut' : 'Peat Fire Vulnerability'}
              </div>
              <div className="text-2xl font-bold font-mono mt-1">{riskTier}</div>
              <div className="text-xs mt-1 font-mono">{drynessFactor}% Risk Factor</div>
            </div>

            <div className="space-y-3 text-xs mt-4">
              <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800/80">
                <span className="text-slate-300">{lang === 'id' ? 'Lebar Minimal Sekat Bakar:' : 'Mandatory Firebreak Width:'}</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{requiredFirebreakMeters} meter</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800/80">
                <span className="text-slate-300">{lang === 'id' ? 'Tindakan Sekat Kanal:' : 'Canal Gate Action:'}</span>
                <span className="font-mono font-bold text-cyan-300 text-xs">
                  {isDepthCritical ? (lang === 'id' ? 'TUTUP PINTU SEGERA' : 'SEAL GATES NOW') : (lang === 'id' ? 'Tahan Air Normal' : 'Hold Water Level')}
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                {isDepthCritical ? (
                  <span className="text-amber-200">
                    ⚠️ {lang === 'id' ? 'PERINGATAN: Gambut berada di bawah batas basah. Nyalakan sumur bor darurat dan siagakan pompa apung untuk pembasahan lahan (rewetting).' : 'WARNING: Peat is below safe moisture threshold. Activate deep emergency borewells and prepare floating pumps for immediate rewetting.'}
                  </span>
                ) : (
                  <span>
                    ✓ {lang === 'id' ? 'Kondisi kelembapan tanah masih dalam ambang aman. Lakukan pemantauan rutin pipa dipwell setiap 3 hari.' : 'Ground moisture within tolerable parameters. Monitor dipwell pipes every 3 days.'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-800">
            Source Standard: Badan Restorasi Gambut dan Mangrove (BRGM) & KLHK
          </div>
        </div>
      </div>

      {/* Manggala Agni Patrol Action Showcase & Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 shadow-xl min-h-[340px]">
          <img
            src="/src/assets/images/kalimantan_fire_patrol_1793592332791.jpg"
            alt="Manggala Agni Forest Fire Patrol in Kalimantan Borneo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
              Field Operations · Kalimantan
            </span>
            <h3 className="text-lg font-bold text-white">
              {lang === 'id' ? 'Patroli Terpadu Manggala Agni & Masyarakat Peduli Api' : 'Integrated Manggala Agni & Citizen Fire Brigades'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {lang === 'id'
                ? 'Pencegahan aktif di lapangan dengan pembersihan sekat bakar, pembasahan parit gambut, dan sosialisasi tanpa bakar.'
                : 'Ground patrols verify moisture levels, clear firebreak perimeters, and extinguish surface embers before smoke escalates.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              {lang === 'id' ? '4 Pilar Utama Pencegahan Karhutla (Cegah Api)' : '4 Core Pillars of Fire Avoidance'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREVENTION_GUIDES.map((guide) => (
              <div key={guide.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                    {guide.category.toUpperCase()}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {lang === 'id' ? guide.titleId : guide.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">
                    {lang === 'id' ? guide.summaryId : guide.summary}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {(lang === 'id' ? guide.bulletPointsId : guide.bulletPoints).map((point, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold shrink-0">·</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {guide.lawReference && (
                  <div className="mt-4 pt-2.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                    Hukum: {guide.lawReference}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-400" />
              <span>{lang === 'id' ? 'Kontak Darurat Posko Siaga Karhutla Kalimantan' : 'Emergency Hotlines & Command Posts'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'id' ? 'Nomor siaga Posko Manggala Agni dan BPBD untuk laporan kebakaran dan bantuan pemadaman darat' : 'Direct emergency contacts for regional firefighting brigades and disaster agencies'}
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400">24/7 Response Units</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_HOTLINES.map((contact, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  {contact.region}
                </span>
                <div className="text-xs font-semibold text-white mb-2">{contact.name}</div>
                <div className="text-[11px] text-slate-400 mb-3">{contact.address}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span className="font-mono text-xs font-bold text-amber-300">{contact.phone}</span>
                <button
                  onClick={() => handleCopyPhone(contact.phone)}
                  title="Copy Phone Number"
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800"
                >
                  {copiedPhone === contact.phone ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{lang === 'id' ? 'Disalin' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{lang === 'id' ? 'Salin' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
