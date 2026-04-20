import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText,
  AlertCircle,
} from "lucide-react";
import * as Icons from "lucide-react";
import { SERVICE_CATEGORY_CONFIG } from "../constants";
import { useServiceDetail, useSEO } from "../hooks";

// ─── Static color map (same fix as ServiceCard — prevents Tailwind JIT purge) ─
const CATEGORY_COLORS: Record<string, { icon: string }> = {
  blue:   { icon: "bg-blue-50 text-blue-700"     },
  red:    { icon: "bg-red-50 text-red-700"       },
  orange: { icon: "bg-orange-50 text-orange-700" },
  green:  { icon: "bg-green-50 text-green-700"   },
  purple: { icon: "bg-purple-50 text-purple-700" },
  pink:   { icon: "bg-pink-50 text-pink-700"     },
  gray:   { icon: "bg-gray-100 text-gray-600"    },
};
const DEFAULT_COLORS = { icon: "bg-gray-100 text-gray-600" };

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: service, loading, error } = useServiceDetail(id || "");

  useSEO({
    title: service ? service.title : "Service Details",
    description: service
      ? `${service.description} Find requirements, fees, and step-by-step process for ${service.title} in Kabankalan City.`
      : "Find government service requirements, fees, and processing steps in Kabankalan City.",
    canonical: id ? `/services/${id}` : "/services",
  });

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="h-10 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Service Not Found
            </h2>
            <p className="text-gray-500 mb-2">
              Looking for service ID:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">{id}</code>
            </p>
            <p className="text-gray-500 mb-6">
              {error?.message || "The service you're looking for doesn't exist."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryConfig = SERVICE_CATEGORY_CONFIG[service.category];
  const IconComponent  = Icons[categoryConfig.icon as keyof typeof Icons] as any;
  const colors         = CATEGORY_COLORS[categoryConfig.color] ?? DEFAULT_COLORS;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto md:max-w-[80%] px-4 sm:px-6">

        {/* Back button */}
        <button
          onClick={() => navigate("/services")}
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-800 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </button>

        {/* Header card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`inline-flex rounded-xl p-3 flex-shrink-0 ${colors.icon}`}>
              {IconComponent && <IconComponent className="h-8 w-8" />}
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600 mb-2">
                {categoryConfig.label}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                {service.title}
              </h1>
              <p className="text-base text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-900">Processing Time</div>
                <div className="text-sm text-gray-500">{service.processingTime || "Varies"}</div>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-gray-900">Requirements</div>
                <div className="text-sm text-gray-500">
                  {service.requirements?.length || 0} documents needed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Required documents */}
        {service.requirements && service.requirements.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Required Documents
            </h2>
            <div className="space-y-3">
              {service.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{req.name}</div>
                    {req.description && (
                      <div className="text-sm text-gray-500 mt-1">{req.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application process */}
        {service.steps && service.steps.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Application Process
            </h2>
            <div className="space-y-4">
              {service.steps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-sm font-bold mr-4 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 leading-relaxed">
                      {typeof step === "string" ? step : step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fees */}
        {service.fees && service.fees.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fees</h2>
            <div className="space-y-2">
              {service.fees.map((fee, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <span className="text-gray-700">{fee.name}</span>
                  <span className="font-bold text-gray-900">
                    ₱{fee.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900 text-white font-bold mt-1">
                <span>Total</span>
                <span>
                  ₱{service.fees.reduce((sum, fee) => sum + fee.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Contact & location */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Contact & Location
          </h2>
          <div className="space-y-4">
            {service.location && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">{service.location.name}</div>
                  {service.location.address && (
                    <div className="text-sm text-gray-500">
                      {service.location.address.street},{" "}
                      {service.location.address.barangay}
                    </div>
                  )}
                </div>
              </div>
            )}
            {service.contact?.phone && (
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${service.contact.phone}`}
                  className="font-semibold text-gray-900 hover:text-blue-700 transition"
                >
                  {service.contact.phone}
                </a>
              </div>
            )}
            {service.contact?.email && (
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${service.contact.email}`}
                  className="font-semibold text-gray-900 hover:text-blue-700 transition"
                >
                  {service.contact.email}
                </a>
              </div>
            )}
            {service.officeHours && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Office Hours</div>
                  <div className="text-sm text-gray-500">
                    Monday to Friday: {service.officeHours.weekdays.open} –{" "}
                    {service.officeHours.weekdays.close}
                  </div>
                  {service.officeHours.lunchBreak && (
                    <div className="text-sm text-gray-500">
                      Lunch Break: {service.officeHours.lunchBreak.open} –{" "}
                      {service.officeHours.lunchBreak.close}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}