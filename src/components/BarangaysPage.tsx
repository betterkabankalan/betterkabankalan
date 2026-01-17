/**
 * Barangays Page - With Custom Light Scrollbar
 * Clean white/gray scrollbar that matches the design
 */

import { useState, useMemo } from "react";
import { Search, MapPin, Users, Phone, Home } from "lucide-react";
import BarangayMap from "../components/BarangayMap";
import { BARANGAY_DETAILS } from "../constants";

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
  description?: string;
  [key: string]: any;
}

type ViewMode = "map" | "list" | "both";
type FilterClassification = "all" | "urban" | "rural";

export default function BarangaysPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState<string | undefined>(
    undefined
  );
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [filterClassification, setFilterClassification] =
    useState<FilterClassification>("all");

  // Use actual barangay data from constants
  const BARANGAY_DATA: Barangay[] = BARANGAY_DETAILS.map((brgy) => ({
    ...brgy,
    classification: brgy.classification as "urban" | "rural",
  }));

  // Filter barangays
  const filteredBarangays = useMemo(() => {
    let filtered = BARANGAY_DATA;

    if (filterClassification !== "all") {
      filtered = filtered.filter(
        (b) => b.classification === filterClassification
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.address?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filterClassification]);

  const selectedBarangayData = useMemo(() => {
    return BARANGAY_DATA.find((b) => b.id === selectedBarangay);
  }, [selectedBarangay]);

  const urbanCount = BARANGAY_DATA.filter(
    (b) => b.classification === "urban"
  ).length;
  const ruralCount = BARANGAY_DATA.filter(
    (b) => b.classification === "rural"
  ).length;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            {BARANGAY_DATA.length} Barangays
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Kabankalan City Barangays
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Find your barangay, view services, get contact information, and
            locate offices on the map.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setViewMode("both")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                viewMode === "both"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Map + List
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                viewMode === "map"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Map Only
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              List Only
            </button>
          </div>

          {/* Classification Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterClassification("all")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                filterClassification === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              All ({BARANGAY_DATA.length})
            </button>
            <button
              onClick={() => setFilterClassification("urban")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                filterClassification === "urban"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Urban ({urbanCount})
            </button>
            <button
              onClick={() => setFilterClassification("rural")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                filterClassification === "rural"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Rural ({ruralCount})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search barangay by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`grid gap-8 ${
            viewMode === "both" ? "lg:grid-cols-2" : ""
          }`}
        >
          {/* Map Section */}
          {(viewMode === "map" || viewMode === "both") && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Interactive Map
              </h2>
              <BarangayMap
                barangays={filteredBarangays}
                selectedBarangay={selectedBarangay}
                onBarangaySelect={setSelectedBarangay}
              />
              <p className="text-xs text-gray-500 mt-2">
                Click on markers to view barangay details
              </p>
            </div>
          )}

          {/* List Section with Custom Scrollbar */}
          {(viewMode === "list" || viewMode === "both") && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Barangay Directory ({filteredBarangays.length})
              </h2>

              {filteredBarangays.length > 0 ? (
                <div
                  className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#cbd5e1 #f1f5f9",
                  }}
                >
                  <style dangerouslySetInnerHTML={{ __html: `
                    div::-webkit-scrollbar {
                      width: 8px;
                    }
                    div::-webkit-scrollbar-track {
                      background: #f1f5f9;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: #cbd5e1;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: #94a3b8;
                    }
                  ` }} />

                  {filteredBarangays.map((barangay) => (
                    <div
                      key={barangay.id}
                      onClick={() => setSelectedBarangay(barangay.id)}
                      className={`rounded-xl border p-4 transition cursor-pointer ${
                        selectedBarangay === barangay.id
                          ? "border-blue-600 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {barangay.name}
                          </h3>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            barangay.classification === "urban"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {barangay.classification}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>
                            {barangay.population?.toLocaleString() || "N/A"}{" "}
                            people
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Home className="h-4 w-4" />
                          <span>
                            {barangay.households?.toLocaleString() || "N/A"}{" "}
                            households
                          </span>
                        </div>
                      </div>

                      {barangay.phone && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{barangay.phone}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-xl border border-gray-200 bg-white">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No barangays found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterClassification("all");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Barangay Details */}
        {selectedBarangayData && (
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedBarangayData.name}
                </h2>
                <p className="text-gray-600">{selectedBarangayData.address}</p>
              </div>
              <button
                onClick={() => setSelectedBarangay(undefined)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">
                  Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Population</p>
                    <p className="text-gray-600">
                      {selectedBarangayData.population?.toLocaleString() ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Households</p>
                    <p className="text-gray-600">
                      {selectedBarangayData.households?.toLocaleString() ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Classification</p>
                    <p className="text-gray-600 capitalize">
                      {selectedBarangayData.classification}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Coordinates</p>
                    <p className="text-gray-600 text-xs">
                      {selectedBarangayData.lat.toFixed(6)},{" "}
                      {selectedBarangayData.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Officials */}
              {selectedBarangayData.captain && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">
                    Officials
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">
                        Barangay Captain
                      </p>
                      <p className="text-gray-600">
                        {selectedBarangayData.captain}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">
                  Contact
                </h3>
                <div className="space-y-2 text-sm">
                  {selectedBarangayData.phone && (
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">
                        {selectedBarangayData.phone}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      {selectedBarangayData.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">Can't find your barangay?</h3>
          <p className="text-blue-100 mb-6">
            Contact City Hall for assistance with barangay information.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:034-471-2291"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call City Hall
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
