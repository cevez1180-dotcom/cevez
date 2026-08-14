import { BRAND_INFO } from '../data/content';
import { 
  Facebook, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  FileText, 
  Linkedin, 
  ArrowUp,
  Sparkles
} from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0A0C14] border-t border-slate-800 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9333EA] flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-400/30">
                <span className="font-extrabold text-white text-lg tracking-tight font-sans">CP</span>
              </div>
              <div>
                <div className="font-extrabold text-lg text-white tracking-tight">Career Profile</div>
                <div className="text-xs text-[#C084FC] font-medium">كاريير بروفايل • منصة الهوية المهنية</div>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {BRAND_INFO.coreMessage}. نساعد المحترفين والباحثين عن التميز على بناء حضور مهني قوي يجتاز فلاتر الـ ATS ويجذب كبرى الشركات الإقليمية والدولية.
            </p>

            {/* Social & Contact Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-facebook-link"
                href={BRAND_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="p-2.5 rounded-xl bg-[#1A1D2B] hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-2 group"
              >
                <Facebook className="w-4 h-4 text-blue-400 group-hover:text-white" />
                <span className="text-xs font-semibold">صفحتنا على فيسبوك</span>
              </a>

              <a
                id="footer-whatsapp-link"
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="p-2.5 rounded-xl bg-[#1A1D2B] hover:bg-emerald-600 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-2 group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                <span className="text-xs font-semibold">تواصل واتساب</span>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              خدمات المنصة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#A855F7] transition-colors">
                  كتابة وتصميم CV احترافي (Hero)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#A855F7] transition-colors">
                  تحسين وتجهيز CV للـ ATS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#A855F7] transition-colors">
                  تطوير وتحسين بروفايل LinkedIn
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#A855F7] transition-colors">
                  تصميم Portfolio وإعداد دراسات الحالة
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#A855F7] transition-colors">
                  بناء الهوية المهنية (Personal Branding)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#A855F7] transition-colors">
                  خطاب التقديم المخصص (Cover Letter)
                </a>
              </li>
            </ul>
          </div>

          {/* Key Principles & Highlights */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              المعايير المعتمدة
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-[#1A1D2B] border border-slate-800">
                <div className="font-bold text-[#C084FC] mb-0.5">معايير أنظمة الـ ATS</div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  سيرتك مهيأة تقنياً 100% وفق أحدث متطلبات الفحص والتحليل البرمجي للشركات العالمية والخليجية.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1A1D2B] border border-slate-800">
                <div className="font-bold text-indigo-300 mb-0.5">تسليم ملفات كاملة</div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  ملف PDF عالي الجودة للتقديم الفوري + ملف Word قابل للتعديل والإضافة في أي وقت.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} <strong className="text-slate-400">Career Profile (كاريير بروفايل)</strong>.
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={BRAND_INFO.facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-[#A855F7] transition-colors"
            >
              فيسبوك الرسمي
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-[#A855F7] transition-colors cursor-pointer"
            >
              <span>الرجوع للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
