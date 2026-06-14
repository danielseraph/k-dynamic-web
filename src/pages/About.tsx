import { useState } from 'react';
import { ShieldCheck, Anchor, Compass, Check, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/shared/SEO';
import AnimatedCounter from '../components/shared/AnimatedCounter';

const timelineEvents = [
  { year: '2012', title: 'Company Foundation', desc: 'K-TECH DYNAMIC LTD is incorporated as a fully indigenous maritime company, starting with marine equipment supplies and technical support in Lagos.' },
  { year: '2016', title: 'Fleet Expansion', desc: 'Acquired our first flat-top cargo barge and utility tugboat, moving into heavy material transport and swamp drilling support.' },
  { year: '2019', title: 'Navy Escort Clearance', desc: 'Signed MoUs with NIMASA and the Nigerian Navy, launching security escort patrols using high-speed patrol craft.' },
  { year: '2022', title: 'Bunkering Operations', desc: 'Expanded into Automotive Gas Oil (AGO) supply, catering to offshore platforms, anchorages, and drillships.' },
  { year: '2025', title: 'Enterprise Partner', desc: 'Recognized as a tier-1 marine logistics contractor, serving oil majors in West Africa with over 12 assets.' }
];

export default function About() {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(4);

  return (
    <>
      <SEO
        title="About Us - Corporate Maritime Leader"
        description="Learn about K-TECH DYNAMIC LTD, an indigenous Nigerian maritime company providing marine fuel supply, vessel chartering, and offshore services."
      />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/12.jpeg')] bg-cover bg-center mix-blend-multiply opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            About K-TECH DYNAMIC LTD
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering safe, certified, and fully compliant maritime operations and offshore logistics across West African territorial waters.
          </p>
        </div>
      </section>

      {/* Company Overview & History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Story & Achievements */}
            <div className="text-left flex flex-col gap-6">
              <h2 className="text-3xl font-headings font-extrabold text-primary-navy">
                Our Corporate Narrative
              </h2>
              <p className="text-slate-600 leading-relaxed font-sans">
                K-TECH DYNAMIC LTD is a fully indigenous Nigerian company providing integrated marine logistics, offshore support, vessel operations, marine fuel supply, and maritime equipment services.
              </p>
              <p className="text-slate-600 leading-relaxed font-sans">
                Established with a vision to bridge the local capacity gap in offshore services, we have developed a high reputation for asset reliability and strict compliance. Our operations conform to NIMASA, DPR, and Navy guidelines.
              </p>

              {/* Achievements Grid */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-bold font-headings text-ocean-blue">
                    <AnimatedCounter value={12} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                    Vessel Assets
                  </span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-bold font-headings text-ocean-blue">
                    <AnimatedCounter value={100} suffix="%" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                    Local Content
                  </span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-bold font-headings text-ocean-blue">
                    <AnimatedCounter value={99} suffix="%" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                    Up-Time Rate
                  </span>
                </div>
              </div>
            </div>

            {/* Core Values / Mission Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                <Anchor className="w-8 h-8 text-ocean-blue mb-4" />
                <h3 className="font-headings font-bold text-primary-navy text-lg">Our Mission</h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  To deliver safe, reliable, and compliant offshore logistics and marine services to the West African Oil & Gas sector.
                </p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left">
                <Compass className="w-8 h-8 text-ocean-blue mb-4" />
                <h3 className="font-headings font-bold text-primary-navy text-lg">Our Vision</h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  To be the leading indigenous maritime and offshore support company in West Africa, recognized for compliance and reliability.
                </p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left sm:col-span-2">
                <ShieldCheck className="w-8 h-8 text-ocean-blue mb-4" />
                <h3 className="font-headings font-bold text-primary-navy text-lg">Core Corporate Values</h3>
                <div className="grid grid-cols-2 gap-3 mt-3 text-slate-500 text-sm">
                  {[
                    'Safety First Above All',
                    'Operational Reliability',
                    'Local Capacity Growth',
                    'Integrity & Compliance',
                    'Customer-Centric Logistics',
                    'Environmental Safety'
                  ].map((val) => (
                    <div key={val} className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-teal-accent shrink-0" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
              Our Journey
            </span>
            <h2 className="text-3xl font-headings font-bold text-primary-navy mt-2">
              Corporate History Timeline
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Explore key milestones defining K-TECH DYNAMIC LTD's rise in Nigerian maritime services.
            </p>
          </div>

          {/* Timeline slider selector */}
          <div className="relative flex items-center justify-center max-w-xl mx-auto mb-10">
            <div className="absolute left-0 right-0 h-0.5 bg-slate-200 -z-10" />
            <div className="flex justify-between w-full">
              {timelineEvents.map((event, idx) => (
                <button
                  key={event.year}
                  onClick={() => setSelectedTimelineIndex(idx)}
                  className={`w-10 h-10 rounded-full font-headings font-bold text-sm border-2 flex items-center justify-center transition-all ${
                    idx === selectedTimelineIndex
                      ? 'bg-ocean-blue text-white border-ocean-blue scale-110 shadow-lg'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-ocean-blue'
                  }`}
                >
                  {event.year}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Event Description */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-2xl p-8 shadow-sm text-left">
            <motion.div
              key={selectedTimelineIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              <span className="text-xs uppercase tracking-widest font-extrabold text-teal-accent">
                Milestone — {timelineEvents[selectedTimelineIndex].year}
              </span>
              <h3 className="text-2xl font-headings font-bold text-primary-navy">
                {timelineEvents[selectedTimelineIndex].title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                {timelineEvents[selectedTimelineIndex].desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Commitment & Corporate Social Responsibility */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* HSE Image */}
            <div className="relative">
              <img
                src="/11.jpeg"
                alt="Marine Safety Operations"
                className="w-full h-[380px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute top-6 left-6 bg-orange-cta text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider shadow-lg">
                HSE Excellence
              </div>
            </div>

            {/* Technical HSE details */}
            <div className="text-left flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest font-extrabold text-ocean-blue">
                Safety First Always
              </span>
              <h2 className="text-3xl font-headings font-bold text-primary-navy leading-tight">
                Our Commitment to Safety, Health, & Environment (HSE)
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our safety culture is rooted in prevention. K-TECH DYNAMIC LTD enforces a strict HSE Policy designed to achieve "Goal Zero" — zero incidents, zero injuries, and zero environmental spills.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-4">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-ocean-blue shrink-0 h-fit">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-headings font-semibold text-primary-navy text-base">Continuous Risk Assessments</h4>
                    <p className="text-xs text-slate-500 mt-1">Rigorous job hazard analyses (JHAs) are performed prior to cargo loading or offshore vessel bunkering operations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-ocean-blue shrink-0 h-fit">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-headings font-semibold text-primary-navy text-base">Regulatory & Class Approvals</h4>
                    <p className="text-xs text-slate-500 mt-1">Our fleet complies with NIMASA, DPR, and Navy guidelines and undergoes annual classification society audits (ABS, BV, LR).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-headings font-bold text-primary-navy">
            Certifications & Compliance
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl mx-auto leading-relaxed">
            We are fully certified by local and international bodies to conduct offshore logistics, cargo transport, and bunkering operations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'NIMASA', subtitle: 'Shipowner Registration' },
              { title: 'DPR / NUPRC', subtitle: 'Marine Services Permit' },
              { title: 'NOGICD Act', subtitle: '100% Local Content' },
              { title: 'ISO 9001:2015', subtitle: 'Quality Management' }
            ].map((cert) => (
              <div key={cert.title} className="p-6 bg-white border border-slate-200/60 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center text-ocean-blue mx-auto mb-4 font-headings font-extrabold text-base">
                  ✓
                </div>
                <h4 className="font-headings font-bold text-primary-navy text-base leading-tight">{cert.title}</h4>
                <p className="text-slate-400 text-xs mt-1.5 uppercase tracking-wide font-medium">{cert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
