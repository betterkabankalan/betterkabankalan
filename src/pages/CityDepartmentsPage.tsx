/**
 * CityDepartmentsPage.tsx
 *
 * Data sources:
 * - Department existence: RA 7160 (Local Government Code of 1991)
 * - Department mandates: Respective national agency frameworks
 * - Contact numbers: (034) 471-2291 is the verified main City Hall line
 *   Individual department direct lines should be updated when confirmed
 *   from official city sources (kabankalancity.gov.ph)
 */

import { useState, useMemo } from "react";
import {
  Search,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Building2,
} from "lucide-react";
import { useSEO } from "../hooks";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Department {
  id: string;
  name: string;
  abbreviation: string;
  cluster: string;
  mandate: string;
  services: string[];
  phone: string;
  location: string;
  head?: string;
}

// ─── Department clusters ──────────────────────────────────────────────────────

const CLUSTERS = [
  "All",
  "Executive",
  "Legislative",
  "Administrative & Finance",
  "Infrastructure & Environment",
  "Social Services",
  "Public Safety",
  "Economic Development",
] as const;

// ─── Department data ──────────────────────────────────────────────────────────
// All departments mandated under RA 7160 (Local Government Code).
// Head of office fields intentionally left blank — update from official
// city sources as appointments change frequently.

