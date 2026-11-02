import React, { useState } from 'react';
import { AirQualityStation, IspuCategory } from '../types/environmental';
import { Wind, Droplets, Thermometer, AlertCircle, RefreshCw, Activity, ShieldCheck, Check } from 'lucide-react';

interface AirQualityDashboardProps {
  stations: AirQualityStation[];
  onRefresh: () => void;
  isRefreshing: boolean;
  lang: 'id' | 'en';
}

const CATEGORY_COLORS: Record<IspuCategory, { bg: string; text: string; badge: string; border: string }> = {
  'Baik': {
    bg: 'bg-emerald-950/40',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    border: 'border-emerald-500/30',
  },
  'Sedang': {
    bg: 'bg-cyan-950/40',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    border: 'border-cyan-500/30',
  },
  'Tidak Sehat': {
    bg: 'bg-amber-950/40',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    border: 'border-amber-500/30',
  },
  'Sangat Tidak Sehat': {
    bg: 'bg-red-950/40',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-300 border-red-500/40',
    border: 'border-red-500/30',
  },
  'Berbahaya': {
    bg: 'bg-purple-950/40',
    text: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    border: 'border-purple-500/30',
  },
};

export const AirQualityDashboard: React.FC<AirQualityDashboardProps> = ({
  stations,
  onRefresh,
  isRefreshing,
  lang,
}) => {
  const [selectedStationId, setSelectedStationId] = useState<string>(stations[0]?.id || 'aq-palangkaraya');

  const selectedStation = stations.find((s) => s.id === selectedStationId) || stations[0];

  // Helper for ISPU scale explanation
  const ispuBands = [
    { range: '0 - 50', label: lang === 'id' ? 'Baik' : 'Good', color: 'bg-emerald-500', desc: lang === 'id' ? 'Tingkat mutu udara sangat baik, tidak berefek negatif bagi manusia atau hewan.' : 'Air quality is satisfactory with little or no health risk.' },
    { range: '51 - 100', label: lang === 'id' ? 'Sedang' : 'Moderate', color: 'bg-cyan-500', desc: lang === 'id' ? 'Tidak berpengaruh pada kesehatan manusia/hewan namun dapat mempengaruhi tumbuhan sensitif.' : 'Acceptable quality; very sensitive individuals may experience slight respiratory irritation.' },
    { range: '101 - 200', label: lang === 'id' ? 'Tidak Sehat' : 'Unhealthy', color: 'bg-amber-500', desc: lang === 'id' ? 'Bersifat merugikan pada manusia, terutama penderita asma, paru-paru, dan lansia.' : 'Members of sensitive groups may experience health effects; general public will notice haze.' },
    { range: '201 - 300', label: lang === 'id' ? 'Sangat Tidak Sehat' : 'Very Unhealthy', color: 'bg-red-500', desc: lang === 'id' ? 'Meningkatkan sensitivitas pada penderita penyakit paru-paru dan kardiovaskular.' : 'Health alert: risk of health effects is increased for everyone.' },
    { range: '300+', label: lang === 'id' ? 'Berbahaya' : 'Hazardous', color: 'bg-purple-500', desc: lang === 'id' ? 'Tingkat mutu udara berbahaya yang berakibat serius pada seluruh populasi.' : 'Emergency warning: everyone is more likely to be affected by severe haze.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header with Title and Sync Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {lang === 'id' ? 'Pemantauan Kualitas Udara Real-Time Kalimantan' : 'Real-Time Air Quality Telemetry Kalimantan'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400 max-w-3xl">
            {lang === 'id'
              ? 'Indeks Standar Pencemar Udara (ISPU) dan konsentrasi PM2.5 bersumber dari stasiun pemantau BMKG, KLHK ISPU-Net, dan model atmosfer Open-Meteo.'
              : 'Official Indonesian ISPU standards and fine particulate PM2.5 monitoring synchronized from BMKG, KLHK ISPU-Net, and Open-Meteo atmospheric models.'}
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-md text-xs font-mono font-medium transition-colors whitespace-nowrap self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : 'text-slate-400'}`} />
          <span>{isRefreshing ? (lang === 'id' ? 'Menyinkronkan...' : 'Syncing...') : (lang === 'id' ? 'Perbarui Data Langsung' : 'Refresh Telemetry')}</span>
        </button>
      </div>

      {/* Featured Primary Station Hero Display */}
      {selectedStation && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Telemetry Box */}
          <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              {/* Station Selector Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-mono text-slate-400 mr-2">{lang === 'id' ? 'PILIH STASIUN:' : 'SELECT STATION:'}</span>
                {stations.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStationId(s.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 border ${
                      selectedStationId === s.id
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-semibold shadow-sm'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {s.city}
                  </button>
                ))}
              </div>

              {/* Station Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedStation.city}</h2>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {selectedStation.stationName} <span aria-hidden="true">·</span> {selectedStation.province}
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-md border text-xs font-bold font-mono tracking-wide ${CATEGORY_COLORS[selectedStation.category].badge}`}>
                  {selectedStation.category.toUpperCase()}
                </div>
              </div>

              {/* Big KPI Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">ISPU INDONESIA</div>
                  <div className="text-3xl font-bold font-mono text-white mt-1 tabular-nums">
                    {selectedStation.ispu}
                  </div>
                  <div className={`text-[11px] font-semibold mt-1 ${CATEGORY_COLORS[selectedStation.category].text}`}>
                    {selectedStation.category}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">PM2.5 PARTICULATE</div>
                  <div className="text-3xl font-bold font-mono text-amber-300 mt-1 tabular-nums">
                    {selectedStation.pm25}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">µg/m³ (WHO Cap: 15)</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">PM10 COARSE SOOT</div>
                  <div className="text-3xl font-bold font-mono text-slate-200 mt-1 tabular-nums">
                    {selectedStation.pm10}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">µg/m³ (Airborne ash)</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">CARBON MONOXIDE</div>
                  <div className="text-3xl font-bold font-mono text-slate-200 mt-1 tabular-nums">
                    {selectedStation.co}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">µg/m³ (Peat gas)</div>
                </div>
              </div>

              {/* 24-Hour Trend Visualization */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span>{lang === 'id' ? 'RIWAYAT KONSENTRASI PM2.5 (24 JAM TERAKHIR)' : '24-HOUR PM2.5 PROFILE TELEMETRY'}</span>
                  <span>Max: {Math.max(...selectedStation.history24h.map(h => h.pm25))} µg/m³</span>
                </div>

                <div className="grid grid-cols-6 gap-2 h-28 items-end pt-2">
                  {selectedStation.history24h.map((point, idx) => {
                    const maxVal = Math.max(...selectedStation.history24h.map(h => h.pm25), 100);
                    const heightPercent = Math.min(100, Math.max(15, (point.pm25 / maxVal) * 100));
                    const isHigh = point.pm25 > 55;
                    const isExtreme = point.pm25 > 100;
                    
                    return (
                      <div key={idx} className="flex flex-col items-center h-full justify-end group">
                        <span className="text-[10px] font-mono text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {point.pm25}
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all ${
                            isExtreme 
                              ? 'bg-red-500 hover:bg-red-400' 
                              : isHigh 
                              ? 'bg-amber-500 hover:bg-amber-400' 
                              : 'bg-emerald-500 hover:bg-emerald-400'
                          }`}
                        />
                        <span className="text-[10px] font-mono text-slate-400 mt-1.5">{point.hour}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Weather & Drift telemetry strip */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Thermometer className="w-4 h-4 text-amber-400" />
                  <span>{selectedStation.temperature} °C</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>{selectedStation.humidity} % RH</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Wind className="w-4 h-4 text-sky-400" />
                  <span>{selectedStation.windSpeed} km/h ({selectedStation.windDirectionText})</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                {lang === 'id' ? 'Diperbarui:' : 'Last verified:'} {selectedStation.lastUpdated}
              </div>
            </div>
          </div>

          {/* Side Spotlight: Sensor Hardware & Health Protocol */}
          <div className="lg:col-span-4 bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="relative rounded-lg overflow-hidden border border-slate-800 mb-4 h-44 bg-slate-950">
                <img
                  src="/src/assets/images/air_quality_haze_monitoring_1793592333408.jpg"
                  alt="Environmental Air Monitoring Station in Kalimantan"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white/90">
                  SPKU Field Sensor Unit · Kalimantan
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>{lang === 'id' ? 'Rekomendasi Kesehatan ISPU' : 'Health & Respiratory Guidance'}</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300 mt-3">
                <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                  <span className="text-amber-400 font-bold">1.</span>
                  <span>
                    {selectedStation.ispu > 100
                      ? (lang === 'id' ? 'Gunakan respirator N95/KN95 saat beraktivitas di luar ruangan. Masker kain biasa tidak mampu menyaring partikel mikron PM2.5.' : 'Wear certified N95/KN95 respirators outdoors. Standard cloth masks do not filter fine PM2.5 particulates.')
                      : (lang === 'id' ? 'Mutu udara aman untuk aktivitas luar ruangan normal.' : 'Air quality is within acceptable limits for regular outdoor tasks.')
                    }
                  </span>
                </div>
                <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span>
                    {lang === 'id'
                      ? 'Tutup jendela dan ventilasi rumah pada pagi hari (05.00-09.00) saat inversi suhu membuat asap terkonsentrasi di permukaan tanah.'
                      : 'Close windows during early morning hours (05:00-09:00) when atmospheric temperature inversion traps smoke close to ground level.'}
                  </span>
                </div>
                <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                  <span className="text-amber-400 font-bold">3.</span>
                  <span>
                    {lang === 'id'
                      ? 'Bagi penderita ISPA/asma di Kalteng dan Kalsel, siagakan inhaler dan hubungi puskesmas terdekat jika sesak napas bertambah.'
                      : 'Vulnerable citizens with asthma or respiratory history should keep relief inhalers accessible and contact regional clinics.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Standard: Permen LHK No. 14/2020</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      )}

      {/* Multi-Province Comparative Matrix Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'id' ? 'Matriks Komparasi Kualitas Udara Seluruh Kalimantan' : 'Kalimantan Regional Air Quality Matrix'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'id' ? 'Pemantauan lintas stasiun BMKG dan SPKU KLHK' : 'Synchronized telemetry across all 5 provincial monitoring stations'}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {stations.length} {lang === 'id' ? 'Stasiun Aktif' : 'Active Stations'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">{lang === 'id' ? 'Kota & Stasiun' : 'City & Station'}</th>
                <th className="py-3 px-4">{lang === 'id' ? 'Provinsi' : 'Province'}</th>
                <th className="py-3 px-4 text-right">ISPU</th>
                <th className="py-3 px-4 text-center">{lang === 'id' ? 'Kategori' : 'Category'}</th>
                <th className="py-3 px-4 text-right">PM2.5 (µg/m³)</th>
                <th className="py-3 px-4 text-right">PM10 (µg/m³)</th>
                <th className="py-3 px-4 text-right">CO (µg/m³)</th>
                <th className="py-3 px-4 text-right">{lang === 'id' ? 'Angin & Arah' : 'Wind Vector'}</th>
                <th className="py-3 px-4 text-right">{lang === 'id' ? 'Sumber' : 'Source'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stations.map((st) => (
                <tr 
                  key={st.id} 
                  onClick={() => setSelectedStationId(st.id)}
                  className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                    selectedStationId === st.id ? 'bg-slate-800/80 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-white font-sans font-semibold">
                    {st.city}
                    <span className="block text-[10px] font-mono text-slate-400">{st.stationName}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{st.province}</td>
                  <td className="py-3 px-4 text-right font-bold text-white tabular-nums text-sm">
                    {st.ispu}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${CATEGORY_COLORS[st.category].badge}`}>
                      {st.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-amber-300 font-bold tabular-nums">
                    {st.pm25}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300 tabular-nums">
                    {st.pm10}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300 tabular-nums">
                    {st.co}
                  </td>
                  <td className="py-3 px-4 text-right text-cyan-300 tabular-nums">
                    {st.windSpeed} km/h · {st.windDirectionText.split(' ')[0]}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400 text-[10px]">
                    {st.source.split(' ')[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ISPU Scale Reference Strip */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          {lang === 'id' ? 'Buku Panduan Standar ISPU (Indeks Standar Pencemar Udara)' : 'Official ISPU Reference Scale (Permen LHK No. 14/2020)'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ispuBands.map((band, idx) => (
            <div key={idx} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-3 h-3 rounded ${band.color} shrink-0`}></span>
                  <span className="font-bold text-white">{band.label}</span>
                </div>
                <div className="text-[11px] font-mono text-amber-400 font-semibold mb-1">
                  ISPU {band.range}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {band.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
