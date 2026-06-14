import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import SEO from '../components/shared/SEO';
import { vesselsData } from '../data/vessels';

export default function VesselDetail() {
  const { id } = useParams<{ id: string }>();
  const vessel = vesselsData.find((v) => v.id === id);

  if (!vessel) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-lg max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h2 className="font-headings font-extrabold text-primary-navy text-2xl">Vessel Not Found</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            The vessel with ID "{id}" does not exist in K-TECH's fleet database. It may have been decommissioned or reassigned.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/fleet"
              className="px-6 py-3 bg-ocean-blue hover:bg-[#004b7c] text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Fleet Directory</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${vessel.name} - Technical Specifications`}
        description={`Full technical datasheet and capacity profiles for the K-TECH vessel ${vessel.name} (${vessel.type}). Request charter quotes.`}
      />

      {/* Hero section */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-left">
        <div className="absolute inset-0 bg-navy-900 opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-teal-accent hover:text-white transition-colors font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fleet Index</span>
          </Link>
          <div>
            <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
              {vessel.type}
            </span>
            <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
              {vessel.name}
            </h1>
            <p className="text-slate-300 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Fully classed and licensed vessel optimized for deep offshore logistic operations and harbor towing in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Vessel details grids */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Gallery & Specs Sheets */}
            <div className="lg:col-span-8 flex flex-col gap-8 text-left">
              
              {/* Photo Gallery Grid */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
                <h3 className="font-headings font-bold text-primary-navy text-lg mb-6">
                  Vessel Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {vessel.gallery.map((imgUrl, index) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-xl bg-slate-100 ${
                        index === 0 ? 'sm:col-span-3 h-[380px]' : 'h-40'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${vessel.name} detail view ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm">
                <h3 className="font-headings font-bold text-primary-navy text-lg border-b border-slate-100 pb-3 mb-6">
                  Full Technical Specifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-slate-600">
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Vessel Name:</span>
                    <span className="font-bold text-slate-700">{vessel.name}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Type:</span>
                    <span className="font-bold text-slate-700 text-right">{vessel.type}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Length Overall (LOA):</span>
                    <span className="font-bold text-slate-700">{vessel.specs.lengthOverall}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Breadth:</span>
                    <span className="font-bold text-slate-700">{vessel.specs.breadth}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Draft (Max):</span>
                    <span className="font-bold text-slate-700">{vessel.specs.draft}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Main Propulsion:</span>
                    <span className="font-bold text-slate-700 text-right">{vessel.specs.mainEngines}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Total Horsepower:</span>
                    <span className="font-bold text-slate-700">{vessel.specs.bhp}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Bollard Pull:</span>
                    <span className="font-bold text-slate-700">{vessel.specs.bollardPull}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100 md:col-span-2">
                    <span className="text-slate-400 font-medium font-sans">Flag / Registration Details:</span>
                    <span className="font-bold text-slate-700">{vessel.specs.flag}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Availability, Capacities, Certs & CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6 text-left">
              
              {/* Sidebar Action Card */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">Vessel Status</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-3 h-3 rounded-full ${vessel.status === 'Available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span className="font-bold text-primary-navy text-lg">{vessel.status}</span>
                  </div>
                </div>
                
                <Link
                  to={`/request-quote?vessel=${vessel.id}`}
                  className="w-full py-4 bg-orange-cta hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg text-center transition-colors text-sm uppercase tracking-wider block"
                >
                  Request Charter Quote
                </Link>
              </div>

              {/* Tank Capacities */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
                <h3 className="font-headings font-bold text-primary-navy text-base border-b border-slate-100 pb-3 mb-4">
                  Tank Capacities
                </h3>
                <div className="flex flex-col gap-3.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold text-[10px]">Fuel Oil (AGO)</span>
                    <span className="font-bold text-slate-700">{vessel.capacity.fuelOil}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold text-[10px]">Fresh Water</span>
                    <span className="font-bold text-slate-700">{vessel.capacity.freshWater}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold text-[10px]">Deck Cargo Load</span>
                    <span className="font-bold text-slate-700">{vessel.capacity.deckCargo}</span>
                  </div>
                </div>
              </div>

              {/* Certifications Card */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
                <h3 className="font-headings font-bold text-primary-navy text-base border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-accent" />
                  <span>Compliance Certifications</span>
                </h3>
                <ul className="flex flex-col gap-3 text-xs text-slate-500">
                  {vessel.safetyCertifications.map((cert, idx) => (
                    <li key={idx} className="flex gap-2 items-start leading-relaxed border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                      <CheckCircle2 className="w-4 h-4 text-teal-accent shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
