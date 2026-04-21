import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  MapPin,
  Users,
  Home,
  Phone,
  Map,
  List,
  LayoutPanelLeft,
  X,
  Info,
} from "lucide-react";
import BarangayMap from "../components/BarangayMap";
import { BARANGAY_DETAILS } from "../constants";
import { useSEO } from "../hooks";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Barangay {
  id: string;
  name: string;
  lat: number;
  lng: number;
  population?: number;
  households?: number;
  classification: "urban" | "rural";
  district?: string;
  phone?: string;
  address: string;
  captain?: string;
  [key: string]: any;
}

type ViewMode            = "map" | "list" | "both";
type FilterClassification = "all" | "urban" | "rural";

// ─── Derived data ─────────────────────────────────────────────────────────────

const BARANGAY_DATA: Barangay[] = (BARANGAY_DETAILS as unknown as Barangay[]);

// ─── Component ────────────────────────────────────────────────────────────────

export default function BarangaysPage() {
  const location = useLocation();

  useSEO({
    title: "Barangay Directory",
    description:
      "Find all 32 barangays of Kabankalan City on an interactive map. View population data, barangay captains, districts, and contact information.",
    canonical: "/barangays",
  });

  const [searchQuery,           setSearchQuery]           = useState("");
  const [viewMode,              setViewMode]              = useState<ViewMode>("both");
  const [filterClassification,  setFilterClassification]  = useState<FilterClassification>("all");

  // Auto-select barangay if navigated from search results
  const [selectedBarangay, setSelectedBarangay] = useState<string | undefined>(
    (location.state as any)?.selectedId ?? undefined,
  );

  // If location.state changes (e.g. browser back/forward), sync
  useEffect(() => {
    const id = (location.state as any)?.selectedId;
    if (id) setSelectedBarangay(id);
  }, [location.state]);

  // ── Derived counts ───────────────────────────────────────────────────────
  const urbanCount = BARANGAY_DATA.filter((b) => b.classification === "urban").length;
  const ruralCount = BARANGAY_DATA.filter((b) => b.classification === "rural").length;

  // ── Filtered list ────────────────────────────────────────────────────────
  const filteredBarangays = useMemo(() => {
    let list = BARANGAY_DATA;

    if (filterClassification !== "all") {
      list = list.filter((b) => b.classification === filterClassification);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.address?.toLowerCase().includes(q) ||
          b.district?.toLowerCase().includes(q) ||
          b.captain?.toLowerCase().includes(q),
      );
    }

    return list;
  }, [searchQuery, filterClassification]);

  const selectedBarangayData = useMemo(
    () => BARANGAY_DATA.find((b) => b.id === selectedBarangay),
    [selectedBarangay],
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm mb-4">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            {BARANGAY_DATA.length} Barangays
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Barangay Directory
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Find all 32 barangays of Kabankalan City on the interactive map.
            Click any pin or list item to view details.
          </p>
        </div>

        {/* Controls row */}
        <div className="mb-6 flex flex-wrap items-center gap-3">

          {/* View mode toggle */}
          <div className="flex rounded-lg border border-gray-200 bg-white p-1 gap-0.5">
            <button
              onClick={() => setViewMode("both")}
              title="Map + List"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition ${
                viewMode === "both"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutPanelLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Map + List</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              title="Map Only"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition ${
                viewMode === "map"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map Only</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List Only"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List Only</span>
            </button>
          </div>

          {/* Classification filter */}
          <div className="flex gap-2">
            {(
              [
                { value: "all",   label: `All (${BARANGAY_DATA.length})` },
                { value: "urban", label: `Urban (${urbanCount})`         },
                { value: "rural", label: `Rural (${ruralCount})`         },
              ] as const
            ).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilterClassification(value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                  filterClassification === value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, district, captain, or address…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
          />
        </div>

        {/* Main content grid */}
        <div className={`gap-6 ${viewMode === "both" ? "grid lg:grid-cols-2" : "flex flex-col"}`}>

          {/* Map section */}
          {(viewMode === "map" || viewMode === "both") && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Interactive Map</h2>
                <p className="text-xs text-gray-400">Click a pin to select</p>
              </div>
              <BarangayMap
                barangays={filteredBarangays}
                selectedBarangay={selectedBarangay}
                onBarangaySelect={setSelectedBarangay}
              />
            </div>
          )}

          {/* List section */}
          {(viewMode === "list" || viewMode === "both") && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  Barangays
                </h2>
                <span className="text-xs text-gray-400">
                  {filteredBarangays.length} of {BARANGAY_DATA.length}
                </span>
              </div>

              {filteredBarangays.length > 0 ? (
                <div
                  className={`space-y-2 overflow-y-auto pr-1 ${
                    viewMode === "both" ? "max-h-[520px]" : ""
                  }`}
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 #f1f5f9" }}
                >
                  {filteredBarangays.map((barangay) => {
                    const isSelected = selectedBarangay === barangay.id;
                    return (
                      <button
                        key={barangay.id}
                        onClick={() =>
                          setSelectedBarangay(isSelected ? undefined : barangay.id)
                        }
                        className={`w-full text-left rounded-xl border p-4 transition ${
                          isSelected
                            ? "border-gray-400 bg-gray-50 shadow-sm ring-1 ring-gray-300"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-bold text-gray-900 leading-snug">
                            {barangay.name}
                          </h3>
                          <span
                            className={`ml-2 flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full ${
                              barangay.classification === "urban"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {barangay.classification}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                          {barangay.population && (
                            <div className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 flex-shrink-0" />
                              {barangay.population.toLocaleString()} residents
                            </div>
                          )}
                          {barangay.households && (
                            <div className="flex items-center gap-1.5">
                              <Home className="h-3.5 w-3.5 flex-shrink-0" />
                              {barangay.households.toLocaleString()} households
                            </div>
                          )}
                          {barangay.district && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                              {barangay.district} District
                            </div>
                          )}
                          {barangay.phone && barangay.phone !== "(034) 471-XXXX" && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                              {barangay.phone}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 rounded-xl border border-gray-200 bg-white">
                  <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">No barangays found</p>
                  <p className="text-xs text-gray-500 mb-4">Try a different search term or filter</p>
                  <button
                    onClick={() => { setSearchQuery(""); setFilterClassification("all"); }}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected barangay detail panel */}
        {selectedBarangayData && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

            {/* Panel header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedBarangayData.name}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      selectedBarangayData.classification === "urban"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {selectedBarangayData.classification === "urban" ? "Urban" : "Rural"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{selectedBarangayData.address}</p>
              </div>
              <button
                onClick={() => setSelectedBarangay(undefined)}
                className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Panel body */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Population
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {selectedBarangayData.population?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PSA 2020 Census</p>
                {selectedBarangayData.households && (
                  <p className="text-xs text-gray-500 mt-2">
                    {selectedBarangayData.households.toLocaleString()} households
                  </p>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Location
                </p>
                {selectedBarangayData.district && (
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {selectedBarangayData.district} District
                  </p>
                )}
                <p className="text-xs text-gray-500 leading-relaxed">
                  {selectedBarangayData.address}
                </p>
                <p className="text-xs text-gray-400 mt-2 font-mono">
                  {selectedBarangayData.lat.toFixed(5)},{" "}
                  {selectedBarangayData.lng.toFixed(5)}
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Barangay Captain
                </p>
                {selectedBarangayData.captain &&
                selectedBarangayData.captain !== "To be updated" ? (
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedBarangayData.captain}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">To be confirmed</p>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Contact
                </p>
                {selectedBarangayData.phone &&
                selectedBarangayData.phone !== "(034) 471-XXXX" ? (
                  <a
                    href={`tel:${selectedBarangayData.phone}`}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition"
                  >
                    {selectedBarangayData.phone}
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 italic">Not yet confirmed</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  City Hall main line:{" "}
                  <a href="tel:034-471-2291" className="font-medium text-gray-500 hover:text-blue-600">
                    (034) 471-2291
                  </a>
                </p>
              </div>
            </div>

            {/* PSA data note */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
              <p className="text-xs text-gray-400">
                Population figures from PSA 2020 Census. Phone numbers pending
                official confirmation from barangay halls.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}