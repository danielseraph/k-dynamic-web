import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Loader2, 
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getImageUrl } from '../../services/api';
import type { Equipment } from '../../types';

export default function EquipmentManager() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [type, setType] = useState<'Fenders' | 'Hoses' | 'Anchors' | 'Spill Response' | 'Other'>('Fenders');
  const [specs, setSpecs] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'Available' | 'Leased' | 'Maintenance'>('Available');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    setIsLoading(true);
    try {
      const data = await api.equipment.getAll();
      setEquipment(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load equipment list.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setType('Fenders');
    setSpecs('');
    setQuantity(1);
    setStatus('Available');
    setDescription('');
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Equipment) => {
    setEditingItem(item);
    setName(item.name);
    setType(item.type);
    setSpecs(item.specs);
    setQuantity(item.quantity);
    setStatus(item.status);
    setDescription(item.description);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this equipment from the roster?')) return;
    try {
      await api.equipment.delete(id);
      setEquipment(equipment.filter(e => e.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete equipment');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('specs', specs);
    formData.append('quantity', String(quantity));
    formData.append('status', status);
    formData.append('description', description);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingItem) {
        await api.equipment.update(editingItem.id, formData);
      } else {
        await api.equipment.create(formData);
      }
      setIsModalOpen(false);
      loadEquipment();
    } catch (err: any) {
      setError(err.message || 'Failed to save equipment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-headings font-extrabold text-3xl text-white">Equipment Inventory</h1>
          <p className="text-slate-400 text-sm mt-1">Manage offshore rental and leasing assets (fenders, hoses, anchors).</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/10 transition-all cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Equipment</span>
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
            <span className="text-xs font-mono uppercase">Syncing inventory...</span>
          </div>
        </div>
      ) : equipment.length === 0 ? (
        <div className="p-16 bg-slate-900/30 border border-slate-800 rounded-3xl text-center text-slate-400">
          <Cpu className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="font-semibold text-lg text-white">No Equipment Listed</p>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto font-sans">Onboard pneumatic fenders, marine hoses, or anchors for clients to rent.</p>
        </div>
      ) : (
        /* Equipment Roster Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-44 relative bg-slate-950">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'Available'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'Leased'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2 py-0.5 bg-slate-950/70 backdrop-blur-sm rounded text-[9px] font-bold text-teal-400 border border-teal-500/20">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-headings font-bold text-white mt-0.5 truncate">{item.name}</h3>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                  
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-xs">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Specifications</span>
                    <p className="text-slate-300 font-semibold mt-0.5 line-clamp-2">{item.specs}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-3">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md px-8 py-5 border-b border-slate-800 flex justify-between items-center z-10">
                <h3 className="font-headings font-extrabold text-xl text-white">
                  {editingItem ? `Edit Equipment: ${editingItem.name}` : 'Onboard New Rental Gear'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {error && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Gear / Asset Name</label>
                    <input 
                      type="text" 
                      required
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                      placeholder="e.g. Yokohama Pneumatic Fender"
                    />
                  </div>

                  {/* Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Category Category</label>
                    <select
                      value={type}
                      onChange={(e: any) => setType(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-slate-400 transition-colors"
                    >
                      <option value="Fenders">Fenders</option>
                      <option value="Hoses">Hoses</option>
                      <option value="Anchors">Anchors</option>
                      <option value="Spill Response">Spill Response</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Quantity</label>
                    <input 
                      type="number" 
                      required
                      min={1}
                      value={quantity} 
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Availability Status</label>
                    <select
                      value={status}
                      onChange={(e: any) => setStatus(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-slate-400 transition-colors"
                    >
                      <option value="Available">Available</option>
                      <option value="Leased">Leased</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Key Specifications</label>
                  <input 
                    type="text" 
                    required
                    value={specs} 
                    onChange={(e) => setSpecs(e.target.value)}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                    placeholder="e.g. Dimensions 4.5m x 9.0m, rating 50KPa, Grade-3"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Asset Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                    placeholder="Describe usage parameters, deployment guidelines..."
                  />
                </div>

                {/* Asset Image Media */}
                <div className="flex flex-col gap-2 p-5 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Asset Profile Picture</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                    className="mt-2 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-400 hover:file:bg-slate-700"
                  />
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
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Save Equipment details</span>
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
