import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Building2 } from "lucide-react";
import { useServices } from "../hooks";
import { ServiceCard } from "../components/ServiceCard";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";
import { SERVICE_CATEGORY_CONFIG } from "../constants";

export default function ServicesPage() {
  const { data: services, loading, error, refetch } = useServices();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromUrl);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = useMemo(() => {
    if (!services) return [];
    const cats = new Set(services.map((s) => s.category));
    return Array.from(cats);
  }, [services]);

  const filteredServices = useMemo(() => {
    if (!services) return [];

    let filtered = services;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [services, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ErrorMessage error={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm mb-4">
            <Building2 className="h-4 w-4 mr-2" />
            Government Services
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-4">
            {selectedCategory !== "all"
              ? SERVICE_CATEGORY_CONFIG[
                  selectedCategory as keyof typeof SERVICE_CATEGORY_CONFIG
                ]?.label || "All Services"
              : "All Services"}
          </h1>
          <p className="text-base sm:text-lg text-blue-900/70 max-w-3xl">
            {selectedCategory !== "all"
              ? `Browse ${SERVICE_CATEGORY_CONFIG[
                  selectedCategory as keyof typeof SERVICE_CATEGORY_CONFIG
                ]?.label.toLowerCase()} for Kabankalan City residents.`
              : "Browse all available government services for Kabankalan City residents. Find requirements, fees, and processing information."}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-700/60" />
            <input
              type="text"
              placeholder="Search services by name, description, or requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-blue-200 bg-white py-3 pl-12 pr-4 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-white text-blue-900 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              All Services ({services?.length || 0})
            </button>
            {categories.map((category) => {
              const config = SERVICE_CATEGORY_CONFIG[category];
              const count =
                services?.filter((s) => s.category === category).length || 0;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-white text-blue-900 border border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  {config.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-blue-900/70">
            Showing {filteredServices.length} of {services?.length || 0}{" "}
            services
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-blue-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Search className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              No services found
            </h3>
            <p className="text-blue-900/70 mb-6">
              {searchQuery
                ? `No services match "${searchQuery}". Try a different search term.`
                : "No services available in this category."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategoryChange("all");
              }}
              className="inline-flex items-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="text-blue-100 mb-6">
            Contact the City Hall directly for assistance with services not
            listed here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:034-471-2291"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
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
  );
}
