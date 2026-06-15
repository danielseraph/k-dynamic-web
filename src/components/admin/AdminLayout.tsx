import { useState, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ship, 
  Users, 
  Mail, 
  LogOut, 
  Menu, 
  X, 
  Cpu
} from 'lucide-react';
import { api, removeToken, getToken } from '../../services/api';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const token = getToken();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Verify session
    api.auth.getMe()
      .then((user) => {
        setAdminUser(user);
      })
      .catch(() => {
        // Token invalid/expired
        removeToken();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-teal-400">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          <span className="text-sm font-semibold tracking-wider uppercase font-mono">Verifying Session...</span>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Fleet', path: '/admin/vessels', icon: Ship },
    { name: 'Manage Equipment', path: '/admin/equipment', icon: Cpu },
    { name: 'Manage Team', path: '/admin/team', icon: Users },
    { name: 'Inquiries & Messages', path: '/admin/messages', icon: Mail },
  ];

  const handleLogout = () => {
    api.auth.logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center font-bold text-slate-950 text-lg">
              K
            </div>
            <span className="font-headings font-extrabold text-sm tracking-widest text-white uppercase">
              K-TECH ADMIN
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-teal-400">
              {adminUser?.username?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{adminUser?.username || 'Administrator'}</p>
              <p className="text-[10px] text-slate-500 truncate">{adminUser?.email || 'admin@ktechdynamic.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 hover:border-transparent cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/80 backdrop-blur-sm">
          <div className="w-64 bg-slate-900 h-full flex flex-col border-r border-slate-800 animate-slide-in">
            <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
              <span className="font-headings font-extrabold text-sm tracking-widest text-white uppercase">
                K-TECH ADMIN
              </span>
              <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-grow px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Mobile Header Bar */}
        <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/30 backdrop-blur-md">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-teal-500 flex items-center justify-center font-bold text-slate-950 text-base">
              K
            </div>
            <span className="font-headings font-extrabold text-xs tracking-widest text-white uppercase">
              K-TECH
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
