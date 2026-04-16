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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
