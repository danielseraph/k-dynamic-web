import { useState, useEffect } from 'react';
import { 
  Users, 
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
import type { TeamMember } from '../../types';

export default function TeamManager() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState<'executive' | 'management' | 'supervisory'>('management');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [responsibilityList, setResponsibilityList] = useState<string[]>([]);
  const [newResponsibility, setNewResponsibility] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    setIsLoading(true);
    try {
      const data = await api.team.getAll();
      setTeam(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load team roster.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingMember(null);
    setName('');
    setRole('');
    setCategory('management');
    setBio('');
    setExperience('');
    setResponsibilityList([]);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setCategory(member.category);
    setBio(member.bio);
    setExperience(member.experience);
    
    // Parse responsibilities
    let resp: string[] = [];
    try {
      resp = typeof member.responsibilities === 'string' 
        ? JSON.parse(member.responsibilities) 
        : member.responsibilities;
    } catch {
      resp = [];
    }
    setResponsibilityList(resp);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const addResponsibility = () => {
    if (newResponsibility.trim() && !responsibilityList.includes(newResponsibility.trim())) {
      setResponsibilityList([...responsibilityList, newResponsibility.trim()]);
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    setResponsibilityList(responsibilityList.filter((_, i) => i !== index));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this profile from team records?')) return;
    try {
      await api.team.delete(id);
      setTeam(team.filter(t => t.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete team profile');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('category', category);
    formData.append('bio', bio);
    formData.append('experience', experience);
    formData.append('responsibilities', JSON.stringify(responsibilityList));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingMember) {
        await api.team.update(editingMember.id, formData);
      } else {
        await api.team.create(formData);
      }
      setIsModalOpen(false);
      loadTeam();
    } catch (err: any) {
      setError(err.message || 'Failed to save team member details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-headings font-extrabold text-3xl text-white">Team Management</h1>
          <p className="text-slate-400 text-sm mt-1">Configure company profiles, executives, and onboard supervisors.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/10 transition-all cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
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
            <span className="text-xs font-mono uppercase">Retrieving team...</span>
          </div>
        </div>
      ) : team.length === 0 ? (
        <div className="p-16 bg-slate-900/30 border border-slate-800 rounded-3xl text-center text-slate-400 font-sans">
          <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="font-semibold text-lg text-white">No Profiles Found</p>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Get started by clicking the "Add Team Member" button to add board members and staff.</p>
        </div>
      ) : (
        /* Team Members Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div 
              key={member.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-56 relative bg-slate-950">
                  <img 
                    src={getImageUrl(member.image)} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-teal-500/20 text-teal-400 border border-teal-500/30">
                      {member.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 text-left">
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{member.name}</h3>
                    <p className="text-xs text-teal-400 font-semibold mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{member.experience}</p>
                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mt-2">{member.bio}</p>
                </div>
              </div>

              <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="px-3.5 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 hover:border-transparent flex items-center justify-center cursor-pointer"
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
                  {editingMember ? `Edit Member: ${editingMember.name}` : 'Onboard Team Member'}
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
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                      placeholder="e.g. Capt. Ofem Nneoyi"
                    />
                  </div>

                  {/* Role */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Corporate Role</label>
                    <input 
                      type="text" 
                      required
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                      placeholder="e.g. Master Mariner / Operations Manager"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Staff Category</label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-slate-400 transition-colors"
                    >
                      <option value="executive">Executive Board</option>
                      <option value="management">Management</option>
                      <option value="supervisory">Supervisory Staff</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Experience duration</label>
                    <input 
                      type="text" 
                      required
                      value={experience} 
                      onChange={(e) => setExperience(e.target.value)}
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                      placeholder="e.g. 15+ Years Sea Experience"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Professional Bio</label>
                  <textarea 
                    required
                    rows={3}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                    placeholder="Provide professional details, education or background achievements..."
                  />
                </div>

                {/* Responsibilities list */}
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">List Key Responsibilities</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newResponsibility} 
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                      className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl text-sm focus:outline-none text-white transition-colors"
                      placeholder="e.g. Coordinating daily vessel dispatch schedules"
                    />
                    <button
                      type="button"
                      onClick={addResponsibility}
                      className="px-4 bg-slate-800 hover:bg-slate-700 text-teal-400 rounded-xl text-sm font-bold border border-slate-700 cursor-pointer animate-pulse"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 pt-1.5 max-h-40 overflow-y-auto">
                    {responsibilityList.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">No responsibilities listed. Add some above.</span>
                    ) : (
                      responsibilityList.map((resp, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800/60 rounded-xl text-xs text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <FileCheck className="w-4 h-4 text-teal-400 shrink-0" />
                            <span>{resp}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeResponsibility(index)}
                            className="p-1 hover:bg-slate-850 rounded-full text-slate-500 hover:text-rose-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Profile Image upload */}
                <div className="flex flex-col gap-2 p-5 bg-slate-950 border border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Upload Profile Image</span>
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
                        <span>Saving Profile...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Save Profile details</span>
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
