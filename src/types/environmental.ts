export type KalimantanProvince = 
  | 'Kalimantan Barat'
  | 'Kalimantan Tengah'
  | 'Kalimantan Selatan'
  | 'Kalimantan Timur'
  | 'Kalimantan Utara';

export interface Hotspot {
  id: string;
  latitude: number;
  longitude: number;
  brightness: number; // Kelvin
  scanDate: string;
  scanTime: string;
  satellite: 'VIIRS/S-NPP' | 'NOAA-20' | 'Aqua/MODIS' | 'Terra/MODIS';
  confidence: 'low' | 'nominal' | 'high' | number;
  confidenceScore: number; // 0-100%
  frp: number; // Fire Radiative Power (MW)
  province: KalimantanProvince;
  regency: string;
  district: string;
  isPeatland: boolean;
  status: 'active' | 'contained' | 'under_patrol';
  source: 'NASA FIRMS' | 'KLHK SiPongi+' | 'BMKG Hotspot';
}

export type IspuCategory = 
  | 'Baik'              // 0 - 50 (Green)
  | 'Sedang'            // 51 - 100 (Blue/Teal)
  | 'Tidak Sehat'       // 101 - 199 (Yellow/Amber)
  | 'Sangat Tidak Sehat'// 200 - 299 (Red)
  | 'Berbahaya';        // 300+ (Black/Purple)

export interface AirQualityStation {
  id: string;
  city: string;
  province: KalimantanProvince;
  coordinates: [number, number]; // [lat, lng]
  ispu: number; // 0-500
  aqiUs: number;
  category: IspuCategory;
  pm25: number; // µg/m³
  pm10: number; // µg/m³
  co: number; // µg/m³
  temperature: number; // °C
  humidity: number; // %
  windSpeed: number; // km/h
  windDirection: number; // degrees
  windDirectionText: string;
  lastUpdated: string;
  stationName: string;
  source: 'BMKG' | 'KLHK ISPU-Net' | 'Open-Meteo Environmental';
  history24h: { hour: string; pm25: number; aqi: number }[];
}

export type FdrsRisk = 'Low / Aman' | 'Moderate / Waspada' | 'High / Rawan' | 'Extreme / Sangat Rawan';

export interface FdrsZone {
  province: KalimantanProvince;
  riskLevel: FdrsRisk;
  fwiScore: number; // Fire Weather Index
  consecutiveDryDays: number;
  ffmc: number; // Fine Fuel Moisture Code
  dmc: number; // Duff Moisture Code
  dc: number; // Drought Code
  peatRiskIndex: number; // 0-100
  summary: string;
}

export interface CommunityReport {
  id: string;
  timestamp: string;
  reporterName: string;
  province: KalimantanProvince;
  regency: string;
  latitude: number;
  longitude: number;
  smokeType: 'light_smoke' | 'dense_haze' | 'flames_visible';
  isPeatland: boolean;
  notes: string;
  status: 'dispatched' | 'verifying' | 'resolved';
  manggalaAgniBrigade: string;
}

export interface PreventionGuide {
  id: string;
  title: string;
  titleId: string;
  category: 'farmers' | 'plantations' | 'community' | 'schools';
  summary: string;
  summaryId: string;
  bulletPoints: string[];
  bulletPointsId: string[];
  lawReference?: string;
}

export interface SourceAttribution {
  id: string;
  name: string;
  authority: string;
  description: string;
  updateFrequency: string;
  status: 'connected' | 'live';
  url: string;
}
