import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { RecaptchaBadge } from "@/components/RecaptchaBadge";
import { CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-family)",
  fontSize: 14,
  padding: "10px 14px",
  border: "1.5px solid var(--border-color)",
  borderRadius: 12,
  background: "#fff",
  color: "var(--text-primary)",
  outline: "none",
  transition: "var(--transition)",
  width: "100%",
};

function Contact() {
  const executeRecaptcha = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });

    if (name === "phone") {
      // Restrict input to digits only
      setFormData((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateSequenceUpTo = (fieldName: string, currentData: typeof formData) => {
    const fieldSequence = ["name", "email", "phone", "company", "product", "message"];
    const currentIndex = fieldSequence.indexOf(fieldName);
    
    if (currentIndex === -1) return;

    setErrors((prev) => {
      const nextErrors = { ...prev };

      // Validate all fields up to the designated field's index
      for (let i = 0; i <= currentIndex; i++) {
        const fName = fieldSequence[i];
        const value = currentData[fName as keyof typeof currentData] || "";
        let errorMsg = "";

        if (fName === "name") {
          if (!value.trim()) {
            errorMsg = "Please enter your Full Name.";
          }
        } else if (fName === "email") {
          if (!value.trim()) {
            errorMsg = "Please enter your Email.";
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
        } else if (fName === "company") {
          if (!value.trim()) {
            errorMsg = "Please enter your Company Name.";
          }
        } else if (fName === "product") {
          if (!value) {
            errorMsg = "Please select a Product of Interest.";
          }
        } else if (fName === "message") {
          if (!value.trim()) {
            errorMsg = "Please enter your Message.";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your Full Name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your Email.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your Phone Number.";
    } else {
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Phone number must contain between 7 and 15 digits only.";
      }
    }

    if (!formData.company.trim()) {
      newErrors.company = "Please enter your Company Name.";
    }

    if (!formData.product) {
      newErrors.product = "Please select a Product of Interest.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your Message.";
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
        recaptchaToken = await executeRecaptcha("contact_form");
      } catch {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }

      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      let result: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else if (!response.ok) {
        throw new Error(`Server error (Status ${response.status})`);
      }

      if (!response.ok) {
        throw new Error(result.message || result.error || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        product: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="responsive-section"
      style={{
        paddingTop: 40,
        paddingBottom: 40,
        background: "#fff",
        borderTop: "1px solid var(--border-color)",
        scrollMarginTop: "70px",
        minHeight: "clamp(500px, calc(100vh - 70px), 750px)",
      }}
    >
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 40,
            alignItems: "stretch",
          }}
        >
          <div
            className="contact-info-col"
            style={{
              paddingRight: 20,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--primary-green)",
                marginBottom: 12,
              }}
            >
              Get in Touch
            </span>
            <h2
              style={{
                color: "var(--navy)",
                marginBottom: 12,
                textAlign: "left",
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Talk to us about
              <br />
              <span style={{ color: "var(--primary-green)" }}>
                your Salesforce org.
              </span>
            </h2>
            <p
              style={{
                marginBottom: 16,
                textAlign: "left",
                fontSize: 14,
                color: "var(--text-secondary)",
              }}
            >
              Contact our team to schedule a demo, learn more about our
              products, or simply ask a question. We respond promptly.
            </p>
            <div className="contact-info-items" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "Address",
                  value: "2040 Martin Ave, Santa Clara, CA 95050",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.22a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2v3z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: (
                    <a
                      href="tel:+16697776838"
                      style={{
                        color: "var(--primary-green)",
                        textDecoration: "none",
                      }}
                    >
                      +1 (669) 777-6838
                    </a>
                  ),
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "Email",
                  value: (
                    <a
                      href="mailto:info@ardira.com"
                      style={{
                        color: "var(--primary-green)",
                        textDecoration: "none",
                      }}
                    >
                      info@ardira.com
                    </a>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 12, alignItems: "center" }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      color: "var(--primary-green)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-primary)" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 24,
                borderRadius: 12,
                overflow: "hidden",
                border: "1.5px solid var(--border-color)",
                flex: 1,
                minHeight: 180,
              }}
            >
              <iframe
                title="Ardira Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.8351573030383!2d-121.9442!3d37.3713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc996944e99f9%3A0x6a0c0a34b2f6b8b0!2s2040+Martin+Ave%2C+Santa+Clara%2C+CA+95050!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {submitted ? (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1.5px solid #bbf7d0",
                  borderRadius: 12,
                  padding: 32,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CheckCircle
                  size={48}
                  style={{ color: "var(--primary-green)", marginBottom: 16 }}
                />
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "var(--navy)",
                    marginBottom: 12,
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "#166534", lineHeight: 1.5 }}>
                  Thank you for getting in touch. One of our representatives
                  will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "var(--bg-light)",
                  border: "1.5px solid var(--border-color)",
                  borderRadius: 12,
                  padding: "24px 28px",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--navy)",
                      marginBottom: 4,
                    }}
                  >
                    Fill out the form and we'll be in touch shortly!
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      marginBottom: 16,
                    }}
                  >
                    Fields marked with{" "}
                    <span style={{ color: "#ef4444" }}>*</span> are mandatory.
                  </p>
                </div>

                <div
                  className="contact-form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Full Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        border: errors.name
                          ? "1.5px solid #ef4444"
                          : "1.5px solid var(--border-color)",
                      }}
                    />
                    {errors.name && (
                      <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 500, alignSelf: "flex-start" }}>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Email <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        border: errors.email
                          ? "1.5px solid #ef4444"
                          : "1.5px solid var(--border-color)",
                      }}
                    />
                    {errors.email && (
                      <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 500, alignSelf: "flex-start" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="contact-form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Phone <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="e.g., 1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        border: errors.phone
                          ? "1.5px solid #ef4444"
                          : "1.5px solid var(--border-color)",
                      }}
                    />
                    {errors.phone && (
                      <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 500, alignSelf: "flex-start" }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Company <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        ...inputStyle,
                        border: errors.company
                          ? "1.5px solid #ef4444"
                          : "1.5px solid var(--border-color)",
                      }}
                    />
                    {errors.company && (
                      <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 500, alignSelf: "flex-start" }}>
                        {errors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Product of Interest <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <Select
                    value={formData.product}
                    onValueChange={(val) => {
                      setFormData((prev) => ({ ...prev, product: val }));
                      if (errors.product) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.product;
                          return copy;
                        });
                      }
                    }}
                  >
                    <SelectTrigger
                      name="product"
                      onBlur={() => validateSequenceUpTo("product", formData)}
                      style={{
                        ...inputStyle,
                        height: 42,
                        border: errors.product
                          ? "1.5px solid #ef4444"
                          : "1.5px solid var(--border-color)",
                      }}
                    >
                      <SelectValue placeholder="Select a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surveyvista">SurveyVista</SelectItem>
                      <SelectItem value="formvista">FormVista</SelectItem>
                      <SelectItem value="compliancevista">
                        ComplianceVista
                      </SelectItem>
                      <SelectItem value="agentvista">AgentVista</SelectItem>
                      <SelectItem value="relationshipvista">
                        RelationshipVista
                      </SelectItem>
                      <SelectItem value="general">
                        All Products/General enquiry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.product && (
                    <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 500, alignSelf: "flex-start" }}>
                      {errors.product}
                    </span>
                  )}
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Message <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle,
                      resize: "none",
                      minHeight: 70,
                      border: errors.message
                        ? "1.5px solid #ef4444"
                        : "1.5px solid var(--border-color)",
                    }}
                  />
                  {errors.message && (
                    <span style={{ color: "#ef4444", fontSize: 11, fontWeight: 500, alignSelf: "flex-start" }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {submitError && (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "#dc2626",
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    padding: "12px",
                    fontSize: 15,
                    fontWeight: 700,
                    borderRadius: 10,
                    width: "100%",
                    background: isSubmitting
                      ? "#94a3b8"
                      : "var(--primary-green)",
                    color: "#fff",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    marginTop: 4,
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  We're committed to your{" "}
                  <Link
                    to="/privacy-policy"
                    style={{
                      color: "var(--primary-green)",
                      textDecoration: "none",
                    }}
                  >
                    privacy
                  </Link>
                  . We will never share your data with third parties.
                </p>
                <RecaptchaBadge />
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
