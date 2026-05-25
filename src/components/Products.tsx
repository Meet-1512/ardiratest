import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import svImageLogo from "@assets/ProductLogo/SurveyVistaLogo.webp";
import fvImageLogo from "@assets/ProductLogo/FormVistaLogo.webp";
import cvImageLogo from "@assets/ProductLogo/ComplainceVistaLogo.webp";
import avImageLogo from "@assets/ProductLogo/AgentVistaLogo.webp";
import rvImageLogo from "@assets/ProductLogo/RelationshipVistaLogo.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import svLogo from "@assets/ProductsIcon/SVLogo.webp";
import fvLogo from "@assets/ProductsIcon/FVLogo.webp";
import cvLogo from "@assets/ProductsIcon/CVLogo.webp";
import avLogo from "@assets/ProductsIcon/AVLogo.webp";
import rvLogo from "@assets/ProductsIcon/RVLogo.webp";

type ProductKey =
  | "surveyvista"
  | "formvista"
  | "compliancevista"
  | "agentvista"
  | "relationshipvista";

const products: Record<
  ProductKey,
  {
    title: string;
    description: string;
    image: string;
    features: string[];
    link: string;
  }
> = {
  surveyvista: {
    title:
      "Turn every customer experience signal into results – inside Salesforce.",
    description:
      "The 100% Salesforce-native Customer Intelligence & Action Platform. Every response writes directly to your CRM — AI triggers automated workflows instantly, preventing churn and surfacing revenue.",
    image: svImageLogo,
    features: [
      "Surveys, forms & assessments unified",
      "AI churn detection & intervention",
      "Workflows fire on response receipt",
      "Enriches Salesforce records instantly",
      "5-star rated on AppExchange",
      "Trusted by 450+ organizations",
    ],
    link: "https://surveyvista.com/",
  },
  formvista: {
    title: "Endless Applications: The best data collection solution you need.",
    description:
      "Native Salesforce business forms that write data directly into your CRM — no third-party tools, no integration overhead, no data leaving your org. Beautiful,branded forms connected to any Salesforce object.",
    image: fvImageLogo,
    features: [
      "Writes to any Salesforce object",
      "Branded, mobile-responsive design",
      "Conditional logic & smart branching",
      "Pre-fill from Salesforce record data",
      "Workflow triggers on submission",
      "Zero integration tax",
    ],
    link: "https://surveyvista.com/products/form-vista-business-forms/",
  },
  compliancevista: {
    title:
      "Automate assessments, reduce risk, and ensure compliance inside Salesforce.",
    description:
      "Native Salesforce assessments, risk scoring, and compliance workflows. Signals detected in real-time — alerts fire instantly, evidence preserved automatically, regulators never catch you unprepared.",
    image: cvImageLogo,
    features: [
      "Real-time compliance risk detection",
      "Automated evidence preservation",
      "Regulatory response workflows",
      "Complete audit trail in one system",
      "Risk scoring with full CRM context",
      "Inherits Salesforce security",
    ],
    link: "https://compliancevista.com",
  },
  agentvista: {
    title: "AI-Powered Feedback Automation with SurveyVista & Agentforce.",
    description:
      "Deploy intelligent AI agents that operate natively within Salesforce — with full CRM context, executing automated actions, delivering results without ever leaving your secure org environment.",
    image: avImageLogo,
    features: [
      "AI agents with full CRM context",
      "Executes actions directly in Salesforce",
      "No external AI data exposure",
      "Agentforce native integration",
      "Automated multi-step workflows",
      "Inherits your org's security model",
    ],
    link: "https://agentsvista.com",
  },
  relationshipvista: {
    title: "Uncover and Analyze Your Salesforce records relationships.",
    description:
      "Visualize, analyze and navigate complex Salesforce account relationships and hierarchies — natively. See parent-child structures and account networks without ever leaving your CRM.",
    image: rvImageLogo,
    features: [
      "Interactive hierarchy visualization",
      "Any Salesforce object or relationship",
      "Click-through to records in context",
      "Configurable depth & display options",
      "No external tools or exports needed",
      "Works with all Salesforce editions",
    ],
    link: "https://relationshipvista.com",
  },
};

const productMeta: Record<
  ProductKey,
  { name: string; subtitle: string; icon: string }
> = {
  surveyvista: {
    name: "SurveyVista",
    subtitle: "Intelligence & Action",
    icon: svLogo,
  },
  formvista: { name: "FormVista", subtitle: "Native Forms", icon: fvLogo },
  compliancevista: {
    name: "ComplianceVista",
    subtitle: "Risk & Compliance",
    icon: cvLogo,
  },
  agentvista: {
    name: "AgentVista",
    subtitle: "AI-Powered Agents",
    icon: avLogo,
  },
  relationshipvista: {
    name: "RelationshipVista",
    subtitle: "Account Hierarchies",
    icon: rvLogo,
  },
};

const productKeys = Object.keys(products) as ProductKey[];

