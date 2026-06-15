import { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  Eye, 
  X, 
  AlertCircle,
  Clock,
  Phone,
  Building2,
  Calendar,
  Anchor,
  Compass,
  MailCheck,
  CheckCircle,
  Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import type { Message } from '../../types';

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & detail views
  const [filterType, setFilterType] = useState<'all' | 'Contact' | 'Quote'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Unread' | 'Read' | 'Replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const data = await api.messages.getAll();
      setMessages(data);
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve messages.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'Unread' | 'Read' | 'Replied') => {
    setStatusUpdating(true);
    try {
      const updated = await api.messages.updateStatus(id, newStatus);
      setMessages(messages.map(m => m.id === id ? updated : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage(updated);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update message status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      await api.messages.delete(id);
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete message');
    }
  };

  // Filter logic
  const filteredMessages = messages.filter(m => {
    const matchesType = filterType === 'all' || m.messageType === filterType;
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getQuoteDetails = (msg: Message) => {
    if (!msg.quoteDetails) return null;
    try {
      return typeof msg.quoteDetails === 'string' 
        ? JSON.parse(msg.quoteDetails) 
        : msg.quoteDetails;
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-8 text-left font-sans">
      <div>
        <h1 className="font-headings font-extrabold text-3xl text-white">Operations Inbox</h1>
        <p className="text-slate-400 text-sm mt-1">Review contact inquiries and client vessel charter quotes.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] text-slate-500 uppercase">Message Type</span>
            <div className="flex bg-slate-950 p-1 border border-slate-850 rounded-xl">
              {(['all', 'Contact', 'Quote'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                    filterType === type 
                      ? 'bg-teal-500 text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Inquiry Status</span>
            <div className="flex bg-slate-950 p-1 border border-slate-850 rounded-xl">
              {(['all', 'Unread', 'Read', 'Replied'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                    filterStatus === status 
                      ? 'bg-teal-500 text-slate-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={loadMessages}
          className="px-4 py-2 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          Refresh Inbox
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-teal-400">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent"></div>
            <span className="text-xs font-mono uppercase">Retrieving messages...</span>
          </div>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-16 bg-slate-900/30 border border-slate-800 rounded-3xl text-center text-slate-400">
          <Mail className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="font-semibold text-lg text-white">Inbox is Empty</p>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto font-sans">No messages match the active filters or no forms have been submitted yet.</p>
        </div>
      ) : (
        /* Messages Table List */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Sender Details</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Topic / Service Needed</th>
                  <th className="py-4 px-6">Date Received</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                {filteredMessages.map((msg) => (
                  <tr 
                    key={msg.id}
                    className={`hover:bg-slate-950/40 transition-colors ${
                      msg.status === 'Unread' ? 'bg-slate-900/50 font-semibold text-white' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="truncate max-w-[200px]">
                        <p className="text-sm truncate">{msg.name}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{msg.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        msg.messageType === 'Quote' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {msg.messageType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="truncate max-w-[180px] block text-xs">
                        {msg.serviceNeeded || 'General Inquiry'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        msg.status === 'Unread' 
                          ? 'bg-amber-500/15 text-amber-400' 
                          : msg.status === 'Replied'
                          ? 'bg-teal-500/15 text-teal-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="Open Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all border border-rose-500/20 hover:border-transparent cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Viewer Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden text-left"
            >
              <div className="bg-slate-950 px-8 py-5 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="font-headings font-extrabold text-lg text-white">
                    Inquiry Details
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    selectedMessage.messageType === 'Quote' 
                      ? 'bg-blue-500/15 text-blue-400' 
                      : 'bg-emerald-500/15 text-emerald-400'
                  }`}>
                    {selectedMessage.messageType}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="p-1.5 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Meta details split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 p-5 border border-slate-850 rounded-2xl text-xs">
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Sender Name</span>
                      <span className="text-sm font-bold text-white block mt-0.5">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{selectedMessage.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{selectedMessage.phone || 'No phone provided'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Company</span>
                      <span className="text-sm font-bold text-white block mt-0.5 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                        {selectedMessage.company || 'Private Individual'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Requested Service</span>
                      <span className="text-xs font-semibold text-slate-300 block mt-0.5">{selectedMessage.serviceNeeded || 'General Contact'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Received: {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Scope Message */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Message / Client Comments
                  </h4>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Render Quote Details if Quote Type */}
                {selectedMessage.messageType === 'Quote' && getQuoteDetails(selectedMessage) && (() => {
                  const quote = getQuoteDetails(selectedMessage);
                  return (
                    <div className="space-y-3 border-t border-slate-800 pt-6">
                      <h4 className="text-xs uppercase font-extrabold tracking-widest text-teal-400 pb-1 flex items-center gap-1.5">
                        <Compass className="w-4 h-4" />
                        <span>Quote Wizard Specification Parameters</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-slate-950/20 p-5 border border-slate-850 rounded-2xl text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">RC Number</span>
                          <span className="font-bold text-white block mt-0.5">{quote.rcNumber || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Commencement Date</span>
                          <span className="font-bold text-white block mt-0.5 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                            {quote.startDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Expected Charter Duration</span>
                          <span className="font-bold text-white block mt-0.5">{quote.duration}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase block">Logistics Base</span>
                          <span className="font-bold text-white block mt-0.5 flex items-center gap-1.5">
                            <Anchor className="w-4 h-4 text-teal-400 shrink-0" />
                            {quote.baseOfOperation}
                          </span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-[10px] text-slate-500 uppercase block">Selected Services Grid</span>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {quote.selectedServices?.map((srv: string) => (
                              <span key={srv} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[9px] font-bold text-slate-300">
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Ticket controls */}
                <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'Read')}
                      disabled={statusUpdating || selectedMessage.status === 'Read'}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-750 disabled:bg-slate-850 disabled:text-slate-600 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <MailCheck className="w-4 h-4" />
                      <span>Mark Read</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'Replied')}
                      disabled={statusUpdating || selectedMessage.status === 'Replied'}
                      className="px-4 py-2 bg-teal-500/15 hover:bg-teal-500 hover:text-slate-950 text-teal-400 rounded-xl text-xs font-bold transition-all border border-teal-500/20 hover:border-transparent flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Replied</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 hover:border-transparent flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                    <span>Delete Ticket</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
