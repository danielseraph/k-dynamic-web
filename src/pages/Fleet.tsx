import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Maximize2, ShieldCheck, Ship, Calendar, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/shared/SEO';
import { vesselsData as staticVesselsData } from '../data/vessels';
import type { Vessel } from '../types';
import { api, getImageUrl } from '../services/api';

export default function Fleet() {
  const [vesselsList, setVesselsList] = useState<Vessel[]>([]);

  useEffect(() => {
    api.vessels.getAll()
      .then((data) => {
        if (data && data.length > 0) {
          setVesselsList(data);
        } else {
          setVesselsList(staticVesselsData);
        }
      })
      .catch(() => {
        setVesselsList(staticVesselsData);
      });
  }, []);

  const parseSafetyCertifications = (certs: any): string[] => {
    if (!certs) return [];
    if (Array.isArray(certs)) return certs;
    try {
      return JSON.parse(certs);
    } catch {
      return [];
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const vesselQueryParam = searchParams.get('vessel');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Tug' | 'Barge' | 'Security' | 'Support'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'size'>('name');
  
  // Selected vessel for modal display
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  // Watch query params to auto-open modal for a specific vessel (e.g. from Home page link)
  useEffect(() => {
    if (vesselQueryParam && vesselsList.length > 0) {
      const v = vesselsList.find((item) => item.id === vesselQueryParam);
      if (v) {
        setSelectedVessel(v);
      }
    }
  }, [vesselQueryParam, vesselsList]);

  // Handle closing modal and removing query param
  const closeModal = () => {
    setSelectedVessel(null);
    const params = new URLSearchParams(searchParams);
    params.delete('vessel');
    setSearchParams(params);
  };

  // Filter & Sort Logic
  const filteredVessels = vesselsList
    .filter((vessel) => {
      const matchesSearch =
        vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vessel.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vessel.specs.mainEngines.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Tug' && vessel.type.includes('Tug')) ||
        (selectedCategory === 'Barge' && vessel.type.includes('Barge')) ||
        (selectedCategory === 'Security' && vessel.type.includes('Security')) ||
        (selectedCategory === 'Support' && vessel.type.includes('Support'));

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      if (sortBy === 'size') {
        // Simple length parser (e.g. "65.00 m" -> 65)
        const sizeA = parseFloat(a.specs.lengthOverall);
        const sizeB = parseFloat(b.specs.lengthOverall);
        return sizeB - sizeA;
      }
      return 0;
    });

  return (
    <>
      <SEO
        title="Vessel Fleet - Offshore Towage & Logistics Fleet"
        description="Browse K-TECH DYNAMIC LTD's fleet of modern Anchor Handling Tug Supply (AHTS), Fast Crew Suppliers, liquid cargo barges, and ballistic security escort vessels."
      />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/1.jpeg')] bg-cover bg-center mix-blend-multiply opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Vessels
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            The KT Marine Fleet
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Fully classed, fully manned, and NIMASA-compliant vessel assets engineered for offshore drilling support and deep sea towing.
          </p>
        </div>
      </section>

      {/* Fleet Catalog & Filters */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Toolbar */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 mb-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search fleet (name, type, engines)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-ocean-blue focus:ring-1 focus:ring-ocean-blue transition-colors text-slate-700"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(['All', 'Tug', 'Barge', 'Security', 'Support'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-ocean-blue text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'All' ? 'All Craft' : `${cat}s`}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-3 shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-ocean-blue"
              >
                <option value="name">Vessel Name</option>
                <option value="status">Availability</option>
                <option value="size">Overall Length</option>
              </select>
            </div>

          </div>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredVessels.map((vessel) => (
                <motion.div
                  key={vessel.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Vessel image with status badge */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={getImageUrl(vessel.image)}
                        alt={vessel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className={`absolute top-4 right-4 px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-md z-10 ${
                          vessel.status === 'Available'
                            ? 'bg-emerald-500 text-white'
                            : vessel.status === 'On Charter'
                            ? 'bg-amber-500 text-white'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {vessel.status}
                      </span>
                    </div>

                    {/* Vessel Content */}
                    <div className="p-6 text-left">
                      <span className="text-[10px] font-bold text-ocean-blue uppercase tracking-widest block">
                        {vessel.type}
                      </span>
                      <h3 className="text-xl font-headings font-bold text-primary-navy mt-1">
                        {vessel.name}
                      </h3>

                      {/* Specs snippet */}
                      <div className="grid grid-cols-2 gap-3.5 mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">BHP</span>
                          <span className="font-semibold text-slate-700">{vessel.specs.bhp}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">LOA</span>
                          <span className="font-semibold text-slate-700">{vessel.specs.lengthOverall}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Class Registry</span>
                          <span className="font-semibold text-slate-700 truncate block">
                            {vessel.specs.flag.includes('ABS') ? 'ABS Class' : vessel.specs.flag.includes('Bureau') ? 'BV Class' : 'Classed'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Bollard Pull</span>
                          <span className="font-semibold text-slate-700">{vessel.specs.bollardPull}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedVessel(vessel);
                        setSearchParams({ vessel: vessel.id });
                      }}
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-primary-navy font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>View Specifications</span>
                    </button>
                    <Link
                      to={`/fleet/${vessel.id}`}
                      className="px-3 py-2.5 bg-ocean-blue/10 hover:bg-ocean-blue text-ocean-blue hover:text-white rounded-lg transition-colors flex items-center justify-center"
                      title="Dedicated Detail Page"
                    >
                      <Ship className="w-4 h-4" />
                    </Link>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredVessels.length === 0 && (
            <div className="p-16 bg-white border border-slate-200 rounded-2xl text-center max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="font-headings font-bold text-primary-navy text-lg">No Vessels Found</h3>
              <p className="text-slate-500 text-sm mt-2">
                We couldn't find any vessel matching "{searchTerm}" in category "{selectedCategory}". Please try another keyword.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedVessel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden text-left relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-20"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
                
                {/* Visual Section - Image & Gallery */}
                <div className="md:col-span-5 bg-slate-900 relative flex flex-col justify-between min-h-[300px]">
                  <img
                    src={getImageUrl(selectedVessel.image)}
                    alt={selectedVessel.name}
                    className="w-full h-full object-cover absolute inset-0 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  
                  {/* Top Details */}
                  <div className="relative p-6 z-10">
                    <span className="px-3 py-1 bg-teal-accent/20 text-teal-accent text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {selectedVessel.type}
                    </span>
                  </div>

                  {/* Bottom details */}
                  <div className="relative p-6 z-10 text-white mt-auto">
                    <h3 className="text-2xl font-headings font-bold">{selectedVessel.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 text-teal-accent" />
                      <span className="text-xs text-slate-300 font-medium">Availability:</span>
                      <span className={`text-xs font-bold ${selectedVessel.status === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {selectedVessel.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs Section */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="font-headings font-bold text-primary-navy text-lg border-b border-slate-100 pb-3">
                      Technical Datasheet
                    </h4>

                    {/* Specs Table */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-600 mt-5">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Length Overall (LOA)</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.lengthOverall}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Breadth</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.breadth}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Max Draft</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.draft}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Bollard Pull</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.bollardPull}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Main Propulsion</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.mainEngines}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Total Horsepower</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.bhp}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Flag / Registry</span>
                        <span className="font-semibold text-slate-700">{selectedVessel.specs.flag}</span>
                      </div>
                    </div>

                    {/* Capacity Section */}
                    <h5 className="font-headings font-semibold text-primary-navy text-sm mt-6 mb-2 uppercase tracking-wide">
                      Tank Capacity & Load
                    </h5>
                    <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Fuel Oil</span>
                        <span className="font-bold text-slate-700">{selectedVessel.capacity.fuelOil}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Fresh Water</span>
                        <span className="font-bold text-slate-700">{selectedVessel.capacity.freshWater}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Deck Cargo</span>
                        <span className="font-bold text-slate-700">{selectedVessel.capacity.deckCargo}</span>
                      </div>
                    </div>

                    {/* Certifications list */}
                    <h5 className="font-headings font-semibold text-primary-navy text-sm mt-6 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-accent" />
                      <span>Class & Certifications</span>
                    </h5>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-500 pl-1.5">
                      {parseSafetyCertifications(selectedVessel.safetyCertifications).map((cert, idx) => (
                        <li key={idx} className="flex gap-2 items-start leading-tight">
                          <span className="text-teal-accent font-bold">✔</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                    <Link
                      to={`/request-quote?vessel=${selectedVessel.id}`}
                      className="flex-1 px-5 py-3 bg-orange-cta hover:bg-orange-600 text-white font-bold text-sm rounded-lg shadow-md text-center transition-colors"
                    >
                      Request Charter Quote
                    </Link>
                    <Link
                      to={`/fleet/${selectedVessel.id}`}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-primary-navy font-semibold text-sm rounded-lg text-center transition-colors"
                    >
                      Go to Vessel Page
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
