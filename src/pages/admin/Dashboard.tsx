import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Cpu, 
  Users, 
  Mail, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import type { Vessel, TeamMember, Equipment, Message } from '../../types';

export default function Dashboard() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [vesselsRes, teamRes, equipmentRes, messagesRes] = await Promise.all([
          api.vessels.getAll(),
          api.team.getAll(),
          api.equipment.getAll(),
          api.messages.getAll()
        ]);
        setVessels(vesselsRes);
        setTeam(teamRes);
        setEquipment(equipmentRes);
        setMessages(messagesRes);
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-teal-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent"></div>
          <span className="text-xs font-mono uppercase tracking-wider">Fetching metrics...</span>
        </div>
      </div>
    );
  }

  // Derived stats
  const onCharterCount = vessels.filter(v => v.status === 'On Charter').length;
  const availableVesselsCount = vessels.filter(v => v.status === 'Available').length;
  const maintenanceVesselsCount = vessels.filter(v => v.status === 'Maintenance').length;

  const leasedEquipCount = equipment.filter(e => e.status === 'Leased').length;
  const availableEquipCount = equipment.filter(e => e.status === 'Available').length;

  const unreadMessages = messages.filter(m => m.status === 'Unread');
  const recentMessages = messages.slice(0, 5); // display 5 most recent

  const cards = [
    {
      title: 'Vessel Fleet',
      value: vessels.length,
      desc: `${availableVesselsCount} Available • ${onCharterCount} Active`,
      icon: Ship,
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
      link: '/admin/vessels'
    },
    {
      title: 'Equipment Roster',
      value: equipment.length,
      desc: `${availableEquipCount} Available • ${leasedEquipCount} Leased`,
      icon: Cpu,
      color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400',
      link: '/admin/equipment'
    },
    {
      title: 'Team Members',
      value: team.length,
      desc: 'Management & Operations',
      icon: Users,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      link: '/admin/team'
    },
    {
      title: 'Unread Inquiries',
      value: unreadMessages.length,
      desc: `Out of ${messages.length} total messages`,
      icon: Mail,
      color: unreadMessages.length > 0 
        ? 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400' 
        : 'from-slate-500/20 to-slate-600/20 border-slate-700 text-slate-400',
      link: '/admin/messages'
    }
  ];

  return (
    <div className="space-y-10 text-left">
      <div>
        <h1 className="font-headings font-extrabold text-3xl text-white">System Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Operational analytics and content management gateway.</p>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`p-6 rounded-2xl border bg-gradient-to-br ${card.color} flex flex-col justify-between h-48`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">{card.title}</p>
                  <p className="text-4xl font-extrabold font-headings mt-2 text-white">{card.value}</p>
                </div>
                <div className="p-3 bg-slate-950/40 rounded-xl">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium">{card.desc}</span>
                <Link to={card.link} className="text-xs font-bold hover:underline flex items-center gap-0.5">
                  <span>Manage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Messages */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-headings font-bold text-xl text-white">Recent Inquiries</h2>
              <p className="text-slate-500 text-xs mt-1">Latest messages and quote tickets submitted by users.</p>
            </div>
            <Link to="/admin/messages" className="text-teal-400 hover:text-teal-300 text-xs font-bold flex items-center gap-0.5">
              <span>View All Inbox</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentMessages.length === 0 ? (
              <div className="p-8 bg-slate-950/20 border border-slate-800/40 rounded-2xl text-center text-slate-500 text-sm">
                No inquiries logged yet.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className="p-4 bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800/60 hover:border-slate-800 rounded-2xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1 text-left truncate w-full sm:max-w-[70%]">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        msg.messageType === 'Quote' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {msg.messageType}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        msg.status === 'Unread' 
                          ? 'bg-amber-500/15 text-amber-400' 
                          : msg.status === 'Replied'
                          ? 'bg-indigo-500/15 text-indigo-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{msg.name} — <span className="text-slate-400 font-normal">{msg.company || 'Private'}</span></p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{msg.message}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    <Link 
                      to="/admin/messages" 
                      className="text-[10px] text-teal-400 hover:underline font-bold mt-1 inline-block"
                    >
                      Read Detail
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Short Status Lists */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Actions */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-left">
            <h3 className="font-headings font-bold text-lg text-white mb-4">Quick Shortcuts</h3>
            <div className="flex flex-col gap-3">
              <Link
                to="/admin/vessels"
                className="w-full p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>Add New Vessel Asset</span>
                <span className="text-teal-400">+ Add</span>
              </Link>
              <Link
                to="/admin/equipment"
                className="w-full p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>Add Equipment Inventory</span>
                <span className="text-teal-400">+ Add</span>
              </Link>
              <Link
                to="/admin/team"
                className="w-full p-3 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>Onboard Team Member</span>
                <span className="text-teal-400">+ Add</span>
              </Link>
            </div>
          </div>

          {/* Fleet Status Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-left">
            <h3 className="font-headings font-bold text-lg text-white mb-4">Fleet Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Available Vessels</span>
                </span>
                <span className="font-bold text-white">{availableVesselsCount}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>On Charter</span>
                </span>
                <span className="font-bold text-white">{onCharterCount}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 text-slate-400">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>In Maintenance</span>
                </span>
                <span className="font-bold text-white">{maintenanceVesselsCount}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
