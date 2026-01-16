// import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useServices } from "../hooks";
// import { BARANGAYS } from "../constants";
import { ServiceCard } from "./ServiceCard";
import { LoadingSpinner, ErrorMessage } from "./LoadingSpinner";

export default function ServicesInformation() {
  const { data: services, loading, error, refetch } = useServices();

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] px-4 sm:px-6">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] px-4 sm:px-6">
          <ErrorMessage error={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] px-4 sm:px-6">
        <SectionHeader />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* <BarangayDirectory /> */}

        <InformationFooter />
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm mb-4">
        <Building2 className="h-4 w-4 mr-2" />
        Government Services
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-4">
        Services & Information
      </h2>
      <p className="text-base sm:text-lg text-blue-900/70 max-w-2xl mx-auto">
        Access city services, requirements, and information for Kabankalan City
        residents.
      </p>
    </div>
  );
}

// function BarangayDirectory() {
//   return (
//     <div className="rounded-3xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm mb-12">
//       <div className="flex items-center mb-6">
//         <div className="inline-flex rounded-xl bg-blue-50 p-3 mr-4">
//           <Landmark className="h-6 w-6 text-blue-700" />
//         </div>
//         <div>
//           <h3 className="text-xl font-bold text-blue-900">
//             {BARANGAYS.length} Barangays of Kabankalan City
//           </h3>
//           <p className="text-sm text-blue-900/70">
//             Find your barangay for local services and clearances
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
//         {BARANGAYS.map((barangay, idx) => (
//           <Link
//             key={idx}
//             to={`/barangays/${barangay.toLowerCase().replace(/\s+/g, "-")}`}
//             className="rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-2 text-center text-sm font-medium text-blue-900 hover:bg-blue-100 hover:border-blue-200 transition-colors"
//           >
//             {barangay}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


function InformationFooter() {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900/80">
      <p className="font-semibold mb-2">Important Notes:</p>
      <ul className="space-y-1 text-xs">
        <li>
          • Processing times may vary depending on the service and completeness
          of requirements
        </li>
        <li>
          • Some services may require additional fees - please inquire at the
          respective offices
        </li>
        <li>
          • Office hours: Monday to Friday, 8:00 AM - 5:00 PM (except holidays)
        </li>
        <li>• Bring valid IDs and photocopies of all requirements</li>
      </ul>
    </div>
  );
}
