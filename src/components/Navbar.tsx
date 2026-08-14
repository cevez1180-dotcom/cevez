import { useState, useEffect } from 'react';
import { BRAND_INFO } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { Menu, X, MessageSquare, ArrowLeft, Sparkles, HardDrive } from 'lucide-react';
import { getAccessToken, initAuth } from '../services/googleAuth';
import { User } from 'firebase/auth';

interface NavbarProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
  onOpenDriveHub: () => void;
}

export const Navbar = ({ onOpenEvaluationModal, onOpenDriveHub }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);

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

  const navLinks = [
    { label: 'عجلة 360°', href: '#wheel-navigator' },
    { label: 'الباقات والأسعار', href: '#pricing-packages' },
    { label: 'الخدمات', href: '#services' },
    { label: 'رحلة الهوية', href: '#journey' },
    { label: 'ليه إحنا؟', href: '#why-us' },
    { label: 'قبل وبعد', href: '#before-after' },
    { label: 'تقييم مجاني', href: '#cv-audit' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0C14]/95 backdrop-blur-md border-b border-slate-800 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
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
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-[#A855F7] px-3.5 py-1.5 rounded-full hover:bg-slate-800/60 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Google Drive Integration Button */}
            <button
              id="nav-google-drive-btn"
              onClick={onOpenDriveHub}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-[#141724] border border-slate-800 hover:border-purple-500/50 hover:text-white transition-all cursor-pointer group"
              title="مركز ملفات Google Drive"
            >
              <HardDrive className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Google Drive™</span>
              {googleUser && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="متصل بسحابة Drive" />
              )}
            </button>

            <a
              id="nav-whatsapp-btn"
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-transparent border border-slate-700 hover:border-[#A855F7] hover:text-white transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>تواصل واتساب</span>
            </a>

            <MagneticButton>
              <button
                id="nav-primary-cta"
                onClick={() => onOpenEvaluationModal()}
                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 border border-purple-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>قيّم سيرتك مجاناً</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
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
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-[#A855F7] py-2 px-3 rounded-lg bg-[#1A1D2B] border border-slate-800 text-center"
              >
                {link.label}
              </a>
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
              <span>فتح مركز ملفات Google Drive</span>
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
          </div>
        </div>
      )}
    </header>
  );
};
