import { Link } from "react-router-dom";
import ArdiraFooterLogo from "@assets/ArdiraFooterLogo.webp";
import SalesForcePartnerLogo from "@assets/SalesForcePartnerLogo.webp";

function Footer() {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className="responsive-section"
      style={{
        background: "var(--navy)",
        color: "rgba(255,255,255,0.85)",
        paddingTop: 60,
        paddingBottom: 32,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto 48px",
          display: "grid",
          gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr",
          gap: 60,
        }}
      >
        <div className="footer-col" style={{ paddingRight: "40px" }}>
          <div style={{ marginBottom: 16 }}>
            <Link to="/" onClick={handleLinkClick}>
              <img
                src={ArdiraFooterLogo}
                alt="Ardira"
                style={{ height: 40, width: "auto", display: "block" }}
              />
            </Link>
          </div>{" "}
          <p
            style={{
              fontSize: 13.5,
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 20,
            }}
          >
            Building 100% Salesforce-native applications that turn your CRM into
            an intelligence and action engine. No integrations. No data leaving
            your org.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
              marginTop: 16,
            }}
          >
            <img
              src={SalesForcePartnerLogo}
              alt="Salesforce Partner"
              style={{ height: 40, width: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="footer-col">
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 18,
            }}
          >
            Products
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { name: "SurveyVista", key: "surveyvista" },
              { name: "FormVista", key: "formvista" },
              { name: "ComplianceVista", key: "compliancevista" },
              { name: "AgentVista", key: "agentvista" },
              { name: "RelationshipVista", key: "relationshipvista" },
            ].map((p) => (
              <li key={p.name} style={{ marginBottom: 12 }}>
                <Link
                  to={`/?product=${p.key}`}
                  state={{ scrollTo: "product" }}
                  className="footer-col"
                  style={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "var(--transition)",
                  }}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 18,
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { name: "About Us", link: "/team" },
              { name: "Join Us", link: "https://surveyvista.com/join-us/" },
              { name: "Partner Hub", link: "/partner-hub" },
            ].map((c) => (
              <li key={c.name} style={{ marginBottom: 12 }}>
                {c.link.startsWith("/") ? (
                  <Link
                    to={c.link}
                    onClick={handleLinkClick}
                    className="footer-col"
                    style={{
                      fontSize: 13.5,
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      transition: "var(--transition)",
                    }}
                  >
                    {c.name}
                  </Link>
                ) : (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-col"
                    style={{
                      fontSize: 13.5,
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      transition: "var(--transition)",
                    }}
                  >
                    {c.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col contact-col">
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 18,
            }}
          >
            Contact Info
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginTop: 2, flexShrink: 0 }}
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div
                style={{
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  textAlign: "left",
                }}
              >
                2040 Martin Ave
                <br />
                Santa Clara, CA 95050
                <br />
                United States
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <a
                href="mailto:info@ardira.com"
                style={{
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "var(--transition)",
                }}
              >
                info@ardira.com
              </a>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a
                href="tel:+16697776838"
                style={{
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "var(--transition)",
                }}
              >
                1.669.777.6838
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer-bottom-col"
        style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap" as const,
          gap: 12,
        }}
      >
        <p
          style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", margin: 0 }}
        >
          &copy; {new Date().getFullYear()} Ardira Corporation. All rights reserved. Salesforce and
          AppExchange are trademarks of Salesforce, Inc.
        </p>
        <div
          className="footer-links footer-links-col"
          style={{ display: "flex", gap: 24 }}
        >
          <Link
            to="/privacy-policy"
            onClick={handleLinkClick}
            style={{
              fontSize: 12.5,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "var(--transition)",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-use"
            onClick={handleLinkClick}
            style={{
              fontSize: 12.5,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "var(--transition)",
            }}
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
