import { MapPin, Phone } from "lucide-react";
import * as Icons from "lucide-react";
import { Service } from "../types";
import { SERVICE_CATEGORY_CONFIG } from "../constants";
import { truncate } from "../utils/formatters";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const categoryConfig = SERVICE_CATEGORY_CONFIG[service.category];
  const IconComponent = Icons[categoryConfig.icon as keyof typeof Icons] as any;

  return (
    <div className="group relative rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-blue-200">
      <div
        className={`inline-flex rounded-xl bg-${categoryConfig.color}-50 p-3 mb-4`}
      >
        {IconComponent && (
          <IconComponent
            className={`h-6 w-6 text-${categoryConfig.color}-700`}
          />
        )}
      </div>

      <h3 className="text-lg font-bold text-blue-900 mb-2">{service.title}</h3>

      <p className="text-sm text-blue-900/70 mb-4">
        {truncate(service.description, 120)}
      </p>

      {service.requirements && service.requirements.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-blue-900 mb-2">
            Requirements:
          </div>
          <ul className="text-xs text-blue-900/60 space-y-1">
            {service.requirements.slice(0, 3).map((req, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{req.name}</span>
              </li>
            ))}
            {service.requirements.length > 3 && (
              <li className="text-blue-700 font-semibold">
                +{service.requirements.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}

      {service.location && (
        <div className="flex items-start text-xs text-blue-900/60 mb-2">
          <MapPin className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0" />
          <span>{service.location.name}</span>
        </div>
      )}

      {service.contact?.phone && (
        <div className="flex items-start text-xs text-blue-900/60">
          <Phone className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0" />
          <span>{service.contact.phone}</span>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-blue-100">
        <a
          href={`/services/${service.id}`}
          className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
        >
          Learn more
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
