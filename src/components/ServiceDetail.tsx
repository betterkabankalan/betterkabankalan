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
import { useServiceDetail } from "../hooks";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: service, loading, error } = useServiceDetail(id || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-blue-200 rounded w-1/3 mb-8"></div>
            <div className="h-12 bg-blue-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-blue-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-blue-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Service Not Found
            </h2>
            <p className="text-red-700 mb-2">
              Looking for service ID:{" "}
              <code className="bg-red-100 px-2 py-1 rounded">{id}</code>
            </p>
            <p className="text-red-700 mb-6">
              {error?.message ||
                "The service you're looking for doesn't exist."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
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
  const IconComponent = Icons[categoryConfig.icon as keyof typeof Icons] as any;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>

        <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`inline-flex rounded-xl bg-${categoryConfig.color}-50 p-3 flex-shrink-0`}
            >
              {IconComponent && (
                <IconComponent
                  className={`h-8 w-8 text-${categoryConfig.color}-700`}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 mb-2">
                {categoryConfig.label}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-2">
                {service.title}
              </h1>
              <p className="text-base text-blue-900/70">
                {service.description}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-100">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-blue-900">
                  Processing Time
                </div>
                <div className="text-sm text-blue-900/70">
                  {service.processingTime || "Varies"}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-blue-900">
                  Requirements
                </div>
                <div className="text-sm text-blue-900/70">
                  {service.requirements?.length || 0} documents needed
                </div>
              </div>
            </div>
          </div>
        </div>

        {service.requirements && service.requirements.length > 0 && (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Required Documents
            </h2>
            <div className="space-y-3">
              {service.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start p-4 rounded-xl bg-blue-50 border border-blue-100"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900">
                      {req.name}
                    </div>
                    {req.description && (
                      <div className="text-sm text-blue-900/70 mt-1">
                        {req.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.steps && service.steps.length > 0 && (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Application Process
            </h2>
            <div className="space-y-4">
              {service.steps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mr-4 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-blue-900">
                      {typeof step === "string" ? step : step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {service.fees && service.fees.length > 0 && (
          <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Fees</h2>
            <div className="space-y-2">
              {service.fees.map((fee, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg bg-blue-50"
                >
                  <span className="text-blue-900">{fee.name}</span>
                  <span className="font-bold text-blue-900">
                    ₱{fee.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 rounded-lg bg-blue-700 text-white font-bold">
                <span>Total</span>
                <span>
                  ₱
                  {service.fees
                    .reduce((sum, fee) => sum + fee.amount, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Contact & Location
          </h2>
          <div className="space-y-4">
            {service.location && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">
                    {service.location.name}
                  </div>
                  {service.location.address && (
                    <div className="text-sm text-blue-900/70">
                      {service.location.address.street},{" "}
                      {service.location.address.barangay}
                    </div>
                  )}
                </div>
              </div>
            )}
            {service.contact?.phone && (
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={`tel:${service.contact.phone}`}
                    className="font-semibold text-blue-700 hover:text-blue-800"
                  >
                    {service.contact.phone}
                  </a>
                </div>
              </div>
            )}
            {service.contact?.email && (
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={`mailto:${service.contact.email}`}
                    className="font-semibold text-blue-700 hover:text-blue-800"
                  >
                    {service.contact.email}
                  </a>
                </div>
              </div>
            )}
            {service.officeHours && (
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">
                    Office Hours
                  </div>
                  <div className="text-sm text-blue-900/70">
                    Monday to Friday: {service.officeHours.weekdays.open} -{" "}
                    {service.officeHours.weekdays.close}
                  </div>
                  {service.officeHours.lunchBreak && (
                    <div className="text-sm text-blue-900/70">
                      Lunch Break: {service.officeHours.lunchBreak.open} -{" "}
                      {service.officeHours.lunchBreak.close}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {service.contact?.phone && (
            <a
              href={`tel:${service.contact.phone}`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Office
            </a>
          )}
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border-2 border-blue-700 px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
