import { motion } from "framer-motion";
import { Users, Globe, Award, Zap } from "lucide-react";
import ContactCta from "@/components/ContactCta";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import ardiraTeam from "@assets/ArdiraTeam.webp";

import rajesh from "@assets/ArdiraMind/rajesh.webp";
import hitesh from "@assets/ArdiraMind/hitesh.webp";
import brijesh from "@assets/ArdiraMind/brijesh.webp";
import qRegan from "@assets/ArdiraMind/quinn.webp";
import reddy from "@assets/ArdiraMind/Reddy.webp";

import devAdvisor from "@assets/AdvisoryBoard/dev-advisor.webp";
import robertAdvisor from "@assets/AdvisoryBoard/robert.webp";
import davidAdvisor from "@assets/AdvisoryBoard/david.webp";

const values = [
  {
    icon: Zap,
    title: "Native First",
    desc: "We never build workarounds. Every product and solution lives entirely within the Salesforce platform — secure, scalable, and seamless.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    desc: "We treat every engagement as a long-term partnership. Your success is our success, and we stay with you through every phase.",
  },
  {
    icon: Award,
    title: "Engineering Excellence",
    desc: "Our engineers hold multiple Salesforce certifications and have shipped products through the rigorous AppExchange security review process.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    desc: "With offices in Santa Clara and India, we provide around-the-clock delivery and support across every time zone.",
  },
];

const team = [
  {
    name: "Rajesh Unadkat",
    title: "Founder and CEO",
    initials: "RU",
    image: rajesh,
  },
  {
    name: "Reddy Rachamallu",
    title: "Chief Architect",
    initials: "RR",
    image: reddy,
  },
  {
    name: "Hitesh Malkan",
    title: "General Manager - India Operations",
    initials: "HM",
    image: hitesh,
  },
  {
    name: "Brijesh Popat",
    title: "VP of Software Services",
    initials: "BP",
    image: brijesh,
  },
  {
    name: "Quinn Regan",
    title: "Senior Account Executive",
    initials: "QR",
    image: qRegan,
  },
];

const advisoryBoard = [
  {
    name: "Dev Ghoshal",
    title: "Advisory Team",
    image: devAdvisor,
    ringColor: "ring-emerald-400",
    shadowColor: "shadow-emerald-200",
  },
  {
    name: "Robert de Monts",
    title: "Advisory Team",
    image: robertAdvisor,
    ringColor: "ring-blue-400",
    shadowColor: "shadow-blue-200",
  },
  {
    name: "David Jackson",
    title: "Advisory Team",
    image: davidAdvisor,
    ringColor: "ring-cyan-400",
    shadowColor: "shadow-cyan-200",
  },
];

export default function About() {
  return (
    <div
      className="min-h-screen bg-white text-[#0f172a] font-sans"
      data-testid="page-about"
    >
      <SEO
        title="Ardira Team | Enterprise Salesforce Experts"
        description="Meet Ardira's leadership team with 50+ years of combined Salesforce expertise. Based in USA and India, we deliver enterprise-grade solutions."
        keywords="Salesforce team, enterprise architects, Salesforce consultants"
        ogTitle="Ardira Team - Salesforce Experts"
        ogDescription="Experienced leadership and advisory board dedicated to Salesforce innovation"
        ogUrl="https://ardira.com/team"
        ogImage="https://ardira.com/ArdiraLogo.webp"
        ogImageWidth="512"
        ogImageHeight="512"
        ogImageType="image/webp"
        ogLogo="https://ardira.com/ArdiraLogo.webp"
      />
      <StructuredData type="Organization" />

      {/* Hero */}
      <section className="responsive-section pt-20 pb-20 bg-linear-to-br from-[#f0fdf4] via-white to-[#ecfdf5] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(34,197,94,0.12),transparent)] pointer-events-none" />
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", position: "relative", zIndex: 10 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#43AF57] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6"
          >
            Our Team
          </motion.div>

          {/* Main Grid - Heading and Image aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Text Content - Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:text-left"
            >
              <h1 className="text-3xl md:text-4xl font-bold font-display text-[#0f172a] leading-tight mb-6">
                The People Behind <span className="text-[#43AF57]">Ardira</span>
              </h1>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal mb-4 text-justify">
                Our team has Salesforce Certified Developers & Administrators
                located in the US & India, working with you 24×7 and
                cost-effectively. We combine years of experience across
                information security, compliance & risk management, cloud
                computing, enterprise software, SaaS services, and large-scale
                software infrastructure.
              </p>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal text-justify">
                Behind Ardira's success is our dynamic and collaborative team of
                professionals. From talented developers and data analysts to
                creative designers and dedicated support staff, our diverse team
                brings a wealth of skills and expertise to the table. We thrive
                on innovation and teamwork, consistently pushing the boundaries
                of what's possible. Our shared passion for delivering
                unparalleled solutions and providing exceptional service defines
                our culture.
              </p>
            </motion.div>

            {/* Team Photo - Right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img loading="lazy"
                src={ardiraTeam}
                alt="The Ardira Team"
                className="w-full rounded-2xl shadow-lg border border-slate-100"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="responsive-section py-24 bg-[#f8fafc]">
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#43AF57] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display text-[#0f172a] leading-tight mb-6">
              Making Salesforce Work Harder for You
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Ardira was founded on a simple belief: Salesforce is the world's
              most powerful business platform, and most organizations are only
              scratching the surface of what it can do.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Our mission is to extend Salesforce with powerful, native products
              that help organizations collect better data, gain deeper insights,
              and act with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-sm transition-all"
                >
                  <div className="inline-flex p-2.5 rounded-xl bg-emerald-50 mb-4">
                    <v.icon size={20} className="text-[#43AF57]" />
                  </div>
                  <h3 className="font-bold text-[#0f172a] mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="responsive-section py-20">
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#43AF57] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display text-[#0f172a] mb-4">
              Our Executive Team
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              A team of Salesforce veterans, product builders, and customer
              success champions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-10 md:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                {member.image && (
                  <img loading="lazy"
                    src={member.image}
                    alt={member.name}
                    className={`w-50 h-54 object-cover rounded-lg mb-5 shadow-sm transition-all duration-300 group-hover:shadow-lg`}
                  />
                )}
                <h3 className="text-base font-extrabold font-display text-[#0f172a] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-[#43AF57]">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="responsive-section py-16 border-t border-slate-100">
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold font-display text-[#0f172a] mb-4">
              Our Advisory Board
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
              Guided by industry leaders and visionaries who bring decades of
              experience to shape our strategic direction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {advisoryBoard.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                <img loading="lazy"
                  src={member.image}
                  alt={member.name}
                  className={`w-50 h-54 object-cover rounded-lg mb-5 shadow-sm transition-all duration-300 group-hover:shadow-lg`}
                />
                <h3 className="text-lg md:text-xl font-semibold font-display text-[#0f172a] mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#43AF57]">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        headline="Want to work with our team?"
        description="Reach out and let's explore how Ardira can help your business grow on Salesforce."
        buttonText="Get in Touch"
        buttonLink="/#contact"
      />
    </div>
  );
}
