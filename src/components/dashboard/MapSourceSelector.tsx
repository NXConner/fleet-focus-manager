
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Map, Satellite, Globe, Layers } from "lucide-react";

export interface MapSource {
  id: string;
  name: string;
  type: 'mapbox' | 'google' | 'leaflet';
  style?: string;
  url?: string;
  attribution?: string;
  icon: React.ReactNode;
  requiresApiKey?: boolean;
}

export const MAP_SOURCES: MapSource[] = [
  {
    id: 'mapbox-satellite',
    name: 'Mapbox Satellite',
    type: 'mapbox',
    style: 'mapbox://styles/mapbox/satellite-v9',
    icon: <Satellite className="w-4 h-4" />,
    requiresApiKey: true
  },
  {
    id: 'mapbox-streets',
    name: 'Mapbox Streets',
    type: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v12',
    icon: <Map className="w-4 h-4" />,
    requiresApiKey: true
  },
  {
    id: 'google-satellite',
    name: 'Google Satellite',
    type: 'google',
    icon: <Satellite className="w-4 h-4" />,
    requiresApiKey: true
  },
  {
    id: 'google-hybrid',
    name: 'Google Hybrid',
    type: 'google',
    icon: <Globe className="w-4 h-4" />,
    requiresApiKey: true
  },
  {
    id: 'osm-standard',
    name: 'OpenStreetMap',
    type: 'leaflet',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    icon: <Map className="w-4 h-4" />
  },
  {
    id: 'esri-satellite',
    name: 'Esri World Imagery',
    type: 'leaflet',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri',
    icon: <Satellite className="w-4 h-4" />
  },
  {
    id: 'carto-positron',
    name: 'CartoDB Positron',
    type: 'leaflet',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap contributors © CARTO',
    icon: <Map className="w-4 h-4" />
  },
  {
    id: 'stamen-terrain',
    name: 'Stamen Terrain',
    type: 'leaflet',
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    icon: <Layers className="w-4 h-4" />
  }
];

interface MapSourceSelectorProps {
  selectedSource: string;
  onSourceChange: (sourceId: string) => void;
  availableSources?: MapSource[];
}

const MapSourceSelector: React.FC<MapSourceSelectorProps> = ({
  selectedSource,
  onSourceChange,
  availableSources = MAP_SOURCES
}) => {
  const currentSource = availableSources.find(source => source.id === selectedSource);

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedSource} onValueChange={onSourceChange}>
        <SelectTrigger className="w-48">
          <SelectValue>
            <div className="flex items-center gap-2">
              {currentSource?.icon}
              {currentSource?.name || 'Select Map Source'}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableSources.map((source) => (
            <SelectItem key={source.id} value={source.id}>
              <div className="flex items-center gap-2">
                {source.icon}
                <span>{source.name}</span>
                {source.requiresApiKey && (
                  <span className="text-xs text-muted-foreground">(API Key)</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MapSourceSelector;
