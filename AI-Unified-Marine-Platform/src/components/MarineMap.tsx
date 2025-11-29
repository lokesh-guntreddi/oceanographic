import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Layout } from './Layout';
import { MapPin, Satellite, Navigation, Waves, Fish, Thermometer, Activity, Signal, ZoomIn, ZoomOut, Wind } from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface MarineMapProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

// Static vessel data (Keep this static as discussed)
const vesselData = [
  { id: 'V001', name: 'Research Vessel Sagar', lat: 19.0760, lng: 72.8777, status: 'active', lastUpdate: '2 min ago' },
  { id: 'V002', name: 'Marine Explorer', lat: 15.2993, lng: 74.1240, status: 'active', lastUpdate: '1 min ago' },
  { id: 'V003', name: 'Ocean Surveyor', lat: 11.0168, lng: 76.9558, status: 'active', lastUpdate: '3 min ago' },
  { id: 'V004', name: 'Coastal Guard 1', lat: 13.0827, lng: 80.2707, status: 'active', lastUpdate: '1 min ago' },
];

// NOTE: Hardcoded 'speciesData' array removed. We now fetch this from Backend.

const mapLayers = [
  { id: 'temperature', label: 'Temperature', enabled: true },
  { id: 'zones', label: 'Zones', enabled: false },
  { id: 'currents', label: 'Ocean Currents', enabled: true },
  { id: 'protected', label: 'Protected Areas', enabled: false },
  { id: 'shipping', label: 'Shipping Routes', enabled: false },
  { id: 'depth', label: 'Depth Contours', enabled: true }
];

// Helper functions for species population styling
const getPopulationColor = (level: string) => {
  switch (level) {
    case 'excellent': return 'bg-emerald-500';
    case 'good': return 'bg-cyan-500';
    case 'moderate': return 'bg-amber-500';
    case 'low': return 'bg-rose-500';
    default: return 'bg-gray-500';
  }
};

const getPopulationBadgeVariant = (level: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (level) {
    case 'excellent': return 'default';
    case 'good': return 'secondary';
    case 'moderate': return 'outline';
    case 'low': return 'destructive';
    default: return 'outline';
  }
};

