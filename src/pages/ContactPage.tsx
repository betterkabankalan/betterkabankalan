import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-blue-900/70 max-w-2xl mx-auto">
            Get in touch with Kabankalan City Hall for inquiries, assistance, or
            feedback about government services.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-blue-900 mb-6">
                City Hall Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <MapPin className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Address
                    </h3>
                    <p className="text-sm text-blue-900/70">
                      City Hall, Kabankalan City
                      <br />
                      Negros Occidental, Philippines
                      <br />
                      6111
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Phone className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:034-471-2291"
                      className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                    >
                      (034) 471-2291
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Mail className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:info@kabankalan.gov.ph"
                      className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                    >
                      info@kabankalan.gov.ph
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Clock className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-sm text-blue-900/70">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Lunch Break: 12:00 PM - 1:00 PM
                      <br />
                      Weekends & Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  to="/services"
                  className="block text-sm text-blue-700 hover:text-blue-800 font-medium hover:underline"
                >
                  → Browse All Services
                </Link>
                <Link
                  to="/emergency"
                  className="block text-sm text-blue-700 hover:text-blue-800 font-medium hover:underline"
                >
                  → Emergency Hotlines
                </Link>
                <Link
                  to="/barangays"
                  className="block text-sm text-blue-700 hover:text-blue-800 font-medium hover:underline"
                >
                  → Barangay Directory
                </Link>
                <Link
                  to="/transparency"
                  className="block text-sm text-blue-700 hover:text-blue-800 font-medium hover:underline"
                >
                  → Transparency Portal
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-blue-900 mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-green-900 mb-1">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-green-800">
                        Thank you for contacting us. We'll get back to you as
                        soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-blue-900 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-blue-900 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      placeholder="juan@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-blue-900 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    placeholder="Inquiry about business permit"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-blue-900 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm text-blue-900 placeholder:text-blue-900/40 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-700 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900/80">
                    <strong>Note:</strong> This form is for general inquiries
                    only. For urgent matters or emergencies, please call the
                    City Hall directly at (034) 471-2291.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-800 p-8 text-white shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-3">
            Need Immediate Assistance?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            For urgent concerns or emergencies, please contact us directly via
            phone or visit the City Hall during office hours.
          </p>
          <a
            href="tel:034-471-2291"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call (034) 471-2291
          </a>
        </div>
      </div>
    </div>
  );
}
