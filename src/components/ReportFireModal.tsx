import React, { useState } from 'react';
import { KalimantanProvince, CommunityReport } from '../types/environmental';
import { KALIMANTAN_PROVINCES, EMERGENCY_HOTLINES } from '../data/kalimantanData';
import { AlertTriangle, X, CheckCircle2, PhoneCall, MapPin, Send } from 'lucide-react';

interface ReportFireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (report: CommunityReport) => void;
  lang: 'id' | 'en';
}

export const ReportFireModal: React.FC<ReportFireModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  lang,
}) => {
  const [province, setProvince] = useState<KalimantanProvince>('Kalimantan Tengah');
  const [regency, setRegency] = useState('Kabupaten Pulang Pisau');
  const [reporterName, setReporterName] = useState('');
  const [phone, setPhone] = useState('');
  const [smokeType, setSmokeType] = useState<'light_smoke' | 'dense_haze' | 'flames_visible'>('dense_haze');
  const [isPeatland, setIsPeatland] = useState(true);
  const [notes, setNotes] = useState('');
  const [lat, setLat] = useState<number>(-2.25);
  const [lng, setLng] = useState<number>(113.92);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Determine responsible brigade
  const matchedContact = EMERGENCY_HOTLINES.find(c => c.region.includes(province.replace('Kalimantan ', ''))) 
    || EMERGENCY_HOTLINES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA',
      reporterName: reporterName.trim() || (lang === 'id' ? 'Warga Masyarakat' : 'Local Citizen'),
      province,
      regency,
      latitude: lat,
      longitude: lng,
      smokeType,
      isPeatland,
      notes: notes.trim() || (lang === 'id' ? 'Laporan titik asap di area semak/lahan terbuka.' : 'Reported smoke in open field area.'),
      status: 'verifying',
      manggalaAgniBrigade: matchedContact.name,
    };

    onSubmitReport(newReport);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span>{lang === 'id' ? 'LAPOR TITIK API / ASAP KARHUTLA' : 'REPORT FIRE SPOT OR SMOKE'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">
                {lang === 'id' ? 'Laporan Berhasil Diteruskan ke Posko!' : 'Report Forwarded to Command Center!'}
              </h3>
              <p className="text-slate-400 max-w-sm mx-auto">
                {lang === 'id'
                  ? 'Data koordinat dan tingkat asap telah dicatat ke peta pemantauan terpadu Siaga Karhutla.'
                  : 'Coordinates and smoke severity have been logged to the integrated dispatch dashboard.'}
              </p>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-left my-4 space-y-2">
                <div className="text-[11px] font-mono text-amber-400 uppercase">
                  {lang === 'id' ? 'Posko Tanggap Darurat Ditugaskan:' : 'Assigned Emergency Brigade:'}
                </div>
                <div className="font-bold text-white text-sm">{matchedContact.name}</div>
                <div className="text-slate-400 text-xs">Telepon / Siaga: <strong className="text-amber-300 font-mono">{matchedContact.phone}</strong></div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors text-xs"
              >
                {lang === 'id' ? 'Tutup & Kembali ke Peta' : 'Close & Return to Map'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-amber-950/30 border border-amber-800/60 p-3 rounded-lg text-amber-200 text-[11px] leading-relaxed">
                {lang === 'id'
                  ? 'Setiap laporan langsung disinkronkan dengan data regu Manggala Agni setempat untuk verifikasi cepat sebelum api membakar lapisan gambut dalam.'
                  : 'All incident reports are referenced directly by regional Manggala Agni brigades to prevent deep peat combustion.'}
              </div>

              {/* Province & Regency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    {lang === 'id' ? 'PROVINSI:' : 'PROVINCE:'}
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    {KALIMANTAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    {lang === 'id' ? 'KABUPATEN / KOTA:' : 'REGENCY / DISTRICT:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regency}
                    onChange={(e) => setRegency(e.target.value)}
                    placeholder="Contoh: Kotawaringin Timur"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Smoke Type Selection */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                  {lang === 'id' ? 'JENIS KEJADIAN / KEPULAN ASAP:' : 'SMOKE OR FIRE OBSERVED:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSmokeType('light_smoke')}
                    className={`p-2 rounded border text-center transition-colors ${
                      smokeType === 'light_smoke'
                        ? 'bg-amber-950 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-sm">💨</div>
                    <div className="text-[10px] mt-1">{lang === 'id' ? 'Asap Tipis / Bara' : 'Light Smoke'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSmokeType('dense_haze')}
                    className={`p-2 rounded border text-center transition-colors ${
                      smokeType === 'dense_haze'
                        ? 'bg-orange-950 border-orange-500 text-orange-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-sm">🌫️</div>
                    <div className="text-[10px] mt-1">{lang === 'id' ? 'Asap Pekat Tebal' : 'Dense Haze'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSmokeType('flames_visible')}
                    className={`p-2 rounded border text-center transition-colors ${
                      smokeType === 'flames_visible'
                        ? 'bg-red-950 border-red-500 text-red-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-sm">🔥</div>
                    <div className="text-[10px] mt-1">{lang === 'id' ? 'Kobaran Api Nyata' : 'Active Flames'}</div>
                  </button>
                </div>
              </div>

              {/* Peat Soil Checkbox */}
              <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                <input
                  type="checkbox"
                  id="peatCheck"
                  checked={isPeatland}
                  onChange={(e) => setIsPeatland(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="peatCheck" className="text-xs text-slate-300 cursor-pointer">
                  {lang === 'id' ? 'Terjadi di atas Tanah Gambut (Lahan Berwarna Cokelat/Seresah Tebal)' : 'Located on Peat Soil (Brown organic peat soil / vulnerable to smoldering)'}
                </label>
              </div>

              {/* Coordinates Preview */}
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block mb-1">LATITUDE:</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white"
                  />
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">LONGITUDE:</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white"
                  />
                </div>
              </div>

              {/* Reporter Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    {lang === 'id' ? 'NAMA PELAPOR:' : 'YOUR NAME:'}
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Budi / Relawan MPA"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    {lang === 'id' ? 'NO. TELEPON / WA:' : 'PHONE NUMBER:'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  {lang === 'id' ? 'CATATAN LOKASI / KETERANGAN:' : 'LOCATION DETAILS & NOTES:'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'id' ? 'Contoh: Di dekat jembatan parit primer Km 14, asap mengarah ke pemukiman.' : 'Example: Near primary canal bridge Km 14, wind carrying smoke toward village.'}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-xs resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs shadow-md shadow-red-600/30"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'id' ? 'Kirim Laporan Siaga Sekarang' : 'Submit Alert to Command Center'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