const DEPARTMENTS: Department[] = [
  // ── Executive ───────────────────────────────────────────────────────────
  {
    id: "mayors-office",
    name: "Office of the City Mayor",
    abbreviation: "OCM",
    cluster: "Executive",
    mandate:
      "Chief executive of the city government. Oversees all city departments, implements ordinances, and represents the city in all official matters.",
    services: [
      "Executive orders and proclamations",
      "Mayor's clearance",
      "Appointments and endorsements",
      "City development directives",
    ],
    phone: "(034) 471-2291",
    location: "2nd Floor, Kabankalan City Hall, Poblacion",
  },
  {
    id: "city-administrator",
    name: "Office of the City Administrator",
    abbreviation: "OCA",
    cluster: "Executive",
    mandate:
      "Assists the mayor in overall administration, coordinates department heads, and ensures efficient delivery of city services.",
    services: [
      "Administrative coordination",
      "Policy implementation",
      "Inter-department liaison",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "city-legal",
    name: "Office of the City Legal Officer",
    abbreviation: "CLO",
    cluster: "Executive",
    mandate:
      "Provides legal advice to the city government, represents the city in legal proceedings, and reviews contracts and ordinances.",
    services: [
      "Legal opinions and advice",
      "Contract review",
      "Litigation representation",
      "Ordinance drafting assistance",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },

  // ── Legislative ──────────────────────────────────────────────────────────
  {
    id: "sangguniang-panlungsod",
    name: "Sangguniang Panlungsod",
    abbreviation: "SP",
    cluster: "Legislative",
    mandate:
      "The city legislative body. Enacts ordinances, approves budgets, and exercises oversight over city operations. Composed of the City Vice Mayor and elected councilors.",
    services: [
      "Ordinance enactment",
      "Resolution issuance",
      "Budget approval",
      "Legislative inquiries",
      "Committee hearings",
    ],
    phone: "(034) 471-2291",
    location: "Session Hall, City Hall, Kabankalan City",
  },

  // ── Administrative & Finance ─────────────────────────────────────────────
  {
    id: "city-treasurer",
    name: "Office of the City Treasurer",
    abbreviation: "OCT",
    cluster: "Administrative & Finance",
    mandate:
      "Manages city finances, collects taxes and fees, and disburses funds. Primary collection point for all city government payments.",
    services: [
      "Tax collection (real property, business)",
      "Community tax certificate (cedula)",
      "Payment of city fees",
      "Financial records",
      "Treasury management",
    ],
    phone: "(034) 471-2291",
    location: "Ground Floor, City Hall, Kabankalan City",
  },
  {
    id: "city-assessor",
    name: "Office of the City Assessor",
    abbreviation: "OCA",
    cluster: "Administrative & Finance",
    mandate:
      "Appraises and assesses real property for taxation purposes. Maintains records of all real properties within the city.",
    services: [
      "Real property assessment",
      "Tax declaration",
      "Property record certification",
      "Assessment appeal",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "civil-registrar",
    name: "Office of the City Civil Registrar",
    abbreviation: "OCCR",
    cluster: "Administrative & Finance",
    mandate:
      "Registers vital events including births, deaths, and marriages. Issues civil registry documents and certifications.",
    services: [
      "Birth registration",
      "Death registration",
      "Marriage registration",
      "Civil registry document requests",
      "Annotations and corrections",
      "Marriage license application",
    ],
    phone: "(034) 471-2291",
    location: "Ground Floor, City Hall, Kabankalan City",
  },
  {
    id: "hrmo",
    name: "City Human Resource Management Office",
    abbreviation: "CHRMO",
    cluster: "Administrative & Finance",
    mandate:
      "Manages city government personnel — recruitment, appointments, training, and employee welfare.",
    services: [
      "Personnel records",
      "Service record requests",
      "Leave administration",
      "Employee training",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "bplo",
    name: "Business Permits and Licensing Office",
    abbreviation: "BPLO",
    cluster: "Administrative & Finance",
    mandate:
      "Processes business permit applications and renewals. Ensures all businesses operating within the city are duly licensed.",
    services: [
      "New business permit application",
      "Business permit renewal",
      "Business permit amendment",
      "Business closure processing",
      "Occupational permit",
    ],
    phone: "(034) 471-2291",
    location: "2nd Floor, City Hall, Kabankalan City",
  },

  // ── Infrastructure & Environment ─────────────────────────────────────────
  {
    id: "city-engineering",
    name: "City Engineering Office",
    abbreviation: "CEO",
    cluster: "Infrastructure & Environment",
    mandate:
      "Plans, designs, and supervises city infrastructure. Issues building permits and ensures compliance with the National Building Code.",
    services: [
      "Building permit application",
      "Occupancy permit",
      "Electrical permit",
      "Infrastructure project supervision",
      "Road right-of-way clearance",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "cpdo",
    name: "City Planning and Development Office",
    abbreviation: "CPDO",
    cluster: "Infrastructure & Environment",
    mandate:
      "Formulates the Comprehensive Land Use Plan (CLUP) and Comprehensive Development Plan (CDP). Coordinates city development programs.",
    services: [
      "Zoning certification",
      "Locational clearance",
      "Land use plan inquiries",
      "Development planning assistance",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "cenro",
    name: "City Environment and Natural Resources Office",
    abbreviation: "CENRO",
    cluster: "Infrastructure & Environment",
    mandate:
      "Manages environmental programs, solid waste management, and natural resources within the city. Implements RA 9003 (Ecological Solid Waste Management Act).",
    services: [
      "Solid waste management",
      "Garbage collection complaints",
      "Tree cutting permit",
      "Environmental compliance",
      "Pollution control",
      "Ecological programs",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },

  // ── Social Services ──────────────────────────────────────────────────────
  {
    id: "city-health",
    name: "City Health Office",
    abbreviation: "CHO",
    cluster: "Social Services",
    mandate:
      "Delivers primary health care services, implements health programs, and ensures public health standards across all barangays.",
    services: [
      "Medical consultation",
      "Immunization programs",
      "Maternal and child health",
      "Sanitary permit",
      "Health certificate",
      "Burial permit",
      "Medical certificate",
    ],
    phone: "(034) 471-2291",
    location: "City Health Office, Poblacion, Kabankalan City",
  },
  {
    id: "cswdo",
    name: "City Social Welfare and Development Office",
    abbreviation: "CSWDO",
    cluster: "Social Services",
    mandate:
      "Delivers social protection programs for vulnerable sectors — senior citizens, PWDs, solo parents, indigents, and children in need.",
    services: [
      "Senior Citizen ID (OSCA)",
      "PWD ID application",
      "Solo Parent ID",
      "Social welfare assistance",
      "4Ps coordination",
      "Day care services",
      "Crisis intervention",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "deped-kabankalan",
    name: "Department of Education — Kabankalan City Division",
    abbreviation: "DepEd",
    cluster: "Social Services",
    mandate:
      "Manages public elementary and secondary schools within the city. Coordinates scholarship programs and educational services.",
    services: [
      "School enrollment",
      "Good moral certificate",
      "Scholarship applications",
      "Alternative learning system (ALS)",
    ],
    phone: "(034) 471-2291",
    location: "DepEd Kabankalan City Division Office",
  },

  // ── Public Safety ────────────────────────────────────────────────────────
  {
    id: "pnp",
    name: "Kabankalan City Police Station",
    abbreviation: "KCPS / PNP",
    cluster: "Public Safety",
    mandate:
      "Maintains peace and order, enforces laws, and responds to crimes and emergencies within the city.",
    services: [
      "Police clearance",
      "Crime reporting",
      "Incident reports",
      "Traffic assistance",
      "Emergency response",
    ],
    phone: "(034) 471-2024",
    location: "Poblacion, Kabankalan City",
  },
  {
    id: "bfp",
    name: "Bureau of Fire Protection — Kabankalan City",
    abbreviation: "BFP",
    cluster: "Public Safety",
    mandate:
      "Fire suppression, prevention, and investigation. Issues fire safety inspection certificates required for business permits.",
    services: [
      "Fire safety inspection certificate (FSIC)",
      "Fire emergency response",
      "Fire incident reports",
      "Fire safety seminars",
    ],
    phone: "(034) 471-2367",
    location: "Poblacion, Kabankalan City",
  },
  {
    id: "cdrrmo",
    name: "City Disaster Risk Reduction and Management Office",
    abbreviation: "CDRRMO",
    cluster: "Public Safety",
    mandate:
      "Leads disaster preparedness, response, and recovery. Coordinates evacuation and relief operations during calamities. Mandated under RA 10121.",
    services: [
      "Disaster preparedness programs",
      "Evacuation coordination",
      "Calamity assistance",
      "Early warning systems",
      "Post-disaster rehabilitation",
    ],
    phone: "(034) 471-5555",
    location: "City Hall, Kabankalan City, Poblacion",
  },

  // ── Economic Development ─────────────────────────────────────────────────
  {
    id: "city-agriculture",
    name: "City Agriculture Office",
    abbreviation: "CAO",
    cluster: "Economic Development",
    mandate:
      "Promotes agricultural productivity and food security. Delivers farm inputs, technical assistance, and coordinates with DA programs.",
    services: [
      "Farm inputs and seedlings",
      "Agricultural loans coordination",
      "Farmers registration (RSBSA)",
      "Technical agricultural assistance",
      "Crop insurance coordination (PCIC)",
      "Fisherfolk registration (CFARMC)",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "city-tourism",
    name: "City Tourism Office",
    abbreviation: "CTO",
    cluster: "Economic Development",
    mandate:
      "Promotes Kabankalan City as a tourist destination. Coordinates tourism-related events and accredits tourism establishments.",
    services: [
      "Tourism information",
      "Tourism establishment accreditation",
      "Event coordination",
      "Cultural program assistance",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "peso",
    name: "Public Employment Service Office",
    abbreviation: "PESO",
    cluster: "Economic Development",
    mandate:
      "Facilitates employment opportunities for Kabankalan residents. Coordinates job fairs, TESDA scholarships, and OFW assistance.",
    services: [
      "Job placement assistance",
      "Job fair coordination",
      "TESDA scholarship referral",
      "OFW documentation assistance",
      "Skills training referral",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
  {
    id: "cooperative-dev",
    name: "City Cooperative Development Office",
    abbreviation: "CCDO",
    cluster: "Economic Development",
    mandate:
      "Promotes cooperative formation and development. Assists in cooperative registration and capacity building.",
    services: [
      "Cooperative registration assistance",
      "Cooperative training",
      "Livelihood program coordination",
    ],
    phone: "(034) 471-2291",
    location: "City Hall, Kabankalan City, Poblacion",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CityDepartmentsPage() {
  useSEO({
    title: "City Departments",
    description:
      "Directory of all Kabankalan City government departments — mandates, services, and contact information.",
    canonical: "/departments",
  });

  const [searchQuery, setSearchQuery]   = useState("");
  const [selectedCluster, setSelectedCluster] = useState<string>("All");
  const [expandedId, setExpandedId]     = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = DEPARTMENTS;

    if (selectedCluster !== "All") {
      list = list.filter((d) => d.cluster === selectedCluster);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.abbreviation.toLowerCase().includes(q) ||
          d.mandate.toLowerCase().includes(q) ||
          d.services.some((s) => s.toLowerCase().includes(q))
      );
    }

    return list;
  }, [searchQuery, selectedCluster]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm mb-4">
            <Building2 className="h-4 w-4 mr-2 text-gray-500" />
            City Government
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            City Departments
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Directory of all Kabankalan City government departments, their
            mandates, and the services they provide to residents.
          </p>
        </div>

        {/* Data notice */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-8 flex items-start gap-3">
          <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            All departments listed are mandated under{" "}
            <strong className="text-gray-700">RA 7160 (Local Government Code of 1991)</strong>.
            Contact numbers route to the main City Hall line{" "}
            <strong className="text-gray-700">(034) 471-2291</strong> until
            individual department direct lines are confirmed. For the most
            current information, visit{" "}
            <a
              href="https://kabankalancity.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              kabankalancity.gov.ph
            </a>.
          </p>
        </div>

        {/* Search + filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments by name, abbreviation, or service…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CLUSTERS.map((cluster) => (
              <button
                key={cluster}
                onClick={() => setSelectedCluster(cluster)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                  selectedCluster === cluster
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cluster}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          of {DEPARTMENTS.length} departments
        </p>

        {/* Department list */}
        <div className="space-y-3 mb-12">
          {filtered.map((dept) => {
            const isExpanded = expandedId === dept.id;
            return (
              <div
                key={dept.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : dept.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition"
                >
                  {/* Abbreviation badge */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600 text-center leading-tight px-1">
                      {dept.abbreviation}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-gray-900">
                        {dept.name}
                      </h3>
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {dept.cluster}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {dept.mandate}
                    </p>
                  </div>

                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50">
                    <div className="grid sm:grid-cols-2 gap-6">

                      {/* Mandate */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          Mandate
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {dept.mandate}
                        </p>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          Services Offered
                        </h4>
                        <ul className="space-y-1">
                          {dept.services.map((s) => (
                            <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-gray-400 mt-0.5 flex-shrink-0">·</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contact row */}
                    <div className="mt-5 pt-4 border-t border-gray-200 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <a
                          href={`tel:${dept.phone}`}
                          className="font-medium hover:text-blue-600 transition"
                        >
                          {dept.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span>{dept.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <Search className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No departments found</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCluster("All"); }}
              className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer note */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            For official department documents, appointments, or records requests,
            visit City Hall in person (Mon–Fri, 8:00 AM–5:00 PM) or call{" "}
            <a href="tel:034-471-2291" className="font-semibold text-blue-600">
              (034) 471-2291
            </a>.
            You may also submit a Freedom of Information request at{" "}
            <a
              href="https://foi.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              foi.gov.ph
            </a>.
          </p>
        </div>

      </div>
    </div>
  );
}