import { useState, useEffect, memo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArdiraLogo from "@assets/ArdiraLogo.webp";
import { Menu, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.includes("#")) {
      e.preventDefault();
      const hash = href.split("#")[1];
      const targetPath = href.split("#")[0] || "/";

      if (
        location.pathname === targetPath ||
        (location.pathname === "/" && targetPath === "/")
      ) {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 70;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
      } else {
        // Navigate cleanly to the target path without a hash in the URL string
        navigate(targetPath, { state: { scrollTo: hash } });
      }
    } else {
      window.scrollTo(0, 0);
    }
    setIsMenuOpen(false);
  }, [location.pathname, navigate]);

  return (
    <>
      <nav
        className="responsive-nav"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          height: 70,
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" onClick={handleLinkClick} aria-label="Ardira Home">
            <img src={ArdiraLogo} alt="Ardira Logo" className="nav-logo" width={224} height={164} decoding="async" />
          </Link>
          <ul className="nav-menu">
            <li className="nav-hide-mobile">
              <Link
                to="/#products"
                onClick={handleLinkClick}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
              >
                Products
              </Link>
            </li>
            <li className="nav-hide-mobile">
              <Link
                to="/#why-native"
                onClick={handleLinkClick}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
              >
                Why Native
              </Link>
            </li>
            <li className="nav-hide-mobile">
              <Link
                to="/team"
                onClick={handleLinkClick}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
              >
                Company
              </Link>
            </li>
            <li className="nav-hide-mobile">
              <Link
                to="/partner-hub"
                onClick={handleLinkClick}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
              >
                Partner Hub
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className="btn-demo"
                onClick={handleLinkClick}
              >
                Book Demo
              </Link>
            </li>
            <li className="hamburger-btn">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "var(--navy)",
                }}
              >
                {isMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay open"
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <Link
            to="/#products"
            className="mobile-nav-link"
            onClick={handleLinkClick}
          >
            Products
          </Link>
          <Link
            to="/#why-native"
            className="mobile-nav-link"
            onClick={handleLinkClick}
          >
            Why Native
          </Link>
          <Link
            to="/team"
            className="mobile-nav-link"
            onClick={handleLinkClick}
          >
            Company
          </Link>
          <Link
            to="/partner-hub"
            className="mobile-nav-link"
            onClick={handleLinkClick}
          >
            Partner Hub
          </Link>
          <Link
            to="/#contact"
            className="mobile-nav-link"
            onClick={handleLinkClick}
            style={{ color: "var(--primary-green)" }}
          >
            Book Demo
          </Link>
        </div>
      )}
    </>
  );
}

export default memo(Navbar);
