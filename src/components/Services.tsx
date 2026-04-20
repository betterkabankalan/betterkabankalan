import { Link } from "react-router-dom";
import {
  Building2,
  FileText,
  Wallet,
  Heart,
  GraduationCap,
  Briefcase,
  Users,
  Home,
  ArrowRight,
} from "lucide-react";

const SERVICE_CATEGORIES = [
  {
    id: "government",
    title: "Government Documents",
    icon: FileText,
    color: "blue",
    services: [
      { name: "Barangay Clearance", id: "barangay-clearance" },
      { name: "Birth Certificate (PSA)", id: "birth-certificate-psa" },
      { name: "Community Tax Certificate", id: "cedula" },
      { name: "Marriage License", id: "marriage-license" },
    ],
    viewAllLink: "/services?category=government",
  },
  {
    id: "business",
    title: "Business and Trade",
    icon: Briefcase,
    color: "green",
    services: [
      { name: "Business Permit Application", id: "business-permit" },
      { name: "Business Permit Renewal", id: "business-permit-renewal" },
      {
        name: "Barangay Business Clearance",
        id: "barangay-business-clearance",
      },
    ],
    viewAllLink: "/services?category=business",
  },
  {
    id: "health",
    title: "Health Services",
    icon: Heart,
    color: "red",
    services: [
      { name: "Free Vaccination Programs", id: "health-services" },
      { name: "Maternal & Child Care", id: "maternal-care" },
      { name: "Medical Certificate", id: "medical-certificate" },
    ],
    viewAllLink: "/services?category=health",
  },
  {
    id: "social",
    title: "Social Services",
    icon: Users,
    color: "purple",
    services: [
      { name: "Senior Citizen ID (OSCA)", id: "senior-citizen-id" },
      { name: "PWD ID Application", id: "pwd-id" },
      { name: "Solo Parent ID", id: "solo-parent-id" },
      { name: "Social Welfare Assistance", id: "social-welfare-assistance" },
    ],
    viewAllLink: "/services?category=social_services",
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    color: "indigo",
    services: [
      { name: "Public School Enrollment", id: "deped-enrollment" },
      { name: "TESDA Vocational Training", id: "tesda-training" },
      { name: "Scholarship Programs", id: "scholarship-programs" },
    ],
    viewAllLink: "/services?category=education",
  },
  {
    id: "employment",
    title: "Employment",
    icon: Building2,
    color: "orange",
    services: [
      { name: "PESO Job Placement 🏆", id: "peso-job-placement" },
      { name: "Livelihood Programs", id: "livelihood-programs" },
      { name: "Career Counseling", id: "career-counseling" },
    ],
    viewAllLink: "/services?category=social_services",
  },
  {
    id: "tax",
    title: "Tax and Payments",
    icon: Wallet,
    color: "yellow",
    services: [
      { name: "Real Property Tax", id: "real-property-tax" },
      { name: "Business Tax Payment", id: "business-tax" },
      { name: "Community Tax (Cedula)", id: "cedula" },
    ],
    viewAllLink: "/services?category=government",
  },
  {
    id: "housing",
    title: "Housing",
    icon: Home,
    color: "teal",
    services: [
      { name: "Housing Assistance", id: "housing-assistance" },
      { name: "Land Titles", id: "land-titles" },
    ],
    viewAllLink: "/services?category=government",
  },
];

export default function ServicesInformation() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm mb-4">
            <Building2 className="h-4 w-4 mr-2" />
            Government Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Services & Information
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Browse government services by category. Find requirements, fees, and
            step-by-step guides for Kabankalan City services.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {SERVICE_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 rounded-xl bg-blue-100 p-3`}>
                    <IconComponent className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-2 mb-4">
                  {category.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.id}`}
                        className="text-sm text-gray-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={category.viewAllLink}
                  className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  View All {category.title}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
