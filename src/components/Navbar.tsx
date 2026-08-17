import { useState, useEffect, useRef } from 'react';
import { BRAND_INFO } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { 
  Menu, 
  X, 
  MessageSquare, 
  ArrowLeft, 
  Sparkles, 
  HardDrive, 
  User as UserIcon, 
  LogIn, 
  UserPlus, 
  LogOut, 
  LayoutDashboard, 
  Settings,
  ChevronDown
} from 'lucide-react';
import { getAccessToken, initAuth } from '../services/googleAuth';
import { User as FirebaseUser } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
  onOpenDriveHub: () => void;
  onNavigate?: (route: string) => void;
  currentRoute?: string;
}

export const Navbar = ({ 
  onOpenEvaluationModal, 
  onOpenDriveHub,
  onNavigate = () => {},
  currentRoute = '/'
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);

  const { user, profile, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => setGoogleUser(user),
      () => setGoogleUser(null)
    );
    return () => unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await signOut();
    onNavigate('/login');
  };

  const navLinks = [
    { label: 'الرئيسية', href: '#', isRoute: true, route: '/' },
    { label: 'فضاء 3D', href: '#sphere-3d-gallery' },
    { label: 'عجلة 360°', href: '#wheel-navigator' },
    { label: 'الباقات والأسعار', href: '#pricing-packages' },
    { label: 'الخدمات', href: '#services' },
    { label: 'ليه إحنا؟', href: '#why-us' },
    { label: 'قبل وبعد', href: '#before-after' },
    { label: 'تقييم مجاني', href: '#cv-audit' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'حسابي';

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentRoute !== '/'
          ? 'bg-[#0A0C14]/95 backdrop-blur-md border-b border-slate-800 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('/')}
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none cursor-pointer bg-transparent border-0 text-right p-0"
          >
            <div className="w-10 h-10 bg-[#9333EA] rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform duration-200">
              CP
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#F8FAFC]">Career Profile</span>
              <span className="text-[10px] text-[#A855F7] tracking-[0.2em] uppercase font-semibold">
                Professional Identity Platform
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.isRoute) {
                    onNavigate(link.route || '/');
                  } else {
                    if (currentRoute !== '/') {
                      onNavigate('/');
                      setTimeout(() => {
                        const el = document.querySelector(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.querySelector(link.href);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="text-xs font-medium text-slate-400 hover:text-[#A855F7] px-3 py-1.5 rounded-full hover:bg-slate-800/60 transition-colors duration-150 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right CTA & Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Google Drive Integration Button */}
            <button
              id="nav-google-drive-btn"
              onClick={onOpenDriveHub}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-[#141724] border border-slate-800 hover:border-purple-500/50 hover:text-white transition-all cursor-pointer group"
              title="مركز ملفات Google Drive"
            >
              <HardDrive className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Google Drive™</span>
              {googleUser && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="متصل بسحابة Drive" />
              )}
            </button>

            {/* Supabase User Auth State */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#1A1D2B] border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer shadow-md"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-black overflow-hidden">
                    {profile?.avatar_url || user.user_metadata?.avatar_url ? (
                      <img
                        src={profile?.avatar_url || user.user_metadata?.avatar_url}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="max-w-[100px] truncate text-slate-200 font-medium">{displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-[#141724] border border-purple-500/30 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 text-right">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="text-xs font-bold text-white truncate">{displayName}</div>
                      <div className="text-[10px] text-slate-400 truncate font-mono" dir="ltr">{user.email}</div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('/dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-purple-950/50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-purple-400" />
                      <span>لوحة التحكم (Dashboard)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('/dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-purple-950/50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-indigo-400" />
                      <span>الملف المهني (Profile)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDriveHub();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-purple-950/50 transition-colors"
                    >
                      <HardDrive className="w-4 h-4 text-amber-400" />
                      <span>سحابة Google Drive™</span>
                    </button>

                    <div className="border-t border-slate-800 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-950/40 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="nav-login-btn"
                  onClick={() => onNavigate('/login')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-[#141724] border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-purple-400" />
                  <span>تسجيل الدخول</span>
                </button>

                <button
                  id="nav-register-btn"
                  onClick={() => onNavigate('/register')}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-purple-200 hover:text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 transition-all cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>إنشاء حساب</span>
                </button>
              </div>
            )}

            <MagneticButton>
              <button
                id="nav-primary-cta"
                onClick={() => onOpenEvaluationModal()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 border border-purple-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>تقييم مجاني</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu & Auth Quick Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {user ? (
              <button
                onClick={() => onNavigate('/dashboard')}
                className="p-2 rounded-xl text-purple-400 bg-[#1A1D2B] border border-purple-500/40 flex items-center justify-center"
                title="لوحة التحكم"
              >
                <LayoutDashboard className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/login')}
                className="p-2 rounded-xl text-purple-400 bg-[#1A1D2B] border border-slate-800 flex items-center justify-center"
                title="تسجيل الدخول"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onOpenDriveHub}
              className="p-2 rounded-xl text-purple-400 bg-[#1A1D2B] border border-slate-800 flex items-center justify-center"
              title="Google Drive"
            >
              <HardDrive className="w-5 h-5" />
            </button>
            
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#1A1D2B] border border-slate-800 focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0C14] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in slide-in-from-top duration-200">
          
          {/* User Status Bar inside Mobile Menu */}
          {user ? (
            <div className="p-3 rounded-2xl bg-[#141724] border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-white">{displayName}</div>
                  <div className="text-[10px] text-slate-400 font-mono" dir="ltr">{user.email}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/dashboard');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600"
              >
                لوحة التحكم
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/login');
                }}
                className="py-2.5 rounded-xl text-xs font-bold text-white bg-[#1A1D2B] border border-slate-700 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-purple-400" />
                <span>تسجيل الدخول</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/register');
                }}
                className="py-2.5 rounded-xl text-xs font-bold text-purple-200 bg-purple-950/60 border border-purple-700/50 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>إنشاء حساب</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.isRoute) {
                    onNavigate(link.route || '/');
                  } else {
                    if (currentRoute !== '/') {
                      onNavigate('/');
                      setTimeout(() => {
                        const el = document.querySelector(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.querySelector(link.href);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="text-xs font-medium text-slate-300 hover:text-[#A855F7] py-2 px-3 rounded-lg bg-[#1A1D2B] border border-slate-800 text-center"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDriveHub();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-purple-300 bg-purple-950/40 border border-purple-800/60 flex items-center justify-center gap-2"
            >
              <HardDrive className="w-4 h-4 text-purple-400" />
              <span>مركز ملفات Google Drive</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEvaluationModal();
              }}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>ابدأ بتطوير الـ CV الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>تواصل مباشر عبر واتساب</span>
            </a>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-red-300 bg-red-950/30 border border-red-800/40 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج من الحساب</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

