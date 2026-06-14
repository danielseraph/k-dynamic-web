import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Clock,
  Globe,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  FileCheck
} from 'lucide-react';
import SEO from '../components/shared/SEO';
import AnimatedCounter from '../components/shared/AnimatedCounter';
import ServiceIcon from '../components/shared/ServiceIcon';
import BrochureButton from '../components/shared/BrochureButton';
import { servicesData } from '../data/services';
import { vesselsData } from '../data/vessels';
import { testimonialsData } from '../data/testimonials';
import { industriesData } from '../data/industries';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [vesselIndex, setVesselIndex] = useState(0);

  // Trust Indicators Data
  const trustIndicators = [
    { title: 'NIMASA Compliance', desc: 'Fully licensed and registered for cabotage trading and marine operations.', icon: FileCheck },
    { title: 'Safety First Culture', desc: 'Operating with strict HSE regulations achieving zero LTI targets.', icon: Shield },
    { title: '24/7 Operations Support', desc: 'Continuous marine logistics tracking and emergency response dispatch.', icon: Clock },
    { title: 'Local Content Dev', desc: '100% indigenous ownership driving West African capacity growth.', icon: Award },
    { title: 'Nationwide Coverage', desc: 'Integrated logistics across Lagos, Port Harcourt, and Warri waters.', icon: Globe },
    { title: 'Experienced Crew', desc: 'STCW certified seafarers and master mariners commanding the fleet.', icon: Users },
  ];

  // Stats Data
  const stats = [
    { value: 15, suffix: '+', label: 'Years of Experience' },
    { value: 240, suffix: '+', label: 'Projects Completed' },
    { value: 12, suffix: '', label: 'Marine Assets' },
    { value: 50, suffix: '+', label: 'Satisfied Corporate Clients' },
    { value: 100, suffix: '%', label: 'Local Content Rating' },
    { value: 99.8, suffix: '%', label: 'Safety HSE Rating' },
  ];

  // Why Choose Us
  const whyChooseUs = [
    { title: 'Regulatory Integrity', desc: 'NIMASA, DPR, and Navy approved. Fully compliant legal and operational standards.' },
    { title: 'Commanding Crew', desc: 'Veteran master mariners and offshore engineers ensuring cargo safety.' },
    { title: 'Optimized Fleet', desc: 'Modern AHTS, high-performance patrol craft, and high-load capacity barges.' },
    { title: 'Tactical Deployment', desc: 'Rapid mobilization protocols to meet offshore drilling campaign windows.' },
    { title: 'ISO Alignment HSE', desc: 'Class-approved safety management systems mitigating all offshore hazards.' },
    { title: 'Endless Support', desc: 'Dedicated client managers tracking fuel custody and vessel locations.' },
  ];

  // Testimonials sliding controls
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Vessel Showcase Controls
  const nextVessel = () => {
    setVesselIndex((prev) => (prev + 1) % vesselsData.length);
  };
  const prevVessel = () => {
    setVesselIndex((prev) => (prev - 1 + vesselsData.length) % vesselsData.length);
  };

  return (
    <>
      <SEO
        title="Premium Marine Logistics & Offshore Support Services"
        description="K-TECH DYNAMIC LTD provides premium marine logistics, offshore vessel chartering, bunkering, security escort, tugboat and barge services in Nigeria."
      />

      {/* SECTION 1 — HERO */}
      <section className="relative h-screen flex items-center justify-center bg-primary-navy overflow-hidden">
        {/* Background Vessel Image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/10.jpeg"
            alt="Offshore Marine Operations"
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/80 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-primary-navy/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="lg:w-2/3 flex flex-col gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-headings font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Powering Operations.<br />
                <span className="text-teal-accent">Delivering Reliability.</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              K-TECH DYNAMIC LTD delivers integrated marine logistics, vessel management, offshore support, marine fuel supply, tugboat services, barge operations, marine equipment solutions, vessel inspections, sales of marine vessels, and repairs.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/request-quote"
                className="px-8 py-4 bg-orange-cta hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-cta/30 transition-all duration-200"
              >
                Request Quote
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white font-bold rounded-lg transition-all duration-200"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>

          {/* Floating statistics cards & Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            {[
              { label: 'Offshore Assets', value: '12+' },
              { label: 'Safety Rating', value: '99.8%' },
              { label: 'Local Content', value: '100%' },
              { label: 'Operations', value: '24/7' }
            ].map((card, idx) => (
              <motion.div
                key={card.label}
                className="glass-panel-dark p-4 rounded-xl text-left border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
              >
                <div className="text-xl sm:text-2xl font-bold text-teal-accent font-headings">{card.value}</div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">{card.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUST INDICATORS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-headings font-extrabold text-primary-navy tracking-tight">
              Operational Standards & Trust
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed font-sans">
              We operate under high regulatory and safety compliance standards, delivering marine assets and support crews with zero downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, idx) => {
              const Icon = indicator.icon;
              return (
                <motion.div
                  key={indicator.title}
                  className="p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div className="p-3 bg-ocean-blue/10 text-ocean-blue rounded-xl w-fit group-hover:bg-teal-accent group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-headings font-bold text-primary-navy mt-6">
                    {indicator.title}
                  </h3>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                    {indicator.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — COMPANY OVERVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Narrative */}
            <div className="flex flex-col gap-6 text-left">
              <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
                K-TECH DYNAMIC LTD
              </span>
              <h2 className="text-3xl sm:text-4xl font-headings font-extrabold text-primary-navy leading-tight">
                An Indigenous Maritime Leader Support Center
              </h2>
              <p className="text-slate-600 leading-relaxed font-sans">
                K-TECH DYNAMIC LTD is a fully indigenous Nigerian company providing integrated marine logistics, offshore support, vessel operations, marine fuel supply, and maritime equipment services.
              </p>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 mt-4">
                {(['mission', 'vision', 'values'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 pr-6 font-headings text-sm font-semibold uppercase tracking-wider relative transition-colors ${
                      activeTab === tab ? 'text-ocean-blue' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-6 h-0.5 bg-ocean-blue"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[140px] pt-4">
                {activeTab === 'mission' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-500 text-sm leading-relaxed"
                  >
                    To deliver safe, reliable, and compliant offshore logistics and marine services to the West African Oil & Gas sector, creating maximum value for stakeholders through local resource capability development and high HSE practices.
                  </motion.p>
                )}
                {activeTab === 'vision' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-500 text-sm leading-relaxed"
                  >
                    To be the leading indigenous maritime and offshore support company in West Africa, recognized internationally for operational excellence, marine safety compliance, and technological efficiency.
                  </motion.p>
                )}
                {activeTab === 'values' && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 gap-3 text-slate-500 text-sm"
                  >
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-accent shrink-0" />
                      <span>Safety Excellence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-accent shrink-0" />
                      <span>Integrity & Trust</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-accent shrink-0" />
                      <span>Operational Precision</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-accent shrink-0" />
                      <span>Indigenous Leadership</span>
                    </li>
                  </motion.ul>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-semibold text-ocean-blue hover:text-teal-accent transition-colors"
                >
                  <span>Learn More About K-TECH</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <BrochureButton />
              </div>
            </div>

            {/* Right Vessel Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-teal-accent" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-teal-accent" />
              <img
                src="/11.jpeg"
                alt="Offshore Supply Tug"
                className="w-full h-[450px] object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SERVICES PREVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="text-left max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
                Integrated Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-headings font-extrabold text-primary-navy tracking-tight mt-2">
                Offshore Logistics & Marine Services
              </h2>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary-navy text-white hover:bg-ocean-blue rounded-lg font-semibold transition-colors"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 6).map((service, idx) => (
              <motion.div
                key={service.id}
                className="flex flex-col justify-between p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div>
                  <div className="p-3 bg-ocean-blue/10 text-ocean-blue rounded-xl w-fit">
                    <ServiceIcon name={service.icon} className="w-6 h-6 text-ocean-blue" />
                  </div>
                  <h3 className="text-xl font-headings font-bold text-primary-navy mt-6">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    to={`/services?select=${service.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-blue hover:text-teal-accent transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FLEET SHOWCASE */}
      <section className="py-24 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-teal-accent">
                Maritime Assets
              </span>
              <h2 className="text-3xl sm:text-4xl font-headings font-extrabold tracking-tight mt-2">
                KT Modern Vessel Showcase
              </h2>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={prevVessel}
                className="p-3 rounded-full bg-white/10 hover:bg-teal-accent/30 text-white transition-colors"
                aria-label="Previous vessel"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextVessel}
                className="p-3 rounded-full bg-white/10 hover:bg-teal-accent/30 text-white transition-colors"
                aria-label="Next vessel"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Carousel container */}
          <div className="relative overflow-hidden min-h-[460px]">
            <AnimatePresence mode="wait">
              {vesselsData.map((vessel, idx) => {
                if (idx !== vesselIndex) return null;
                return (
                  <motion.div
                    key={vessel.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    {/* Vessel Specifications */}
                    <div className="lg:col-span-5 text-left flex flex-col gap-5">
                      <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full w-fit tracking-wider">
                        {vessel.type}
                      </span>
                      <h3 className="text-3xl font-headings font-bold text-white">{vessel.name}</h3>

                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="border-l-2 border-teal-accent pl-3">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block">BHP</span>
                          <span className="text-sm font-semibold">{vessel.specs.bhp}</span>
                        </div>
                        <div className="border-l-2 border-teal-accent pl-3">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Bollard Pull</span>
                          <span className="text-sm font-semibold">{vessel.specs.bollardPull}</span>
                        </div>
                        <div className="border-l-2 border-teal-accent pl-3">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Length Overall</span>
                          <span className="text-sm font-semibold">{vessel.specs.lengthOverall}</span>
                        </div>
                        <div className="border-l-2 border-teal-accent pl-3">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Deck Space</span>
                          <span className="text-sm font-semibold">{vessel.specs.deckSpace}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-4">
                        <Link
                          to={`/fleet?vessel=${vessel.id}`}
                          className="px-6 py-3 bg-teal-accent hover:bg-[#008f8f] text-primary-navy font-bold rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <span className="px-4 py-2 border border-white/20 rounded-lg flex items-center justify-center text-xs font-semibold text-slate-300">
                          Status: <span className={vessel.status === 'Available' ? 'text-emerald-400 ml-1 font-bold' : 'text-amber-400 ml-1 font-bold'}>{vessel.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* Vessel Image */}
                    <div className="lg:col-span-7 relative">
                      <img
                        src={vessel.image}
                        alt={vessel.name}
                        className="w-full h-[380px] object-cover rounded-xl shadow-2xl border border-white/10"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 6 — INDUSTRIES WE SERVE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
              Strategic Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl font-headings font-extrabold text-primary-navy tracking-tight mt-2">
              Industries We Serve
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed font-sans">
              Supporting vital industrial value chains with specialized marine transport and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((industry) => (
              <Link
                key={industry.id}
                to={`/industries?select=${industry.id}`}
                className="group relative h-[360px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                {/* Background Image */}
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/40 to-transparent z-10" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left flex flex-col justify-end h-full">
                  <h3 className="text-xl font-headings font-bold text-white group-hover:text-teal-accent transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-slate-300 mt-2 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                    {industry.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-teal-accent font-semibold">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHY CHOOSE US */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
              Competitive Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-headings font-extrabold text-primary-navy tracking-tight mt-2">
              Why K-TECH DYNAMIC?
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed font-sans">
              We build long-term relationships through operational integrity, safety compliance, and asset reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={item.title}
                className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-teal-accent/15 rounded-full flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 bg-teal-accent rounded-full animate-pulse" />
                  </div>
                  <h3 className="font-headings font-bold text-primary-navy text-lg">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — COMPANY STATISTICS */}
      <section className="py-20 bg-primary-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center text-center">
                <div className="text-3xl sm:text-5xl font-headings font-bold text-teal-accent">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-semibold mt-2.5 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — CLIENT TESTIMONIALS */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
            Client Success
          </span>
          <h2 className="text-3xl font-headings font-extrabold text-primary-navy tracking-tight mt-2 mb-16">
            Testimonials from the Field
          </h2>

          <div className="relative min-h-[240px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonialsData.map((item, idx) => {
                if (idx !== currentTestimonial) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="flex gap-1 text-orange-cta">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg sm:text-xl font-medium text-slate-700 italic max-w-3xl leading-relaxed">
                      "{item.feedback}"
                    </blockquote>
                    <div className="flex flex-col items-center">
                      <cite className="font-headings font-bold text-primary-navy not-italic">
                        {item.clientName}
                      </cite>
                      <span className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">
                        {item.clientRole} — {item.companyName}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Testimonial slider indicators */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial ? 'w-6 bg-ocean-blue' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="relative py-24 bg-primary-navy text-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('/12.jpeg')] bg-cover bg-center mix-blend-multiply opacity-25" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-headings font-extrabold tracking-tight leading-tight">
            Ready to Support Your Marine Operations?
          </h2>
          <p className="text-slate-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Partner with Nigeria's premium marine service vendor. Get in touch with our operations team today for a tailored charter or fuel supply quote.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/request-quote"
              className="px-8 py-4 bg-orange-cta hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-cta/30 transition-all duration-200"
            >
              Request Quote
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white font-bold rounded-lg transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
