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
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TransparencyPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm mb-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            Open Data & Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-4">
            Transparency Portal
          </h1>
          <p className="text-base sm:text-lg text-blue-900/70 max-w-3xl mx-auto">
            Access real budget data, ongoing projects, and government documents.
            Building trust through transparency and open data.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            <span className="text-green-900 font-medium">
              Data verified from official sources • Last updated: Jan 2025
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <BarChart3 className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900">
                Annual Budget
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-900 mb-1">₱2.4B</p>
            <p className="text-xs text-blue-900/60">FY 2026 (Approved)</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified Dec 26, 2024</span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <TrendingUp className="h-5 w-5 text-green-700" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900">
                Active Projects
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-900 mb-1">5+</p>
            <p className="text-xs text-blue-900/60">
              Infrastructure & Development
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified Jan 2025</span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <MapPin className="h-5 w-5 text-purple-700" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900">
                Population
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-900 mb-1">210,893</p>
            <p className="text-xs text-blue-900/60">2024 Census (PSA)</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
              <CheckCircle2 className="h-3 w-3" />
              <span>Official PSA Data</span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <FolderOpen className="h-5 w-5 text-orange-700" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900">
                City Classification
              </h3>
            </div>
            <p className="text-lg font-bold text-blue-900 mb-1">1st Class</p>
            <p className="text-xs text-blue-900/60">Component City</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-blue-700">
              <TrendingUp className="h-3 w-3" />
              <span>2nd in Negros Occ.</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Ongoing Projects - REAL DATA */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Major Ongoing Projects
              </h2>
              <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Kabankalan Airport - Runway Phase II
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap">
                    In Progress
                  </span>
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Runway construction and expansion. Will be the second active
                  airport in Negros Occidental.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-blue-900/60">
                    <MapPin className="h-3 w-3" />
                    <span>Kabankalan City Airport</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Verified: CAAP Public Bidding Documents</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-green-900">
                    Tourist Rest Area (First in Western Visayas)
                  </h3>
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">
                    Opening Soon
                  </span>
                </div>
                <p className="text-xs text-green-900/70 mb-3">
                  First-ever Tourist Rest Area in the entire Western Visayas
                  region. Major milestone for regional tourism.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-green-900/60">
                    <Calendar className="h-3 w-3" />
                    <span>Inauguration: August 28, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Verified: Official City Announcement</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-purple-900">
                    Intermodal Transport Network
                  </h3>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">
                    Planning
                  </span>
                </div>
                <p className="text-xs text-purple-900/70 mb-3">
                  Integrated transport system to improve city connectivity and
                  reduce congestion.
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-700">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified: Investment Summit Dec 4, 2024</span>
                </div>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-orange-900">
                    Infrastructure Improvements Package
                  </h3>
                  <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-full whitespace-nowrap">
                    Planning
                  </span>
                </div>
                <p className="text-xs text-orange-900/70 mb-3">
                  Includes drainage system upgrades, wastewater treatment
                  facilities, and sanitary landfill.
                </p>
                <div className="flex items-center gap-2 text-xs text-orange-700">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified: Investment Summit Dec 4, 2024</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/50 p-3 text-center">
              <p className="text-xs text-blue-900/70">
                Additional project details available through FOI request
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Budget & Finance
              </h2>
              <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    FY 2026 Annual General Fund Budget
                  </h3>
                  <Download className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-3xl font-bold text-blue-900 mb-2">
                  ₱2.4 Billion
                </p>
                <p className="text-xs text-blue-900/70 mb-3">
                  Ceremonially signed on December 26, 2024. Approved and enacted
                  for fiscal year 2026.
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Source: Visayan Daily Star, Dec 26, 2024</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-200">
                    <span className="text-xs text-blue-900/60">
                      Status: Approved & Signed
                    </span>
                    <button className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                      Request Document
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Historical Budget Data
                  </h3>
                  <AlertCircle className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Previous years' budget data available through Freedom of
                  Information (FOI) request.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-900/60">
                    Available: FY 2020-2025
                  </span>
                  <button className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Request via FOI
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Quarterly Financial Reports
                  </h3>
                  <Download className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Detailed financial performance and expenditure reports.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-900/60">
                    Available on request
                  </span>
                  <button className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Request Document
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Procurement & Bidding
                  </h3>
                  <ExternalLink className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  All procurement bids, awards, and contracts available on
                  PhilGEPS.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-900/60">
                    Updated daily
                  </span>
                  <a
                    href="https://www.philgeps.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    View on PhilGEPS →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            City Statistics (2024 Census)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-blue-100 bg-white p-6">
              <div className="text-3xl font-bold text-blue-900 mb-1">
                210,893
              </div>
              <p className="text-sm text-blue-900/70 mb-2">Total Population</p>
              <div className="flex items-center gap-1 text-xs text-green-700">
                <CheckCircle2 className="h-3 w-3" />
                <span>PSA 2024 Census</span>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6">
              <div className="text-3xl font-bold text-blue-900 mb-1">32</div>
              <p className="text-sm text-blue-900/70 mb-2">Barangays</p>
              <div className="flex items-center gap-1 text-xs text-green-700">
                <CheckCircle2 className="h-3 w-3" />
                <span>Official Count</span>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6">
              <div className="text-3xl font-bold text-blue-900 mb-1">
                699.27
              </div>
              <p className="text-sm text-blue-900/70 mb-2">Land Area (sq km)</p>
              <div className="flex items-center gap-1 text-xs text-green-700">
                <CheckCircle2 className="h-3 w-3" />
                <span>Official Data</span>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6">
              <div className="text-3xl font-bold text-blue-900 mb-1">2nd</div>
              <p className="text-sm text-blue-900/70 mb-2">
                Rank in Negros Occ.
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-700">
                <TrendingUp className="h-3 w-3" />
                <span>After Bacolod City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Document Access
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://kabankalancity.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <FileText className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Official Website
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                Executive orders, ordinances, and official documents
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold text-blue-700">
                <span>Visit kabankalancity.gov.ph</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </a>

            <a
              href="https://www.philgeps.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <FolderOpen className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Procurement Portal
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                All government bids, awards, and contracts
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold text-blue-700">
                <span>PhilGEPS Database</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </a>

            <div className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <BarChart3 className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                FOI Request
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                Request official documents and data
              </p>
              <Link
                to="/contact"
                className="text-xs font-semibold text-blue-700"
              >
                Submit Request →
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 p-8 sm:p-12 text-white shadow-lg mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Data Sources & Verification
            </h2>
            <p className="text-blue-100 mb-6">
              All data presented is sourced from official government documents,
              verified news sources, and public records. We prioritize accuracy
              and transparency.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg bg-white/10 p-4">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Budget Data</div>
                <div className="text-blue-200 text-xs mt-1">
                  Visayan Daily Star, City Hall
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Project Data</div>
                <div className="text-blue-200 text-xs mt-1">
                  CAAP, Official Announcements
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Statistics</div>
                <div className="text-blue-200 text-xs mt-1">
                  PSA 2024 Census
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
              >
                Request Additional Data
              </Link>
              <a
                href="tel:034-471-2291"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Call City Hall
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
          <p className="text-sm text-blue-900/80 mb-2">
            <strong>Data Verification:</strong> All presented data is verified
            from official sources. Last updated: January 2025.
          </p>
          <p className="text-xs text-blue-900/60">
            For official inquiries or to report data discrepancies, please
            contact the City Hall at (034) 471-2291 or email
            info@kabankalan.gov.ph
          </p>
        </div>
      </div>
    </div>
  );
}
