import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/shared/SEO';

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  company: z.string().min(2, 'Company name is required'),
  serviceNeeded: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [activeOffice, setActiveOffice] = useState<'lagos' | 'ph'>('lagos');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    console.log('Contact form submitted:', data);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  const offices = {
    lagos: {
      name: 'Lagos Head Office',
      address: '12 Marine View Close, Apapa, Lagos, Nigeria.',
      phone: '+234 9013351077 (Tel), +234 8059312366 (WhatsApp)',
      email: 'ktechdynamicltd@gmail.com',
      coord: 'Latitude: 6.4420° N, Longitude: 3.3644° E (Apapa Port District)'
    },
    ph: {
      name: 'Port Harcourt Branch Office',
      address: 'Plot 88 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria.',
      phone: '+234 9013351077 (Tel), +234 8059312366 (WhatsApp)',
      email: 'ktechdynamicltd@gmail.com',
      coord: 'Latitude: 4.8156° N, Longitude: 7.0498° E (Trans-Amadi Operations)'
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Lagos & Port Harcourt Marine Offices"
        description="Get in touch with K-TECH DYNAMIC LTD. Call our Lagos (Apapa) or Port Harcourt (Trans-Amadi) office, or submit an operational inquiry online."
      />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/10.jpeg')] bg-cover bg-center mix-blend-multiply opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Inquiries
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            Connect With K-TECH
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to charter or request marine operations support? Speak with our port and logistics coordinators today.
          </p>
        </div>
      </section>

      {/* Contact information & Form split */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Office Information & Vector Map */}
            <div className="lg:col-span-5 text-left flex flex-col gap-8">
              
              {/* Office selector */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setActiveOffice('lagos')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      activeOffice === 'lagos'
                        ? 'bg-ocean-blue text-white shadow-sm'
                        : 'text-slate-600 hover:text-primary-navy'
                    }`}
                  >
                    Lagos
                  </button>
                  <button
                    onClick={() => setActiveOffice('ph')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      activeOffice === 'ph'
                        ? 'bg-ocean-blue text-white shadow-sm'
                        : 'text-slate-600 hover:text-primary-navy'
                    }`}
                  >
                    Port Harcourt
                  </button>
                </div>

                {/* Office Details Content */}
                <div className="mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOffice}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="font-headings font-bold text-primary-navy text-lg">
                        {offices[activeOffice].name}
                      </h3>
                      
                      <div className="flex gap-3 text-slate-500 text-sm mt-2">
                        <MapPin className="w-5 h-5 text-ocean-blue shrink-0 mt-0.5" />
                        <span>{offices[activeOffice].address}</span>
                      </div>
                      
                      <div className="flex gap-3 text-slate-500 text-sm">
                        <Phone className="w-5 h-5 text-ocean-blue shrink-0 mt-0.5" />
                        <span>{offices[activeOffice].phone}</span>
                      </div>

                      <div className="flex gap-3 text-slate-500 text-sm">
                        <Mail className="w-5 h-5 text-ocean-blue shrink-0 mt-0.5" />
                        <span>{offices[activeOffice].email}</span>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        {offices[activeOffice].coord}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Vector Map Placeholder */}
              <div className="bg-primary-navy border border-white/10 rounded-2xl p-6 shadow-lg text-white relative h-64 flex flex-col justify-between overflow-hidden">
                {/* SVG pattern representing grid */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent z-10" />
                
                {/* Map Vector Simulation */}
                <div className="relative z-10">
                  <span className="text-[10px] text-teal-accent tracking-widest uppercase font-bold">Vector Map Navigation</span>
                  <h4 className="font-headings font-semibold text-sm mt-1">Operational Coverage Map</h4>
                </div>

                <div className="relative z-10 w-full flex items-center justify-center h-28 border border-white/5 bg-white/5 rounded-xl">
                  {/* Dynamic target marker based on selected office */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-teal-accent/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-teal-accent rounded-full animate-ping" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-teal-accent mt-2">
                      KT {activeOffice === 'lagos' ? 'Apapa Base' : 'PH Terminal'}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 text-[10px] text-slate-400">
                  Interactive satellite positioning and radar links active.
                </div>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm text-left">
              <h2 className="font-headings font-extrabold text-primary-navy text-2xl mb-2">
                Operational Inquiry Form
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mb-8">
                Please complete the form below. Our vessel operations desk will respond to you within 2 business hours.
              </p>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                  <h3 className="font-headings font-bold text-primary-navy text-lg">Message Sent Successfully</h3>
                  <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                    Thank you for contacting K-TECH DYNAMIC LTD. An operations manager has been assigned to your request and will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-primary-navy hover:bg-ocean-blue text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-600 uppercase">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`px-4 py-3 bg-slate-50 border ${errors.name ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                      />
                      {errors.name && <span className="text-rose-500 text-[10px] font-bold">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-600 uppercase">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`px-4 py-3 bg-slate-50 border ${errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                      />
                      {errors.email && <span className="text-rose-500 text-[10px] font-bold">{errors.email.message}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-slate-600 uppercase">Phone Number</label>
                      <input
                        id="phone"
                        type="text"
                        {...register('phone')}
                        className={`px-4 py-3 bg-slate-50 border ${errors.phone ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                      />
                      {errors.phone && <span className="text-rose-500 text-[10px] font-bold">{errors.phone.message}</span>}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-xs font-semibold text-slate-600 uppercase">Company Name</label>
                      <input
                        id="company"
                        type="text"
                        {...register('company')}
                        className={`px-4 py-3 bg-slate-50 border ${errors.company ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                      />
                      {errors.company && <span className="text-rose-500 text-[10px] font-bold">{errors.company.message}</span>}
                    </div>

                  </div>

                  {/* Service Needed dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="serviceNeeded" className="text-xs font-semibold text-slate-600 uppercase">Service Needed</label>
                    <select
                      id="serviceNeeded"
                      {...register('serviceNeeded')}
                      className={`px-4 py-3 bg-slate-50 border ${errors.serviceNeeded ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-ocean-blue transition-colors text-slate-600`}
                    >
                      <option value="">-- Select Marine Service --</option>
                      <option value="fuel-supply">Marine Fuel Supply (AGO)</option>
                      <option value="tugboats">Tugboat Services</option>
                      <option value="barges">Barge Supply Services</option>
                      <option value="offshore-logistics">Offshore Logistics Support</option>
                      <option value="rentals">Marine Equipment Rental</option>
                      <option value="security">Security Escort Services</option>
                      <option value="inspection">Vessel Inspection / Survey</option>
                      <option value="repairs">Vessel Repairs & Drydocking</option>
                      <option value="management">Vessel Management</option>
                      <option value="sales">Vessel Sales & Purchase Brokerage</option>
                    </select>
                    {errors.serviceNeeded && <span className="text-rose-500 text-[10px] font-bold">{errors.serviceNeeded.message}</span>}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-600 uppercase">Message / Requirements</label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      placeholder="Please details your operations window, vessel draft, capacity details..."
                      className={`px-4 py-3 bg-slate-50 border ${errors.message ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                    />
                    {errors.message && <span className="text-rose-500 text-[10px] font-bold">{errors.message.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 bg-orange-cta hover:bg-orange-600 disabled:bg-slate-400 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-cta/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
