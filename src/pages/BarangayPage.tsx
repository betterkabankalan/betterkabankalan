import { useState } from "react";
import { Search, MapPin, Users, Phone, Building2, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const BARANGAYS_DATA = [
  {
    id: "barangay-1",
    name: "Barangay 1 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 6259,
    area: "201.53 hectares",
    captain: "Gerardo M. Tabujara, Sr.",
    description: "Urban barangay in the heart of Kabankalan City. Part of the main poblacion area with access to major city facilities and services."
  },
  {
    id: "barangay-2",
    name: "Barangay 2 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 1599,
    area: "25.818 hectares",
    captain: "Samuel T. Villafuerte",
    description: "Compact urban barangay in the city center with residential and commercial establishments."
  },
  {
    id: "barangay-3",
    name: "Barangay 3 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 1710,
    area: "27.92 hectares",
    captain: "Daryl John T. Garolacan",
    description: "Central poblacion barangay with good access to schools, markets, and government offices."
  },
  {
    id: "barangay-4",
    name: "Barangay 4 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 1408,
    area: "46.52 hectares",
    captain: "Jose Snooky C. Panique",
    description: "Well-developed urban barangay near major commercial and institutional areas."
  },
  {
    id: "barangay-5",
    name: "Barangay 5 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 1306,
    area: "15.095556 hectares",
    captain: "Rodney Martir",
    description: "Small but vibrant urban barangay in the city proper."
  },
  {
    id: "barangay-6",
    name: "Barangay 6 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 3086,
    area: "125.25 hectares",
    captain: "Steve Javellana",
    description: "Poblacion barangay with residential areas and local businesses."
  },
  {
    id: "barangay-7",
    name: "Barangay 7 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 551,
    area: "100.680 sq. kms",
    captain: "Alemar Strope",
    description: "Urban barangay in the poblacion with mixed residential and commercial use."
  },
  {
    id: "barangay-8",
    name: "Barangay 8 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 796,
    area: "11.8921 hectares",
    captain: "Mark C. Moreno",
    description: "Centrally located poblacion barangay near City Hall and major facilities."
  },
  {
    id: "barangay-9",
    name: "Barangay 9 (Poblacion)",
    classification: "urban",
    district: "Poblacion",
    population: 3052,
    area: "0761 hectares",
    captain: "Darius Jaranilla",
    description: "Urban poblacion barangay with easy access to city services."
  },

  {
    id: "bantayan",
    name: "Bantayan",
    classification: "rural",
    district: "Coastal",
    population: 13404,
    area: "5,350.853400 hectares",
    captain: "Manuel A. Antoniego Jr.",
    description: "Largest barangay in Kabankalan by land area. Coastal barangay known for fishing and agricultural activities."
  },
  {
    id: "binicuil",
    name: "Binicuil",
    classification: "rural",
    district: "Upland",
    population: 8118,
    area: "871.492499 hectares",
    captain: "Sonny Garsolao",
    description: "Upland agricultural barangay with rich farming communities."
  },
  {
    id: "camansi",
    name: "Camansi",
    classification: "rural",
    district: "Agricultural",
    population: 8059,
    area: "2,726.155748 hectares",
    captain: "Edgar Siplao",
    description: "Farming community known for sugarcane and rice production."
  },
  {
    id: "camingawan",
    name: "Camingawan",
    classification: "rural",
    district: "Upland",
    population: 10801,
    area: "4,653.7 hectares",
    captain: "Rico Regalia",
    description: "Mountainous barangay with scenic views and agricultural lands."
  },
  {
    id: "camugao",
    name: "Camugao",
    classification: "rural",
    district: "Agricultural",
    population: 2730,
    area: "398.58 hectares",
    captain: "Josephine Talala",
    description: "Agricultural barangay with mixed crop farming."
  },
  {
    id: "carol-an",
    name: "Carol-an",
    classification: "rural",
    district: "Upland",
    population: 6950,
    area: "3788 hectares",
    captain: "Jocerel Paculanang",
    description: "Rural barangay with growing population and agricultural base."
  },
  {
    id: "daan-banua",
    name: "Daan Banua",
    classification: "rural",
    district: "Agricultural",
    population: 4942,
    area: "1233 hectares",
    captain: "Yulan Nifras",
    description: "Established farming community with traditional agricultural practices."
  },
  {
    id: "hilamonan",
    name: "Hilamonan",
    classification: "rural",
    district: "Coastal",
    population: 16745,
    area: "4,504.35 hectares",
    captain: "Hecleo Alim",
    description: "Coastal barangay with fishing and farming activities."
  },
  {
    id: "inapoy",
    name: "Inapoy",
    classification: "rural",
    district: "Upland",
    population: 4455,
    area: "2,219.388543 hectares",
    captain: "Roberto Tarosan",
    description: "Mountainous barangay with cool climate and agricultural potential."
  },
  {
    id: "linao",
    name: "Linao",
    classification: "rural",
    district: "Agricultural",
    population: 5700,
    area: "Est. 2,300 hectares",
    captain: "To be updated",
    description: "Farming barangay with rice and sugarcane plantations."
  },
  {
    id: "locotan",
    name: "Locotan",
    classification: "rural",
    district: "Agricultural",
    population: 5488,
    area: "6,402.83 hectares",
    captain: "Zharwrigley Dayon",
    description: "Rural barangay with predominantly agricultural economy."
  },
  {
    id: "magballo",
    name: "Magballo",
    classification: "rural",
    district: "Coastal",
    population: 5810,
    area: "2,389.22 hectares",
    captain: "Vicente Tubola",
    description: "Large coastal barangay known for fishing industry and beach areas."
  },
  {
    id: "oringao",
    name: "Oringao",
    classification: "rural",
    district: "Agricultural",
    population: 12166,
    area: "4,351.27 hectares",
    captain: "Wenifredo S. Penuela",
    description: "Agricultural barangay with diverse crop production."
  },
  {
    id: "orong",
    name: "Orong",
    classification: "rural",
    district: "Historical",
    population: 9355,
    area: "2,838.6944 hectares",
    captain: "Gerardo T. Gonzaga",
    description: "Historical barangay where early settlers established the town of Kabankalan in 1830."
  },
  {
    id: "pinaguinpinan",
    name: "Pinaguinpinan",
    classification: "rural",
    district: "Agricultural",
    population: 4508,
    area: "1,965.20 hectares",
    captain: "To be updated",
    description: "Farming community with rice paddies and vegetable gardens."
  },
  {
    id: "salong",
    name: "Salong",
    classification: "rural",
    district: "Agricultural",
    population: 10510,
    area: "35.1336 SQ. KM.",
    captain: "Gerard G. Tronco",
    description: "Rural barangay with agricultural lands and growing population."
  },
  {
    id: "tabugon",
    name: "Tabugon",
    classification: "rural",
    district: "Agricultural",
    population: 11608,
    area: "3882.34 hectares",
    captain: "To be updated",
    description: "Farming barangay with traditional agricultural lifestyle."
  },
  {
    id: "tagoc",
    name: "Tagoc",
    classification: "rural",
    district: "Agricultural",
    population: 3557,
    area: "1,904.411114 hectares",
    captain: "Rolando S. Diaz, Sr.",
    description: "Small farming community with close-knit residents."
  },
  {
    id: "tagukon",
    name: "Tagukon",
    classification: "rural",
    district: "Upland",
    population: 4601,
    area: "2,040.574341 hectares",
    captain: "Angel J. Fernando",
    description: "Upland barangay with cool climate and coffee plantations."
  },
  {
    id: "talubangi",
    name: "Talubangi",
    classification: "rural",
    district: "Agricultural",
    population: 3928,
    area: "182.55 Hectares",
    captain: "To be updated",
    description: "Agricultural barangay with mixed farming activities."
  },
  {
    id: "tampalon",
    name: "Tampalon",
    classification: "rural",
    district: "Upland",
    population: 13240,
    area: "6,495.93 hectares",
    captain: "To be updated",
    description: "Large upland barangay with scenic mountain views and agricultural lands."
  },
  {
    id: "tan-awan",
    name: "Tan-awan",
    classification: "rural",
    district: "Upland",
    population: 7171,
    area: "3,461,134388 hectares",
    captain: "To be updated",
    description: "Mountainous barangay with terraced farms and natural springs."
  },
  {
    id: "tapi",
    name: "Tapi",
    classification: "rural",
    district: "Agricultural",
    population: 11741,
    area: "4,224.714019 hectares",
    captain: "Joestarr B. Bandojo",
    description: "Farming barangay with rice and corn production."
  }
];

export default function BarangaysPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassification, setSelectedClassification] = useState<"all" | "urban" | "rural">("all");
  const [selectedBarangay, setSelectedBarangay] = useState<typeof BARANGAYS_DATA[0] | null>(null);

  const urbanCount = BARANGAYS_DATA.filter(b => b.classification === "urban").length;
  const ruralCount = BARANGAYS_DATA.filter(b => b.classification === "rural").length;
  const totalPopulation = BARANGAYS_DATA.reduce((sum, b) => sum + b.population, 0);

  const filteredBarangays = BARANGAYS_DATA.filter(barangay => {
    const matchesSearch = barangay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         barangay.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         barangay.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClassification = selectedClassification === "all" || 
                                 barangay.classification === selectedClassification;
    
    return matchesSearch && matchesClassification;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            32 Barangays
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Barangays of Kabankalan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Kabankalan City is politically subdivided into 32 barangays, each with its own unique character and community. 
            Find information about your barangay below.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Building2 className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Total Barangays</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">32</p>
            <p className="text-xs text-gray-600">Complete coverage</p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Total Population</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalPopulation.toLocaleString()}</p>
            <p className="text-xs text-gray-600">2024 Census</p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <Home className="h-5 w-5 text-green-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Urban Barangays</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{urbanCount}</p>
            <p className="text-xs text-gray-600">Poblacion area</p>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <MapPin className="h-5 w-5 text-orange-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Rural Barangays</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{ruralCount}</p>
            <p className="text-xs text-gray-600">Agricultural areas</p>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by barangay name, district, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedClassification("all")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                selectedClassification === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              All Barangays (32)
            </button>
            <button
              onClick={() => setSelectedClassification("urban")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                selectedClassification === "urban"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Urban ({urbanCount})
            </button>
            <button
              onClick={() => setSelectedClassification("rural")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                selectedClassification === "rural"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Rural ({ruralCount})
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBarangays.map((barangay) => (
            <div
              key={barangay.id}
              onClick={() => setSelectedBarangay(barangay)}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-blue-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition">
                    {barangay.name}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                    barangay.classification === "urban"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {barangay.classification === "urban" ? "Urban" : "Rural"}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{barangay.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>{barangay.population.toLocaleString()} residents</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 line-clamp-2">
                {barangay.description}
              </p>

              {barangay.captain !== "To be updated" && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Barangay Captain</p>
                  <p className="text-sm font-semibold text-gray-900">{barangay.captain}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredBarangays.length === 0 && (
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
                setSelectedClassification("all");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {selectedBarangay && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBarangay(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedBarangay.name}
                    </h2>
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedBarangay.classification === "urban"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {selectedBarangay.classification === "urban" ? "Urban Barangay" : "Rural Barangay"}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedBarangay(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">District</h3>
                    <p className="text-base text-gray-900">{selectedBarangay.district}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Population</h3>
                    <p className="text-base text-gray-900">{selectedBarangay.population.toLocaleString()} residents</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Land Area</h3>
                    <p className="text-base text-gray-900">{selectedBarangay.area}</p>
                  </div>
                  {selectedBarangay.captain !== "To be updated" && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Barangay Captain</h3>
                      <p className="text-base text-gray-900">{selectedBarangay.captain}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase">About</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {selectedBarangay.description}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-6">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    Need Barangay Services?
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Visit your barangay hall for clearances, certifications, and other services.
                  </p>
                  <Link
                    to="/services/barangay-clearance"
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    View Barangay Services
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedBarangay(null)}
                    className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                  <Link
                    to="/contact"
                    className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-center"
                  >
                    Contact City Hall
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 sm:p-12 text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Can't find your barangay?
            </h2>
            <p className="text-blue-100 mb-8">
              Contact City Hall or your barangay directly for assistance with services, 
              information, or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:034-471-2291"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call City Hall
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}