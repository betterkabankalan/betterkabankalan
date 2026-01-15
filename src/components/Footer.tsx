import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Github,
  Heart,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#004bac] text-white">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">BetterKabankalan</h3>
            <p className="text-sm text-blue-200 leading-relaxed">
              A community-driven initiative to improve access to government
              services and information for Kabankalan City residents.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/betterkabankalan/betterkabankalan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/barangays"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Barangays
                </a>
              </li>
              <li>
                <a
                  href="/emergency"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Emergency Hotlines
                </a>
              </li>
              <li>
                <a
                  href="/transparency"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Transparency
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/betterkabankalan/betterkabankalan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-200 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  How to Contribute
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              City Hall Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-blue-200">
                  City Hall, Kabankalan City
                  <br />
                  Negros Occidental, Philippines
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:034-471-2291"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  (034) 471-2291
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@kabankalan.gov.ph"
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  info@kabankalan.gov.ph
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="rounded-lg bg-blue-800/50 border border-blue-700 p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-300 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-yellow-300 mb-2">
                  Important Disclaimer
                </h4>
                <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                  <strong>This is NOT an official government website.</strong>{" "}
                  BetterKabankalan is an independent, community-led initiative
                  not affiliated with, maintained by, or officially endorsed by
                  the City Government of Kabankalan or any government agency.
                  All information is gathered from publicly available sources.
                  Users should verify critical information with official
                  government offices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-blue-800">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-blue-300 text-center sm:text-left">
              © {currentYear} BetterKabankalan. Open source under MIT License.
            </p>
            <p className="text-sm text-blue-300 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-400 fill-current" />
              by the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
