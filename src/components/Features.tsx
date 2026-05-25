const features = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    title: (
      <>
        No Sync Delays.
        <br />
        No stale intelligence.
      </>
    ),
    description:
      "When feedback lives outside Salesforce, you're acting on yesterday's data. Native means every response writes instantly to your records — intelligence available the moment it's submitted.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Your Data Never Leaves Salesforce.",
    description:
      "Every integration is an attack surface. Ardira apps inherit Salesforce's security, SOC 2, ISO 27001, and GDPR compliance — because your feedback IS your CRM data.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    title: "Eliminate the Integration Tax.",
    description:
      "You're paying three times for non-native tools: license, integration project, and forever in maintenance. Conservative estimate: $12,000–$24,000 per year per integration.",
  },
];

const nonNative = [
  {
    title: "Data syncs in batches",
    subtitle:
      "By the time feedback reaches Salesforce, the moment to act has passed.",
  },
  {
    title: "Integration projects",
    subtitle:
      "Months of scoping and building — followed by permanent maintenance overhead.",
  },
  {
    title: "Expanded security surface",
    subtitle:
      "Every API connection is a new vulnerability and breach notification process.",
  },
  {
    title: "Fragmented intelligence",
    subtitle: "Scattered data means blind AI predictions — and missed revenue.",
  },
];
const native = [
  {
    title: "Instant data availability",
    subtitle:
      "Responses write directly to Salesforce records. Workflows fire in seconds, not hours.",
  },
  {
    title: "Install from AppExchange",
    subtitle:
      "Deploy in hours, not months. Configure with tools your team already knows.",
  },
  {
    title: "Salesforce security inherited",
    subtitle:
      "SOC 2, ISO 27001, GDPR compliance included. No additional vendor audits.",
  },
  {
    title: "Complete intelligence",
    subtitle:
      "AI sees feedback, revenue, usage, and support data together — predicting outcomes with confidence.",
  },
];

function Features() {
  return (
    <section
      id="why-native"
      className="responsive-section"
      style={{
        paddingTop: 40,
        paddingBottom: 40,
        background: "var(--bg-light)",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        scrollMarginTop: "70px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "var(--primary-green)",
            marginBottom: 16,
          }}
        >
          Why Native Matters
        </span>
        <h2
          className="section-heading-lg"
          style={{
            fontSize: "clamp(28px, 6vw, 52px)",
            fontWeight: 800,
            color: "var(--navy)",
            marginBottom: 20,
            lineHeight: 1.2,
            fontFamily: "var(--font-display, sans-serif)",
          }}
        >
          The best integration
          <br />
          is{" "}
          <span style={{ color: "var(--primary-green)" }}>no integration.</span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#64748b",
            lineHeight: 1.7,
            margin: "0 auto 60px",
            maxWidth: 700,
          }}
        >
          Every non-native tool in your Salesforce stack is a confession that
          your customer intelligence lives in exile — separate from where your
          team actually works.
        </p>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "0 auto",
        }}
      >
        <div
          className="features-grid-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 0,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 16,
                border: "1.5px solid var(--border-color)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                textAlign: "center",
                cursor: "default",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(-8px)";
                card.style.boxShadow = "0 16px 32px rgba(0,0,0,0.12)";
                card.style.borderColor = "var(--primary-green)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
                card.style.borderColor = "var(--border-color)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  margin: "0 auto 20px",
                  padding: 12,
                  background: "var(--primary-green-light)",
                  borderRadius: 12,
                  border: "1.5px solid var(--primary-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-green)",
                  transition: "all 0.3s ease",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "var(--navy)",
                  marginBottom: 12,
                  transition: "color 0.3s ease",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "60px auto 0",
        }}
      >
        <div
          className="comparison-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            border: "1.5px solid var(--border-color)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "36px 32px",
              borderRight: "1.5px solid var(--border-color)",
            }}
          >
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              Non-Native Tools
            </h4>
            {nonNative.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom:
                    i < nonNative.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#dc2626",
                    width: 20,
                    textAlign: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  ✕
                </span>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--navy)",
                      marginBottom: 4,
                    }}
                  >
                    {t.title}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                    {t.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="native-col"
            style={{
              background:
                "linear-gradient(160deg, var(--primary-green-light) 0%, rgba(255,255,255,0) 60%)",
              padding: "36px 32px",
              borderLeft: "3px solid var(--primary-green)",
            }}
          >
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border-color)",
                color: "var(--primary-green-dark)",
              }}
            >
              Ardira Native Apps
            </h4>
            {native.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom:
                    i < native.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--primary-green)",
                    width: 20,
                    textAlign: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  ✓
                </span>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--primary-green-dark)",
                      marginBottom: 4,
                    }}
                  >
                    {t.title}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                    {t.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
