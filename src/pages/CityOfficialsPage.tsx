import { useSEO } from "../hooks";
import {
  ExternalLink,
  Shield,
  Users,
  Info,
  Building2,
} from "lucide-react";


interface Official {
  name: string;
  title: string;
  position: string;
  party?: string;
  note?: string;
}


const MAYOR: Official = {
  name:     "Hon. Benjie M. Miranda",
  title:    "City Mayor",
  position: "Executive",
  party:    "Partido Federal ng Pilipinas (PFP)",
  note:     "Re-elected May 12, 2025 · Term: 2025–2028",
};

const VICE_MAYOR: Official = {
  name:     "Hon. Divina Gracia S. Miranda",
  title:    "City Vice Mayor",
  position: "Legislative (Presiding Officer)",
  party:    "Partido Federal ng Pilipinas (PFP)",
  note:     "Re-elected May 12, 2025 · Term: 2025–2028",
};

const SP_MEMBERS: Official[] = [
  { name: "Hon. Anne Marie Zayco",       title: "Councilor", position: "SP Member", party: "NPC" },
  { name: "Hon. Joan Daclan-Cagape",     title: "Councilor", position: "SP Member", party: "NPC" },
  { name: "Hon. Joestarr B. Bandojo",    title: "Councilor", position: "SP Member", party: "NPC" },
  { name: "Hon. Helen Q. Ibañez",        title: "Councilor", position: "SP Member", party: "Independent" },
  { name: "Hon. Jerzy M. Guanzon",       title: "Councilor", position: "SP Member", party: "NPC" },
  { name: "Hon. Marie Vic Anacan-Ramos, M.D.", title: "Councilor", position: "SP Member", party: "NPC" },
  { name: "Hon. Adolfo T. Mangao Jr.",   title: "Councilor", position: "SP Member", party: "AKBYN" },
  { name: "Hon. John Antolo",            title: "Councilor", position: "SP Member", party: "Independent" },
  { name: "Hon. Macario Z. Zafra III",   title: "Councilor", position: "SP Member", party: "NPC" },
  { name: "Hon. Jose M. Dumaguete",      title: "Councilor", position: "SP Member", party: "NPC" },
];

const EX_OFFICIO: Official[] = [
  {
    name:  "Hon. Rico M. Regalia",
    title: "Liga ng mga Barangay President",
    position: "Ex-officio SP Member",
    note: "From official city website — verify after Nov 2026 barangay elections",
  },
  {
    name:  "Hon. Jennelyn M. Largado",
    title: "Indigenous Peoples Mandatory Representative (IPM)",
    position: "Ex-officio SP Member",
    note: "From official city website — confirm current term",
  },
  {
    name:  "Hon. Ernie J. Libona",
    title: "SK Federation President",
    position: "Ex-officio SP Member",
    note: "From official city website — confirm current term",
  },
];

const DEPARTMENTS = [
  "Mayor's Office",
  "Office of the Sangguniang Panlungsod",
  "City Civil Registrar",
  "City Planning and Development Office",
  "City Health Office",
  "City Social Welfare and Development Office",
  "City Accounting Office",
  "City Engineer's Office",
  "City Budget Office",
  "City Agriculture Office",
  "City Assessor's Office",
  "City Treasurer's Office",
  "City Environment and Natural Resources Office (CENRO)",
  "Public Employment Service Office (PESO)",
  "City Human Resource Management Office (HRMO)",
  "City Tourism, Recreation, Arts & Museums Office (CTRAMO)",
  "General Services Office (GSO)",
  "Public Information Office",
  "City Legal Office",
];


function OfficialCard({ official, featured = false }: { official: Official; featured?: boolean }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        featured
          ? "border-gray-300 ring-1 ring-gray-200"
          : "border-gray-200"
      }`}
    >
      {/* Avatar placeholder */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`flex-shrink-0 rounded-xl bg-gray-100 flex items-center justify-center ${
          featured ? "h-14 w-14" : "h-11 w-11"
        }`}>
          <Shield className={`text-gray-400 ${featured ? "h-7 w-7" : "h-5 w-5"}`} />
        </div>
        <div>
          <p className={`font-bold text-gray-900 leading-snug ${featured ? "text-base" : "text-sm"}`}>
            {official.name}
          </p>
          <p className={`text-gray-500 ${featured ? "text-sm" : "text-xs"}`}>
            {official.title}
          </p>
          {official.party && (
            <p className="text-xs text-gray-400 mt-0.5">{official.party}</p>
          )}
        </div>
      </div>

      {official.note && (
        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-3">
          {official.note}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CityOfficialsPage() {
  useSEO({
    title: "City Officials",
    description:
      "Meet the elected officials of Kabankalan City — Mayor, Vice Mayor, and Sangguniang Panlungsod members for the 2025–2028 term.",
    canonical: "/officials",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm mb-4">
            <Users className="h-4 w-4 mr-2 text-gray-500" />
            City Government
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            City Officials
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Elected officials of Kabankalan City serving the{" "}
            <strong className="text-gray-800">2025–2028 term</strong>, following
            the May 12, 2025 local elections.
          </p>
        </div>

        {/* Data source notice */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-10 flex items-start gap-3">
          <Info className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Data sources:</strong> Mayor and
            Vice Mayor results from COMELEC Transparency Media Server (100%
            precincts, May 15 2025). SP members from same source, cross-referenced
            with{" "}
            <a
              href="https://kabankalancity.gov.ph/key-officials/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              kabankalancity.gov.ph/key-officials
            </a>
            . Ex-officio seats from official city website — verify after
            November 2026 barangay/SK elections. Term runs June 30 2025 –
            June 30 2028.
          </div>
        </div>

        {/* Mayor + Vice Mayor */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Executive</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <OfficialCard official={MAYOR}      featured />
            <OfficialCard official={VICE_MAYOR} featured />
          </div>
        </div>

        {/* SP Members */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Sangguniang Panlungsod
            </h2>
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              10 elected members
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            The city legislative body. Ranks reflect 2025 COMELEC vote tally
            (highest to lowest).
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SP_MEMBERS.map((m, i) => (
              <div
                key={m.name}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center gap-3"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">{i + 1}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug truncate">
                    {m.name}
                  </p>
                  <p className="text-xs text-gray-400">{m.party}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ex-officio */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ex-officio SP Members
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Sectoral representatives who serve as non-voting ex-officio members
            of the Sangguniang Panlungsod per RA 7160.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {EX_OFFICIO.map((m) => (
              <OfficialCard key={m.name} official={m} />
            ))}
          </div>
        </div>

        {/* Department list */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              City Government Offices
            </h2>
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {DEPARTMENTS.length} offices
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Offices listed on the official{" "}
            <a
              href="https://kabankalancity.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              kabankalancity.gov.ph
            </a>{" "}
            Citizen's Charter. For full department directory and mandates, visit
            the{" "}
            <a href="/departments" className="font-semibold text-blue-600 hover:underline">
              City Departments page
            </a>.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
              >
                <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                {dept}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-3">
            <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-700">Official sources:</strong>{" "}
              For the most current official information on city officials,
              visit{" "}
              <a
                href="https://kabankalancity.gov.ph/key-officials/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
              >
                kabankalancity.gov.ph/key-officials
              </a>
              . For election results, see the{" "}
              <a
                href="https://comelec.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
              >
                COMELEC official website
              </a>
              . BetterKabankalan is a community portal — report any
              discrepancies via{" "}
              <a href="/contact" className="font-semibold text-blue-600 hover:underline">
                the contact page
              </a>.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}