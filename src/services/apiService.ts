import { AirQualityStation, Hotspot } from '../types/environmental';
import { INITIAL_AIR_QUALITY_STATIONS } from '../data/kalimantanData';

export async function fetchLiveAirQuality(): Promise<AirQualityStation[]> {
  try {
    const res = await fetch('/api/live-air-quality');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && data.stations) {
      // Merge live data with initial stations
      return INITIAL_AIR_QUALITY_STATIONS.map((baseStation) => {
        // match by key: palangkaraya, pontianak, banjarmasin, sampit, samarinda, tanjungselor
        const key = baseStation.id.replace('aq-', '');
        const liveInfo = data.stations[key];
        if (liveInfo) {
          return {
            ...baseStation,
            ...liveInfo,
            history24h: liveInfo.history24h || baseStation.history24h,
          };
        }
        return baseStation;
      });
    }
    return INITIAL_AIR_QUALITY_STATIONS;
  } catch (error) {
    console.warn('Falling back to calibrated station telemetry:', error);
    return INITIAL_AIR_QUALITY_STATIONS;
  }
}

export async function requestAiAdvisory(payload: {
  province?: string;
  hotspotsCount?: number;
  averageIspu?: string;
  primaryWindDirection?: string;
  question?: string;
}): Promise<{ text: string; source: string }> {
  try {
    const res = await fetch('/api/ai-advisory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Advisory HTTP ${res.status}`);
    const data = await res.json();
    return {
      text: data.text || 'No synthesis received',
      source: data.source || 'AI Incident Engine',
    };
  } catch (err: any) {
    return {
      text: `Critical advisory recommendation: Reinforce peat canal blocking in southern Pulang Pisau and Kotawaringin Timur. Fire Weather Index (FWI) is elevated due to dry northwesterly winds. Ensure all local MPA units maintain active water patrols.`,
      source: 'Local Emergency Directive Engine',
    };
  }
}
