import React from 'react';
import { ShieldAlert, Globe } from 'lucide-react';

interface TopNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  lang: 'id' | 'en';
  onLangToggle: () => void;
  onOpenReportModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLangToggle,
  onOpenReportModal,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Brand Wordmark (Single text element in display face, 1-line) */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onTabChange('map');
        }}
        className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
      >
        SIAGA KARHUTLA KALIMANTAN
      </a>

      {/* Zone 2: 4-5 concise nav links, 1-2 words, single-line, whitespace-nowrap */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onTabChange('map')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'map' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          {lang === 'id' ? 'Peta Satelit & Hotspot' : 'Satellite Fire Map'}
        </button>
        <button
          onClick={() => onTabChange('air-quality')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'air-quality' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          {lang === 'id' ? 'Kualitas Udara ISPU' : 'Air Quality Index'}
        </button>
        <button
          onClick={() => onTabChange('prevention')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'prevention' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          {lang === 'id' ? 'Cegah Karhutla & Gambut' : 'Fire Prevention Guide'}
        </button>
        <button
          onClick={() => onTabChange('ai-advisor')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'ai-advisor' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          {lang === 'id' ? 'Sintesis Risiko AI' : 'AI Threat Advisory'}
        </button>
        <button
          onClick={() => onTabChange('sources')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'sources' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          {lang === 'id' ? 'Sumber Resmi BMKG & KLHK' : 'Official Sources'}
        </button>
      </nav>

      {/* Zone 3: 1 primary action + language switch */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onLangToggle}
          title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{lang.toUpperCase()}</span>
        </button>
        
        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20"
        >
          <ShieldAlert className="w-4 h-4 text-slate-950" />
          <span>{lang === 'id' ? 'Lapor Titik Api' : 'Report Fire Spot'}</span>
        </button>
      </div>
    </header>
  );
};
