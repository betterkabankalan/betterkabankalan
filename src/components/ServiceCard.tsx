import * as Icons from "lucide-react";
import { Service } from "../types";
import { SERVICE_CATEGORY_CONFIG } from "../constants";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const categoryConfig = SERVICE_CATEGORY_CONFIG[service.category];
  const IconComponent = Icons[categoryConfig.icon as keyof typeof Icons] as any;

  return (
    <a
      href={`/services/${service.id}`}
      className="group relative block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-blue-400 hover:-translate-y-1"
    >
      {/* Category Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center rounded-full bg-${categoryConfig.color}-50 px-3 py-1 text-xs font-semibold text-${categoryConfig.color}-700`}
        >
          {categoryConfig.label}
        </span>
      </div>

      {/* Icon */}
      <div className="mb-4">
        <div
          className={`inline-flex rounded-xl bg-${categoryConfig.color}-50 p-3`}
        >
          {IconComponent && (
            <IconComponent
              className={`h-7 w-7 text-${categoryConfig.color}-700`}
            />
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 pr-20 group-hover:text-blue-700 transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {service.description}
      </p>

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between">
        {/* Processing Time */}
        {service.processingTime && (
          <div className="flex items-center text-xs text-gray-500">
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {service.processingTime}
          </div>
        )}

        {/* Arrow Indicator */}
        <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
