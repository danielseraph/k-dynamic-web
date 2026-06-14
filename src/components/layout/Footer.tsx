import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-900 text-slate-300 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Summary */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 text-white">
              <img
                src="/logo.png"
                alt="K-TECH DYNAMIC Logo"
                className="h-10 w-auto object-contain bg-white rounded p-1"
              />
              <div>
                <span className="font-headings font-bold text-lg tracking-wider block leading-none">
                  K-TECH
                </span>
                <span className="text-[10px] text-teal-accent tracking-widest block font-medium uppercase mt-0.5">
                  Dynamic Ltd
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              K-TECH DYNAMIC LTD is a fully indigenous Nigerian company providing premium integrated marine logistics, vessel chartering, offshore support, marine fuel supply, and engineering solutions to the Oil & Gas industry.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-ocean-blue hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-ocean-blue hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-ocean-blue hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-headings font-semibold text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-teal-accent">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-teal-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-teal-accent transition-colors">Vessel Fleet</Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-teal-accent transition-colors">Industries Served</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-teal-accent transition-colors">Management Team</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-accent transition-colors">Contact Office</Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-headings font-semibold text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-teal-accent">
              Our Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Marine Fuel Supply (AGO)</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Tugboat & Towage</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Barge Supply Services</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Offshore Logistics Support</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Security Escort Patrol</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-accent transition-colors">Vessel Repairs & Drydock</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-white font-headings font-semibold text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-0.5 after:bg-teal-accent">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Subscribe to our corporate mailing list to receive operational updates and company notices.
            </p>
            {subscribed ? (
              <div className="p-3 bg-teal-accent/10 border border-teal-accent/30 text-teal-accent text-sm rounded-lg">
                Subscription successful. Thank you!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-teal-accent focus:ring-1 focus:ring-teal-accent transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 bg-ocean-blue hover:bg-[#004b7c] text-white rounded-lg transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            
            {/* Direct Contacts Summary */}
            <div className="mt-6 flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-accent shrink-0" />
                <span>Apapa, Lagos & Trans-Amadi, Port Harcourt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-accent shrink-0" />
                <span>+234 9013351077 (Tel) | +234 8059312366 (WA)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-accent shrink-0" />
                <span>ktechdynamicltd@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} K-TECH DYNAMIC LTD. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">NIMASA Registered</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
