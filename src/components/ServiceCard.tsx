import * as Icons from "lucide-react";
import { Service } from "../types";
import { SERVICE_CATEGORY_CONFIG } from "../constants";

// ─── Static color map ─────────────────────────────────────────────────────────
// Dynamic class names like `bg-${color}-50` are stripped by Tailwind's JIT
// compiler at build time because they're never seen as literal strings.
// This map uses only safe, statically-known class names.

const CATEGORY_COLORS: Record<string, { badge: string; icon: string }> = {
  blue:   { badge: "bg-blue-50 text-blue-700",     icon: "bg-blue-50 text-blue-700"   },
  red:    { badge: "bg-red-50 text-red-700",        icon: "bg-red-50 text-red-700"     },
  orange: { badge: "bg-orange-50 text-orange-700",  icon: "bg-orange-50 text-orange-700" },
  green:  { badge: "bg-green-50 text-green-700",    icon: "bg-green-50 text-green-700" },
  purple: { badge: "bg-purple-50 text-purple-700",  icon: "bg-purple-50 text-purple-700" },
  pink:   { badge: "bg-pink-50 text-pink-700",      icon: "bg-pink-50 text-pink-700"   },
  gray:   { badge: "bg-gray-100 text-gray-600",     icon: "bg-gray-100 text-gray-600"  },
};

// Fallback when a color key isn't in the map
const DEFAULT_COLORS = { badge: "bg-gray-100 text-gray-600", icon: "bg-gray-100 text-gray-600" };

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const categoryConfig = SERVICE_CATEGORY_CONFIG[service.category];
  const IconComponent  = Icons[categoryConfig.icon as keyof typeof Icons] as any;
  const colors         = CATEGORY_COLORS[categoryConfig.color] ?? DEFAULT_COLORS;

  return (
    <a
      href={`/services/${service.id}`}
      className="group relative block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5"
    >
      {/* Category badge */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>
          {categoryConfig.label}
        </span>
      </div>

      {/* Icon */}
      <div className="mb-4">
        <div className={`inline-flex rounded-xl p-3 ${colors.icon}`}>
          {IconComponent && <IconComponent className="h-7 w-7" />}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 pr-20 group-hover:text-gray-700 transition-colors">
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
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.processingTime}
          </div>
        )}

        {/* Arrow — visible on hover */}
        <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </a>
  );
}