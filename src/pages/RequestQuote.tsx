import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Loader2, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/shared/SEO';
import { vesselsData } from '../data/vessels';
import { servicesData } from '../data/services';

const steps = [
  { id: 1, name: 'Company Info' },
  { id: 2, name: 'Service Selection' },
  { id: 3, name: 'Project & Logistics' },
  { id: 4, name: 'Review & Submit' }
];

export default function RequestQuote() {
  const [searchParams] = useSearchParams();
  const vesselParam = searchParams.get('vessel');
  const serviceParam = searchParams.get('service');

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    companyName: '',
    rcNumber: '',
    contactName: '',
    email: '',
    phone: '',
    // Step 2
    selectedServices: [] as string[],
    prefilledVessel: '',
    // Step 3
    startDate: '',
    duration: '',
    baseOfOperation: 'Lagos',
    details: ''
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prefill hook
  useEffect(() => {
    if (vesselParam) {
      const vessel = vesselsData.find((v) => v.id === vesselParam);
      if (vessel) {
        setFormData((prev) => ({
          ...prev,
          prefilledVessel: vessel.name,
          selectedServices: [...prev.selectedServices, vessel.type.includes('Tug') ? 'Tugboat' : vessel.type.includes('Barge') ? 'Barge' : 'Offshore Support']
        }));
      }
    }
    if (serviceParam) {
      const service = servicesData.find((s) => s.id === serviceParam);
      if (service) {
        // Map service ID to form label
        let label = 'Offshore Support';
        if (service.id === 'fuel-supply') label = 'Fuel Supply';
        if (service.id === 'tugboat-services') label = 'Tugboat';
        if (service.id === 'barge-services') label = 'Barge';
        if (service.id === 'security-escort') label = 'Marine Security';
        if (service.id === 'vessel-repairs') label = 'Vessel Repairs';
        if (service.id === 'vessel-management') label = 'Vessel Management';

        setFormData((prev) => ({
          ...prev,
          selectedServices: [...prev.selectedServices, label]
        }));
      }
    }
  }, [vesselParam, serviceParam]);

  // Field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Checkbox toggling
  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const selected = prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: selected };
    });
    if (errors.selectedServices) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.selectedServices;
        return copy;
      });
    }
  };

  // Step validation
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Contact person name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (formData.selectedServices.length === 0) {
        newErrors.selectedServices = 'Please select at least one marine service';
      }
    }

    if (step === 3) {
      if (!formData.startDate) newErrors.startDate = 'Project start date is required';
      if (!formData.duration.trim()) newErrors.duration = 'Expected charter duration is required';
      if (!formData.details.trim()) newErrors.details = 'Project description details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitQuote = async () => {
    setIsSubmitting(true);
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsSubmitting(false);
    setSuccess(true);
  };

  const resetWizard = () => {
    setFormData({
      companyName: '',
      rcNumber: '',
      contactName: '',
      email: '',
      phone: '',
      selectedServices: [],
      prefilledVessel: '',
      startDate: '',
      duration: '',
      baseOfOperation: 'Lagos',
      details: ''
    });
    setSuccess(false);
    setCurrentStep(1);
  };

  const marineServices = [
    'Fuel Supply',
    'Tugboat',
    'Barge',
    'Offshore Support',
    'Vessel Inspection',
    'Vessel Repairs',
    'Vessel Management',
    'Marine Equipment'
  ];

  return (
    <>
      <SEO
        title="Request a Quote - Offshore Chartering & Bunkering"
        description="Submit a detailed maritime service or vessel charter request using K-TECH DYNAMIC LTD's multi-step quote wizard."
      />

      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 bg-primary-navy text-white text-center">
        <div className="absolute inset-0 bg-[url('/10.jpeg')] bg-cover bg-center mix-blend-multiply opacity-25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="px-3 py-1 bg-teal-accent/15 text-teal-accent text-xs font-semibold uppercase rounded-full tracking-wider">
            Procurement
          </span>
          <h1 className="text-4xl sm:text-5xl font-headings font-extrabold mt-3 tracking-tight">
            Vessel Charter & Service Quote
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Please fill in the project requirements below. Our commercial department will review the specs and provide a draft charter party or tariff list.
          </p>
        </div>
      </section>

      {/* Form Wizard */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {/* Step Progress indicators */}
          <div className="flex justify-between items-center mb-12 relative">
            <div className="absolute left-0 right-0 h-1 bg-slate-200 top-4 -z-10" />
            {steps.map((s) => {
              const active = s.id === currentStep;
              const done = s.id < currentStep || success;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full font-headings font-bold text-sm border-2 flex items-center justify-center transition-all ${
                      done
                        ? 'bg-teal-accent text-primary-navy border-teal-accent'
                        : active
                        ? 'bg-ocean-blue text-white border-ocean-blue scale-105 shadow-md'
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    {done ? <Check className="w-5 h-5" /> : s.id}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${active || done ? 'text-primary-navy' : 'text-slate-400'}`}>
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content card */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-8 sm:p-10 shadow-sm text-left min-h-[380px] flex flex-col justify-between">
            
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-6 py-8"
              >
                <ClipboardCheck className="w-20 h-20 text-teal-accent" />
                <h3 className="font-headings font-extrabold text-2xl text-primary-navy">
                  Charter Request Submitted
                </h3>
                <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                  Your quote ticket has been generated. K-TECH's commercial charter team has received the specifications and will issue a formal response with tariff details within 2 hours.
                </p>
                <div className="flex gap-4 mt-4">
                  <Link
                    to="/fleet"
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-primary-navy font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Return to Fleet
                  </Link>
                  <button
                    onClick={resetWizard}
                    className="px-6 py-3 bg-primary-navy hover:bg-ocean-blue text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  >
                    New Quote Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                <AnimatePresence mode="wait">
                  {/* STEP 1: COMPANY INFO */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col gap-5"
                    >
                      <h3 className="font-headings font-bold text-primary-navy text-lg border-b border-slate-100 pb-3">
                        Company & Representative Details
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Company Legal Name</label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`px-4 py-3 bg-slate-50 border ${errors.companyName ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                          />
                          {errors.companyName && <span className="text-rose-500 text-[10px] font-bold">{errors.companyName}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Corporate RC Number (Optional)</label>
                          <input
                            type="text"
                            name="rcNumber"
                            value={formData.rcNumber}
                            onChange={handleChange}
                            placeholder="RC-XXXXXX"
                            className="px-4 py-3 bg-slate-50 border border-slate-200 focus:border-ocean-blue rounded-xl text-sm focus:outline-none transition-colors text-slate-700"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Contact Representative</label>
                          <input
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleChange}
                            className={`px-4 py-3 bg-slate-50 border ${errors.contactName ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                          />
                          {errors.contactName && <span className="text-rose-500 text-[10px] font-bold">{errors.contactName}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Official Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`px-4 py-3 bg-slate-50 border ${errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                          />
                          {errors.email && <span className="text-rose-500 text-[10px] font-bold">{errors.email}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Direct Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`px-4 py-3 bg-slate-50 border ${errors.phone ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                          />
                          {errors.phone && <span className="text-rose-500 text-[10px] font-bold">{errors.phone}</span>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: SERVICE SELECTION */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col gap-5"
                    >
                      <h3 className="font-headings font-bold text-primary-navy text-lg border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span>Marine Services Needed</span>
                        {formData.prefilledVessel && (
                          <span className="text-xs px-2.5 py-1 bg-teal-accent/20 text-ocean-blue rounded font-bold font-sans uppercase">
                            Prefilled: {formData.prefilledVessel}
                          </span>
                        )}
                      </h3>

                      <p className="text-xs text-slate-400">Select all capabilities required for your upcoming logistics or construction window:</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {marineServices.map((service) => {
                          const checked = formData.selectedServices.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleServiceToggle(service)}
                              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                                checked
                                  ? 'bg-ocean-blue/5 border-ocean-blue text-primary-navy'
                                  : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                checked ? 'bg-ocean-blue border-ocean-blue text-white' : 'bg-white border-slate-300'
                              }`}>
                                {checked && <Check className="w-3 h-3" />}
                              </div>
                              <span className="text-xs font-bold font-sans">{service}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.selectedServices && <span className="text-rose-500 text-[10px] font-bold">{errors.selectedServices}</span>}
                    </motion.div>
                  )}

                  {/* STEP 3: PROJECT & LOGISTICS */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col gap-5"
                    >
                      <h3 className="font-headings font-bold text-primary-navy text-lg border-b border-slate-100 pb-3">
                        Project Timelines & Logistics Base
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Commencement Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={`px-4 py-3 bg-slate-50 border ${errors.startDate ? 'border-rose-400' : 'border-slate-200'} rounded-xl text-sm focus:outline-none focus:border-ocean-blue text-slate-600`}
                          />
                          {errors.startDate && <span className="text-rose-500 text-[10px] font-bold">{errors.startDate}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Charter Duration / Volume</label>
                          <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g. 30 Days Firm / 500,000 Liters"
                            className={`px-4 py-3 bg-slate-50 border ${errors.duration ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                          />
                          {errors.duration && <span className="text-rose-500 text-[10px] font-bold">{errors.duration}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Base of Operation</label>
                          <select
                            name="baseOfOperation"
                            value={formData.baseOfOperation}
                            onChange={handleChange}
                            className="px-4 py-3 bg-slate-50 border border-slate-200 focus:border-ocean-blue rounded-xl text-sm focus:outline-none text-slate-600"
                          >
                            <option value="Lagos">Lagos (Apapa Anchorage/Portside)</option>
                            <option value="Port Harcourt">Port Harcourt (Trans-Amadi/Onne)</option>
                            <option value="Warri">Warri Escravos Operations</option>
                            <option value="Offshore Basin">Offshore Deep Water Basin</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Project Description & Draft Limits</label>
                          <textarea
                            name="details"
                            rows={4}
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Describe rig specs, cargo tonnage, discharge rates..."
                            className={`px-4 py-3 bg-slate-50 border ${errors.details ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 focus:border-ocean-blue'} rounded-xl text-sm focus:outline-none transition-colors text-slate-700`}
                          />
                          {errors.details && <span className="text-rose-500 text-[10px] font-bold">{errors.details}</span>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: REVIEW & SUBMIT */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col gap-5 text-slate-700"
                    >
                      <h3 className="font-headings font-bold text-primary-navy text-lg border-b border-slate-100 pb-3">
                        Review Charter Request Specifications
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs mt-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Company Name</span>
                          <span className="font-bold text-slate-700 block">{formData.companyName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">RC Number</span>
                          <span className="font-bold text-slate-700 block">{formData.rcNumber || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Contact Representative</span>
                          <span className="font-bold text-slate-700 block">{formData.contactName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Email / Phone</span>
                          <span className="font-bold text-slate-700 block">{formData.email} / {formData.phone}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Services Requested</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {formData.selectedServices.map((s) => (
                              <span key={s} className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded text-[10px] font-semibold text-slate-600 uppercase">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Commencement Date</span>
                          <span className="font-bold text-slate-700 block">{formData.startDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Charter Duration / Volume</span>
                          <span className="font-bold text-slate-700 block">{formData.duration}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Base of Operations</span>
                          <span className="font-bold text-slate-700 block">{formData.baseOfOperation}</span>
                        </div>
                        <div className="sm:col-span-2 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase font-medium">Scope Details</span>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-wrap">{formData.details}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Controls inside card footer */}
                <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between gap-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-primary-navy rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  )}
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto px-6 py-3 bg-ocean-blue hover:bg-[#004b7c] text-white rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitQuote}
                      disabled={isSubmitting}
                      className="ml-auto px-8 py-3 bg-orange-cta hover:bg-orange-600 disabled:bg-slate-400 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </>
  );
}
