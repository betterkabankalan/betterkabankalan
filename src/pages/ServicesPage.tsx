import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Building2 } from "lucide-react";
import { useServices, useSEO } from "../hooks";
import { ServiceCard } from "../components/ServiceCard";
import { ErrorMessage } from "../components/LoadingSpinner";



const CATEGORY_LABELS: Record<string, string> = {
  government:      "Government Documents",
  business:        "Business and Trade",
  health:          "Health Services",
  social_services: "Social Services",
  education:       "Education & Training",
  infrastructure:  "Infrastructure",
  emergency:       "Emergency & Safety",
};

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}


function ServicesSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm animate-pulse"
        >
          <div className="h-12 w-12 rounded-xl bg-gray-100 mb-4" />
          <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6" />
            <div className="h-3 bg-gray-100 rounded w-4/6" />
          </div>
        </div>
      ))}
    </div>
  );
}


export default function ServicesPage() {
  const { data: services, loading, error, refetch } = useServices();
  const [searchParams, setSearchParams] = useSearchParams();

  useSEO({
    title: "Government Services",
    description:
      "Browse all available government services for Kabankalan City residents. Find requirements, fees, and step-by-step processing information.",
    canonical: "/services",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromUrl);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const PREFERRED_ORDER = [
    "government",
    "business",
    "health",
    "social_services",
    "education",
    "infrastructure",
    "emergency",
  ];

  const categories = useMemo(() => {
    if (!services) return [];
    const cats = new Set(services.map((s) => s.category));
    return Array.from(cats).sort((a, b) => {
      const ai = PREFERRED_ORDER.indexOf(a);
      const bi = PREFERRED_ORDER.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });
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
          s.tags?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return filtered;
  }, [services, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const pageHeading =
    selectedCategory !== "all"
      ? getCategoryLabel(selectedCategory)
      : "All Services";

  const pageSubheading =
    selectedCategory !== "all"
      ? `Browse ${getCategoryLabel(selectedCategory).toLowerCase()} for Kabankalan City residents.`
      : "Browse all available government services for Kabankalan City residents. Find requirements, fees, and processing information.";

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">
          <ErrorMessage error={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm mb-4">
            <Building2 className="h-4 w-4 mr-2 text-gray-500" />
            Government Services
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {pageHeading}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            {pageSubheading}
          </p>
        </div>

        {/* Search + filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services by name, description, or requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* All */}
            <button
              onClick={() => handleCategoryChange("all")}
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              All Services ({services?.length ?? 0})
            </button>

            {/* Per-category pills */}
            {categories.map((category) => {
              const count =
                services?.filter((s) => s.category === category).length ?? 0;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {getCategoryLabel(category)} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            {loading
              ? "Loading services…"
              : `Showing ${filteredServices.length} of ${services?.length ?? 0} services${
                  searchQuery ? ` for "${searchQuery}"` : ""
                }`}
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && <ServicesSkeleton />}

        {/* Service grid */}
        {!loading && filteredServices.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredServices.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No services match "${searchQuery}". Try a different search term.`
                : "No services available in this category."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategoryChange("all");
              }}
              className="inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}