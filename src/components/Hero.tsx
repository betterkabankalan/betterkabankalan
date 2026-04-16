import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  FileText,
  Megaphone,
  Phone,
  X,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";

import servicesData from "@/data/services.json";
import announcementsData from "@/data/announcement.json";
import emergencyData from "@/data/emergency.json";

type ResultType = "service" | "announcement" | "emergency";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: ResultType;
  href: string;
}

const TYPE_CONFIG: Record<
  ResultType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  service: {
    label: "Service",
    color: "bg-blue-100 text-blue-700",
    icon: <FileText className="h-3.5 w-3.5" />,
  },
  announcement: {
    label: "Announcement",
    color: "bg-amber-100 text-amber-700",
    icon: <Megaphone className="h-3.5 w-3.5" />,
  },
  emergency: {
    label: "Hotline",
    color: "bg-red-100 text-red-700",
    icon: <Phone className="h-3.5 w-3.5" />,
  },
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const s of (servicesData as any).services) {
    results.push({
      id: s.id,
      title: s.title,
      subtitle: s.description?.slice(0, 80) + "…",
      type: "service",
      href: `/services/${s.id}`,
    });
  }

  for (const a of (announcementsData as any).announcements) {
    results.push({
      id: a.id,
      title: a.title,
      subtitle: a.summary ?? a.content?.slice(0, 80) + "…",
      type: "announcement",
      href: `/announcements/${a.id}`,
    });
  }

  for (const e of (emergencyData as any).hotlines) {
    results.push({
      id: e.id,
      title: e.name,
      subtitle: `${e.primaryNumber} · ${e.description?.slice(0, 60)}…`,
      type: "emergency",
      href: `/emergency#${e.id}`,
    });
  }

  return results;
}

const SEARCH_INDEX = buildIndex();

