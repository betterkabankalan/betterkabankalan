import {
  BarChart3,
  FileText,
  FolderOpen,
  TrendingUp,
  Download,
  ExternalLink,
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
            Access budget data, ongoing projects, and government documents.
            Building trust through transparency and open data.
          </p>
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
            <p className="text-xs text-blue-900/60">FY 2025</p>
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
            <p className="text-2xl font-bold text-blue-900 mb-1">42</p>
            <p className="text-xs text-blue-900/60">
              Infrastructure & Services
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <FileText className="h-5 w-5 text-purple-700" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900">
                Public Documents
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-900 mb-1">156</p>
            <p className="text-xs text-blue-900/60">Available for download</p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <FolderOpen className="h-5 w-5 text-orange-700" />
              </div>
              <h3 className="text-sm font-semibold text-blue-900">
                Procurement
              </h3>
            </div>
            <p className="text-2xl font-bold text-blue-900 mb-1">28</p>
            <p className="text-xs text-blue-900/60">Ongoing bids</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Budget & Finance
              </h2>
              <button className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                View All →
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Annual Budget Report 2025
                  </h3>
                  <Download className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Complete breakdown of city budget allocation and expenditure
                  plans.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-900/60">PDF • 2.4 MB</span>
                  <button className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Download
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Quarterly Financial Report Q4 2024
                  </h3>
                  <Download className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Detailed financial performance and expenditure for Q4 2024.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-900/60">PDF • 1.8 MB</span>
                  <button className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Download
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Revenue Collection Report 2024
                  </h3>
                  <Download className="h-4 w-4 text-blue-700" />
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Summary of local revenue collection and sources.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-900/60">PDF • 1.2 MB</span>
                  <button className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Ongoing Projects
              </h2>
              <button className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                View All →
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-green-900">
                    Road Improvement Project - Phase 2
                  </h3>
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    75% Complete
                  </span>
                </div>
                <p className="text-xs text-green-900/70 mb-3">
                  Infrastructure improvement covering major roads in downtown
                  area.
                </p>
                <div className="flex items-center justify-between text-xs text-green-900/60">
                  <span>Budget: ₱45M</span>
                  <span>Est. Completion: Mar 2025</span>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Public Market Modernization
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                    40% Complete
                  </span>
                </div>
                <p className="text-xs text-blue-900/70 mb-3">
                  Renovation and modernization of the main public market
                  facility.
                </p>
                <div className="flex items-center justify-between text-xs text-blue-900/60">
                  <span>Budget: ₱32M</span>
                  <span>Est. Completion: Jun 2025</span>
                </div>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-orange-900">
                    Health Center Expansion
                  </h3>
                  <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                    Planning
                  </span>
                </div>
                <p className="text-xs text-orange-900/70 mb-3">
                  Expansion of health center facilities to serve more residents.
                </p>
                <div className="flex items-center justify-between text-xs text-orange-900/60">
                  <span>Budget: ₱18M</span>
                  <span>Est. Start: Apr 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Document Repository
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <FileText className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Budget Reports
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                Annual and quarterly budget documents
              </p>
              <span className="text-xs font-semibold text-blue-700">
                24 documents →
              </span>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <FolderOpen className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Procurement
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                Bids, awards, and contracts
              </p>
              <span className="text-xs font-semibold text-blue-700">
                18 documents →
              </span>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <BarChart3 className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Financial Reports
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                Revenue and expenditure data
              </p>
              <span className="text-xs font-semibold text-blue-700">
                32 documents →
              </span>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
              <TrendingUp className="h-8 w-8 text-blue-700 mb-3" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Project Updates
              </h3>
              <p className="text-sm text-blue-900/70 mb-3">
                Progress reports and milestones
              </p>
              <span className="text-xs font-semibold text-blue-700">
                15 documents →
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 p-8 sm:p-12 text-white shadow-lg mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              More Transparency Features Coming Soon
            </h2>
            <p className="text-blue-100 mb-8">
              We're working on interactive budget visualizations, real-time
              project tracking, and citizen feedback mechanisms to make
              government data more accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
              >
                Suggest a Feature
              </Link>
              <a
                href="https://github.com/betterkabankalan/betterkabankalan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
          <p className="text-sm text-blue-900/80">
            All data and documents are sourced from publicly available
            information. For official inquiries or detailed information, please
            contact the City Hall directly.
          </p>
        </div>
      </div>
    </div>
  );
}
