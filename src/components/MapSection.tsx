import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Hotspot, 
  AirQualityStation, 
  KalimantanProvince,
  FdrsZone 
} from '../types/environmental';
import { 
  Flame, 
  Wind, 
  Layers, 
  Eye, 
  LocateFixed, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface MapSectionProps {
  hotspots: Hotspot[];
  airStations: AirQualityStation[];
  fdrsZones: FdrsZone[];
  selectedProvince: KalimantanProvince | 'All';
  onSelectProvince: (prov: KalimantanProvince | 'All') => void;
  lang: 'id' | 'en';
  onOpenReportModal: () => void;
}

// Center of Kalimantan (Borneo)
const KALIMANTAN_CENTER: [number, number] = [-1.0, 114.0];
const DEFAULT_ZOOM = 6;

// Province camera coordinates
const PROVINCE_VIEWPORTS: Record<string, { center: [number, number]; zoom: number }> = {
  'All': { center: [-1.0, 114.0], zoom: 6 },
  'Kalimantan Barat': { center: [-0.15, 110.5], zoom: 7 },
  'Kalimantan Tengah': { center: [-1.8, 113.5], zoom: 7 },
  'Kalimantan Selatan': { center: [-3.0, 115.3], zoom: 8 },
  'Kalimantan Timur': { center: [0.5, 116.8], zoom: 7 },
  'Kalimantan Utara': { center: [3.2, 116.5], zoom: 7 },
};

export const MapSection: React.FC<MapSectionProps> = ({
  hotspots,
  airStations,
  fdrsZones,
  selectedProvince,
  onSelectProvince,
  lang,
  onOpenReportModal,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseLayersRef = useRef<{ [key: string]: L.TileLayer }>({});
  const hotspotLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const airQualityLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const fdrsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const windVectorLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeBaseMap, setActiveBaseMap] = useState<'dark' | 'satellite' | 'streets'>('satellite');
  const [showHotspots, setShowHotspots] = useState(true);
  const [showAirQuality, setShowAirQuality] = useState(true);
  const [showFdrsRisk, setShowFdrsRisk] = useState(true);
  const [showWindVectors, setShowWindVectors] = useState(true);
  const [peatlandOnlyFilter, setPeatlandOnlyFilter] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map instance
    const map = L.map(mapContainerRef.current, {
      center: KALIMANTAN_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
      minZoom: 5,
      maxZoom: 14,
    });

    // Tile layers
    const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB &copy; OpenStreetMap contributors',
      maxZoom: 19,
    });

    const satelliteTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &copy; Earthstar Geographics',
      maxZoom: 18,
    });

    const streetTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    });

    baseLayersRef.current = {
      dark: darkTiles,
      satellite: satelliteTiles,
      streets: streetTiles,
    };

    // Default to satellite to view authentic peatland topography & rainforest
    satelliteTiles.addTo(map);

    // Layer groups for markers
    hotspotLayerGroupRef.current = L.layerGroup().addTo(map);
    airQualityLayerGroupRef.current = L.layerGroup().addTo(map);
    fdrsLayerGroupRef.current = L.layerGroup().addTo(map);
    windVectorLayerGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch base tile layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(baseLayersRef.current).forEach((layer) => {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    const selectedLayer = baseLayersRef.current[activeBaseMap];
    if (selectedLayer) {
      selectedLayer.addTo(map);
    }
  }, [activeBaseMap]);

  // Handle province change viewport
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const viewport = PROVINCE_VIEWPORTS[selectedProvince] || PROVINCE_VIEWPORTS['All'];
    map.flyTo(viewport.center, viewport.zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [selectedProvince]);

  // Update Hotspots Layer
  useEffect(() => {
    const layerGroup = hotspotLayerGroupRef.current;
    if (!layerGroup) return;
    layerGroup.clearLayers();

    if (!showHotspots) return;

    const filtered = hotspots.filter((h) => {
      if (selectedProvince !== 'All' && h.province !== selectedProvince) return false;
      if (peatlandOnlyFilter && !h.isPeatland) return false;
      return true;
    });

    filtered.forEach((hotspot) => {
      const isHighConf = hotspot.confidenceScore >= 80;
      const isPeat = hotspot.isPeatland;
      
      const color = isHighConf ? '#ef4444' : '#f97316';
      const radius = isHighConf ? 14 : 10;

      // Outer thermal pulse circle
      const pulseCircle = L.circleMarker([hotspot.latitude, hotspot.longitude], {
        radius: radius + 6,
        color: color,
        fillColor: color,
        fillOpacity: 0.25,
        weight: 1,
        className: 'animate-pulse',
      });

      // Core thermal marker
      const coreMarker = L.circleMarker([hotspot.latitude, hotspot.longitude], {
        radius: radius,
        color: '#ffffff',
        fillColor: color,
        fillOpacity: 0.9,
        weight: 2,
      });

      const popupHtml = `
        <div class="p-2 space-y-1.5 min-w-[220px]">
          <div class="flex items-center justify-between border-b border-slate-700 pb-1 text-xs">
            <span class="font-bold text-red-400 flex items-center gap-1">
              🔥 ${hotspot.satellite}
            </span>
            <span class="font-mono text-slate-300">${hotspot.confidenceScore}% Conf</span>
          </div>
          <div class="text-sm font-semibold text-white">${hotspot.regency}</div>
          <div class="text-xs text-slate-400">${hotspot.district} · ${hotspot.province}</div>
          <div class="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-mono">
            <div class="bg-slate-800/80 p-1 rounded">
              <span class="text-slate-400 block">FRP Power:</span>
              <span class="text-amber-300 font-bold">${hotspot.frp} MW</span>
            </div>
            <div class="bg-slate-800/80 p-1 rounded">
              <span class="text-slate-400 block">Brightness:</span>
              <span class="text-red-300 font-bold">${hotspot.brightness} K</span>
            </div>
          </div>
          <div class="text-[11px] pt-1">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              isPeat ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-800 text-slate-300'
            }">
              ${isPeat ? '⚠️ PEATLAND GAMBUT' : 'Mineral Soil Lahan'}
            </span>
            <span class="text-slate-400 text-[10px] ml-2 font-mono">${hotspot.scanTime}</span>
          </div>
          <div class="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
            Source: <span class="text-cyan-400">${hotspot.source}</span>
          </div>
        </div>
      `;

      coreMarker.bindPopup(popupHtml);
      coreMarker.on('click', () => {
        setSelectedHotspot(hotspot);
      });

      pulseCircle.addTo(layerGroup);
      coreMarker.addTo(layerGroup);
    });
  }, [hotspots, showHotspots, selectedProvince, peatlandOnlyFilter]);

  // Update Air Quality Stations Layer
  useEffect(() => {
    const layerGroup = airQualityLayerGroupRef.current;
    if (!layerGroup) return;
    layerGroup.clearLayers();

    if (!showAirQuality) return;

    airStations.forEach((station) => {
      if (selectedProvince !== 'All' && station.province !== selectedProvince) return;

      // Color based on ISPU category
      let badgeColor = '#10b981'; // Baik
      let textColor = '#022c22';
      if (station.category === 'Sedang') {
        badgeColor = '#06b6d4';
        textColor = '#083344';
      } else if (station.category === 'Tidak Sehat') {
        badgeColor = '#f59e0b';
        textColor = '#451a03';
      } else if (station.category === 'Sangat Tidak Sehat') {
        badgeColor = '#ef4444';
        textColor = '#450a0a';
      } else if (station.category === 'Berbahaya') {
        badgeColor = '#7e22ce';
        textColor = '#ffffff';
      }

      // Custom HTML Marker showing ISPU score directly on map
      const customIcon = L.divIcon({
        className: 'custom-aqi-icon',
        html: `
          <div style="background-color: ${badgeColor}; color: ${textColor};" class="flex flex-col items-center justify-center font-bold px-2 py-1 rounded shadow-lg border border-white/60 text-xs transform -translate-x-1/2 -translate-y-1/2">
            <span class="font-mono text-[10px] leading-none uppercase">ISPU</span>
            <span class="font-mono text-sm leading-tight">${station.ispu}</span>
          </div>
        `,
        iconSize: [46, 32],
        iconAnchor: [23, 16],
      });

      const marker = L.marker(station.coordinates, { icon: customIcon });

      const popupHtml = `
        <div class="p-2 space-y-1.5 min-w-[230px]">
          <div class="flex items-center justify-between border-b border-slate-700 pb-1 text-xs">
            <span class="font-bold text-white">${station.city}</span>
            <span class="font-mono px-1.5 py-0.5 rounded text-[10px]" style="background:${badgeColor}; color:${textColor}">
              ${station.category}
            </span>
          </div>
          <div class="text-[11px] text-slate-300">${station.stationName}</div>
          <div class="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-mono">
            <div class="bg-slate-800/80 p-1.5 rounded">
              <span class="text-slate-400 block text-[10px]">PM2.5:</span>
              <span class="text-white font-bold text-sm">${station.pm25}</span>
              <span class="text-slate-400 text-[10px]"> µg/m³</span>
            </div>
            <div class="bg-slate-800/80 p-1.5 rounded">
              <span class="text-slate-400 block text-[10px]">US AQI:</span>
              <span class="text-amber-300 font-bold text-sm">${station.aqiUs}</span>
            </div>
            <div class="bg-slate-800/80 p-1.5 rounded">
              <span class="text-slate-400 block text-[10px]">Wind:</span>
              <span class="text-cyan-300 font-bold">${station.windSpeed} km/h</span>
              <span class="text-slate-400 text-[10px] block">${station.windDirectionText}</span>
            </div>
            <div class="bg-slate-800/80 p-1.5 rounded">
              <span class="text-slate-400 block text-[10px]">Temp / RH:</span>
              <span class="text-slate-200 font-bold">${station.temperature}°C</span>
              <span class="text-slate-400 text-[10px] block">${station.humidity}% RH</span>
            </div>
          </div>
          <div class="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
            <span>Source: ${station.source}</span>
            <span>${station.lastUpdated}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.addTo(layerGroup);
    });
  }, [airStations, showAirQuality, selectedProvince]);

  // Update FDRS Risk Zones & Peat Vulnerability
  useEffect(() => {
    const layerGroup = fdrsLayerGroupRef.current;
    if (!layerGroup) return;
    layerGroup.clearLayers();

    if (!showFdrsRisk) return;

    // Indicative peat basin polygons (Sebangau, Pulang Pisau, Liang Anggang, Ketapang)
    const peatPolygons: { name: string; coords: [number, number][]; level: string }[] = [
      {
        name: 'Sebangau & Kahayan Peat Basin (Kalteng)',
        coords: [
          [-2.05, 113.65],
          [-2.15, 114.15],
          [-2.65, 114.25],
          [-2.95, 113.85],
          [-2.50, 113.40],
        ],
        level: 'Extreme / Sangat Rawan'
      },
      {
        name: 'Sampit - Mentaya Lowland Peat (Kalteng)',
        coords: [
          [-2.35, 112.75],
          [-2.40, 113.15],
          [-2.75, 113.10],
          [-2.85, 112.70],
        ],
        level: 'Extreme / Sangat Rawan'
      },
      {
        name: 'Liang Anggang Peat Dome (Kalsel)',
        coords: [
          [-3.30, 114.65],
          [-3.40, 114.85],
          [-3.65, 114.80],
          [-3.60, 114.60],
        ],
        level: 'High / Rawan'
      },
      {
        name: 'Ketapang Coastal Peat Corridor (Kalbar)',
        coords: [
          [-1.50, 109.85],
          [-1.60, 110.20],
          [-2.10, 110.15],
          [-2.00, 109.80],
        ],
        level: 'Moderate / Waspada'
      }
    ];

    peatPolygons.forEach((poly) => {
      const isExtreme = poly.level.includes('Extreme');
      const strokeColor = isExtreme ? '#dc2626' : '#d97706';
      const fillColor = isExtreme ? '#ef4444' : '#f59e0b';

      const polygon = L.polygon(poly.coords, {
        color: strokeColor,
        fillColor: fillColor,
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '4, 4',
      });

      polygon.bindTooltip(`
        <div class="text-xs font-sans">
          <strong class="text-amber-400">${poly.name}</strong><br/>
          <span class="text-slate-300">FDRS Status: ${poly.level}</span>
        </div>
      `);

      polygon.addTo(layerGroup);
    });
  }, [showFdrsRisk]);

  // Update Wind vectors indicating smoke drift direction
  useEffect(() => {
    const layerGroup = windVectorLayerGroupRef.current;
    if (!layerGroup) return;
    layerGroup.clearLayers();

    if (!showWindVectors) return;

    // Regional wind vectors based on seasonal southeasterly monsoon (SE -> NW)
    const windNodes: { lat: number; lng: number; angle: number; speed: number }[] = [
      { lat: -2.4, lng: 114.0, angle: 315, speed: 15 },
      { lat: -2.8, lng: 113.0, angle: 320, speed: 17 },
      { lat: -3.4, lng: 114.8, angle: 330, speed: 16 },
      { lat: -1.8, lng: 110.2, angle: 340, speed: 12 },
      { lat: -0.6, lng: 116.5, angle: 290, speed: 10 },
    ];

    windNodes.forEach((node) => {
      const icon = L.divIcon({
        className: 'wind-arrow',
        html: `
          <div style="transform: rotate(${node.angle}deg);" class="flex items-center text-cyan-400 opacity-75">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([node.lat, node.lng], { icon });
      marker.bindTooltip(`Monsoon Wind: ${node.speed} km/h (SE to NW Drift)`);
      marker.addTo(layerGroup);
    });
  }, [showWindVectors]);

  // Aggregate stats
  const activeCount = hotspots.filter(h => h.status === 'active').length;
  const peatCount = hotspots.filter(h => h.isPeatland).length;

  return (
    <div className="flex flex-col h-[calc(100vh-69px)] w-full bg-slate-950">
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          {/* Province Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded border border-slate-800 text-xs">
            <LocateFixed className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedProvince}
              onChange={(e) => onSelectProvince(e.target.value as any)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">{lang === 'id' ? 'Seluruh Kalimantan' : 'All Kalimantan Provinces'}</option>
              <option value="Kalimantan Tengah">Kalimantan Tengah (Kalteng)</option>
              <option value="Kalimantan Barat">Kalimantan Barat (Kalbar)</option>
              <option value="Kalimantan Selatan">Kalimantan Selatan (Kalsel)</option>
              <option value="Kalimantan Timur">Kalimantan Timur & IKN</option>
              <option value="Kalimantan Utara">Kalimantan Utara (Kaltara)</option>
            </select>
          </div>

          {/* Peatland Only Toggle */}
          <button
            onClick={() => setPeatlandOnlyFilter(!peatlandOnlyFilter)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 border ${
              peatlandOnlyFilter 
                ? 'bg-amber-950/80 border-amber-600 text-amber-300' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {peatlandOnlyFilter ? '✓ ' : ''}{lang === 'id' ? 'Lahan Gambut Saja' : 'Peatland Hotspots Only'}
          </button>

          {/* Hotspots layer toggle */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 border ${
              showHotspots
                ? 'bg-red-950/70 border-red-700 text-red-300'
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Flame className="w-3 h-3 text-red-400" />
            <span>Hotspot ({hotspots.length})</span>
          </button>

          {/* Air Quality stations layer toggle */}
          <button
            onClick={() => setShowAirQuality(!showAirQuality)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 border ${
              showAirQuality
                ? 'bg-cyan-950/70 border-cyan-700 text-cyan-300'
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>{lang === 'id' ? 'Stasiun ISPU' : 'ISPU Nodes'} ({airStations.length})</span>
          </button>

          {/* Wind vectors toggle */}
          <button
            onClick={() => setShowWindVectors(!showWindVectors)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 border ${
              showWindVectors
                ? 'bg-sky-950/70 border-sky-700 text-sky-300'
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <Wind className="w-3 h-3 text-sky-400" />
            <span>{lang === 'id' ? 'Arah Angin / Asap' : 'Wind & Haze Vectors'}</span>
          </button>

          {/* FDRS Peat risk zones toggle */}
          <button
            onClick={() => setShowFdrsRisk(!showFdrsRisk)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 border ${
              showFdrsRisk
                ? 'bg-amber-950/70 border-amber-700 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>{lang === 'id' ? 'Zona Rawan Gambut' : 'Peat Risk Domes'}</span>
          </button>
        </div>

        {/* Base Map Style Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800">
          <Layers className="w-3.5 h-3.5 text-slate-400 ml-1" />
          <button
            onClick={() => setActiveBaseMap('satellite')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeBaseMap === 'satellite' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setActiveBaseMap('dark')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeBaseMap === 'dark' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dark GIS
          </button>
          <button
            onClick={() => setActiveBaseMap('streets')}
            className={`px-2 py-0.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeBaseMap === 'streets' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OpenStreetMap
          </button>
        </div>
      </div>

      {/* Main Map Viewport */}
      <div className="relative flex-1 w-full min-h-0">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Telemetry & Legend HUD */}
        <div className="absolute top-4 left-4 z-10 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-lg border border-slate-800 shadow-xl max-w-sm hidden sm:block pointer-events-auto">
          <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
            <span>KALIMANTAN MONITORING HUD</span>
            <span className="font-mono text-[10px] text-amber-400 uppercase">Live Satellite Sync</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Active Hotspots</span>
              <span className="text-lg font-bold text-red-400 tabular-nums">{activeCount}</span>
              <span className="text-[10px] text-slate-500 block">VIIRS / MODIS</span>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Peatland Fires</span>
              <span className="text-lg font-bold text-amber-400 tabular-nums">{peatCount}</span>
              <span className="text-[10px] text-slate-500 block">KHG Subterranean</span>
            </div>
          </div>

          {/* Quick Legend */}
          <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] space-y-1 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
              <span>Hotspot High Conf (FRP &gt; 25MW)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <span>Hotspot Nominal / Peat Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-2.5 bg-red-500/20 border border-red-500/60 rounded shrink-0"></span>
              <span>FDRS Extreme Fire Weather Basin</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400 shrink-0"></span>
              <span>ISPU Real-Time Air Quality Sensor</span>
            </div>
          </div>
        </div>

        {/* Selected Hotspot Detail Drawer */}
        {selectedHotspot && (
          <div className="absolute bottom-4 right-4 z-10 bg-slate-900/95 backdrop-blur-md p-4 rounded-lg border border-red-500/40 shadow-2xl max-w-sm pointer-events-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                <span>HOTSPOT TELEMETRY</span>
              </div>
              <button 
                onClick={() => setSelectedHotspot(null)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-white text-sm">{selectedHotspot.regency}</div>
              <div className="text-slate-300">{selectedHotspot.district} · {selectedHotspot.province}</div>
              
              <div className="grid grid-cols-2 gap-2 my-2 font-mono text-[11px]">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Confidence</span>
                  <span className="text-white font-bold">{selectedHotspot.confidenceScore}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Radiative Power</span>
                  <span className="text-amber-400 font-bold">{selectedHotspot.frp} MW</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Brightness Temp</span>
                  <span className="text-red-300 font-bold">{selectedHotspot.brightness} K</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Sensor</span>
                  <span className="text-cyan-300 font-bold">{selectedHotspot.satellite}</span>
                </div>
              </div>

              <div className="p-2 rounded bg-amber-950/40 border border-amber-800 text-[11px] text-amber-200">
                {selectedHotspot.isPeatland 
                  ? '⚠️ Lahan Gambut Dalam: Rentan terbakar di bawah permukaan (ground fire). Berisiko menghasilkan kabut asap pekat tebal.'
                  : 'Lahan Mineral: Kebakaran vegetasi permukaan (surface fire). Penanganan pemadaman darat disarankan sebelum angin menguat.'
                }
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">Source: {selectedHotspot.source}</span>
                <button
                  onClick={onOpenReportModal}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold rounded transition-colors whitespace-nowrap"
                >
                  {lang === 'id' ? 'Kirim Laporan Posko' : 'Dispatch Alert'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="px-6 py-2.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-slate-200 font-semibold">{lang === 'id' ? 'Status BMKG FDRS:' : 'BMKG Fire Danger:'}</span>
          <span>Kalteng: <strong className="text-red-400">Extreme</strong></span>
          <span aria-hidden="true">·</span>
          <span>Kalsel: <strong className="text-amber-400">High</strong></span>
          <span aria-hidden="true">·</span>
          <span>Kalbar: <strong className="text-yellow-400">Moderate</strong></span>
          <span aria-hidden="true">·</span>
          <span>Kaltim & Kaltara: <strong className="text-emerald-400">Low</strong></span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>🛰️ NASA VIIRS 375m & Aqua/Terra MODIS 1km</span>
          <span aria-hidden="true">·</span>
          <span>Data Sources: BMKG · KLHK SiPongi+ · NASA FIRMS</span>
        </div>
      </div>
    </div>
  );
};
