import { useState, useEffect } from 'react';
import { 
  Ship, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Loader2, 
  AlertCircle,
  FileCheck,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getImageUrl } from '../../services/api';
import type { Vessel } from '../../types';

export default function VesselsManager() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVessel, setEditingVessel] = useState<Vessel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [lengthOverall, setLengthOverall] = useState('');
  const [breadth, setBreadth] = useState('');
  const [draft, setDraft] = useState('');
  const [mainEngines, setMainEngines] = useState('');
  const [bhp, setBhp] = useState('');
  const [bollardPull, setBollardPull] = useState('');
  const [deckSpace, setDeckSpace] = useState('');
  const [flag, setFlag] = useState('');
  const [fuelOil, setFuelOil] = useState('');
  const [freshWater, setFreshWater] = useState('');
  const [deckCargo, setDeckCargo] = useState('');
  const [status, setStatus] = useState<'Available' | 'On Charter' | 'Maintenance'>('Available');
  const [safetyCertList, setSafetyCertList] = useState<string[]>([]);
  const [newCert, setNewCert] = useState('');
  
  // Files
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  useEffect(() => {
    loadVessels();
  }, []);

  const loadVessels = async () => {
    setIsLoading(true);
    try {
      const data = await api.vessels.getAll();
      setVessels(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load vessels.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingVessel(null);
    setName('');
    setType('');
    setLengthOverall('');
    setBreadth('');
    setDraft('');
    setMainEngines('');
    setBhp('');
    setBollardPull('');
    setDeckSpace('');
    setFlag('');
    setFuelOil('');
    setFreshWater('');
    setDeckCargo('');
    setStatus('Available');
    setSafetyCertList([]);
    setPrimaryImage(null);
    setGalleryImages(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vessel: Vessel) => {
    setEditingVessel(vessel);
    setName(vessel.name);
    setType(vessel.type);
    setLengthOverall(vessel.specs.lengthOverall);
    setBreadth(vessel.specs.breadth);
    setDraft(vessel.specs.draft);
    setMainEngines(vessel.specs.mainEngines);
    setBhp(vessel.specs.bhp);
    setBollardPull(vessel.specs.bollardPull);
    setDeckSpace(vessel.specs.deckSpace);
    setFlag(vessel.specs.flag);
    setFuelOil(vessel.capacity.fuelOil);
    setFreshWater(vessel.capacity.freshWater);
    setDeckCargo(vessel.capacity.deckCargo);
    setStatus(vessel.status);
    
    // Parse safety certifications
    let certs: string[] = [];
    try {
      certs = typeof vessel.safetyCertifications === 'string' 
        ? JSON.parse(vessel.safetyCertifications) 
        : vessel.safetyCertifications;
    } catch {
      certs = [];
    }
    setSafetyCertList(certs);

    setPrimaryImage(null);
    setGalleryImages(null);
    setIsModalOpen(true);
  };

  const addCert = () => {
    if (newCert.trim() && !safetyCertList.includes(newCert.trim())) {
      setSafetyCertList([...safetyCertList, newCert.trim()]);
      setNewCert('');
    }
  };

  const removeCert = (index: number) => {
    setSafetyCertList(safetyCertList.filter((_, i) => i !== index));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vessel from your records?')) return;
    try {
      await api.vessels.delete(id);
      setVessels(vessels.filter(v => v.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete vessel');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('lengthOverall', lengthOverall);
    formData.append('breadth', breadth);
    formData.append('draft', draft);
    formData.append('mainEngines', mainEngines);
    formData.append('bhp', bhp);
    formData.append('bollardPull', bollardPull);
    formData.append('deckSpace', deckSpace);
    formData.append('flag', flag);
    formData.append('fuelOil', fuelOil);
    formData.append('freshWater', freshWater);
    formData.append('deckCargo', deckCargo);
    formData.append('status', status);
    formData.append('safetyCertifications', JSON.stringify(safetyCertList));

    if (primaryImage) {
      formData.append('image', primaryImage);
    }

    if (galleryImages) {
      for (let i = 0; i < galleryImages.length; i++) {
        formData.append('gallery', galleryImages[i]);
      }
    }

    try {
      if (editingVessel) {
        await api.vessels.update(editingVessel.id, formData);
      } else {
        await api.vessels.create(formData);
      }
      setIsModalOpen(false);
      loadVessels();
    } catch (err: any) {
      setError(err.message || 'Failed to save vessel details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-headings font-extrabold text-3xl text-white">Fleet Management</h1>
          <p className="text-slate-400 text-sm mt-1">Onboard and coordinate commercial maritime assets.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/10 transition-all cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Vessel</span>
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-teal-400">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent"></div>
            <span className="text-xs font-mono uppercase">Syncing fleet...</span>
          </div>
        </div>
      ) : vessels.length === 0 ? (
        <div className="p-16 bg-slate-900/30 border border-slate-800 rounded-3xl text-center text-slate-400">
          <Ship className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="font-semibold text-lg text-white">No Vessels Configured</p>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Get started by clicking the "Onboard Vessel" button above to add assets.</p>
        </div>
      ) : (
        /* Vessels Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vessels.map((vessel) => (
            <div 
              key={vessel.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative bg-slate-950">
                  <img 
                    src={getImageUrl(vessel.image)} 
                    alt={vessel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      vessel.status === 'Available'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : vessel.status === 'On Charter'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {vessel.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      {vessel.type}
                    </span>
                    <h3 className="text-xl font-headings font-bold text-white mt-0.5">{vessel.name}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs border-y border-slate-800 py-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Length</span>
                      <span className="font-semibold text-slate-300">{vessel.specs.lengthOverall}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">BHP</span>
                      <span className="font-semibold text-slate-300">{vessel.specs.bhp}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Bollard Pull</span>
                      <span className="font-semibold text-slate-300">{vessel.specs.bollardPull}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Flag</span>
                      <span className="font-semibold text-slate-300 truncate block">{vessel.specs.flag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-3">
                <button
                  onClick={() => openEditModal(vessel)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <button
                  onClick={() => handleDelete(vessel.id)}
                  className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 hover:border-transparent flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md px-8 py-5 border-b border-slate-800 flex justify-between items-center z-10">
                <h3 className="font-headings font-extrabold text-xl text-white">
                  {editingVessel ? `Edit Vessel: ${editingVessel.name}` : 'Onboard New Fleet Asset'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {error && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Section 1: Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-teal-400 border-b border-slate-800 pb-2">
                    Basic Info & Status
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Vessel Name</label>
                      <input 
                        type="text" 
                        required
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. KT EXPRESS"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Vessel Type</label>
                      <input 
                        type="text" 
                        required
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. ASD Tugboat"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Operational Status</label>
                      <select
                        value={status}
                        onChange={(e: any) => setStatus(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-slate-400 transition-colors"
                      >
                        <option value="Available">Available</option>
                        <option value="On Charter">On Charter</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Technical Specifications */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-teal-400 border-b border-slate-800 pb-2">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Length Overall (LOA)</label>
                      <input 
                        type="text" 
                        required
                        value={lengthOverall} 
                        onChange={(e) => setLengthOverall(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 60.00 m"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Breadth</label>
                      <input 
                        type="text" 
                        required
                        value={breadth} 
                        onChange={(e) => setBreadth(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 14.00 m"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Draft</label>
                      <input 
                        type="text" 
                        required
                        value={draft} 
                        onChange={(e) => setDraft(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 4.20 m"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Flag / Registry</label>
                      <input 
                        type="text" 
                        required
                        value={flag} 
                        onChange={(e) => setFlag(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. NIMASA Registered"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Main Engines</label>
                      <input 
                        type="text" 
                        required
                        value={mainEngines} 
                        onChange={(e) => setMainEngines(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 2 x Wärtsilä (Total 8000 BHP)"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">BHP rating</label>
                      <input 
                        type="text" 
                        required
                        value={bhp} 
                        onChange={(e) => setBhp(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 8,000 BHP"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Bollard Pull</label>
                      <input 
                        type="text" 
                        required
                        value={bollardPull} 
                        onChange={(e) => setBollardPull(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 100 Tons"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Deck Cargo Area</label>
                      <input 
                        type="text" 
                        required
                        value={deckSpace} 
                        onChange={(e) => setDeckSpace(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 400 m²"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Cargo Capacities */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-teal-400 border-b border-slate-800 pb-2">
                    Cargo / Holding Capacities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Fuel Oil (AGO) Capacity</label>
                      <input 
                        type="text" 
                        required
                        value={fuelOil} 
                        onChange={(e) => setFuelOil(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 600 m³"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Fresh Water Capacity</label>
                      <input 
                        type="text" 
                        required
                        value={freshWater} 
                        onChange={(e) => setFreshWater(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 350 m³"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Deck Cargo Capacity</label>
                      <input 
                        type="text" 
                        required
                        value={deckCargo} 
                        onChange={(e) => setDeckCargo(e.target.value)}
                        className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                        placeholder="e.g. 1,000 Metric Tons"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Safety Certifications */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-teal-400 border-b border-slate-800 pb-2">
                    Safety & Classification Certificates
                  </h4>
                  
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={newCert} 
                      onChange={(e) => setNewCert(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCert())}
                      className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                      placeholder="e.g. ABS Class +A1 Security Escort"
                    />
                    <button
                      type="button"
                      onClick={addCert}
                      className="px-4 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-xl text-sm font-bold border border-slate-700 cursor-pointer"
                    >
                      + Add Cert
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {safetyCertList.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">No certifications listed. Add some above.</span>
                    ) : (
                      safetyCertList.map((cert, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-full text-xs"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-teal-400" />
                          <span>{cert}</span>
                          <button
                            type="button"
                            onClick={() => removeCert(index)}
                            className="p-0.5 hover:bg-slate-800 rounded-full text-slate-500 hover:text-rose-400 ml-1.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Section 5: Image Media Uploads */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-teal-400 border-b border-slate-800 pb-2">
                    Vessel Imagery Media
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Primary Image Upload */}
                    <div className="flex flex-col gap-2 p-5 bg-slate-950 border border-slate-800 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wide">Primary Vessel Profile Picture</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setPrimaryImage(e.target.files ? e.target.files[0] : null)}
                        className="mt-2 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-400 hover:file:bg-slate-700"
                      />
                      {!primaryImage && editingVessel?.image && (
                        <p className="text-[10px] text-slate-500 mt-1">Existing file: {editingVessel.image.substring(editingVessel.image.lastIndexOf('/') + 1)}</p>
                      )}
                    </div>

                    {/* Gallery Upload */}
                    <div className="flex flex-col gap-2 p-5 bg-slate-950 border border-slate-800 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wide">Upload Gallery Images (Up to 10)</span>
                      </div>
                      <input 
                        type="file" 
                        multiple
                        accept="image/*"
                        onChange={(e) => setGalleryImages(e.target.files)}
                        className="mt-2 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-400 hover:file:bg-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-slate-800 pt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition-colors border border-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Asset...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Save Vessel details</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
