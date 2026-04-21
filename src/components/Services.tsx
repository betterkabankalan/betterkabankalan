import { Link } from "react-router-dom";
import {
  Building2,
  FileText,
  Wallet,
  Heart,
  GraduationCap,
  Briefcase,
  Users,
  Leaf,
  Flame,
  ArrowRight,
} from "lucide-react";

// ─── Category definitions ─────────────────────────────────────────────────────
// Each service `id` must match the id field in services.json exactly.

const SERVICE_CATEGORIES = [
  {
    id: "government",
    title: "Government Documents",
    icon: FileText,
    services: [
      { name: "Barangay Clearance",           id: "barangay-clearance"     },
      { name: "Birth Certificate (PSA)",       id: "birth-certificate-psa"  },
      { name: "Community Tax Certificate",     id: "cedula"                 },
      { name: "Marriage License",              id: "marriage-license"       },
      { name: "Death Certificate",             id: "death-certificate"      },
      { name: "Building Permit",               id: "building-permit"        },
      { name: "Occupancy Permit",              id: "occupancy-permit"       },
      { name: "Locational Clearance",          id: "locational-clearance"   },
      { name: "Tree Cutting Permit",           id: "tree-cutting-permit"    },
    ],
    viewAllLink: "/services?category=government",
  },
  {
    id: "business",
    title: "Business and Trade",
    icon: Briefcase,
    services: [
      { name: "Business Permit Application",   id: "business-permit"              },
      { name: "Business Permit Renewal",       id: "business-permit-renewal"      },
      { name: "Barangay Business Clearance",   id: "barangay-business-clearance"  },
      { name: "Fire Safety Certificate (FSIC)",id: "fire-safety-inspection"       },
    ],
    viewAllLink: "/services?category=business",
  },
  {
    id: "health",
    title: "Health Services",
    icon: Heart,
    services: [
      { name: "Health Certificate",            id: "health-certificate"     },
      { name: "Sanitary Permit",               id: "sanitary-permit"        },
      { name: "Burial Permit",                 id: "burial-permit"          },
      { name: "Free Vaccination Programs",     id: "health-services"        },
      { name: "Maternal & Child Care",         id: "maternal-care"          },
    ],
    viewAllLink: "/services?category=health",
  },
  {
    id: "social_services",
    title: "Social Services",
    icon: Users,
    services: [
      { name: "Senior Citizen ID (OSCA)",      id: "senior-citizen-id"          },
      { name: "PWD ID Application",            id: "pwd-id"                     },
      { name: "Solo Parent ID",                id: "solo-parent-id"             },
      { name: "Social Welfare Assistance",     id: "social-welfare-assistance"  },
    ],
    viewAllLink: "/services?category=social_services",
  },
  {
    id: "education",
    title: "Education & Training",
    icon: GraduationCap,
    services: [
      { name: "Public School Enrollment",      id: "deped-enrollment"       },
      { name: "TESDA Vocational Training",     id: "tesda-training"         },
      { name: "Scholarship Programs",          id: "scholarship-programs"   },
    ],
    viewAllLink: "/services?category=education",
  },
  {
    id: "employment",
    title: "Employment & Livelihood",
    icon: Building2,
    services: [
      { name: "PESO Job Placement",            id: "peso-job-placement"     },
      { name: "Livelihood Programs",           id: "livelihood-programs"    },
      { name: "Career Counseling",             id: "career-counseling"      },
    ],
    viewAllLink: "/services?category=social_services",
  },
  {
    id: "tax",
    title: "Tax and Payments",
    icon: Wallet,
    services: [
      { name: "Real Property Tax",             id: "real-property-tax"      },
      { name: "Business Tax Payment",          id: "business-tax"           },
      { name: "Community Tax (Cedula)",        id: "cedula"                 },
    ],
    viewAllLink: "/services?category=government",
  },
  {
    id: "agriculture",
    title: "Agriculture & Environment",
    icon: Leaf,
    services: [
      { name: "Farmer / Fisherfolk Registration", id: "farmers-registration"         },
      { name: "Solid Waste / Garbage Request",    id: "garbage-collection-complaint" },
      { name: "Tree Cutting Permit",              id: "tree-cutting-permit"          },
    ],
    viewAllLink: "/services?category=government",
  },
  {
    id: "emergency",
    title: "Emergency & Safety",
    icon: Flame,
    services: [
      { name: "Fire Safety Cert. (FSIC)",      id: "fire-safety-inspection" },
      { name: "Emergency Hotlines",            id: "/emergency"             },
      { name: "CDRRMO Assistance",             id: "cdrrmo-assistance"      },
    ],
    viewAllLink: "/emergency",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServicesInformation() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto w-full sm:max-w-[85%] lg:max-w-[80%] px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm mb-4">
            <Building2 className="h-4 w-4 mr-2 text-gray-500" />
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

        {/* Category grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {SERVICE_CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
              >
                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 rounded-xl bg-gray-100 p-3">
                    <IconComponent className="h-5 w-5 text-gray-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug pt-1">
                    {category.title}
                  </h3>
                </div>

                {/* Service list — show first 4 only to keep cards compact */}
                <ul className="space-y-1.5 mb-5">
                  {category.services.slice(0, 4).map((service) => (
                    <li key={service.id}>
                      <Link
                        to={
                          service.id.startsWith("/")
                            ? service.id
                            : `/services/${service.id}`
                        }
                        className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                  {category.services.length > 4 && (
                    <li className="text-xs text-gray-400">
                      +{category.services.length - 4} more
                    </li>
                  )}
                </ul>

                {/* View all link */}
                <Link
                  to={category.viewAllLink}
                  className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  View All {category.title}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            to="/services"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition text-center"
          >
            <FileText className="h-4 w-4 text-gray-500" />
            Browse All Services
          </Link>
          <Link
            to="/departments"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition text-center"
          >
            <Building2 className="h-4 w-4 text-gray-500" />
            City Departments
          </Link>
          <Link
            to="/emergency"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition text-center"
          >
            <Flame className="h-4 w-4 text-gray-500" />
            Emergency Hotlines
          </Link>
        </div>

      </div>
    </section>
  );
}