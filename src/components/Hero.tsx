import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-white min-w-screen">
      <div className="mx-auto md:max-w-[80%] px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              Community Portal • Always accessible
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-blue-900 md:text-5xl">
              Better information.
              <span className="block text-blue-700">Better services.</span>
              BetterKabankalan.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-blue-900/70 md:text-lg">
              A citizen-first portal for Kabankalan City—built to make public
              information easier to find, services clearer to understand, and
              updates more transparent.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Explore Services
              </Link>

              <Link
                to="/transparency"
                className="inline-flex justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                View Transparency Data
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-blue-100 bg-white p-4">
              <div>
                <div className="text-sm font-semibold text-blue-900">24/7</div>
                <div className="text-xs text-blue-900/60">Access</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">Clear</div>
                <div className="text-xs text-blue-900/60">Requirements</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">Open</div>
                <div className="text-xs text-blue-900/60">Data</div>
              </div>
            </div>
          </div>

          {/* Visual panel (no images yet, pure design) */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-blue-50" />
            <div className="relative rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-blue-900">
                  Quick Links
                </div>
                <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                  Beta
                </span>
              </div>

              <div className="mt-4 grid gap-3">
                {[
                  { title: "Barangay services", desc: "Requirements & steps" },
                  { title: "Emergency hotlines", desc: "Numbers & locations" },
                  { title: "Programs & benefits", desc: "Eligibility info" },
                  { title: "City updates", desc: "Announcements & advisories" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-blue-100 bg-white p-4 transition hover:bg-blue-50"
                  >
                    <div className="text-sm font-semibold text-blue-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-blue-900/60">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-blue-700 p-4 text-white">
                <div className="text-sm font-semibold">Tip</div>
                <div className="mt-1 text-xs opacity-90">
                  We’ll show sources and “last updated” dates on pages to
                  support transparency and trust.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
