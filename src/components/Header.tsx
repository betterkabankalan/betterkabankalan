import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import * as Icons from "lucide-react";
import { SERVICE_CATEGORY_CONFIG } from "../constants";
import CleanWeatherWidget from "../components/WeatherWidget";
import MultiCurrencyWidget from "../components/CurrencyWidget";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const canSearch = useMemo(() => q.trim().length > 0, [q]);

  const serviceCategories = useMemo(() => {
    return Object.entries(SERVICE_CATEGORY_CONFIG).map(([key, config]) => ({
      key,
      ...config,
    }));
  }, []);

  const isLinkActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  }

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    }

    if (servicesDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return undefined;
  }, [servicesDropdownOpen]);

  return (
    <header className="sticky min-w-full top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto md:max-w-[80%] px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-gray-200">
              <img
                src="/assets/BetterKab - Logo.png"
                alt="BetterKabankalan Logo"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="truncate text-base font-semibold text-gray-900">
                BetterKabankalan
              </div>
              <div className="truncate text-xs text-gray-600">
                Transparency • Services • Community
              </div>
            </div>
          </a>

          {/* Center Section: Navigation + Widgets */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Navigation */}
            <nav className="flex items-center gap-1" aria-label="Primary">
              <a
                href="/"
                className={
                  isLinkActive("/") && location.pathname === "/"
                    ? "rounded-md px-3 py-2 text-sm font-medium transition bg-gray-100 text-gray-900"
                    : "rounded-md px-3 py-2 text-sm font-medium transition text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Home
              </a>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                    isLinkActive("/services")
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      servicesDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Service Categories
                      </div>

                      {serviceCategories.map((category) => {
                        const IconComponent = Icons[
                          category.icon as keyof typeof Icons
                        ] as any;

                        return (
                          <a
                            key={category.key}
                            href={`/services?category=${category.key}`}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-900 hover:bg-gray-100 transition-colors group"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                              {IconComponent && (
                                <IconComponent className="h-4 w-4 text-gray-700" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {category.label}
                              </div>
                            </div>
                          </a>
                        );
                      })}

                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <a
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          View All Services →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="/transparency"
                className={
                  isLinkActive("/transparency")
                    ? "rounded-md px-3 py-2 text-sm font-medium transition bg-gray-100 text-gray-900"
                    : "rounded-md px-3 py-2 text-sm font-medium transition text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Transparency
              </a>

              <a
                href="/contact"
                className={
                  isLinkActive("/contact")
                    ? "rounded-md px-3 py-2 text-sm font-medium transition bg-gray-100 text-gray-900"
                    : "rounded-md px-3 py-2 text-sm font-medium transition text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <CleanWeatherWidget />
            <div className="h-4 w-px bg-gray-200" />
            <MultiCurrencyWidget />
          </div>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
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
            "absolute inset-0 bg-gray-900/30 transition-opacity duration-300",
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <CleanWeatherWidget />
                <div className="h-4 w-px bg-gray-200" />
                <MultiCurrencyWidget />
              </div>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-4" role="search">
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                />
              </div>
              <button type="submit" className="sr-only" disabled={!canSearch}>
                Search
              </button>
            </form>

            <nav className="mt-6 grid gap-2" aria-label="Mobile">
              <a
                href="/"
                className={
                  isLinkActive("/") && location.pathname === "/"
                    ? "rounded-xl px-4 py-3 text-base font-semibold transition bg-gray-100 text-gray-900"
                    : "rounded-xl px-4 py-3 text-base font-semibold transition text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Home
              </a>

              <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-3">
                <div className="font-semibold text-gray-900 mb-2 text-sm">
                  Services
                </div>
                <div className="space-y-1">
                  {serviceCategories.map((category) => {
                    const IconComponent = Icons[
                      category.icon as keyof typeof Icons
                    ] as any;

                    return (
                      <a
                        key={category.key}
                        href={`/services?category=${category.key}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-900 hover:bg-white transition-colors"
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 text-gray-700" />
                        )}
                        <span>{category.label}</span>
                      </a>
                    );
                  })}
                  <a
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-white transition-colors mt-2"
                  >
                    View All Services →
                  </a>
                </div>
              </div>

              <a
                href="/transparency"
                className={
                  isLinkActive("/transparency")
                    ? "rounded-xl px-4 py-3 text-base font-semibold transition bg-gray-100 text-gray-900"
                    : "rounded-xl px-4 py-3 text-base font-semibold transition text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Transparency
              </a>

              <a
                href="/contact"
                className={
                  isLinkActive("/contact")
                    ? "rounded-xl px-4 py-3 text-base font-semibold transition bg-gray-100 text-gray-900"
                    : "rounded-xl px-4 py-3 text-base font-semibold transition text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Contact
              </a>
            </nav>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              Built for transparency and citizen services — accessible anytime,
              anywhere.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
