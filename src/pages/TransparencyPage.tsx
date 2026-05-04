import {
  BarChart3,
  FileText,
  FolderOpen,
  TrendingUp,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Globe,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = "In Progress" | "Opening Soon" | "Planning";

interface Project {
  title: string;
  status: ProjectStatus;
  description: string;
  source: string;
  date: string;
}

interface BudgetItem {
  label: string;
  value: string;
  detail: string;
  source: string;
  action?: { text: string; href?: string; to?: string };
}

// ─── Data — all figures manually verified from cited sources ──────────────────
// Do NOT change figures here without updating the source citation.
// Population: PSA 2020 Census (not 2024 — no such census exists).
// Land area: 697.35 km² per PSA (not 699.27 — that figure had no source).
// Budget: ₱2.4B FY 2026, per Visayan Daily Star Dec 26 2024.

const STATUS_STYLES: Record<ProjectStatus, { badge: string; dot: string }> = {
  "In Progress":    { badge: "bg-blue-100 text-blue-800",   dot: "bg-blue-500" },
  "Opening Soon":   { badge: "bg-green-100 text-green-800", dot: "bg-green-500" },
  "Planning":       { badge: "bg-gray-100 text-gray-700",   dot: "bg-gray-400" },
};

const PROJECTS: Project[] = [
  {
    title: "Kabankalan Airport — Runway Phase II",
    status: "In Progress",
    description:
      "Runway construction and expansion. Expected to become the second active commercial airport in Negros Occidental.",
    source: "CAAP Public Bidding Documents",
    date: "Ongoing",
  },
  {
    title: "Tourist Rest Area (First in Western Visayas)",
    status: "Opening Soon",
    description:
      "First-ever Tourist Rest Area in the Western Visayas region — a milestone for regional tourism infrastructure.",
    source: "Official City Announcement",
    date: "Inauguration: August 28, 2025",
  },
  {
    title: "Intermodal Transport Network",
    status: "Planning",
    description:
      "Integrated transport system to improve city connectivity and reduce road congestion.",
    source: "Kabankalan Investment Summit, Dec 4 2024",
    date: "Planning phase",
  },
  {
    title: "Infrastructure Improvements Package",
    status: "Planning",
    description:
      "Includes drainage system upgrades, wastewater treatment facilities, and a sanitary landfill.",
    source: "Kabankalan Investment Summit, Dec 4 2024",
    date: "Planning phase",
  },
];

const BUDGET_ITEMS: BudgetItem[] = [
  {
    label: "FY 2026 Annual General Fund Budget",
    value: "₱2.4 Billion",
    detail: "Ceremonially signed December 26, 2024. Approved and enacted for fiscal year 2026.",
    source: "Visayan Daily Star, Dec 26 2024",
    action: { text: "Official Website →", href: "https://kabankalancity.gov.ph" },
  },
  {
    label: "Historical Budget (FY 2020–2025)",
    value: "FOI Request",
    detail: "Previous years' budget figures available through the Freedom of Information portal.",
    source: "eFOI Philippines",
    action: { text: "Request on eFOI →", href: "https://foi.gov.ph" },
  },
  {
    label: "Quarterly Financial Reports",
    value: "On Request",
    detail: "Detailed quarterly financial performance and expenditure data.",
    source: "Kabankalan City Hall",
    action: { text: "Contact City Hall →", to: "/contact" },
  },
  {
    label: "Procurement & Bidding Records",
    value: "PhilGEPS",
    detail: "All government bids, awards, and contracts are publicly listed on PhilGEPS — updated daily.",
    source: "PhilGEPS (philgeps.gov.ph)",
    action: { text: "Search PhilGEPS →", href: "https://www.philgeps.gov.ph" },
  },
];

const STATS = [
  { value: "210,893", label: "Total Population",   note: "PSA 2020 Census" },
  { value: "32",      label: "Barangays",           note: "9 Urban · 23 Rural" },
  { value: "697.35",  label: "Land Area (km²)",     note: "PSA Official Data" },
  { value: "1st",     label: "Income Class",        note: "Component City" },
];

const SOURCES = [
  {
    icon: Globe,
    label: "Official City Website",
    desc: "Executive orders, ordinances, and official documents",
    href: "https://kabankalancity.gov.ph",
    cta: "kabankalancity.gov.ph",
  },
  {
    icon: FolderOpen,
    label: "PhilGEPS Procurement Portal",
    desc: "All government bids, awards, and contracts — updated daily",
    href: "https://www.philgeps.gov.ph",
    cta: "philgeps.gov.ph",
  },
  {
    icon: BarChart3,
    label: "PSA OpenSTAT",
    desc: "Official census data, population, and demographic statistics",
    href: "https://openstat.psa.gov.ph",
    cta: "openstat.psa.gov.ph",
  },
  {
    icon: FileText,
    label: "eFOI Philippines",
    desc: "Submit Freedom of Information requests to any government agency",
    href: "https://foi.gov.ph",
    cta: "foi.gov.ph",
  },
  {
    icon: Download,
    label: "DBM Budget Portal",
    desc: "Department of Budget & Management — national and LGU allotments",
    href: "https://www.dbm.gov.ph",
    cta: "dbm.gov.ph",
  },
  {
    icon: TrendingUp,
    label: "DILG LGU Portal",
    desc: "LGU performance, SGLG assessments, and governance data",
    href: "https://www.dilg.gov.ph",
    cta: "dilg.gov.ph",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TransparencyPage() {
  useSEO({
    title: "Transparency Portal",
    description:
      "Access verified budget data, ongoing projects, and city statistics for Kabankalan City. FY 2026 budget: ₱2.4 Billion. Built on official public records.",
    canonical: "/transparency",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm mb-4">
            <BarChart3 className="h-4 w-4 mr-2 text-gray-500" />
            Open Data & Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Transparency Portal
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Access verified budget data, ongoing projects, and government
            statistics for Kabankalan City — sourced from official public records.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span className="text-gray-700 font-medium">
              All figures cited from official sources · See attributions below
            </span>
          </div>
        </div>

        {/* Data disclaimer */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-10 flex items-start gap-3">
          <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">
            <strong>Data notice:</strong> Population figures are from the{" "}
            <strong>PSA 2020 Census</strong> — the most recent completed census.
            The 2025 Census is currently being conducted; updated figures will be
            published by PSA once available. Budget data reflects the FY 2026
            approved budget as reported December 26, 2024. For the most current
            official data, visit the linked sources below.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-3xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm font-medium text-gray-700 mb-1">{s.label}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                {s.note}
              </div>
            </div>
          ))}
        </div>

        {/* Projects + Budget */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">

          {/* Projects */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Major Projects</h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="space-y-4">
              {PROJECTS.map((p) => {
                const style = STATUS_STYLES[p.status];
                return (
                  <div
                    key={p.title}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug flex-1">
                        {p.title}
                      </h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${style.badge}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        {p.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        Source: {p.source}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3 text-center">
              <p className="text-xs text-gray-500">
                Additional project details available via FOI request at{" "}
                <a href="https://foi.gov.ph" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                  foi.gov.ph
                </a>
              </p>
            </div>
          </div>

          {/* Budget */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Budget & Finance</h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="space-y-4">
              {BUDGET_ITEMS.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 flex-1">
                      {b.label}
                    </h3>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                      {b.value}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {b.detail}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                      {b.source}
                    </div>
                    {b.action && (
                      b.action.href
                        ? <a href={b.action.href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition whitespace-nowrap">
                            {b.action.text}
                          </a>
                        : <Link to={b.action.to!} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition whitespace-nowrap">
                            {b.action.text}
                          </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* City statistics */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">City Statistics</h2>
            <span className="text-xs text-gray-400 font-medium">
              Source: PSA 2020 Census
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "210,893", label: "Total Population",  sub: "PSA 2020 Census" },
              { value: "32",      label: "Barangays",          sub: "9 Urban · 23 Rural" },
              { value: "697.35",  label: "Land Area (km²)",    sub: "PSA Official" },
              { value: "2nd",     label: "Largest City in Negros Occ.", sub: "By land area" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
                <p className="text-sm text-gray-700 mb-2">{s.label}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official data sources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Official Data Sources
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            All information on this portal is sourced from or verifiable through
            these official government platforms. We encourage readers to check
            primary sources directly.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOURCES.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-gray-300 transition flex flex-col gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition">
                  <s.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{s.label}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition">
                  {s.cta}
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Data verification footer */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                About This Data
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                BetterKabankalan is a community-built, open-source portal — not
                an official government website. All figures are manually verified
                from the cited official sources. If you find a discrepancy or
                outdated information, please{" "}
                <Link to="/contact" className="font-semibold text-blue-600 hover:underline">
                  report it here
                </Link>
                {" "}or submit a correction via our GitHub repository.
                For legally binding or official data, always refer directly to
                the primary government sources linked above.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <div>
              <span className="font-semibold text-gray-700">Budget data</span>
              <br />Visayan Daily Star · City Hall
            </div>
            <div>
              <span className="font-semibold text-gray-700">Project data</span>
              <br />CAAP · Official City Announcements
            </div>
            <div>
              <span className="font-semibold text-gray-700">Statistics</span>
              <br />PSA 2020 Census · DILG
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}