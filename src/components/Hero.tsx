import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-white w-full">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2">
          <div className="w-full">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
              Community Portal • Always accessible
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-blue-900 lg:text-5xl leading-tight">
              Better information.
              <span className="block text-blue-700">Better services.</span>
              <span className="block">BetterKabankalan.</span>
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-blue-900/70 lg:text-lg max-w-prose">
              A citizen-first portal for Kabankalan City—built to make public
              information easier to find, services clearer to understand, and
              updates more transparent.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/services"
                className="inline-flex justify-center rounded-xl bg-blue-700 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Explore Services
              </Link>

              <Link
                to="/transparency"
                className="inline-flex justify-center rounded-xl border border-blue-200 bg-white px-5 py-2.5 sm:py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
            <div className="relative rounded-2xl sm:rounded-3xl border border-blue-100 bg-white p-4 sm:p-5 lg:p-6 shadow-sm w-full overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-blue-900 truncate">
                  Quick Links
                </div>
                <span className="rounded-full bg-blue-700 px-2.5 sm:px-3 py-1 text-xs font-semibold text-white whitespace-nowrap flex-shrink-0">
                  Beta
                </span>
              </div>

              <div className="mt-4 grid gap-2.5 sm:gap-3 w-full">
                {[
                  { title: "Barangay services", desc: "Requirements & steps" },
                  { title: "Emergency hotlines", desc: "Numbers & locations" },
                  { title: "Programs & benefits", desc: "Eligibility info" },
                  { title: "City updates", desc: "Announcements & advisories" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl sm:rounded-2xl border border-blue-100 bg-white p-3 sm:p-4 transition hover:bg-blue-50 cursor-pointer w-full"
                  >
                    <div className="text-sm font-semibold text-blue-900 break-words">
                      {item.title}
                    </div>
                    <div className="text-xs text-blue-900/60 break-words">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-blue-700 p-3 sm:p-4 text-white w-full">
                <div className="text-sm font-semibold">Tip</div>
                <div className="mt-1 text-xs opacity-90 break-words">
                  We'll show sources and "last updated" dates on pages to
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
