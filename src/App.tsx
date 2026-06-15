import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import Portal from './pages/Portal';

// Admin Page Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminVessels from './pages/admin/VesselsManager';
import AdminTeam from './pages/admin/TeamManager';
import AdminEquipment from './pages/admin/EquipmentManager';
import AdminMessages from './pages/admin/MessagesManager';

import './App.css';

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-slate text-text-primary antialiased font-sans">
      {/* Navigation Bar */}
      <Navbar />

      {/* Dynamic Route Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      {/* Scroll to Top on Page Changes */}
      <ScrollToTop />

      {/* Global Scroll Progress Indicator */}
      <ScrollProgress />

      <Routes>
        {/* Portal Gateway Splash Route (Fullscreen) */}
        <Route path="/" element={<Portal />} />

        {/* Public Routes inside standard Shared Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/:id" element={<VesselDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-quote" element={<RequestQuote />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Console Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/vessels" element={<AdminVessels />} />
          <Route path="/admin/team" element={<AdminTeam />} />
          <Route path="/admin/equipment" element={<AdminEquipment />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </Router>
  );
}
