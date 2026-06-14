import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/shared/SEO';
import ServiceIcon from '../components/shared/ServiceIcon';
import { servicesData } from '../data/services';

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectParam = searchParams.get('select');

  // Find index based on query param, fallback to first service
  const initialIndex = servicesData.findIndex((s) => s.id === selectParam);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0
  );

  useEffect(() => {
    if (selectParam) {
      const idx = servicesData.findIndex((s) => s.id === selectParam);
      if (idx !== -1) {
        setSelectedServiceIndex(idx);
      }
    }
  }, [selectParam]);

  const activeService = servicesData[selectedServiceIndex];

  return (
    <>
      <SEO
        title="Our Services - Marine & Offshore Logistics Solutions"
        description="Explore K-TECH DYNAMIC LTD's 10 core marine services: AGO Fuel supply, Tugboats, Barge supply, Offshore logistics, security patrols, vessel repairs."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/10.jpeg')] bg-cover bg-center mix-blend-multiply opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            Offshore & Maritime Services
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering robust supply chains, heavy towing assets, and technical support teams across Nigeria's coastal and deepwater basins.
          </p>
        </div>
      </section>

      {/* Interactive Service Explorer */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Sidebar Navigation - 10 Services */}
            <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm sticky top-28">
              <h3 className="font-headings font-bold text-primary-navy text-lg uppercase tracking-wider mb-4 px-3 border-l-4 border-ocean-blue">
                Services Index
              </h3>
              <nav className="flex flex-col gap-1.5">
                {servicesData.map((service, idx) => {
                  const isSelected = idx === selectedServiceIndex;
                  return (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedServiceIndex(idx);
                        setSearchParams({ select: service.id });
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-left transition-all ${
                        isSelected
                          ? 'bg-ocean-blue text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-primary-navy'
                      }`}
                    >
                      <ServiceIcon
                        name={service.icon}
                        className={`w-5 h-5 shrink-0 ${isSelected ? 'text-teal-accent' : 'text-slate-400 group-hover:text-primary-navy'}`}
                      />
                      <span className="text-sm font-sans truncate">{service.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Detailed Content Pane */}
            <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-2xl p-8 sm:p-10 shadow-sm text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Title and Icon */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-ocean-blue/10 text-ocean-blue rounded-xl">
                        <ServiceIcon name={activeService.icon} className="w-8 h-8 text-ocean-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-headings font-extrabold text-primary-navy">
                          {activeService.title}
                        </h2>
                        <span className="text-xs uppercase tracking-wider text-teal-accent font-bold mt-1 block">
                          Certified Marine Capability
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/request-quote?service=${activeService.id}`}
                      className="px-5 py-2.5 bg-orange-cta hover:bg-orange-600 text-white font-bold text-sm rounded-lg shadow-md transition-colors text-center"
                    >
                      Request Service Quote
                    </Link>
                  </div>

                  {/* Overview */}
                  <div className="mt-8">
                    <h4 className="font-headings font-bold text-primary-navy text-lg">
                      Operational Overview
                    </h4>
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                      {activeService.overview}
                    </p>
                  </div>

                  {/* Key Features & Benefits (Split columns) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    {/* Benefits */}
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                      <h4 className="font-headings font-bold text-primary-navy text-base flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-teal-accent" />
                        <span>Key Benefits</span>
                      </h4>
                      <ul className="flex flex-col gap-3 mt-4 text-xs text-slate-500">
                        {activeService.benefits.map((benefit, i) => (
                          <li key={i} className="flex gap-2 items-start leading-relaxed">
                            <span className="text-teal-accent font-bold shrink-0">✔</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                      <h4 className="font-headings font-bold text-primary-navy text-base flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-teal-accent" />
                        <span>Technical Specifications</span>
                      </h4>
                      <ul className="flex flex-col gap-3 mt-4 text-xs text-slate-500">
                        {activeService.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex gap-2 items-start leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-ocean-blue shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Operational Process Workflow */}
                  <div className="mt-10 pt-8 border-t border-slate-100">
                    <h4 className="font-headings font-bold text-primary-navy text-lg mb-6">
                      Workflow & Dispatch Process
                    </h4>
                    <div className="relative border-l border-slate-200 ml-4 pl-6 flex flex-col gap-6">
                      {activeService.process.map((step, i) => {
                        const [title, desc] = step.split(': ');
                        return (
                          <div key={i} className="relative">
                            {/* Dot indicator */}
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-ocean-blue border-2 border-white flex items-center justify-center shadow" />
                            <h5 className="font-headings font-bold text-sm text-primary-navy">
                              Step {i + 1}: {title}
                            </h5>
                            {desc && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Support & Quality Assurance Banner */}
      <section className="bg-primary-navy py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-headings font-bold">Uncompromising Quality & Local Content Compliance</h3>
          <p className="text-slate-300 mt-4 text-sm max-w-2xl mx-auto leading-relaxed">
            All services are structured to exceed Nigerian Content Development (NCDMB) and NIMASA guidelines. We carry comprehensive hull & machinery (H&M) and protection & indemnity (P&I) insurances.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-sm font-semibold transition-colors"
            >
              Contact Operations Desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
