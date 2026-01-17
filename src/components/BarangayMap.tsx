/**
 * Barangay Map Component - Using Project Constants
 * Integrated with existing constants and configuration
 */

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { KABANKALAN_COORDINATES } from "../constants";

// Extend Window interface for Leaflet
declare global {
  interface Window {
    L: any;
    selectBarangay: (id: string) => void;
  }
}

interface Barangay {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population?: number;
  district?: string;
  [key: string]: any;
}

interface BarangayMapProps {
  barangays: Barangay[];
  selectedBarangay?: string;
  onBarangaySelect?: (id: string) => void;
}

export default function BarangayMap({
  barangays,
  selectedBarangay,
  onBarangaySelect,
}: BarangayMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);

  // Load Leaflet library
  useEffect(() => {
    const loadLeaflet = async () => {
      // Add Leaflet CSS if not already added
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      // Load Leaflet JS if not already loaded
      if (!window.L) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = () => {
          setMapLoaded(true);
        };
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (
      !mapLoaded ||
      !mapContainerRef.current ||
      !barangays ||
      barangays.length === 0
    )
      return;

    const L = window.L;

    // Remove existing map if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map centered on Kabankalan using constants
    const map = L.map(mapContainerRef.current).setView(
      [KABANKALAN_COORDINATES.latitude, KABANKALAN_COORDINATES.longitude],
      KABANKALAN_COORDINATES.zoom
    );
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles (free, no API key!)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Add markers for each barangay
    barangays.forEach((barangay: Barangay) => {
      if (!barangay.lat || !barangay.lng) return; // Skip if no coordinates

      const isSelected = barangay.id === selectedBarangay;

      const marker = L.marker([barangay.lat, barangay.lng]).addTo(map)
        .bindPopup(`
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1e40af; font-size: 16px;">
              ${barangay.name}
            </h3>
            ${
              barangay.population
                ? `
              <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
                <strong>Population:</strong> ${barangay.population.toLocaleString()}
              </p>
            `
                : ""
            }
            ${
              barangay.district
                ? `
              <p style="margin: 4px 0; font-size: 14px; color: #4b5563;">
                <strong>District:</strong> ${barangay.district}
              </p>
            `
                : ""
            }
            <button 
              onclick="window.selectBarangay('${barangay.id}')"
              style="
                margin-top: 8px;
                padding: 6px 12px;
                background: #2563eb;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                width: 100%;
              "
            >
              View Details
            </button>
          </div>
        `);

      // Open popup and center map if this barangay is selected
      if (isSelected) {
        marker.openPopup();
        map.setView([barangay.lat, barangay.lng], 15);
      }
    });

    // Optional: Add city boundary (rough rectangle for Kabankalan)
    // Approximate boundaries based on Kabankalan's location
    const cityBoundary = [
      [
        KABANKALAN_COORDINATES.latitude + 0.15,
        KABANKALAN_COORDINATES.longitude - 0.1,
      ],
      [
        KABANKALAN_COORDINATES.latitude + 0.15,
        KABANKALAN_COORDINATES.longitude + 0.18,
      ],
      [
        KABANKALAN_COORDINATES.latitude - 0.15,
        KABANKALAN_COORDINATES.longitude + 0.18,
      ],
      [
        KABANKALAN_COORDINATES.latitude - 0.15,
        KABANKALAN_COORDINATES.longitude - 0.1,
      ],
    ];

    L.polygon(cityBoundary, {
      color: "#2563eb",
      fillColor: "#3b82f6",
      fillOpacity: 0.05,
      weight: 2,
    }).addTo(map);

    // Global function for popup button clicks
    window.selectBarangay = (id: string) => {
      if (onBarangaySelect) {
        onBarangaySelect(id);
      }
    };

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLoaded, barangays, selectedBarangay, onBarangaySelect]);

  if (!mapLoaded) {
    return (
      <div className="w-full h-[500px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className="w-full h-[500px] rounded-xl border border-gray-200 shadow-sm"
        style={{ zIndex: 1 }}
      />

      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[20]">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Map Legend</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-blue-600" />
            <span>Barangay Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 border-2 border-blue-600 bg-blue-600/10 rounded-sm" />
            <span>City Boundary</span>
          </div>
        </div>
      </div>
    </div>
  );
}
