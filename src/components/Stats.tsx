const GlobeIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const StarIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);
const PlugIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>);
const CubeIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);

const iconColors: Record<string, { bg: string; color: string }> = {
  blue: { bg: "#e8f0fe", color: "#1a73e8" },
  green: { bg: "#e6f4ea", color: "#1e8e3e" },
  yellow: { bg: "#fef7e0", color: "#f29900" },
  purple: { bg: "#f3e8fd", color: "#9333ea" },
};

const stats = [
  { number: "450", symbol: "+", label: "Organisations worldwide trust Ardira apps", icon: <GlobeIcon />, c: "blue" },
  { number: "5.0", symbol: "", label: "Rating on Salesforce AppExchange", icon: <StarIcon />, c: "green" },
  { number: "0", symbol: "", label: "Integrations required to get started", icon: <PlugIcon />, c: "yellow" },
  { number: "100", symbol: "%", label: "Native - your data never leaves Salesforce", icon: <CubeIcon />, c: "purple" },
];

function Stats() {
  return (
    <section className="responsive-section" style={{ width: "100%", paddingTop: 60, paddingBottom: 60, background: "#fff", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "auto" }}>
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, maxWidth: "var(--max-width)", width: "100%", margin: "0 auto" }}>
        {stats.map((s, i) => (
          <div 
            key={i} 
            className="stat-card" 
            style={{ 
              background: iconColors[s.c].bg,
              padding: "32px 20px",
              textAlign: "center",
              borderRadius: 16,
              border: `1px solid ${iconColors[s.c].bg}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.3s ease",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 4px 12px ${iconColors[s.c].color}12`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = iconColors[s.c].color;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${iconColors[s.c].color}20`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = iconColors[s.c].bg;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${iconColors[s.c].color}12`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div 
              style={{ 
                width: 56,
                height: 56,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                background: iconColors[s.c].bg,
                color: iconColors[s.c].color,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div 
              style={{ 
                fontSize: 40,
                fontWeight: 700,
                color: iconColors[s.c].color,
                lineHeight: 1,
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              {s.number}{s.symbol}
            </div>
            <div 
              style={{ 
                fontSize: 16,
                fontWeight: 500,
                color: "#64748b",
                lineHeight: 1.5,
                maxWidth: 150,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
