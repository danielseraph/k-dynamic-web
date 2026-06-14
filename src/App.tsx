import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import WhatsAppButton from './components/shared/WhatsAppButton';
import ScrollToTop from './components/shared/ScrollToTop';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Fleet from './pages/Fleet';
import VesselDetail from './pages/VesselDetail';
import Industries from './pages/Industries';
import Team from './pages/Team';
import Contact from './pages/Contact';
import RequestQuote from './pages/RequestQuote';

import './App.css';

export default function App() {
  return (
    <Router>
      {/* Scroll to Top on Page Changes */}
      <ScrollToTop />

      {/* Global Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Main Layout Wrap */}
      <div className="flex flex-col min-h-screen bg-bg-slate text-text-primary antialiased font-sans">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/fleet/:id" element={<VesselDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-quote" element={<RequestQuote />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Action Widget */}
        <WhatsAppButton />
        
      </div>
    </Router>
  );
}
