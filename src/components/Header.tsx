import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Search } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "rounded-xl px-4 py-3 text-base font-semibold transition bg-blue-50 !text-blue-900"
    : "rounded-xl px-4 py-3 text-base font-semibold transition !text-gray-700 hover:bg-blue-50 hover:!text-blue-900";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const canSearch = useMemo(() => q.trim().length > 0, [q]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  }

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky min-w-full top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur">
      <div className="mx-auto md:max-w-[80%] px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-blue-100">
              <img
                src="/assets/BetterKab - Logo.png"
                alt="BetterKabankalan Logo"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="truncate text-base font-semibold text-blue-900">
                BetterKabankalan
              </div>
              <div className="truncate text-xs text-gray-700/70">
                Transparency • Services • Community
              </div>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md px-3 py-2 text-sm font-medium transition bg-blue-50 !text-blue-900"
                  : "rounded-md px-3 py-2 text-sm font-medium transition !text-gray-700 hover:bg-blue-50 hover:!text-blue-800"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md px-3 py-2 text-sm font-medium transition bg-blue-50 !text-blue-900"
                  : "rounded-md px-3 py-2 text-sm font-medium transition !text-gray-700 hover:bg-blue-50 hover:!text-blue-800"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/transparency"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md px-3 py-2 text-sm font-medium transition bg-blue-50 !text-blue-900"
                  : "rounded-md px-3 py-2 text-sm font-medium transition !text-gray-700 hover:bg-blue-50 hover:!text-blue-800"
              }
            >
              Transparency
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md px-3 py-2 text-sm font-medium transition bg-blue-50 !text-blue-900"
                  : "rounded-md px-3 py-2 text-sm font-medium transition !text-gray-700 hover:bg-blue-50 hover:!text-blue-800"
              }
            >
              Contact
            </NavLink>
          </nav>

          <form onSubmit={onSubmit} className="hidden lg:block" role="search">
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-700/60">
                <Search className="h-4 w-4" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services, hotlines, requirements…"
                className="w-[340px] rounded-xl border border-blue-200 bg-white py-2 pl-9 pr-4 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <button type="submit" className="sr-only" disabled={!canSearch}>
              Search
            </button>
          </form>

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <div
        className={[
          "lg:hidden fixed inset-0 z-50",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div
          className={[
            "absolute inset-0 bg-blue-950/30 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={[
            "absolute left-0 top-0 h-screen w-full bg-white overflow-y-auto",
            "transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-y-0" : "-translate-y-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="mx-auto max-w-full md:max-w-[80%] px-4 pt-4 pb-6 min-h-screen flex flex-col">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-4" role="search">
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-blue-700/60" />
                </div>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full rounded-2xl border border-blue-200 bg-white py-3 pl-10 pr-4 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <button type="submit" className="sr-only" disabled={!canSearch}>
                Search
              </button>
            </form>

            <nav className="mt-6 grid gap-2" aria-label="Mobile">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
              <NavLink to="/transparency" className={navLinkClass}>
                Transparency
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900/80">
              Built for transparency and citizen services — accessible anytime,
              anywhere.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
