import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface ContactCtaProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function ContactCta({
  headline = "Ready to Transform Your Salesforce?",
  description = "Talk to our team and discover how Ardira's 100% native Salesforce applications can unlock new value in your org.",
  buttonText = "Get a Free Consultation",
  buttonLink = "/contact",
}: ContactCtaProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    if (!buttonLink) return;

    // Handle hash links (e.g., "/#contact" or "#contact")
    if (buttonLink.includes("#")) {
      e.preventDefault();
      const [path, hash] = buttonLink.split("#");
      const targetPath = path || pathname;
      
      // If target path is the current page, use smooth scroll; otherwise navigate
      if (targetPath === pathname) {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 70;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
      } else {
        // Clean URL navigation via state
        navigate(targetPath, { state: { scrollTo: hash } });
      }
    }
  };
  return (
    <section className="responsive-section py-28 relative overflow-hidden">
      {/* Background with reversed hero gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f0fdf4]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_110%,rgba(34,197,94,0.12),transparent)] pointer-events-none" />

      {/* Animated background orbs (pushed to bottom) */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-emerald-600" /> Let's Talk
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-display text-[#0f172a] leading-tight mb-6">
            {headline}
          </h2>
          <p className="text-slate-500 text-base md:text-lg mb-12 leading-relaxed max-w-2xl mx-auto font-normal">
            {description}
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-block"
          >
            {buttonLink?.startsWith("#") || buttonLink?.includes("#") ? (
              <a
                href={buttonLink}
                onClick={handleButtonClick}
                className="inline-flex items-center gap-3 bg-[#43AF57] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-[#15803d] transition-all shadow-md group"
              >
                {buttonText}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </a>
            ) : (
              <Link
                to={buttonLink}
                className="inline-flex items-center gap-3 bg-[#43AF57] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-[#15803d] transition-all shadow-md group"
              >
                {buttonText}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
