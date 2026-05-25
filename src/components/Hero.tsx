import { Link, useLocation, useNavigate } from "react-router-dom";
import AppExchangeImg from "@assets/AppExchange.webp";

function Hero() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.includes("#")) {
      e.preventDefault();
      const hash = href.split("#")[1];
      const targetPath = href.split("#")[0] || "/";

      if (location.pathname === targetPath || (location.pathname === "/" && targetPath === "/")) {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 70;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
      } else {
        // Navigate cleanly to the target path
        navigate(targetPath, { state: { scrollTo: hash } });
      }
    }
  };

  return (
    <section
      className="responsive-section hero-section"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: 60,
        paddingBottom: 60,
        background: "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
        textAlign: "center",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(34,197,94,0.12), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1000,
          width: "100%",
        }}
      >
        <div
          className="hero-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "var(--primary-green)",
            border: "none",
            background: "rgba(57,180,74,0.1)",
            padding: "10px 20px",
            borderRadius: 20,
            marginBottom: 24,
            animation: "fadeInDown 0.8s ease",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--primary-green)",
              animation: "pulse 2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          100% Salesforce-Native Applications
        </div>
        <h1
          className="hero-heading"
          style={{
            margin: "16px 0 16px 0",
            color: "var(--navy)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.3,
            animation: "fadeInDown 0.8s ease 0.1s backwards",
            letterSpacing: "-0.02em",
          }}
        >
          Your Salesforce org
          <br />
          is only as powerful as
          <br />
          what's <span style={{ color: "var(--primary-green)" }}>
            native
          </span>{" "}
          to it.
        </h1>
        <p
          className="hero-paragraph"
          style={{
            fontSize: 16,
            margin: "16px auto 32px",
            maxWidth: 700,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            animation: "fadeInDown 0.8s ease 0.2s backwards",
            fontWeight: 400,
          }}
        >
          Ardira builds applications that live entirely inside Salesforce — no
          integrations to maintain, no data leaving your org, no hidden costs.
          Intelligence and action, where your team already works.
        </p>
        <div
          className="hero-buttons-col"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginBottom: 40,
            flexWrap: "wrap" as const,
            animation: "fadeInDown 0.8s ease 0.3s backwards",
          }}
        >
          <Link
            to="/#product"
            className="btn"
            onClick={handleLinkClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 16,
              fontWeight: 700,
              padding: "14px 40px",
              borderRadius: 12,
              background: "var(--primary-green)",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(57,180,74,0.3)",
              border: "none",
              textDecoration: "none",
              transition: "var(--transition)",
              cursor: "pointer",
            }}
          >
            Explore our products →
          </Link>
          <Link
            to="/#why-native"
            className="btn"
            onClick={handleLinkClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 16,
              fontWeight: 600,
              padding: "14px 40px",
              borderRadius: 12,
              background: "#fff",
              color: "var(--navy)",
              border: "2px solid var(--border-color)",
              textDecoration: "none",
              transition: "var(--transition)",
              cursor: "pointer",
            }}
          >
            Why native matters
          </Link>
        </div>
        <div
          className="trust-indicators-col"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap" as const,
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L10 5.5L15 6.2L11.5 9.6L12.4 14.5L8 12.2L3.6 14.5L4.5 9.6L1 6.2L6 5.5Z"
                fill="var(--primary-green)"
              />
            </svg>
            <span style={{ fontSize: 15 }}>5-star AppExchange rating</span>
          </div>
          <div
            className="trust-sep"
            style={{ width: 1, height: 32, background: "var(--border-color)" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6.5"
                stroke="var(--primary-blue)"
                strokeWidth="1.5"
              />
              <path
                d="M5 8l2 2 4-4"
                stroke="var(--primary-blue)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ fontSize: 15 }}>450+ organizations worldwide</span>
          </div>
          <div
            className="trust-sep"
            style={{ width: 1, height: 32, background: "var(--border-color)" }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={AppExchangeImg}
              alt="AppExchange"
              style={{ height: 40, width: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
