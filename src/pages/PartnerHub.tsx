import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import {
  CheckCircle,
  Send,
  Layers,
  Share2,
  Sliders,
  TrendingUp,
  ClipboardCheck,
  Users,
  Rocket,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContactCta from "@/components/ContactCta";
import { RecaptchaBadge } from "@/components/RecaptchaBadge";
import { useRecaptcha } from "@/hooks/useRecaptcha";

import eightSquadLogo from "@/assets/TrustedPartner/8squadlogo.webp";
import accentureLogo from "@/assets/TrustedPartner/accenturelogo.webp";
import actumDigitalLogo from "@/assets/TrustedPartner/actumdigitallogo.webp";
import allCloudLogo from "@/assets/TrustedPartner/allcloudlogo.webp";
import asugoLogo from "@/assets/TrustedPartner/asugologojpg.webp";
import bearingLogo from "@/assets/TrustedPartner/bearinglogojpg.webp";
import capgeminiLogo from "@/assets/TrustedPartner/capgeminilogo.webp";
import nolticLogo from "@/assets/TrustedPartner/nolticlogo.webp";
import syraGonLogo from "@/assets/TrustedPartner/syragonlogojpg.webp";
import veraSolutionLogo from "@/assets/TrustedPartner/verasolutionlogo.webp";
import zenyusLogo from "@/assets/TrustedPartner/zenyus.webp";

const whyPartner = [
  {
    title: "Tailored Partner Tiers",
    desc: "Programs designed to match where you are today and grow with you as you scale.",
    icon: Layers,
  },
  {
    title: "Collaborative Marketing",
    desc: "Co-branded campaigns, case studies, and joint webinars that expand your reach and strengthen your credibility.",
    icon: Share2,
  },
  {
    title: "Flexible Models",
    desc: "Referral, reseller, or technology partnership. Choose the model that fits how your business works.",
    icon: Sliders,
  },
  {
    title: "Shared Leads & GTM Support",
    desc: "Joint go-to-market planning, shared leads, and dedicated partner success resources to help you win together.",
    icon: TrendingUp,
  },
];

const trustedPartners = [
  { name: "8Squad", logo: eightSquadLogo },
  { name: "Accenture", logo: accentureLogo },
  { name: "Actum Digital", logo: actumDigitalLogo },
  { name: "AllCloud", logo: allCloudLogo },
  { name: "Asugo", logo: asugoLogo },
  { name: "Bearing", logo: bearingLogo },
  { name: "Capgemini", logo: capgeminiLogo },
  { name: "Noltic", logo: nolticLogo },
  { name: "SyraGon", logo: syraGonLogo },
  { name: "VeraSolution", logo: veraSolutionLogo },
  { name: "Zenyus", logo: zenyusLogo },
];

export default function PartnerHub() {
  const executeRecaptcha = useRecaptcha();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    country: "USA",
    partnerType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateSequenceUpTo = (fieldName: string, currentData: typeof formData) => {
    const fieldSequence = ["fullName", "company", "email", "phone", "country", "partnerType", "message"];
    const currentIndex = fieldSequence.indexOf(fieldName);
    
    if (currentIndex === -1) return;

    setErrors((prev) => {
      const nextErrors = { ...prev };

      // Validate all fields up to the designated field's index
      for (let i = 0; i <= currentIndex; i++) {
        const fName = fieldSequence[i];
        const value = currentData[fName as keyof typeof currentData] || "";
        let errorMsg = "";

        if (fName === "fullName") {
          if (!value.trim()) {
            errorMsg = "Please enter your Full Name.";
          }
        } else if (fName === "company") {
          if (!value.trim()) {
            errorMsg = "Please enter your Company Name.";
          }
        } else if (fName === "email") {
          if (!value.trim()) {
            errorMsg = "Please enter your Business Email.";
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) {
              errorMsg = "Please enter a valid email address.";
            }
          }
        } else if (fName === "phone") {
          if (!value.trim()) {
            errorMsg = "Please enter your Phone Number.";
          } else {
            const phoneRegex = /^[0-9]{7,15}$/;
            if (!phoneRegex.test(value)) {
              errorMsg = "Phone number must contain between 7 and 15 digits only.";
            }
          }
        } else if (fName === "country") {
          if (!value) {
            errorMsg = "Please select your Country / Region.";
          }
        } else if (fName === "partnerType") {
          if (!value) {
            errorMsg = "Please select a Partnership Type.";
          }
        } else if (fName === "message") {
          if (!value.trim()) {
            errorMsg = "Please enter your message.";
          } else if (value.trim().length < 10) {
            errorMsg = "Message must be at least 10 characters.";
          }
        }

        if (errorMsg) {
          nextErrors[fName] = errorMsg;
        } else {
          delete nextErrors[fName];
        }
      }

      return nextErrors;
    });
  };

  const handleBlur = (
    e: React.FocusEvent<any>
  ) => {
    const { name } = e.target;
    if (name) {
      validateSequenceUpTo(name, formData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate all required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your Full Name.";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Please enter your Company Name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your Business Email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your Phone Number.";
    } else if (!/^[0-9]{7,15}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain between 7 and 15 digits only.";
    }
    if (!formData.country) {
      newErrors.country = "Please select your Country / Region.";
    }
    if (!formData.partnerType) {
      newErrors.partnerType = "Please select a Partnership Type.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get reCAPTCHA token
      let recaptchaToken = "";
      try {
        recaptchaToken = await executeRecaptcha("partner_form");
      } catch {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }

      const response = await fetch("/api/partner.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      let result: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else if (!response.ok) {
        throw new Error(
          `Server execution failed (Status ${response.status}). If testing locally, ensure you are using Vercel Dev.`,
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to submit application",
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Partner form submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-white to-[#ecfdf5] text-[#0f172a] font-sans"
      data-testid="page-partners"
    >
      <SEO
        title="Partner Hub | Ardira"
        description="Join the Ardira Partner Hub. Collaborate with us to deliver 100% native Salesforce solutions to your clients."
        keywords="Salesforce partner program, Ardira partners, reseller program, referral partner"
        ogTitle="Ardira Partner Hub"
        ogDescription="Partner with Ardira to deliver native Salesforce solutions and grow your business."
        ogUrl="https://ardira.com/partner-hub"
        ogImage="https://ardira.com/ArdiraLogo.webp"
        ogImageWidth="512"
        ogImageHeight="512"
        ogImageType="image/webp"
        ogLogo="https://ardira.com/ArdiraLogo.webp"
      />
      <StructuredData
        type="WebPage"
        name="Ardira Partner Hub"
        description="Join the Ardira Partner Hub."
        url="https://ardira.com/partner-hub"
      />

      {/* Why Partner */}
      <section className="responsive-section relative py-20 bg-gradient-to-br from-[#f0fdf4] via-white to-[#ecfdf5]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(34,197,94,0.12),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#43AF57] mb-3">
              Why Partner With Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-[#0f172a] leading-tight max-w-2xl mx-auto">
              Built for Mutual Success
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyPartner.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border-2 border-[#e0f2e9] rounded-2xl p-6 hover:border-[#43AF57] hover:shadow-md transition-all group"
              >
                <div className="inline-flex p-2.5 rounded-xl bg-[#f0fdf4] mb-4 group-hover:bg-[#e8fbf0] transition-colors">
                  <item.icon size={22} className="text-[#43AF57]" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#0f172a] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Trusted Partners - Carousel */}
      <section className="responsive-section py-16 bg-gradient-to-br from-[#f0fdf4] via-white to-[#ecfdf5] border-t border-slate-100">
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#43AF57] mb-3">
              Our Global Partners
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold font-display text-[#0f172a] leading-tight max-w-2xl mx-auto">
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <div
              className="relative w-full overflow-hidden mx-auto"
            >
              <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#f0fdf4] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#f0fdf4] to-transparent z-10 pointer-events-none" />
              <div
                className="partner-carousel-track flex items-center animate-marquee py-4 w-max"
                style={{ animationDuration: "40s" }}
              >
                {[
                  ...trustedPartners,
                  ...trustedPartners,
                  ...trustedPartners,
                  ...trustedPartners,
                ].map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="flex items-center justify-center mx-10 md:mx-14 flex-shrink-0 h-12 md:h-14"
                  >
                    <img
                      loading="lazy"
                      src={p.logo}
                      alt={p.name}
                      className="max-h-full max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="responsive-section py-20 bg-gradient-to-br from-[#f0fdf4] via-white to-[#ecfdf5]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#43AF57] mb-3">
              How It Works
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold font-display text-[#0f172a] leading-tight max-w-2xl mx-auto">
              Getting Started Is Simple
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Apply",
                desc: "Fill out the partner application form below. Tell us about your business.",
                icon: ClipboardCheck,
              },
              {
                step: "02",
                title: "Onboard",
                desc: "Our partner team will review your application and set you up with training, resources, and a dedicated partner manager.",
                icon: Users,
              },
              {
                step: "03",
                title: "Grow Together",
                desc: "Start referring, reselling, or integrating. Access joint GTM resources, shared leads, and co-marketing support.",
                icon: Rocket,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold font-display text-emerald-100 mb-4 flex justify-center">
                  <item.icon size={40} className="text-[#43AF57]" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#0f172a] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Application Form */}
      <section
        id="partner-form"
        className="responsive-section bg-[#f8fafc] scroll-mt-20 py-8 md:py-12"
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white rounded-3xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.09)] border border-slate-100 overflow-hidden"
          >
            {/* Left Info Section - Green Background */}
            <div className="bg-[#43AF57] p-6 md:p-8 flex flex-col justify-center text-white">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight mb-2">
                  Become a Partner
                </h2>
                <p className="text-base text-green-50 mb-6 leading-relaxed">
                  Grow Faster with Ardira
                </p>

                <p className="text-base leading-relaxed text-green-50 mb-8">
                  Apply to join our partner network and unlock new opportunities
                  to scale your business with Salesforce-native solutions
                </p>

                <div className="space-y-3">
                  {[
                    "Exclusive partner-only resources and GTM support",
                    "Competitive revenue sharing and referral incentives",
                    "Personalized guidance from a dedicated Partner Success Manager",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="text-white shrink-0 mt-0.5"
                      />
                      <span className="text-xs leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="bg-white p-6 md:p-8">
              {submitted ? (
                <div className="flex items-center justify-center h-full">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                    <div className="inline-flex p-4 rounded-full bg-emerald-100 mb-4">
                      <CheckCircle size={32} className="text-[#43AF57]" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-[#0f172a] mb-3">
                      Application Submitted!
                    </h3>
                    <p className="text-sm text-slate-500">
                      Thank you for your interest. Our partnerships team will
                      reach out within 2 business days.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            fullName: e.target.value,
                          });
                          if (errors.fullName) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.fullName;
                              return copy;
                            });
                          }
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          errors.fullName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-200 focus:ring-emerald-500"
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (errors.company) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.company;
                              return copy;
                            });
                          }
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          errors.company
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-200 focus:ring-emerald-500"
                        }`}
                        placeholder="Company Name"
                      />
                      {errors.company && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.company}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                        Business Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.email;
                              return copy;
                            });
                          }
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-200 focus:ring-emerald-500"
                        }`}
                        placeholder="Business Email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/[^0-9]/g, ""),
                          });
                          if (errors.phone) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.phone;
                              return copy;
                            });
                          }
                        }}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-200 focus:ring-emerald-500"
                        }`}
                        placeholder="e.g., 1234567890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                        Country / Region <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, country: value }));
                          if (errors.country) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.country;
                              return copy;
                            });
                          }
                        }}
                      >
                        <SelectTrigger
                          name="country"
                          onBlur={() => validateSequenceUpTo("country", formData)}
                          className={`w-full px-4 py-2.5 h-[42px] rounded-xl border bg-white text-sm text-left focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.country
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-200 focus:ring-emerald-500"
                          }`}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">
                            United Kingdom
                          </SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.country}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                        Partnership Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.partnerType}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, partnerType: value }));
                          if (errors.partnerType) {
                            setErrors((prev) => {
                              const copy = { ...prev };
                              delete copy.partnerType;
                              return copy;
                            });
                          }
                        }}
                      >
                        <SelectTrigger
                          name="partnerType"
                          onBlur={() => validateSequenceUpTo("partnerType", formData)}
                          className={`w-full px-4 py-2.5 h-[42px] rounded-xl border bg-white text-sm text-left focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.partnerType
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-200 focus:ring-emerald-500"
                          }`}
                        >
                          <SelectValue placeholder="Partnership Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Reseller">Reseller</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.partnerType && (
                        <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.partnerType}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f172a] mb-1.5">
                      Tell us about your business{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) {
                          setErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.message;
                            return copy;
                          });
                        }
                      }}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-200 focus:ring-emerald-500"
                      }`}
                      placeholder="Tell us about your business"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message}</p>
                    )}
                  </div>
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle
                        size={16}
                        className="text-red-600 shrink-0 mt-0.5"
                      />
                      <p className="text-sm text-red-700">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#43AF57] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center gap-2 group mt-2"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    {!isSubmitting && (
                      <Send
                        size={18}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500">
                    By submitting this form, you agree to our{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-[#43AF57] hover:underline"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>

                  <RecaptchaBadge />
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCta
        headline="Ready to Partner with Ardira?"
        description="Get in touch and a member of the Ardira Partnerships team will be in contact to explore how we can accelerate your growth together."
        buttonText="Contact Our Partner Team"
        buttonLink="#partner-form"
      />
    </div>
  );
}
