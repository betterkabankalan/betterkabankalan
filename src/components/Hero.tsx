import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  {
    title: "Barangay Clearance",
    desc: "Requirements & steps",
    to: "/services/barangay-clearance",
  },
  {
    title: "Emergency Hotlines",
    desc: "Numbers & contacts",
    to: "/emergency",
  },
  {
    title: "Programs & Benefits",
    desc: "Eligibility & how to apply",
    to: "/services?category=social_services",
  },
  {
    title: "City Transparency Data",
    desc: "Budget, projects & records",
    to: "/transparency",
  },
];

const STATS = [
  { value: "32",      label: "Barangays"  },
  { value: "210,893", label: "Residents"  },
  { value: "24/7",    label: "Accessible" },
];

export default function Hero() {
  const navigate                    = useNavigate();
  const [searchParams]              = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <section className="w-full bg-[#004bac]">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] py-10 sm:py-14 lg:py-20 px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">

          <div className="w-full">

            <p className="text-xs sm:text-sm font-semibold text-blue-200 uppercase tracking-widest mb-4">
              Kabankalan City · Negros Occidental
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Welcome to BetterKabankalan.
            </h1>

            <p className="text-sm sm:text-base text-blue-100/80 leading-relaxed max-w-prose mb-8">
              BetterKabankalan is a community-built portal making public
              services, government data, and local information easier to find —
              for every resident of Kabankalan City.
            </p>

            <form onSubmit={handleSearch} role="search" className="w-full mb-6">
              <div className="relative flex items-center">
                <label htmlFor="hero-search" className="sr-only">
                  Search services, barangays, or announcements
                </label>
                <Search
                  className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none"
                  aria-hidden
                />
                <input
                  id="hero-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search services, barangays, announcements…"
                  autoComplete="off"
                  className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-28 text-sm text-gray-900 placeholder:text-gray-400 shadow-md outline-none focus:ring-2 focus:ring-white/60"
                />
                <button
                  type="submit"
                  disabled={!q.trim()}
                  className="absolute right-2 rounded-xl bg-[#004bac] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
              >
                Browse All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/barangays"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Find Your Barangay
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/10 text-center px-3 py-4">
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-blue-200 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6">

              <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-4">
                Frequently accessed
              </p>

              <div className="grid gap-2.5">
                {QUICK_LINKS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group flex items-center justify-between rounded-xl bg-white/90 hover:bg-white p-4 transition"
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-white/10 border border-white/10 p-4">
                <p className="text-xs text-blue-100 leading-relaxed">
                  <span className="font-semibold text-white">
                    Open source · Community built.
                  </span>{" "}
                  All data is sourced from official records and cited so you can
                  verify it yourself.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}