export default function MarineMap({ user, onNavigate, onLogout, language }: MarineMapProps) {
  const [mapStyle, setMapStyle] = useState('ocean');
  
  // FILTER STATE
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  
  const [activeVessels] = useState(12);
  const [selectedSpeciesInfo, setSelectedSpeciesInfo] = useState<any>(null);
  const [layers, setLayers] = useState(mapLayers);
  const [lastUpdate] = useState('Live Stream');
  
  // --- BACKEND INTEGRATION STATE ---
  const [speciesData, setSpeciesData] = useState<any[]>([]); // Stores data from MongoDB
  const [weatherData, setWeatherData] = useState({ temp: '--', wave: '--', current: '--' }); // Stores data from Open-Meteo
  const [isLoading, setIsLoading] = useState(false);

  const [mapInstance, setMapInstance] = useState<any>(null);
  const [currentTileLayer, setCurrentTileLayer] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  // --- 1. FETCH LIVE WEATHER (Open-Meteo API) ---
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetching for center of Indian EEZ approx
        const res = await fetch("https://marine-api.open-meteo.com/v1/marine?latitude=15.0&longitude=75.0&current=wave_height,ocean_current_velocity,temperature_2m");
        const data = await res.json();
        
        if (data.current) {
          setWeatherData({
            // Check for nulls to avoid "null°C" display
            temp: data.current.temperature_2m ? `${data.current.temperature_2m}°C` : '--',
            wave: data.current.wave_height ? `${data.current.wave_height}m` : '--',
            current: data.current.ocean_current_velocity ? `${data.current.ocean_current_velocity} m/s` : '--'
          });
        }
      } catch (err) {
        console.error("Weather fetch failed", err);
      }
    };
    fetchWeather();
  }, []);

  // --- 2. FETCH MARINE DATA (From YOUR Node.js/MongoDB Backend) ---
  useEffect(() => {
    const fetchMarineData = async () => {
      setIsLoading(true);
      try {
        // Build query string
        const params = new URLSearchParams();
        if (selectedSpecies !== 'all') params.append('species', selectedSpecies);
        if (selectedSeason !== 'all') params.append('season', selectedSeason);

        // Call your Node.js Backend
        const response = await fetch(`http://localhost:5000/api/map/occurrences?${params.toString()}`);
        
        if (!response.ok) throw new Error("Backend connection failed");
        
        const data = await response.json();
        console.log("Fetched Marine Data:", data);
        setSpeciesData(data);
      } catch (error) {
        console.error("Failed to fetch marine data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarineData();
  }, [selectedSpecies, selectedSeason]); // Re-fetch when user changes filters

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  // Helper: Return the fetched data (Backend does the filtering now)
  const getFilteredSpeciesData = () => {
    return speciesData;
  };

  // Initialize map with enhanced ocean visualization
  useEffect(() => {
    const initializeMap = () => {
      if (typeof window === 'undefined' || mapInstance || !mapRef.current) return;

      if (typeof window !== 'undefined' && window.L) {
        try {
          const L = window.L;
          
          if (L.Icon && L.Icon.Default) {
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
              iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });
          }
          
          const map = L.map(mapRef.current, {
            center: [15.0, 75.0], 
            zoom: 6,
            zoomControl: false,
            attributionControl: true,
            keyboard: false
          });

          const oceanLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
          }).addTo(map);

          setMapInstance(map);
          setCurrentTileLayer(oceanLayer);

          // Custom vessel icon setup... (Same as before)
          const vesselIcon = L.divIcon({
            className: 'vessel-marker',
            html: '<div style="color: #3b82f6; font-size: 14px;">🚢</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
          });

          // Add vessel markers
          const vesselMarkers = vesselData.map(vessel => {
            const marker = L.marker([vessel.lat, vessel.lng], { icon: vesselIcon }).addTo(map);
            marker.bindPopup(`<b>${vessel.name}</b><br>${vessel.status}`);
            return marker;
          });

          markersRef.current = [...vesselMarkers]; // Initial markers

          // Add Indian EEZ polygon
          L.polygon([
            [8.0, 68.0], [24.0, 68.0], [24.0, 97.0], [6.0, 97.0], [6.0, 78.0], [8.0, 68.0]
          ], {
            color: '#1e40af', weight: 2, opacity: 0.6, fillColor: '#3b82f6', fillOpacity: 0.1, dashArray: '5, 10'
          }).addTo(map);

        } catch (error) {
          console.error('Error initializing Leaflet map:', error);
          setMapInstance('fallback');
        }
      } else {
        setMapInstance('fallback');
      }
    };

    if (typeof window !== 'undefined' && !window.L) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setTimeout(initializeMap, 200);
      document.head.appendChild(script);
    } else {
      setTimeout(initializeMap, 100);
    }

    return () => {
      if (mapInstance && mapInstance !== 'fallback') {
        mapInstance.remove();
        setMapInstance(null);
      }
    };
  }, []);

  // Handle map style changes
  useEffect(() => {
    const changeMapStyle = () => {
      if (!mapInstance || mapInstance === 'fallback' || !currentTileLayer || !window.L) return;
      try {
        const L = window.L;
        mapInstance.removeLayer(currentTileLayer);
        let newTileLayer;
        switch (mapStyle) {
          case 'satellite':
            newTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18 });
            break;
          case 'nautical':
            newTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 18 });
            break;
          default:
            newTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 20 });
        }
        newTileLayer.addTo(mapInstance);
        setCurrentTileLayer(newTileLayer);
      } catch (error) { console.error('Error changing map style:', error); }
    };
    changeMapStyle();
  }, [mapStyle, mapInstance]);

  // --- 3. UPDATE MARKERS WHEN API DATA CHANGES ---
  useEffect(() => {
    if (!mapInstance || mapInstance === 'fallback' || !window.L) return;

    try {
      const L = window.L;
      
      // Clear existing markers
      markersRef.current.forEach(marker => {
        if (marker && mapInstance.hasLayer(marker)) {
          mapInstance.removeLayer(marker);
        }
      });

      // Re-add Vessel markers
      const vesselIcon = L.divIcon({
        className: 'vessel-marker',
        html: '<div style="color: #3b82f6; font-size: 14px;">🚢</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      const vesselMarkers = vesselData.map(vessel => {
        const marker = L.marker([vessel.lat, vessel.lng], { icon: vesselIcon }).addTo(mapInstance);
        marker.bindPopup(`<b>${vessel.name}</b><br>${vessel.status}`);
        return marker;
      });

      // ADD FISH MARKERS (From Backend Data)
      const speciesMarkers = speciesData.map(species => {
        const color = species.populationLevel === 'excellent' ? '#10b981' : 
                     species.populationLevel === 'good' ? '#06b6d4' :
                     species.populationLevel === 'moderate' ? '#f59e0b' : '#ef4444';
        
        const marker = L.circleMarker([species.lat, species.lng], {
          radius: 15,
          fillColor: color,
          color: '#ffffff',
          weight: 4,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(mapInstance);

        marker.bindPopup(`
          <div class="p-4 min-w-72">
            <h3 class="font-semibold text-lg mb-1">${species.name}</h3>
            <p class="text-sm text-gray-600 italic mb-3">${species.scientific}</p>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div><strong>Abundance:</strong> ${species.abundance}</div>
              <div><strong>Depth:</strong> ${species.depth}m</div>
              <div><strong>Temp:</strong> ${species.temperature}°C</div>
            </div>
            <div class="mt-2">
              <span class="inline-block px-2 py-1 rounded text-xs font-medium" style="background-color: ${color}20; color: ${color};">
                ${species.populationLevel}
              </span>
            </div>
          </div>
        `);

        marker.on('click', () => setSelectedSpeciesInfo(species));
        return marker;
      });

      markersRef.current = [...vesselMarkers, ...speciesMarkers];

    } catch (error) {
      console.error('Error updating markers:', error);
    }
  }, [speciesData, mapInstance]); // Update when speciesData (backend) changes

  // Custom map controls
  const zoomIn = () => mapInstance && mapInstance.zoomIn();
  const zoomOut = () => mapInstance && mapInstance.zoomOut();
  const centerOnIndia = () => mapInstance && mapInstance.setView([15.0, 75.0], 6);

  return (
    <Layout user={user} currentPage="marine-map" onNavigate={onNavigate} onLogout={onLogout} language={language}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">CMLRE backbone Marine Intelligence</h1>
            <p className="text-muted-foreground mt-2">Real-time Marine Ecosystem Monitoring for Indian EEZ</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="default" className="flex items-center">
              <Signal className="w-4 h-4 mr-2" />
              {activeVessels} Active Vessels
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Live Data Stream
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mission Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Mission Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Live Marine Ecosystem Monitor</span>
                    <Badge variant="default" className="bg-green-600">LIVE</Badge>
                  </div>
                </div>

                {/* UPDATED: REAL WEATHER DATA */}
                <div className="space-y-4">
                   <div className="bg-blue-50 p-2 rounded">
                      <div className="flex items-center text-xs text-blue-600 mb-1"><Thermometer className="w-3 h-3 mr-1"/> Temp</div>
                      <div className="text-xl font-bold">{weatherData.temp}</div>
                   </div>
                   <div className="bg-cyan-50 p-2 rounded">
                      <div className="flex items-center text-xs text-cyan-600 mb-1"><Waves className="w-3 h-3 mr-1"/> Wave Height</div>
                      <div className="text-xl font-bold">{weatherData.wave}</div>
                   </div>
                   <div className="bg-indigo-50 p-2 rounded">
                      <div className="flex items-center text-xs text-indigo-600 mb-1"><Wind className="w-3 h-3 mr-1"/> Current</div>
                      <div className="text-xl font-bold">{weatherData.current}</div>
                   </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Active Stations</span>
                    <span className="font-medium">{vesselData.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Satellite Link</span>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Map Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Map Style</label>
                  <Select value={mapStyle} onValueChange={setMapStyle}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocean">Enhanced Ocean View</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="nautical">Nautical Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Target Species</label>
                  <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Species</SelectItem>
                      <SelectItem value="Sardinella">Oil Sardine</SelectItem>
                      <SelectItem value="Rastrelliger">Indian Mackerel</SelectItem>
                      <SelectItem value="Katsuwonus">Skipjack Tuna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Seasonal Pattern</label>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Seasons</SelectItem>
                      <SelectItem value="monsoon">Monsoon</SelectItem>
                      <SelectItem value="post-monsoon">Post-monsoon</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                      <SelectItem value="pre-monsoon">Pre-monsoon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Data Layer Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Data Layer Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {layers.map(layer => (
                    <div key={layer.id} className="flex items-center justify-between">
                      <label className="text-sm font-medium">{layer.label}</label>
                      <Switch
                        checked={layer.enabled}
                        onCheckedChange={() => toggleLayer(layer.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

             {/* Population Legend (Kept same) */}
             <Card>
              <CardHeader><CardTitle>Population Legend</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between"><div className="flex items-center"><div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>Excellent</div><span>1000+</span></div>
                  <div className="flex items-center justify-between"><div className="flex items-center"><div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>Good</div><span>500-999</span></div>
                  <div className="flex items-center justify-between"><div className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>Moderate</div><span>200-499</span></div>
                  <div className="flex items-center justify-between"><div className="flex items-center"><div className="w-3 h-3 bg-rose-500 rounded-full mr-2"></div>Low</div><span>&lt;200</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[800px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Enhanced Marine Ecosystem Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-0 relative">
                
                {/* Fallback View (If Leaflet Fails) */}
                {mapInstance === 'fallback' ? (
                  <div className="relative w-full h-full bg-blue-900 rounded-b-lg overflow-hidden flex items-center justify-center">
                     <p className="text-white">Map Loading or Fallback Mode...</p>
                     {/* You can add your decorative SVGs here again if you want the visual backup */}
                  </div>
                ) : (
                  /* Real Map Container */
                  <div
                    ref={mapRef}
                    className="w-full h-full rounded-b-lg"
                    style={{ minHeight: '700px' }}
                    tabIndex={-1}
                  />
                )}

                {/* Loading Indicator */}
                {isLoading && (
                 <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg flex items-center border border-blue-200">
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                   <span className="text-sm font-medium text-blue-800">Fetching Live Data...</span>
                 </div>
                )}

                {/* Map Controls Overlay */}
                {mapInstance && mapInstance !== 'fallback' && (
                  <div className="absolute top-4 right-4 z-[1000] space-y-2">
                    <Button variant="outline" size="sm" className="bg-white/90 shadow-lg" onClick={centerOnIndia} title="Center"><MapPin className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="bg-white/90 shadow-lg" onClick={zoomIn} title="Zoom In"><ZoomIn className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="bg-white/90 shadow-lg" onClick={zoomOut} title="Zoom Out"><ZoomOut className="w-4 h-4" /></Button>
                  </div>
                )}

                {/* Species Information Overlay Panel */}
                {selectedSpeciesInfo && (
                  <div className="absolute top-4 left-4 z-[1000] bg-gray-900/95 backdrop-blur-sm text-white rounded-xl shadow-2xl border border-gray-700 p-5 max-w-sm">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg text-cyan-400">{selectedSpeciesInfo.name}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedSpeciesInfo(null)} className="h-6 w-6 p-0 text-white hover:bg-gray-800 rounded-full">×</Button>
                    </div>
                    <p className="text-sm text-gray-300 italic mb-3">{selectedSpeciesInfo.scientific}</p>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>Abundance: <span className="text-cyan-400 font-medium">{selectedSpeciesInfo.abundance}</span></div>
                      <div>Temp: <span className="text-orange-400 font-medium">{selectedSpeciesInfo.temperature}°C</span></div>
                      <div>Depth: <span className="text-purple-400 font-medium">{selectedSpeciesInfo.depth}m</span></div>
                    </div>
                    <Badge variant={getPopulationBadgeVariant(selectedSpeciesInfo.populationLevel)} className="text-xs">
                      {selectedSpeciesInfo.populationLevel} Population
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}