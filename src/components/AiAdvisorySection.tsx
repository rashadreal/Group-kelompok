import React, { useState } from 'react';
import { requestAiAdvisory } from '../services/apiService';
import { KalimantanProvince, Hotspot, AirQualityStation } from '../types/environmental';
import { Sparkles, Send, BrainCircuit, RefreshCw, HelpCircle, FileCheck2 } from 'lucide-react';

interface AiAdvisorySectionProps {
  hotspots: Hotspot[];
  stations: AirQualityStation[];
  lang: 'id' | 'en';
}

export const AiAdvisorySection: React.FC<AiAdvisorySectionProps> = ({
  hotspots,
  stations,
  lang,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<KalimantanProvince | 'Semua'>('Kalimantan Tengah');
  const [customQuestion, setCustomQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [advisoryResult, setAdvisoryResult] = useState<{ text: string; source: string } | null>(null);

  const sampleQuestions = [
    {
      qId: 'Bagaimana cara membuka lahan pertanian tanpa membakar (PLTB) pada tanah gambut tebal?',
      qEn: 'How can farmers clear agricultural land without burning on thick peat soils?'
    },
    {
      qId: 'Apakah aman beraktivitas di luar ruangan jika angka ISPU mencapai 140 di Palangka Raya?',
      qEn: 'Is it safe to exercise outdoors when the ISPU reaches 140 in Palangka Raya?'
    },
    {
      qId: 'Bagaimana angin monsun mempengaruhi sebaran asap kebakaran dari Kalimantan ke wilayah sekitarnya?',
      qEn: 'How do monsoon winds affect the dispersion of fire smoke from Kalimantan to neighboring areas?'
    },
    {
      qId: 'Kapan pintu sekat kanal (canal block) harus ditutup rapat untuk mencegah kebakaran gambut dalam?',
      qEn: 'When should canal blocking gates be sealed shut to prevent subterranean peat smoldering?'
    }
  ];

  const handleRunSynthesis = async (questionOverride?: string) => {
    setLoading(true);
    const relevantHotspots = selectedProvince === 'Semua' 
      ? hotspots 
      : hotspots.filter(h => h.province === selectedProvince);
    
    const provStations = selectedProvince === 'Semua' 
      ? stations 
      : stations.filter(s => s.province === selectedProvince);

    const avgIspu = provStations.length > 0
      ? Math.round(provStations.reduce((acc, s) => acc + s.ispu, 0) / provStations.length)
      : 110;

    const query = questionOverride !== undefined ? questionOverride : (customQuestion.trim() || undefined);

    const result = await requestAiAdvisory({
      province: selectedProvince,
      hotspotsCount: relevantHotspots.length,
      averageIspu: `Rata-rata ISPU ${avgIspu} (${avgIspu > 100 ? 'Tidak Sehat' : 'Sedang'})`,
      primaryWindDirection: 'Tenggara ke Barat Laut (SE to NW) 14 km/h',
      question: query,
    });

    setAdvisoryResult(result);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <BrainCircuit className="w-7 h-7 text-amber-400" />
          <span>{lang === 'id' ? 'Sintesis Risiko Karhutla & Asisten Cerdas Lingkungan' : 'AI Fire & Environmental Threat Synthesis'}</span>
        </h1>
        <p className="mt-1.5 text-sm text-slate-400 max-w-3xl">
          {lang === 'id'
            ? 'Didukung model cerdas Gemini untuk menganalisis risiko pembakaran gambut, trajektori sebaran kabut asap, dan memberikan rekomendasi keselamatan langsung bagi petani serta masyarakat.'
            : 'Powered by Gemini to synthesize real-time satellite fire risks, smoke plume trajectory modeling, and instant avoidance directives.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Parameter Selector & Questions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'id' ? 'Pilih Wilayah Analisis' : 'Target Region for Synthesis'}
            </h2>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 block font-mono">
                {lang === 'id' ? 'PROVINSI FOKUS:' : 'TARGET PROVINCE:'}
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value as any)}
                className="w-full bg-slate-950 text-white text-xs font-semibold p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400"
              >
                <option value="Kalimantan Tengah">Kalimantan Tengah (Kalteng - Peat Basin)</option>
                <option value="Kalimantan Barat">Kalimantan Barat (Kalbar - Kapuas River)</option>
                <option value="Kalimantan Selatan">Kalimantan Selatan (Kalsel - Liang Anggang)</option>
                <option value="Kalimantan Timur">Kalimantan Timur (Kaltim & IKN)</option>
                <option value="Kalimantan Utara">Kalimantan Utara (Kaltara)</option>
                <option value="Semua">{lang === 'id' ? 'Seluruh Kalimantan' : 'All Kalimantan Provinces'}</option>
              </select>
            </div>

            <button
              onClick={() => handleRunSynthesis('')}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-amber-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{lang === 'id' ? 'Menganalisis Telemetri Satelit...' : 'Synthesizing Satellite Telemetry...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'id' ? 'Buat Sintesis Risiko Wilayah' : 'Generate Threat Synthesis'}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Questions Box */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{lang === 'id' ? 'Pertanyaan Siaga Populer' : 'Frequent Environmental Queries'}</span>
            </h3>

            <div className="space-y-2">
              {sampleQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const text = lang === 'id' ? sq.qId : sq.qEn;
                    setCustomQuestion(text);
                    handleRunSynthesis(text);
                  }}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 text-slate-300 border border-slate-800 transition-colors flex items-start gap-2"
                >
                  <span className="text-amber-400 font-bold shrink-0">💬</span>
                  <span className="line-clamp-2">{lang === 'id' ? sq.qId : sq.qEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ask custom input */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-white block">
              {lang === 'id' ? 'Tanyakan Langsung Pada Petugas / Pakar AI:' : 'Ask Specialist or Environmental Officer:'}
            </label>
            <div className="relative">
              <textarea
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder={lang === 'id' ? 'Contoh: Berapa lama waktu yang dibutuhkan mikroba untuk mengurai seresah tanpa bakar?' : 'Example: What is the recommended firebreak width in peat soil during high winds?'}
                rows={3}
                className="w-full bg-slate-950 text-white text-xs p-3 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400 resize-none"
              />
              <button
                onClick={() => handleRunSynthesis()}
                disabled={loading || !customQuestion.trim()}
                className="absolute bottom-2.5 right-2.5 p-1.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 rounded transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Synthesis Result Display */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl min-h-[500px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'id' ? 'Lembar Sintesis & Rekomendasi Lapangan' : 'Field Advisory & Action Directive'}
                </span>
              </div>
              {advisoryResult && (
                <span className="text-[11px] font-mono text-cyan-400">
                  {advisoryResult.source}
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
                <p className="text-xs font-mono text-slate-400">
                  {lang === 'id' ? 'Menghubungkan data MODIS, VIIRS, dan indeks ISPU...' : 'Connecting MODIS, VIIRS, and ISPU telemetry...'}
                </p>
              </div>
            ) : advisoryResult ? (
              <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed space-y-3 font-sans">
                <div className="whitespace-pre-wrap">{advisoryResult.text}</div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-300">
                  {lang === 'id' ? 'Belum ada sintesis yang dijalankan' : 'No synthesis generated yet'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {lang === 'id'
                    ? 'Klik "Buat Sintesis Risiko Wilayah" atau pilih salah satu pertanyaan populer untuk memproses data satelit dan arah angin.'
                    : 'Click "Generate Threat Synthesis" or choose a question from the panel to run real-time analysis.'}
                </p>
                <button
                  onClick={() => handleRunSynthesis('')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  {lang === 'id' ? 'Mulai Analisis Sekarang' : 'Start Synthesis Now'}
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between items-center">
            <span>Model: Gemini 3.8 Flash Scientific Synthesis</span>
            <span>Guidelines: BMKG · BNPB · KLHK Indonesia</span>
          </div>
        </div>
      </div>
    </div>
  );
};
