import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="notfound-page min-h-[75vh] flex flex-col items-center justify-center bg-white text-[#0f172a] font-sans relative overflow-hidden" style={{ paddingLeft: "48px", paddingRight: "48px" }}>
      <SEO
        title="404: Page Not Found | Ardira"
        description="The page you are looking for does not exist or has been moved. Return to the Ardira homepage to explore our Salesforce solutions."
        keywords="404, page not found, Ardira"
        ogTitle="404: Page Not Found - Ardira"
        ogDescription="The page you are looking for does not exist."
        ogUrl="https://ardira.com/404"
      />

      {/* Background glowing aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-xl mx-auto text-center relative z-10 py-16">
        {/* 404 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-7xl md:text-8xl font-extrabold font-display tracking-tight text-[#0f172a] mb-4">
            404
          </h1>
          <div className="h-1 w-20 bg-[#43AF57] mx-auto rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold font-display text-[#0f172a] mb-4">
            Page Not Found
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist. Let's get you back on track.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#43AF57] hover:bg-[#39964a] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Home size={18} />
            <span>Back to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 border border-slate-200"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
