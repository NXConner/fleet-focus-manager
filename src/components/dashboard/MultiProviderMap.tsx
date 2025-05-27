
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapSource } from './MapSourceSelector';

interface MultiProviderMapProps {
  mapSource: MapSource;
  center: [number, number];
  zoom: number;
  onMapLoad?: (map: any) => void;
  mapboxToken?: string;
  googleMapsApiKey?: string;
  className?: string;
}

const MultiProviderMap: React.FC<MultiProviderMapProps> = ({
  mapSource,
  center,
  zoom,
  onMapLoad,
  mapboxToken,
  googleMapsApiKey,
  className = "w-full h-full"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clean up existing map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    setMapReady(false);

    if (mapSource.type === 'mapbox' && mapboxToken) {
      initializeMapboxMap();
    } else if (mapSource.type === 'google' && googleMapsApiKey) {
      initializeGoogleMap();
    } else if (mapSource.type === 'leaflet') {
      initializeLeafletMap();
    }
  }, [mapSource, center, zoom, mapboxToken, googleMapsApiKey]);

  const initializeMapboxMap = () => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapSource.style || 'mapbox://styles/mapbox/satellite-v9',
      center: center,
      zoom: zoom,
      pitch: 0,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapReady(true);
      if (onMapLoad) onMapLoad(map.current);
    });
  };

  const initializeGoogleMap = () => {
    if (!googleMapsApiKey || !mapContainer.current) return;

    // Load Google Maps API dynamically
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      
      window.initGoogleMap = () => {
        createGoogleMap();
      };
      
      document.head.appendChild(script);
    } else {
      createGoogleMap();
    }
  };

  const createGoogleMap = () => {
    if (!mapContainer.current) return;

    const mapTypeId = mapSource.id === 'google-satellite' ? 
      window.google.maps.MapTypeId.SATELLITE : 
      window.google.maps.MapTypeId.HYBRID;

    map.current = new window.google.maps.Map(mapContainer.current, {
      center: { lat: center[1], lng: center[0] },
      zoom: zoom,
      mapTypeId: mapTypeId,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false
    });

    setMapReady(true);
    if (onMapLoad) onMapLoad(map.current);
  };

  const initializeLeafletMap = () => {
    if (!mapContainer.current) return;

    // Load Leaflet dynamically
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => createLeafletMap();
      document.head.appendChild(script);
    } else {
      createLeafletMap();
    }
  };

  const createLeafletMap = () => {
    if (!mapContainer.current || !window.L) return;

    map.current = window.L.map(mapContainer.current).setView([center[1], center[0]], zoom);

    window.L.tileLayer(mapSource.url!, {
      attribution: mapSource.attribution || '',
      maxZoom: 19
    }).addTo(map.current);

    setMapReady(true);
    if (onMapLoad) onMapLoad(map.current);
  };

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading {mapSource.name}...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Extend window object for Google Maps and Leaflet
declare global {
  interface Window {
    google: any;
    L: any;
    initGoogleMap: () => void;
  }
}

export default MultiProviderMap;
