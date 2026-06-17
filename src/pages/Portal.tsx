import { Link } from 'react-router-dom';
import { Shield, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/shared/SEO';

export default function Portal() {
  // Container stagger animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Item entry slide & fade animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 20, stiffness: 100 }
    }
  };

  return (
    <>
      <SEO
        title="K-TECH DYNAMIC LTD - Offshore Marine & Vessel Services"
        description="Portal gateway for K-TECH DYNAMIC LTD. Offshore oil & gas logistics services, vessel chartering, sales, and maritime operations in Nigeria."
      />

      <div 
        className="min-h-screen flex flex-col justify-between items-center py-16 px-6 text-center select-none font-sans relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/page.jpeg')" }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-primary-navy/85 backdrop-blur-[1px] pointer-events-none" />

        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-orange-cta/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Spacer */}
        <div className="w-full max-w-lg z-10" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl flex flex-col items-center z-10"
        >
          {/* Central Logo & Brand Header */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 my-8">
            {/* Logo Group */}
            <div className="flex items-center gap-5 text-left bg-slate-900/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
              <img
                src="/logo.png"
                alt="K-TECH DYNAMIC Logo"
                className="h-16 sm:h-20 w-auto object-contain bg-white rounded-xl p-2.5 shadow-lg shadow-teal-500/10"
              />
              <div className="flex flex-col font-headings text-white tracking-wider leading-none">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.1em]">K-TECH</span>
                <span className="text-xl sm:text-2xl font-bold text-teal-accent tracking-[0.05em] mt-1">DYNAMIC</span>
                <span className="text-lg sm:text-xl font-semibold text-slate-300 tracking-[0.15em] mt-1">SERVICES</span>
              </div>
            </div>
            <div className="w-20 h-[3px] bg-teal-accent rounded-full mt-2" />
          </motion.div>

          {/* Portal Entries Block */}
          <div className="w-full max-w-md flex flex-col gap-12 my-6">
            
            {/* Section 1: Offshore Oil and Gas Services */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 group">
              <h2 className="text-white font-headings font-bold text-lg sm:text-xl tracking-[0.1em] uppercase transition-colors group-hover:text-teal-accent">
                OFFSHORE OIL AND GAS SERVICES
              </h2>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed -mt-2">
                Integrated marine logistics, fuel supply, barge operations, and offshore support.
              </p>
              <Link
                to="/home"
                className="w-full max-w-[280px] py-4 bg-ocean-blue hover:bg-[#004b7c] text-white font-sans text-sm font-bold tracking-[0.2em] rounded-lg shadow-lg hover:shadow-ocean-blue/30 transition-all duration-200 flex items-center justify-center transform hover:-translate-y-0.5"
              >
                ENTER
              </Link>
            </motion.div>

            {/* Section 2: Marine Vessels Sales and Charter */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 group">
              <h2 className="text-white font-headings font-bold text-lg sm:text-xl tracking-[0.1em] uppercase transition-colors group-hover:text-teal-accent">
                MARINE VESSELS SALES AND CHARTER
              </h2>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed -mt-2">
                Browse our fleet roster of AHTS vessels, security patrol craft, and tugboats.
              </p>
              <Link
                to="/fleet"
                className="w-full max-w-[280px] py-4 bg-ocean-blue hover:bg-[#004b7c] text-white font-sans text-sm font-bold tracking-[0.2em] rounded-lg shadow-lg hover:shadow-ocean-blue/30 transition-all duration-200 flex items-center justify-center transform hover:-translate-y-0.5"
              >
                ENTER
              </Link>
            </motion.div>

          </div>

          {/* Concentric Circle Member Contractor Badge (ISN-style mockup) */}
          <motion.div variants={itemVariants} className="flex justify-center my-8">
            <svg 
              className="w-24 h-24 text-orange-cta drop-shadow-[0_0_8px_rgba(249,115,22,0.15)] hover:scale-105 transition-transform duration-300" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="44" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="39" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="50,28 69,39 69,61 50,72 31,61 31,39" fill="currentColor" fillOpacity="0.1" strokeWidth="1.8" />
              <text x="50" y="51" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">K-TECH</text>
              <text x="50" y="61" textAnchor="middle" fill="var(--color-orange-cta)" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">CONTRACTOR</text>
            </svg>
          </motion.div>

          {/* Group Corporate Reference */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-1.5 my-6">
            <div className="font-headings text-white tracking-[0.15em] text-xl font-extrabold flex items-center gap-1.5 justify-center">
              <span className="text-slate-400 font-light">K-TECH</span>
              <span>GROUP</span>
            </div>
            <span className="text-orange-cta uppercase tracking-widest text-[10px] font-bold font-sans">
              A Family Alliance Group of Companies
            </span>
          </motion.div>

          {/* Subsidiary Affiliation Disclaimer */}
          <motion.p 
            variants={itemVariants} 
            className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed my-4 font-sans px-4"
          >
            K-TECH DYNAMIC LTD is an affiliated and subsidiary company of K-TECH GROUP.
          </motion.p>

          {/* Bottom Holdings Corporate Logo */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-3 justify-center opacity-85 hover:opacity-100 transition-opacity my-6"
          >
            <img
              src="/logo.png"
              alt="K-TECH DYNAMIC Logo"
              className="h-10 w-auto object-contain bg-white rounded p-1.5 shadow"
            />
            <div className="text-left leading-none font-headings text-white">
              <div className="text-xs font-bold tracking-widest uppercase">K-TECH DYNAMIC</div>
              <div className="text-[10px] text-slate-450 tracking-wider font-semibold uppercase mt-0.5">SERVICES HOLDINGS</div>
            </div>
          </motion.div>

        </motion.div>

        {/* Global Compliance Badges & Country Selector */}
        <div className="w-full max-w-5xl z-10 flex flex-col lg:flex-row items-center justify-between gap-8 mt-12 border-t border-white/5 pt-8 text-xs text-slate-500">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-5">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Shield className="w-4 h-4 text-orange-cta" />
              <span className="font-semibold text-slate-300 text-[9px] uppercase tracking-wider">NIMASA Registered</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Award className="w-4 h-4 text-teal-accent" />
              <span className="font-semibold text-slate-300 text-[9px] uppercase tracking-wider">100% Local Content</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-300 text-[9px] uppercase tracking-wider">ISO 9001:2015 Compliant</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3 bg-white/5 px-3 py-2 border border-white/5 rounded-lg text-slate-300 font-semibold cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-1.5">
              <svg className="w-5 h-3.5 rounded-sm object-cover" viewBox="0 0 60 30" fill="none">
                <clipPath id="s">
                  <path d="M0 0h60v30H0z"/>
                </clipPath>
                <g clipPath="url(#s)">
                  <path d="M0 0h60v30H0z" fill="#012169"/>
                  <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
              <span className="text-[10px] uppercase tracking-wider">EN</span>
            </div>
            <svg className="w-3.5 h-3.5 text-slate-450" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

      </div>
    </>
  );
}
