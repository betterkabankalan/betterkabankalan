import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  AlertCircle,
  FileText,
  MapPin,
  Phone as PhoneIcon,
} from "lucide-react";
import { useServices } from "../hooks";
import { ServiceCard } from "../components/ServiceCard";
import { BARANGAYS } from "../constants";

const emergencyHotlines = [
  { id: "1", name: "Police Emergency", number: "911", category: "Police" },
  { id: "2", name: "Fire Department", number: "911", category: "Fire" },
  { id: "3", name: "Medical Emergency", number: "911", category: "Medical" },
  {
    id: "4",
    name: "City Hall Hotline",
    number: "(034) 471-2291",
    category: "General",
  },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: services } = useServices();

  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const serviceResults = useMemo(() => {
    if (!services || !query.trim()) return [];

    const searchQuery = query.toLowerCase();
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchQuery) ||
        service.description.toLowerCase().includes(searchQuery) ||
        service.tags?.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
        service.requirements?.some((req) =>
          req.name.toLowerCase().includes(searchQuery)
        )
    );
  }, [services, query]);

  const barangayResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchQuery = query.toLowerCase();
    return BARANGAYS.filter((barangay) =>
      barangay.toLowerCase().includes(searchQuery)
    );
  }, [query]);

  const emergencyResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchQuery = query.toLowerCase();
    return emergencyHotlines.filter(
      (hotline) =>
        hotline.name.toLowerCase().includes(searchQuery) ||
        hotline.category.toLowerCase().includes(searchQuery)
    );
  }, [query]);

  const totalResults =
    serviceResults.length + barangayResults.length + emergencyResults.length;
  const hasResults = totalResults > 0;

  if (!query.trim()) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6">
          <div className="rounded-2xl border border-blue-200 bg-white p-12 text-center">
            <Search className="mx-auto h-16 w-16 text-blue-300 mb-4" />
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              No Search Query
            </h2>
            <p className="text-blue-900/70 mb-6">
              Please enter a search term to find services, barangays, or
              emergency hotlines.
            </p>
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-2">
            Search Results
          </h1>
          <p className="text-base sm:text-lg text-blue-900/70">
            {isSearching ? (
              "Searching..."
            ) : hasResults ? (
              <>
                Found <strong>{totalResults}</strong>{" "}
                {totalResults === 1 ? "result" : "results"} for{" "}
                <strong>"{query}"</strong>
              </>
            ) : (
              <>
                No results found for <strong>"{query}"</strong>
              </>
            )}
          </p>
        </div>

        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />
              <p className="text-sm text-blue-900/70">Searching...</p>
            </div>
          </div>
        ) : hasResults ? (
          <div className="space-y-12">
            {serviceResults.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">
                      Services ({serviceResults.length})
                    </h2>
                    <p className="text-sm text-blue-900/70">
                      Government services matching your search
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {serviceResults.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </section>
            )}

            {barangayResults.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                    <MapPin className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">
                      Barangays ({barangayResults.length})
                    </h2>
                    <p className="text-sm text-blue-900/70">
                      Barangays in Kabankalan City
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {barangayResults.map((barangay, index) => (
                    <Link
                      key={index}
                      to={`/barangays/${barangay
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="rounded-xl border border-blue-100 bg-white p-4 hover:shadow-md hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-green-700 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-blue-900">
                            {barangay}
                          </h3>
                          <p className="text-sm text-blue-900/70">
                            Barangay Information
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {emergencyResults.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                    <PhoneIcon className="h-5 w-5 text-red-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">
                      Emergency Hotlines ({emergencyResults.length})
                    </h2>
                    <p className="text-sm text-blue-900/70">
                      Emergency contact numbers
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {emergencyResults.map((hotline) => (
                    <div
                      key={hotline.id}
                      className="rounded-xl border border-red-100 bg-red-50 p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-red-900">
                          {hotline.name}
                        </h3>
                        <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded-full">
                          {hotline.category}
                        </span>
                      </div>
                      <a
                        href={`tel:${hotline.number}`}
                        className="text-lg font-bold text-red-700 hover:text-red-800"
                      >
                        {hotline.number}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-blue-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <AlertCircle className="h-8 w-8 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              No Results Found
            </h2>
            <p className="text-blue-900/70 mb-6 max-w-md mx-auto">
              We couldn't find anything matching "<strong>{query}</strong>". Try
              different keywords or browse our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
              >
                Browse All Services
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border-2 border-blue-700 px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition"
              >
                Go to Home
              </Link>
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 border border-blue-100 p-6 text-left max-w-2xl mx-auto">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">
                Search Tips:
              </h3>
              <ul className="text-sm text-blue-900/70 space-y-2">
                <li>• Try using different keywords or phrases</li>
                <li>• Check your spelling</li>
                <li>
                  • Use general terms like "permit", "clearance", or "license"
                </li>
                <li>• Search by barangay name or emergency category</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
