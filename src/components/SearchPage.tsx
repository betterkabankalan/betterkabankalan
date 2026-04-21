import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  MapPin,
  FileText,
  Megaphone,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useSEO, useServices } from "../hooks";
import { BARANGAY_DETAILS } from "../constants";

import announcementsData from "../data/announcement.json";

interface BarangayEntry {
  id: string;
  name: string;
  district?: string;
  address: string;
  captain?: string;
  population?: number;
  classification?: string;
}

interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  office: string;
  publishDate: string;
  tags: string[];
  isPublished: boolean;
}

// ─── Result types ─────────────────────────────────────────────────────────────

interface ServiceResult {
  type: "service";
  id: string;
  title: string;
  description: string;
  processingTime?: string;
  category: string;
}

interface BarangayResult {
  type: "barangay";
  id: string;
  title: string;
  description: string;
  district?: string;
  population?: number;
}

interface AnnouncementResult {
  type: "announcement";
  id: string;
  title: string;
  summary: string;
  office: string;
  publishDate: string;
  category: string;
}

type SearchResult = ServiceResult | BarangayResult | AnnouncementResult;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function matchesQuery(
  fields: (string | undefined | null)[],
  query: string,
): boolean {
  const q = query.toLowerCase().trim();
  return fields.some((f) => f?.toLowerCase().includes(q));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Highlights occurrences of `query` inside `text` by wrapping them in a
 * <mark> element. Casts result to ReactNode-compatible via JSX.
 */
function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-yellow-100 text-yellow-900 rounded-sm px-0.5 font-semibold not-italic"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ResultGroup({
  label,
  icon: Icon,
  count,
  children,
}: {
  label: string;
  icon: React.ElementType;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-gray-400" />
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </h2>
        <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function ServiceCard({
  result,
  query,
}: {
  result: ServiceResult;
  query: string;
}) {
  return (
    <Link
      to={`/services/${result.id}`}
      className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition"
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 mb-1">
          {highlight(result.title, query)}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {highlight(result.description, query)}
        </p>
        {result.processingTime && (
          <p className="text-xs text-gray-400 mt-1.5">
            ⏱ {result.processingTime}
          </p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
    </Link>
  );
}

function BarangayCard({
  result,
  query,
}: {
  result: BarangayResult;
  query: string;
}) {
  return (
    <Link
      to="/barangays"
      state={{ selectedId: result.id }}
      className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition"
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 mb-1">
          {highlight(result.title, query)}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-1">
          {highlight(result.description, query)}
        </p>
        <p className="text-xs text-gray-400 mt-1.5">
          {result.population &&
            `👥 ${result.population.toLocaleString()} residents`}
          {result.population && result.district && " · "}
          {result.district && `${result.district} District`}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
    </Link>
  );
}

function AnnouncementCard({
  result,
  query,
}: {
  result: AnnouncementResult;
  query: string;
}) {
  return (
    <Link
      to="/transparency"
      className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition"
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 mb-1">
          {highlight(result.title, query)}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {highlight(result.summary, query)}
        </p>
        <p className="text-xs text-gray-400 mt-1.5">
          📅 {formatDate(result.publishDate)} · {result.office}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
    </Link>
  );
}

// ─── Suggestion chips shown when query is empty ───────────────────────────────

const SUGGESTIONS = [
  { label: "Barangay Clearance", to: "/services/barangay-clearance" },
  { label: "Business Permit", to: "/services/business-permit" },
  { label: "Cedula", to: "/services/cedula" },
  { label: "Emergency Hotlines", to: "/emergency" },
  { label: "Hilamonan", to: "/barangays" },
  { label: "Social Welfare", to: "/services/social-welfare-assistance" },
  { label: "City Budget", to: "/transparency" },
  { label: "PWD ID", to: "/services/pwd-id" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const { data: services } = useServices();

  useSEO({
    title: query ? `"${query}" — Search` : "Search",
    description: `Search results for "${query}" across services, barangays, and announcements for Kabankalan City.`,
    canonical: "/search",
  });

  // ── Service results ──────────────────────────────────────────────────────
  const serviceResults = useMemo<ServiceResult[]>(() => {
    if (!query || !services) return [];
    return services
      .filter((s) =>
        matchesQuery(
          [s.title, s.description, s.category, ...(s.tags ?? [])],
          query,
        ),
      )
      .map((s) => ({
        type: "service",
        id: s.id,
        title: s.title,
        description: s.description,
        processingTime: s.processingTime,
        category: s.category,
      }));
  }, [query, services]);

  // ── Barangay results ─────────────────────────────────────────────────────
  // Cast through `unknown` first — BARANGAY_DETAILS is a deeply readonly
  // const tuple, which TypeScript won't assign to mutable array types directly.
  const barangayResults = useMemo<BarangayResult[]>(() => {
    if (!query) return [];
    return (BARANGAY_DETAILS as unknown as readonly BarangayEntry[])
      .filter((b) =>
        matchesQuery([b.name, b.district, b.address, b.captain], query),
      )
      .map((b) => ({
        type: "barangay",
        id: b.id,
        title: b.name,
        description: b.address,
        district: b.district,
        population: b.population,
      }));
  }, [query]);

  // ── Announcement results ─────────────────────────────────────────────────
  const announcementResults = useMemo<AnnouncementResult[]>(() => {
    if (!query) return [];
    const list = (announcementsData as { announcements: Announcement[] })
      .announcements;
    return list
      .filter(
        (a) =>
          a.isPublished &&
          matchesQuery(
            [a.title, a.summary, a.content, a.office, ...a.tags],
            query,
          ),
      )
      .map((a) => ({
        type: "announcement",
        id: a.id,
        title: a.title,
        summary: a.summary,
        office: a.office,
        publishDate: a.publishDate,
        category: a.category,
      }));
  }, [query]);

  const totalResults =
    serviceResults.length + barangayResults.length + announcementResults.length;
  const hasResults = totalResults > 0;

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const value = (fd.get("q") as string)?.trim();
    if (!value) return;
    setSearchParams({ q: value });
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Search services, barangays, announcements…"
              autoFocus
              className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-28 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
            />
            <button
              type="submit"
              className="absolute right-2 rounded-xl bg-[#004bac] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#004bac]/90 cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* ── No query ────────────────────────────────────────────────── */}
        {!query && (
          <div>
            <p className="text-sm text-gray-500 mb-5">
              Search across all city services, barangays, and announcements.
            </p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Try searching for
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s.label}
                  to={s.to}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Query, no results ────────────────────────────────────────── */}
        {query && !hasResults && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              No results for "{query}"
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Try different keywords or browse by category below.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/services"
                className="rounded-xl bg-[#004bac] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004bac]/90 transition"
              >
                Browse Services
              </Link>
              <Link
                to="/barangays"
                className="rounded-xl bg-[#004bac] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004bac]/90 transition"
              >
                Barangay Directory
              </Link>
            </div>
          </div>
        )}

        {/* ── Results ──────────────────────────────────────────────────── */}
        {query && hasResults && (
          <div>
            <p className="text-sm text-gray-500 mb-8">
              <span className="font-semibold text-gray-900">
                {totalResults}
              </span>{" "}
              {totalResults === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-gray-900">"{query}"</span>
            </p>

            <div className="space-y-10">
              {serviceResults.length > 0 && (
                <ResultGroup
                  label="Services"
                  icon={FileText}
                  count={serviceResults.length}
                >
                  {serviceResults.map((r) => (
                    <ServiceCard key={r.id} result={r} query={query} />
                  ))}
                </ResultGroup>
              )}

              {barangayResults.length > 0 && (
                <ResultGroup
                  label="Barangays"
                  icon={MapPin}
                  count={barangayResults.length}
                >
                  {barangayResults.map((r) => (
                    <BarangayCard key={r.id} result={r} query={query} />
                  ))}
                </ResultGroup>
              )}

              {announcementResults.length > 0 && (
                <ResultGroup
                  label="Announcements"
                  icon={Megaphone}
                  count={announcementResults.length}
                >
                  {announcementResults.map((r) => (
                    <AnnouncementCard key={r.id} result={r} query={query} />
                  ))}
                </ResultGroup>
              )}
            </div>

            {/* Footer note */}
            <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-start gap-3">
              <Layers className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Results are matched across services, barangay names, districts,
                addresses, and city announcements. For official documents not
                listed here, visit{" "}
                <a
                  href="https://kabankalancity.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  kabankalancity.gov.ph
                </a>{" "}
                or submit an{" "}
                <a
                  href="https://foi.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  FOI request
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
