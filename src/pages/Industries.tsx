import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/shared/SEO';
import { industriesData } from '../data/industries';

export default function Industries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectParam = searchParams.get('select');

  // Find index based on query param, fallback to first industry
  const initialIndex = industriesData.findIndex((i) => i.id === selectParam);
  const [selectedIndustryIndex, setSelectedIndustryIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0
  );

  useEffect(() => {
    if (selectParam) {
      const idx = industriesData.findIndex((i) => i.id === selectParam);
      if (idx !== -1) {
        setSelectedIndustryIndex(idx);
      }
    }
  }, [selectParam]);

  const activeIndustry = industriesData[selectedIndustryIndex];

  return (
    <>
      <SEO
        title="Industries We Serve - Offshore & Energy Solutions"
        description="See K-TECH DYNAMIC LTD's sectors of operation: Oil & Gas, Marine Construction, Port Operations, Energy Logistics, Dredging, and detailed case studies."
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/12.jpeg')] bg-cover bg-center mix-blend-multiply opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Sectors We Serve
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            Industries We Support
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From deepwater offshore platforms to coastal dredging sites, K-TECH delivers certified vessel assets and logistical reliability.
          </p>
        </div>
      </section>

      {/* Industry Tabs/Grid selection */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industriesData.map((ind, idx) => {
              const isSelected = idx === selectedIndustryIndex;
              return (
                <button
                  key={ind.id}
                  onClick={() => {
                    setSelectedIndustryIndex(idx);
                    setSearchParams({ select: ind.id });
                  }}
                  className={`p-4 rounded-xl border font-headings text-xs uppercase font-bold tracking-wider transition-all text-center flex flex-col justify-center items-center gap-2 h-24 ${
                    isSelected
                      ? 'bg-ocean-blue text-white border-ocean-blue shadow-md scale-105'
                      : 'bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[10px] leading-tight block">{ind.title}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Detailed Industry Information */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              
              {/* Left Column: Sector Narrative */}
              <div className="lg:col-span-5 text-left flex flex-col gap-6">
                <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
                  Industrial Solutions
                </span>
                <h2 className="text-3xl font-headings font-extrabold text-primary-navy">
                  Supporting {activeIndustry.title} Operations
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeIndustry.description}
                </p>

                <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm mt-2">
                  <h4 className="font-headings font-bold text-primary-navy text-sm mb-4">
                    Key Support Areas
                  </h4>
                  <ul className="flex flex-col gap-3.5 text-xs text-slate-500">
                    {activeIndustry.keyPoints.map((point, i) => (
                      <li key={i} className="flex gap-2.5 items-start leading-relaxed">
                        <CheckCircle2 className="w-4.5 h-4.5 text-teal-accent shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <Link
                    to="/request-quote"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-navy hover:bg-ocean-blue text-white rounded-lg text-sm font-bold shadow-md transition-colors"
                  >
                    <span>Request Operations Support</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Case Study Details */}
              <div className="lg:col-span-7">
                {activeIndustry.caseStudies.map((cs) => (
                  <div key={cs.id} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-md text-left">
                    {/* Case study banner image */}
                    <div className="h-64 relative">
                      <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-primary-navy/40" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <span className="px-2.5 py-1 bg-teal-accent text-primary-navy text-[10px] font-extrabold uppercase rounded-md tracking-wider">
                          Case Study
                        </span>
                        <h3 className="text-xl sm:text-2xl font-headings font-bold mt-2 text-white">
                          {cs.title}
                        </h3>
                      </div>
                    </div>

                    {/* Case study contents */}
                    <div className="p-8 flex flex-col gap-6">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Project Name</span>
                        <p className="text-sm font-bold text-primary-navy mt-0.5">{cs.project}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
                        {/* Challenge */}
                        <div className="flex flex-col gap-2">
                          <h4 className="font-headings font-bold text-rose-500 uppercase tracking-wide">
                            The Challenge
                          </h4>
                          <p className="text-slate-500 leading-relaxed font-sans">{cs.challenge}</p>
                        </div>

                        {/* Solution */}
                        <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l md:border-r md:border-slate-100 md:px-4">
                          <h4 className="font-headings font-bold text-ocean-blue uppercase tracking-wide">
                            The Solution
                          </h4>
                          <p className="text-slate-500 leading-relaxed font-sans">{cs.solution}</p>
                        </div>

                        {/* Result */}
                        <div className="flex flex-col gap-2">
                          <h4 className="font-headings font-bold text-emerald-500 uppercase tracking-wide">
                            Operational Result
                          </h4>
                          <p className="text-slate-500 leading-relaxed font-sans">{cs.result}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Industrial Benefits Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-headings font-bold text-primary-navy">
            Delivering Operational Value
          </h3>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl mx-auto leading-relaxed">
            Why West African operators trust K-TECH with core logistics and maritime contracts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-3xl font-headings font-bold text-teal-accent block">01.</span>
              <h4 className="font-headings font-bold text-primary-navy text-base mt-3">Rapid Mobilization</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">We maintain streamlined dispatch procedures and class clearance paperwork to deploy vessels without delay.</p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-3xl font-headings font-bold text-teal-accent block">02.</span>
              <h4 className="font-headings font-bold text-primary-navy text-base mt-3">Strict Asset Audits</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Every barge, tugboat, and fender kit undergoes technical testing and holds valid certifications before charter handover.</p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-3xl font-headings font-bold text-teal-accent block">03.</span>
              <h4 className="font-headings font-bold text-primary-navy text-base mt-3">Local Content (NOGICD)</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Our operations support the community, training local technicians and marine officers, complying 100% with cabotage laws.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
