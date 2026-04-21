import {
  // Government / civil
  FileText,
  FileCheck,
  FileBadge,
  FileSignature,
  Home,
  Building2,
  Hammer,
  MapPin,
  TreePine,
  // Business
  Briefcase,
  RefreshCw,
  Store,
  ShieldCheck,
  // Health
  Heart,
  Stethoscope,
  Baby,
  FileHeart,
  Flame,
  Trash2,
  // Social
  Users,
  UserCheck,
  User,
  HandHeart,
  // Tax
  Wallet,
  Landmark,
  Receipt,
  // Education / Employment
  GraduationCap,
  BookOpen,
  Award,
  Briefcase as JobIcon,
  TrendingUp,
  MessageSquare,
  // Agriculture
  Leaf,
  Fish,
  // Emergency
  Phone,
  ShieldAlert,
  // Fallback
  FileQuestion,
} from "lucide-react";
import { Service } from "../types";
import { SERVICE_CATEGORY_CONFIG } from "../constants";

// ─── Service-specific icon map ────────────────────────────────────────────────
// Maps service IDs to specific icons so each card looks distinct.
// Falls back to a category-level icon if ID isn't listed here.

const SERVICE_ICONS: Record<string, React.ElementType> = {
  // Government documents
  "barangay-clearance":         FileCheck,
  "birth-certificate-psa":      FileBadge,
  "cedula":                     Wallet,
  "marriage-license":           FileSignature,
  "death-certificate":          FileText,
  "real-property-tax":          Landmark,
  "building-permit":            Hammer,
  "occupancy-permit":           Home,
  "locational-clearance":       MapPin,
  "tree-cutting-permit":        TreePine,
  "police-clearance":           ShieldCheck,

  // Business
  "business-permit":            Briefcase,
  "business-permit-renewal":    RefreshCw,
  "barangay-business-clearance":Store,
  "fire-safety-inspection":     Flame,
  "business-tax":               Receipt,

  // Health
  "health-services":            Heart,
  "maternal-care":              Baby,
  "medical-certificate":        Stethoscope,
  "health-certificate":         FileHeart,
  "sanitary-permit":            ShieldCheck,
  "burial-permit":              FileText,

  // Social services
  "senior-citizen-id":          UserCheck,
  "pwd-id":                     User,
  "solo-parent-id":             Users,
  "social-welfare-assistance":  HandHeart,

  // Education
  "deped-enrollment":           BookOpen,
  "tesda-training":             GraduationCap,
  "scholarship-programs":       Award,

  // Employment
  "peso-job-placement":         JobIcon,
  "livelihood-programs":        TrendingUp,
  "career-counseling":          MessageSquare,

  // Agriculture & environment
  "farmers-registration":       Leaf,
  "fisherfolk-registration":    Fish,
  "garbage-collection-complaint": Trash2,

  // Emergency
  "cdrrmo-assistance":          ShieldAlert,
  "emergency-hotlines":         Phone,
};

// ─── Category-level fallback icons ───────────────────────────────────────────

const CATEGORY_FALLBACK_ICONS: Record<string, React.ElementType> = {
  government:      FileText,
  business:        Briefcase,
  health:          Heart,
  social_services: Users,
  education:       GraduationCap,
  infrastructure:  Building2,
  emergency:       ShieldAlert,
};

// ─── Category label map ───────────────────────────────────────────────────────
// Mirrors CATEGORY_LABELS in ServicesPage — keeps badge text consistent.

const CATEGORY_LABELS: Record<string, string> = {
  government:      "Government Documents",
  business:        "Business and Trade",
  health:          "Health Services",
  social_services: "Social Services",
  education:       "Education & Training",
  infrastructure:  "Infrastructure",
  emergency:       "Emergency & Safety",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const categoryConfig = SERVICE_CATEGORY_CONFIG[service.category];

  // Pick the most specific icon available
  const IconComponent: React.ElementType =
    SERVICE_ICONS[service.id] ??
    CATEGORY_FALLBACK_ICONS[service.category] ??
    FileQuestion;

  // Human-readable category label
  const categoryLabel =
    CATEGORY_LABELS[service.category] ??
    categoryConfig?.label ??
    service.category;

  return (
    <a
      href={`/services/${service.id}`}
      className="group relative block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5"
    >
      {/* Category badge — neutral gray, no color variations */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {categoryLabel}
        </span>
      </div>

      {/* Icon — always gray, service-specific */}
      <div className="mb-4">
        <div className="inline-flex rounded-xl bg-gray-100 p-3">
          <IconComponent className="h-7 w-7 text-gray-600" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 pr-28 group-hover:text-gray-700 transition-colors leading-snug">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
        {service.description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        {service.processingTime && (
          <div className="flex items-center text-xs text-gray-400">
            <svg className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.processingTime}
          </div>
        )}

        {/* Arrow on hover */}
        <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 ml-auto">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </a>
  );
}