function Products() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ProductKey>("surveyvista");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productParam = params.get("product") as ProductKey | null;
    if (productParam && productKeys.includes(productParam)) {
      setActiveTab(productParam);
      const trigger = document.getElementById("product");
      if (trigger) {
        trigger.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.search]);

  const handleTab = (key: ProductKey) => {
    setActiveTab(key);
  };

  const handleNext = () => {
    const currentIndex = productKeys.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % productKeys.length;
    setActiveTab(productKeys[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = productKeys.indexOf(activeTab);
    const prevIndex =
      (currentIndex - 1 + productKeys.length) % productKeys.length;
    setActiveTab(productKeys[prevIndex]);
  };

  return (
    <section
      id="product"
      className="responsive-section"
      style={{
        paddingTop: 40,
        paddingBottom: 50,
        background: "linear-gradient(to bottom, #fff, #f8fdf9)",
        scrollMarginTop: "70px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Compact Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 800,
            margin: "0 auto 24px",
            animation: "fadeIn 0.8s ease",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--primary-green)",
              marginBottom: 12,
            }}
          >
            Our Products
          </span>
          <h2
            className="section-heading-lg"
            style={{
              color: "var(--navy)",
              marginBottom: 12,
              fontSize: "clamp(28px, 6vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            One suite. Five{" "}
            <span style={{ color: "var(--primary-green)" }}>native</span> apps.
          </h2>
          <p
            style={{
              maxWidth: 700,
              margin: "0 auto",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            Every Ardira product is built entirely on the Salesforce platform —
            no middleware, no integrations, no data leaving your org.
          </p>
        </div>

        <div className="sticky-scroll-wrapper" style={{ position: "relative" }}>
          <div
            className="sticky-content-container"
            style={{
              zIndex: 10,
            }}
          >
            <div
              className="product-tabs-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "250px 1fr",
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid var(--border-color)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                overflow: "hidden",
                position: "relative",
                height: 420,
              }}
            >
              {/* Mobile Product Navigation Header (Arrows + Active Product) */}
              <div
                className="mobile-only"
                style={{
                  display: "none", // Controlled by CSS but adding inline for safety
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 16px",
                  height: 80,
                  background: "var(--bg-light)",
                  borderBottom: "1px solid var(--border-color)",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <button
                  onClick={handlePrev}
                  className="carousel-nav-btn-inline"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border-color)",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--primary-green)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    flexShrink: 0,
                  }}
                >
                  <ChevronLeft size={22} />
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, justifyContent: "center", minWidth: 0 }}>
                  <img
                    src={productMeta[activeTab].icon}
                    alt={productMeta[activeTab].name}
                    style={{ width: 38, height: 38, objectFit: "contain", flexShrink: 0 }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--navy)",
                        lineHeight: 1.2,
                        whiteSpace: "normal",
                      }}
                    >
                      {productMeta[activeTab].name}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginTop: 2,
                        lineHeight: 1.2,
                        whiteSpace: "normal",
                      }}
                    >
                      {productMeta[activeTab].subtitle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="carousel-nav-btn-inline"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border-color)",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--primary-green)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    flexShrink: 0,
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Sidebar (Desktop Only) */}
              <div
                className="desktop-sidebar"
                style={{
                  background: "var(--bg-light)",
                  display: "flex",
                  flexDirection: "column",
                  borderRight: "1px solid var(--border-color)",
                }}
              >
                {productKeys.map((key) => (
                  <button
                    key={key}
                    className={`tab-btn${activeTab === key ? " active" : ""}`}
                    onClick={() => handleTab(key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "16px 20px",
                      background: activeTab === key ? "#fff" : "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--border-color)",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      textAlign: "left",
                      position: "relative",
                      flex: 1,
                    }}
                  >
                    {activeTab === key && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 4,
                          background: "var(--primary-green)",
                        }}
                      />
                    )}
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <img
                        src={productMeta[key].icon}
                        alt={productMeta[key].name}
                        style={{ width: 32, height: 32, objectFit: "contain" }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--navy)",
                          }}
                        >
                          {productMeta[key].name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--text-muted)",
                            marginTop: 2,
                          }}
                        >
                          {productMeta[key].subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div
                className="product-content-area"
                style={{
                  padding: "30px 40px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  key={activeTab}
                  style={{ animation: "fadeIn 0.4s ease", flex: 1 }}
                >
                  <img
                    src={products[activeTab].image}
                    alt={productMeta[activeTab].name}
                    style={{
                      height: activeTab === "relationshipvista" ? 65 : 40,
                      marginBottom: 16,
                      objectFit: "contain",
                    }}
                  />
                  <div
                    className="product-content-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr",
                      gap: 30,
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--navy)",
                          marginBottom: 12,
                          lineHeight: 1.3,
                        }}
                      >
                        {products[activeTab].title}
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                          marginBottom: 20,
                        }}
                      >
                        {products[activeTab].description}
                      </p>
                      <a
                        href={products[activeTab].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary desktop-visit-btn"
                        style={{
                          display: "inline-flex",
                          padding: "10px 20px",
                          fontSize: 14,
                          borderRadius: 8,
                          background: "var(--primary-green)",
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: 600,
                          marginTop: 8,
                        }}
                      >
                        Visit {productMeta[activeTab].name} →
                      </a>
                    </div>
                    <div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {products[activeTab].features.map((f, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              gap: 10,
                              fontSize: 13,
                              color: "var(--text-secondary)",
                              marginBottom: 10,
                            }}
                          >
                            <span
                              style={{
                                color: "var(--primary-green)",
                                fontWeight: "bold",
                              }}
                            >
                              ✓
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Actions Row (Visit Button + Native Badge) */}
                <div
                  className="product-actions-row"
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 16,
                    paddingTop: 20,
                  }}
                >
                  <a
                    href={products[activeTab].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mobile-visit-btn"
                    style={{
                      display: "none", // Controlled by CSS
                      padding: "10px 20px",
                      fontSize: 14,
                      borderRadius: 8,
                      background: "var(--primary-green)",
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 600,
                      flex: 1,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    Visit {productMeta[activeTab].name} →
                  </a>
                  <div
                    className="native-badge"
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      background: "#f0fdf4",
                      color: "var(--primary-green)",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "currentColor",
                      }}
                    />
                    100% Native
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
