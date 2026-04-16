
import { useEffect, useRef, useState } from "react";

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
  classification?: "urban" | "rural";
  captain?: string;
  [key: string]: any;
}

interface BarangayMapProps {
  barangays: Barangay[];
  selectedBarangay?: string;
  onBarangaySelect?: (id: string) => void;
}

// ─── Kabankalan City center (no external import needed) ───────────────────────
const KABANKALAN_CENTER = {
  latitude: 9.98,
  longitude: 122.82,
  zoom: 12,
} as const;

// ─── Design tokens ────────────────────────────────────────────────────────────
const URBAN_COLOR = "#2563eb";   // blue-600
const RURAL_COLOR = "#16a34a";   // green-600
const SELECTED_GLOW = "#f59e0b"; // amber-400

// ─── Helpers ──────────────────────────────────────────────────────────────────

function markerColor(classification?: string) {
  return classification === "urban" ? URBAN_COLOR : RURAL_COLOR;
}

/**
 * Returns a Leaflet DivIcon with a circular SVG marker.
 * Selected markers are larger and emit an animated amber pulse ring.
 */
function buildIcon(L: any, classification?: string, isSelected = false) {
  const color = markerColor(classification);
  const size = isSelected ? 36 : 28;
  const half = size / 2;
  const r = isSelected ? 13 : 10;
  const dotR = isSelected ? 5 : 3.5;

  const pulse = isSelected
    ? `<circle cx="${half}" cy="${half}" r="${r + 4}" fill="none"
         stroke="${SELECTED_GLOW}" stroke-width="2.5" opacity="0">
         <animate attributeName="r"       values="${r};${r + 12};${r}"       dur="2s" repeatCount="indefinite"/>
         <animate attributeName="opacity" values="0.7;0;0.7"                dur="2s" repeatCount="indefinite"/>
       </circle>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg"
     width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" overflow="visible">
    ${pulse}
    <circle cx="${half}" cy="${half}" r="${r}"
      fill="${color}"
      stroke="${isSelected ? SELECTED_GLOW : "white"}"
      stroke-width="${isSelected ? 2.8 : 2.2}"
      opacity="${isSelected ? 1 : 0.88}"/>
    <circle cx="${half}" cy="${half}" r="${dotR}" fill="white" opacity="0.95"/>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, size],
    iconAnchor: [half, half],
    popupAnchor: [0, -(half + 6)],
  });
}

/**
 * Builds the popup HTML for a barangay marker.
 * Includes a population bar relative to the largest barangay in the current set.
 */
function buildPopup(barangay: Barangay, maxPop: number): string {
  const pop = barangay.population ?? 0;
  const pct = maxPop > 0 ? Math.round((pop / maxPop) * 100) : 0;
  const color = markerColor(barangay.classification);
  const isUrban = barangay.classification === "urban";

  const badgeBg   = isUrban ? "#dbeafe" : "#dcfce7";
  const badgeText = isUrban ? "#1e40af" : "#166534";
  const label     = isUrban ? "Urban"   : "Rural";

  return `
    <div style="padding:14px 14px 12px;min-width:230px;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px;">
        <h3 style="margin:0;font-weight:700;color:#111827;font-size:15px;line-height:1.3;flex:1;">
          ${barangay.name}
        </h3>
        <span style="
          flex-shrink:0;padding:2px 8px;
          background:${badgeBg};color:${badgeText};
          border-radius:999px;font-size:11px;font-weight:600;">
          ${label}
        </span>
      </div>

      ${barangay.district
        ? `<p style="margin:0 0 10px;font-size:12px;color:#6b7280;">
             📍 ${barangay.district} District
           </p>`
        : ""}

      ${pop > 0
        ? `<div style="margin-bottom:10px;">
             <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
               <span style="font-size:12px;color:#374151;font-weight:500;">👥 Population</span>
               <span style="font-size:12px;font-weight:700;color:#111827;">${pop.toLocaleString()}</span>
             </div>
             <div style="background:#f3f4f6;border-radius:4px;height:6px;overflow:hidden;">
               <div style="background:${color};height:100%;width:${pct}%;border-radius:4px;"></div>
             </div>
             <p style="margin:3px 0 0;font-size:10px;color:#9ca3af;">
               ${pct}% of city's largest · PSA 2020 Census
             </p>
           </div>`
        : ""}

      ${barangay.captain && barangay.captain !== "To be updated"
        ? `<p style="margin:0 0 10px;font-size:12px;color:#374151;">
             🏛️ Capt. <strong>${barangay.captain}</strong>
           </p>`
        : ""}

      <button
        onclick="window.selectBarangay('${barangay.id}')"
        style="
          display:block;width:100%;padding:8px 0;
          background:${color};color:white;border:none;
          border-radius:8px;cursor:pointer;
          font-size:13px;font-weight:600;letter-spacing:0.01em;"
      >
        View Details →
      </button>
    </div>`;
}

// ─── Injected styles for popup chrome ─────────────────────────────────────────

function injectMapStyles() {
  const id = "brgy-map-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    /* Leaflet popup chrome */
    .leaflet-popup-content-wrapper {
      border-radius: 14px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.14) !important;
      padding: 0 !important;
      overflow: hidden;
    }
    .leaflet-popup-content { margin: 0 !important; }
    .leaflet-popup-tip-container { display: none; }
    .leaflet-popup-close-button {
      top: 8px !important; right: 10px !important;
      color: #9ca3af !important; font-size: 18px !important;
    }

    /* Cluster markers */
    .marker-cluster { background: rgba(37,99,235,0.12) !important; }
    .marker-cluster div {
      background: rgba(37,99,235,0.75) !important;
      color: white !important; font-weight: 700 !important;
      font-family: system-ui, sans-serif;
    }
  `;
  document.head.appendChild(style);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BarangayMap({
  barangays,
  selectedBarangay,
  onBarangaySelect,
}: BarangayMapProps) {
  const containerRef    = useRef<HTMLDivElement | null>(null);
  const mapRef          = useRef<any>(null);
  const clusterLayerRef = useRef<any>(null);

  const [scriptsReady, setScriptsReady] = useState(false);
  const [mapReady, setMapReady]         = useState(false);

  // ── Phase 1: Load Leaflet + MarkerCluster from CDN ──────────────────────────
  useEffect(() => {
    injectMapStyles();

    const addLink = (href: string, id: string) => {
      if (!document.getElementById(id)) {
        const el = document.createElement("link");
        Object.assign(el, { id, rel: "stylesheet", href });
        document.head.appendChild(el);
      }
    };

    addLink("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",                             "lf-css");
    addLink("https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css",         "mc-css");
    addLink("https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css", "mc-def-css");

    // Already loaded?
    if (window.L?.markerClusterGroup) {
      setScriptsReady(true);
      return;
    }

    const loadScript = (src: string, id: string, onLoad: () => void) => {
      if (document.getElementById(id)) { onLoad(); return; }
      const el = document.createElement("script");
      Object.assign(el, { id, src, onload: onLoad });
      document.body.appendChild(el);
    };

    loadScript(
      "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
      "lf-js",
      () => loadScript(
        "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js",
        "mc-js",
        () => setScriptsReady(true),
      ),
    );
  }, []);

  // ── Phase 2: Initialise the Leaflet map (once) ──────────────────────────────
  useEffect(() => {
    if (!scriptsReady || !containerRef.current || mapRef.current) return;

    const L = window.L;

    const map = L.map(containerRef.current, { zoomControl: true }).setView(
      [KABANKALAN_CENTER.latitude, KABANKALAN_CENTER.longitude],
      KABANKALAN_CENTER.zoom,
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 45,
      disableClusteringAtZoom: 14,
    });

    map.addLayer(cluster);
    mapRef.current          = map;
    clusterLayerRef.current = cluster;
    setMapReady(true);

    return () => {
      map.remove();
      mapRef.current          = null;
      clusterLayerRef.current = null;
    };
  }, [scriptsReady]);

  // ── Phase 3: Sync markers whenever barangays or selection changes ────────────
  useEffect(() => {
    if (!mapReady || !mapRef.current || !clusterLayerRef.current) return;
    if (!barangays || barangays.length === 0) return;

    const L       = window.L;
    const map     = mapRef.current;
    const cluster = clusterLayerRef.current;

    const maxPop = Math.max(...barangays.map((b) => b.population ?? 0), 1);

    cluster.clearLayers();

    const bounds: [number, number][] = [];
    let selectedMarker: any = null;

    barangays.forEach((brgy) => {
      if (!brgy.lat || !brgy.lng) return;
      bounds.push([brgy.lat, brgy.lng]);

      const isSelected = brgy.id === selectedBarangay;
      const icon       = buildIcon(L, brgy.classification, isSelected);
      const popup      = buildPopup(brgy, maxPop);

      const marker = L.marker([brgy.lat, brgy.lng], { icon }).bindPopup(popup, {
        maxWidth: 280,
        closeButton: true,
      });

      cluster.addLayer(marker);

      if (isSelected) selectedMarker = marker;
    });

    // Wire up the popup button callback
    window.selectBarangay = (id: string) => onBarangaySelect?.(id);

    if (selectedMarker) {
      map.flyTo(selectedMarker.getLatLng(), 15, { duration: 0.9 });
      setTimeout(() => {
        cluster.zoomToShowLayer(selectedMarker, () => selectedMarker.openPopup());
      }, 950);
    } else if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
    }
  }, [mapReady, barangays, selectedBarangay, onBarangaySelect]);

  // ── Loading state ────────────────────────────────────────────────────────────
  if (!scriptsReady) {
    return (
      <div className="w-full h-[520px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 mx-auto mb-4" />
          <p className="text-sm font-medium text-gray-500">Loading map…</p>
        </div>
      </div>
    );
  }

  // ── Rendered map ─────────────────────────────────────────────────────────────
  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-[520px] rounded-xl border border-gray-200 shadow-sm"
        style={{ zIndex: 1 }}
      />

      {/* Legend */}
      <div
        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-4"
        style={{ zIndex: 1000 }}
      >
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          Legend
        </p>
        <div className="space-y-2 text-xs text-gray-700">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white shadow"
              style={{ background: URBAN_COLOR }}
            />
            Urban Barangay
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white shadow"
              style={{ background: RURAL_COLOR }}
            />
            Rural Barangay
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border-2 shadow"
              style={{ background: SELECTED_GLOW, borderColor: SELECTED_GLOW }}
            />
            Selected
          </div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-blue-600/70 text-white text-[8px] font-bold">
              3
            </span>
            Clustered pins
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Population data: PSA 2020 Census
            <br />
            Map tiles: © OpenStreetMap
          </p>
        </div>
      </div>
    </div>
  );
}