const imageModules = import.meta.glob<{ default: string }>(
  "/src/assets/TrustedEnterprise/*.{png,jpg,jpeg,webp,svg}",
  { eager: true },
);

const allPartners = Object.values(imageModules).map((mod) => mod.default);
const partners = Array.from(new Set(allPartners)); // Remove duplicates

function TrustedSection() {
  return (
    <section
      className="trusted-section-outer"
      style={{
        padding: "56px 48px",
        background: "var(--bg-light)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <p
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          color: "var(--primary-green)",
          marginBottom: 36,
        }}
      >
        Trusted by leading organizations
      </p>
      <div
        className="logos-container"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[var(--bg-light)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[var(--bg-light)] to-transparent z-10 pointer-events-none" />
        <div
          className="logo-track flex items-center animate-marquee py-2 w-max"
          style={{ animationDuration: "140s" }}
        >
          {[...partners, ...partners, ...partners, ...partners].map(
            (logo, idx) => (
              <div
                key={idx}
                className="logo-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 40px",
                  flexShrink: 0,
                  height: "64px",
                }}
              >
                <img
                  src={logo}
                  alt={`Trusted Enterprise ${idx}`}
                  loading="lazy"
                  style={{
                    maxHeight: "100%",
                    maxWidth: 140,
                    objectFit: "contain",
                  }}
                />
              </div>
            ),
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

export default TrustedSection;
