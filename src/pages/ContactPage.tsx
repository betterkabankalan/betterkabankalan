import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks";

export default function ContactPage() {
  useSEO({
    title: "Contact Us",
    description:
      "Get in touch with Kabankalan City Hall for inquiries, service requests, or feedback. Office hours, address, phone, and email all in one place.",
    canonical: "/contact",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
            The Rising City of the South
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Kabankalan City
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Here's how to reach Kabankalan City Hall directly — for inquiries,
            assistance, or feedback about government services.
          </p>
        </div>

        {/* About Kabankalan */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mb-10">
          <div className="mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Kabankalan City
            </h2>
            <div className="grid gap-6 text-sm text-gray-600 leading-relaxed">
              <p>
                Kabankalan City is a component city in the province of Negros
                Occidental, in the Western Visayas region of the Philippines.
                Located in the southern portion of Negros Island, it is known as
                the <strong className="text-gray-800">"Rising City of the South"</strong> — a
                reflection of its steady growth in agriculture, commerce, and
                public services.
              </p>
              <p>
                The city covers an area of approximately{" "}
                <strong className="text-gray-800">697.35 km²</strong> and is home
                to over <strong className="text-gray-800">210,000 residents</strong> across
                its <strong className="text-gray-800">32 barangays</strong> — 9 urban
                barangays in the Poblacion and 23 rural barangays spanning
                coastal, agricultural, and upland areas. Kabankalan is one of
                the largest cities in Negros Occidental by land area, with
                sugarcane farming and fishing as its primary industries.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Population", value: "210,893" },
                { label: "Land Area",  value: "697.35 km²" },
                { label: "Barangays",  value: "32" },
                { label: "ZIP Code",   value: "6111" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-center"
                >
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <MapPin className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Address</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                City Hall, Kabankalan City
                <br />
                Negros Occidental, Philippines
                <br />
                ZIP Code 6111
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Kabankalan+City+Hall"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              Open in Google Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <Phone className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Phone</h3>
              <p className="text-sm text-gray-500 mb-2">Main City Hall line</p>
              <a
                href="tel:034-471-2291"
                className="text-base font-bold text-gray-900 hover:text-blue-700 transition"
              >
                (034) 471-2291
              </a>
            </div>
            <a
              href="tel:034-471-2291"
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              <Phone className="h-3 w-3" />
              Tap to Call
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <Mail className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Email</h3>
              <p className="text-sm text-gray-500 mb-2">For official correspondence</p>
              <a
                href="mailto:info@kabankalan.gov.ph"
                className="text-sm font-bold text-gray-900 hover:text-blue-700 transition break-all"
              >
                info@kabankalan.gov.ph
              </a>
            </div>
            <a
              href="mailto:info@kabankalan.gov.ph"
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              <Mail className="h-3 w-3" />
              Send Email
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <Clock className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Office Hours</h3>
              <div className="space-y-1.5 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">Mon – Fri</span>
                  <br />
                  8:00 AM – 5:00 PM
                </p>
                <p className="text-xs text-gray-400">
                  Lunch break 12:00 PM – 1:00 PM
                </p>
                <p className="text-xs text-red-500 font-medium">
                  Weekends & Holidays: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official channels + Quick links */}
        <div className="grid sm:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Official Online Channels
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Visit the city's official website and follow the Facebook page for
              announcements, advisories, and news.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://kabankalancity.gov.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
              >
                <Globe className="h-4 w-4 text-gray-600 flex-shrink-0" />
                kabankalancity.gov.ph
                <ExternalLink className="h-3.5 w-3.5 text-gray-400 ml-auto flex-shrink-0" />
              </a>
              <a
                href="https://www.facebook.com/pio.kabankalan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#1877F2] px-5 py-3 text-sm font-semibold text-white hover:bg-[#166fe5] transition"
              >
                <Facebook className="h-4 w-4 flex-shrink-0" />
                Kabankalan City Official Page
                <ExternalLink className="h-3.5 w-3.5 opacity-70 ml-auto flex-shrink-0" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "All Services",       to: "/services" },
                { label: "Emergency Hotlines", to: "/emergency" },
                { label: "Barangay Directory", to: "/barangays" },
                { label: "Transparency Data",  to: "/transparency" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}