function filterResults(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return SEARCH_INDEX.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q),
  ).slice(0, 8);
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-blue-100 text-blue-900 rounded px-0.5 not-italic font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const QUICK_LINKS = [
  {
    title: "Barangay services",
    desc: "Requirements & steps",
    to: "/services?category=barangay",
  },
  {
    title: "Emergency hotlines",
    desc: "Numbers & locations",
    to: "/services?category=emergency",
  },
  {
    title: "Programs & benefits",
    desc: "Eligibility info",
    to: "/services?category=social",
  },
  {
    title: "City updates",
    desc: "Announcements & advisories",
    to: "/transparency",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => filterResults(q), [q]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [q]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) {
      if (e.key === "Enter" && q.trim()) {
        navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        navigate(results[activeIndex].href);
        setOpen(false);
        setQ("");
      } else if (q.trim()) {
        navigate(`/search?q=${encodeURIComponent(q.trim())}`);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function handleResultClick(result: SearchResult) {
    navigate(result.href);
    setOpen(false);
    setQ("");
  }

  function handleClear() {
    setQ("");
    setOpen(false);
    inputRef.current?.focus();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    if (activeIndex >= 0 && results[activeIndex]) {
      navigate(results[activeIndex].href);
    } else {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
    setOpen(false);
  }

  const showDropdown = open && q.trim().length > 0;

  return (
    <section className="w-full bg-[#004bac]">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div className="w-full">
            <div className="bg-white inline-flex items-center rounded-full border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-800">
              Community Portal • Always accessible
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white lg:text-5xl leading-tight">
              <span className="block">Welcome to BetterKabankalan.</span>
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-white lg:text-lg max-w-prose">
              A citizen-first portal for Kabankalan City—built to make public
              information easier to find, services clearer to understand, and
              updates more transparent.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/services"
                className="inline-flex justify-center rounded-xl bg-white px-5 py-2.5 sm:py-3 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Browse All Services
              </Link>

              <Link
                to="/transparency"
                className="inline-flex justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                View Transparency Data
              </Link>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 rounded-2xl border border-blue-100 bg-white p-3 sm:p-4">
              <div className="text-center">
                <div className="text-sm sm:text-base font-semibold text-blue-900">
                  24/7
                </div>
                <div className="text-xs text-blue-900/60">Access</div>
              </div>
              <div className="text-center">
                <div className="text-sm sm:text-base font-semibold text-blue-900">
                  Clear
                </div>
                <div className="text-xs text-blue-900/60">Requirements</div>
              </div>
              <div className="text-center">
                <div className="text-sm sm:text-base font-semibold text-blue-900">
                  Open
                </div>
                <div className="text-xs text-blue-900/60">Data</div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0 w-full">
            <div className="absolute -inset-2 sm:-inset-4 rounded-3xl bg-blue-50 -z-10" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-blue-100 bg-white p-4 sm:p-5 lg:p-6 shadow-sm w-full overflow-visible">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-black truncate">
                  Search Services
                </div>
<<<<<<< HEAD
              </div>

              <form onSubmit={onSubmit} className="mt-4" role="search">
                <div className="relative" ref={containerRef}>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <Search className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      ref={inputRef}
                      value={q}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => q.trim() && setOpen(true)}
                      placeholder="Search services, hotlines, announcements…"
                      autoComplete="off"
                      aria-label="Search"
                      aria-expanded={showDropdown}
                      aria-haspopup="listbox"
                      aria-autocomplete="list"
                      aria-activedescendant={
                        activeIndex >= 0 ? `result-${activeIndex}` : undefined
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                    {q && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      role="listbox"
                      aria-label="Search results"
                      className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
                    >
                      {results.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-gray-400">
                          No results for{" "}
                          <span className="font-medium text-gray-600">
                            "{q}"
                          </span>
                        </div>
                      ) : (
                        <>
                          <ul className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                            {results.map((result, i) => {
                              const cfg = TYPE_CONFIG[result.type];
                              const isActive = i === activeIndex;
                              return (
                                <li
                                  key={result.id}
                                  id={`result-${i}`}
                                  role="option"
                                  aria-selected={isActive}
                                >
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseLeave={() => setActiveIndex(-1)}
                                    onClick={() => handleResultClick(result)}
                                    className={`w-full text-left px-4 py-3 flex items-start gap-3 transition group ${
                                      isActive
                                        ? "bg-blue-50"
                                        : "hover:bg-gray-50"
                                    }`}
                                  >
                                    <span
                                      className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 ${cfg.color}`}
                                    >
                                      {cfg.icon}
                                      {cfg.label}
                                    </span>

                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-semibold text-gray-900 truncate">
                                        <Highlight
                                          text={result.title}
                                          query={q}
                                        />
                                      </div>
                                      <div className="text-xs text-gray-500 truncate mt-0.5">
                                        <Highlight
                                          text={result.subtitle}
                                          query={q}
                                        />
                                      </div>
                                    </div>
                                    <ChevronRight
                                      className={`h-4 w-4 shrink-0 mt-0.5 transition-transform ${
                                        isActive
                                          ? "text-blue-500 translate-x-0.5"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>

                          <div className="border-t border-gray-100 px-4 py-2.5">
                            <button
                              type="submit"
                              className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 transition"
                            >
                              <Search className="h-3 w-3" />
                              Search all results for "{q}"
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button type="submit" className="sr-only" disabled={!q.trim()}>
                  Search
                </button>
              </form>
              <div>
                <div className="mt-4 text-sm font-semibold text-black truncate">
                  Related Services
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
                  {[
                    {
                      title: "Barangay services",
                      desc: "Requirements & steps",
                      href: "/services?cat=barangay",
                    },
                    {
                      title: "Emergency hotlines",
                      desc: "Numbers & locations",
                      href: "/emergency",
                    },
                    {
                      title: "Programs & benefits",
                      desc: "Eligibility info",
                      href: "/services?cat=social",
                    },
                    {
                      title: "City updates",
                      desc: "Announcements & advisories",
                      href: "/announcements",
                    },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="rounded-xl sm:rounded-2xl border border-blue-100 bg-white p-3 sm:p-4 transition hover:bg-blue-50 hover:border-blue-200 cursor-pointer w-full group"
                    >
                      <div className="text-sm font-semibold text-black break-words group-hover:text-blue-700 transition">
                        {item.title}
                      </div>
                      <div className="text-xs text-blue-900/60 break-words mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
=======
                <span className="rounded-full bg-blue-700 px-2.5 sm:px-3 py-1 text-xs font-semibold text-white whitespace-nowrap flex-shrink-0">
                  Live
                </span>
              </div>

              <div className="mt-4 grid gap-2.5 sm:gap-3 w-full">
                {QUICK_LINKS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="rounded-xl sm:rounded-2xl border border-blue-100 bg-white p-3 sm:p-4 transition hover:bg-blue-50 hover:border-blue-300 w-full block"
                  >
                    <div className="text-sm font-semibold text-blue-900 break-words">
                      {item.title}
                    </div>
                    <div className="text-xs text-blue-900/60 break-words">
                      {item.desc}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-blue-700 p-3 sm:p-4 text-white w-full">
                <div className="text-sm font-semibold">Did you know?</div>
                <div className="mt-1 text-xs opacity-90 break-words">
                  All data on this site is sourced from official records and
                  verified news. We cite our sources so you can trust what you read.
>>>>>>> a443081a12210a73b3f4a972f86bd618fb3fee53
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
