import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
const TrustedSection = lazy(() => import("../components/TrustedSection"));
const Products = lazy(() => import("../components/Products"));
const Stats = lazy(() => import("../components/Stats"));
const Features = lazy(() => import("../components/Features"));
const Contact = lazy(() => import("../components/Contact"));
import PageSeo from "../components/PageSeo";


function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle "Clean URL" navigation from location state
    if (location.state && location.state.scrollTo) {
      const hash = location.state.scrollTo;
      const element = document.getElementById(hash);
      if (element) {
        // Delay slightly to ensure components are rendered
        setTimeout(() => {
          const offset = 70;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }, 100);
      }
      // Clear the state to prevent scrolling on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <PageSeo
        title="Ardira | 100% Native Salesforce Applications"
        description="Ardira builds 100% Salesforce-native applications with no integrations, ensuring data security and native performance on the Salesforce platform."
        path="/"
        keywords="Salesforce native apps, Salesforce applications, SurveyVista, RelationshipVista, native Salesforce"
        ogImage="/ArdiraLogo.webp"
      />


      <Hero />
      <Suspense fallback={null}>
        <TrustedSection />
        <Products />
        <Stats />
        <Features />
        <Contact />
      </Suspense>
    </>
  );
}

export default Home;
