import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PartnerHub from "./pages/PartnerHub";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

let isInitialAppLoad = true;

function ScrollToTop() {
  const { pathname, hash, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isReload = false;
    if (isInitialAppLoad && typeof window !== "undefined" && window.performance) {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === "reload";
      } else {
        isReload = window.performance.navigation.type === 1;
      }
    }

    const wasReload = isReload && isInitialAppLoad;
    isInitialAppLoad = false;

    if (wasReload) {
      window.scrollTo(0, 0);
      return;
    }

    const customState = state as { scrollTo?: string } | null;
    if (customState?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(customState.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (hash) {
      // If there's a hash, find the element and scroll to it
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state, navigate]);

  return null;
}

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ width: "100%", margin: 0, background: "#fff", minHeight: "100vh", position: "relative" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfService />} />
          <Route path="/partner-hub" element={<PartnerHub />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
