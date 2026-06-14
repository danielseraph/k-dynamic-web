import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

export default function WhatsAppButton() {
  // Prefilled message for K-TECH support line
  const whatsappUrl = 'https://wa.me/2348000000000?text=Hello%20K-TECH%20DYNAMIC%20LTD,%20I%20would%20like%20to%20inquire%20about%20your%20marine%20and%20offshore%20services.';

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact us on WhatsApp"
    >
      <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10" />
      <PhoneCall className="w-6 h-6" />
    </motion.a>
  );
}
