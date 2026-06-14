import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Fleet', path: '/fleet' },
  { name: 'Industries', path: '/industries' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Determine if the navbar should start transparent
  // Home page or pages with big heroes start transparent, others can start solid
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent py-6'
            : 'bg-primary-navy/95 backdrop-blur-md border-b border-white/10 py-4 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group text-white">
              <img
                src="/logo.png"
                alt="K-TECH DYNAMIC Logo"
                className="h-10 w-auto object-contain bg-white rounded p-1 transition-transform group-hover:scale-105 duration-300"
              />
              <div>
                <span className="font-headings font-bold text-lg sm:text-xl tracking-wider block leading-none">
                  K-TECH
                </span>
                <span className="text-[10px] sm:text-xs text-teal-accent tracking-widest block font-medium uppercase mt-0.5">
                  Dynamic Ltd
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-sans text-sm font-semibold tracking-wide transition-colors duration-200 uppercase ${
                      isActive
                        ? 'text-teal-accent'
                        : 'text-slate-100 hover:text-teal-accent/80'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                to="/request-quote"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-orange-cta hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Request Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-slate-100 hover:text-teal-accent focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-primary-navy p-6 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-16">
                <nav className="flex flex-col gap-5">
                  {menuItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between py-3 border-b border-white/5 font-headings text-lg font-medium tracking-wide uppercase transition-colors ${
                            isActive ? 'text-teal-accent' : 'text-slate-100 hover:text-teal-accent'
                          }`
                        }
                        onClick={() => setIsMobileOpen(false)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA */}
              <div className="mb-8">
                <Link
                  to="/request-quote"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full flex items-center justify-center py-4 bg-orange-cta hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg text-center transition-colors uppercase tracking-wider"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
