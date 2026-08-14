import React, { useState } from 'react';
import { 
  CV_PACKAGES_DATA, 
  WORK_GUARANTEES_DATA, 
  BRAND_INFO, 
  CvPackage,
  RequiredItem 
} from '../data/content';
import { 
  Check, 
  Sparkles, 
  Target, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Monitor, 
  Globe, 
  Image as ImageIcon, 
  FileText, 
  Cpu, 
  Clock, 
  RefreshCw, 
  ShieldCheck, 
  FileCheck, 
  Languages, 
  ArrowLeft, 
  MessageSquare, 
  Facebook,
  HelpCircle,
  CreditCard,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { MagneticButton } from './motion/MagneticButton';

interface CvPackagesSectionProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
}

export const CvPackagesSection: React.FC<CvPackagesSectionProps> = ({ onOpenEvaluationModal }) => {
  const [activeTab, setActiveTab] = useState<'both' | 'standard' | 'ats'>('both');
  const [selectedPackageForDetail, setSelectedPackageForDetail] = useState<'standard' | 'ats'>('ats');

  // Helper to render icon dynamically
  const renderItemIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Target':
        return <Target className={className} />;
      case 'User':
        return <User className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Monitor':
        return <Monitor className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'Image':
        return <ImageIcon className={className} />;
      case 'Languages':
        return <Languages className={className} />;
      case 'FileCheck':
        return <FileCheck className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'RefreshCw':
        return <RefreshCw className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <section id="pricing-packages" className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0C14] border-t border-b border-slate-800/80">
      
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with exact wording from uploaded design */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#9333EA]/20 text-[#C084FC] border border-[#A855F7]/30 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>باقات السير الذاتية المعتمدة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
            اختار الـ CV المناسب ليك <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-indigo-400 bg-clip-text text-transparent">
              وابدأ رحلتك نحو الفرصة !
            </span>
          </h2>

          {/* Top Feature Highlights Pill Bar (From Image Header) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141724] border border-slate-800/90 shadow-sm">
              <span className="text-[#C084FC]">✏️</span>
              <span>تصميم احترافي</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141724] border border-slate-800/90 shadow-sm">
              <span className="text-[#C084FC]">📄</span>
              <span>متوافق مع ATS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141724] border border-slate-800/90 shadow-sm">
              <span className="text-emerald-400">📈</span>
              <span>يزيد فرص قبولك</span>
            </div>
          </div>
        </div>

        {/* The Two Main Packages (CV ATS vs CV STANDARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          {CV_PACKAGES_DATA.map((pkg) => {
            const isAts = pkg.id === 'ats';
            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden bg-[#0E101A] ${
                  isAts 
                    ? 'border-[#A855F7]/60 shadow-2xl shadow-purple-950/40 lg:scale-[1.02] ring-1 ring-[#A855F7]/30' 
                    : 'border-slate-800 hover:border-indigo-500/50 shadow-xl'
                }`}
              >
                {/* Top Badge Ribbons */}
                {isAts && (
                  <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white text-[11px] font-extrabold py-1.5 px-4 text-center flex items-center justify-center gap-1.5 tracking-wider uppercase shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>الأكثر طلباً وتوافقاً مع الشركات العالمية والخليج</span>
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-6 flex-1">
                  
                  {/* Package Title & Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {pkg.title}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          isAts 
                            ? 'bg-purple-950/80 text-purple-300 border-purple-700/50' 
                            : 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {pkg.recommendedFor}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-[#141724] border border-slate-800 flex items-center justify-center text-[#C084FC] shrink-0">
                      {isAts ? <Cpu className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* Pricing Box & 50/50 Payment Rule */}
                  <div className="p-4 rounded-2xl bg-[#141724] border border-slate-800/90 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-400 font-medium">السعر الكامل:</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                          {pkg.price}
                        </span>
                        <span className="text-sm font-bold text-[#C084FC]">
                          {pkg.currency}
                        </span>
                      </div>
                    </div>

                    {/* Split Payment Guarantee (50% upfront, 50% on final approval) */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/40">
                      <CreditCard className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <strong className="block font-bold text-white mb-0.5">
                          {pkg.paymentTerm}
                        </strong>
                        <span className="text-[11px] text-emerald-200/80">
                          {pkg.paymentTermDetail}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Required Content Checklist (المحتويات المطلوبة) */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                      <h4 className="text-xs sm:text-sm font-extrabold text-white">
                        المحتويات والبيانات المطلوبة لتجهيز الـ CV:
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {pkg.requiredItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#0B0D17] border border-slate-800/90 flex items-start gap-2.5 text-right transition-colors hover:border-slate-700"
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                            item.isRequired ? 'bg-purple-950 text-purple-300 border border-purple-800/50' : 'bg-[#141724] text-slate-400'
                          }`}>
                            {renderItemIcon(item.icon, "w-3.5 h-3.5")}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-200 leading-tight">
                              {item.title}
                              {item.isRequired && <span className="text-red-400 mr-1 text-[10px]">*</span>}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package Features List (المميزات) */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C084FC]" />
                      <span>مميزات باقة {pkg.title}:</span>
                    </h4>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Bottom Action */}
                <div className="p-6 sm:p-8 pt-0 bg-[#0E101A]">
                  <MagneticButton>
                    <button
                      id={`cta-select-package-${pkg.id}`}
                      onClick={() => onOpenEvaluationModal(isAts ? 'ats-optimization' : 'cv-writing')}
                      className={`w-full py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                        isAts
                          ? 'bg-[#9333EA] hover:bg-[#A855F7] text-white shadow-purple-900/40 hover:shadow-purple-800/60'
                          : 'bg-[#1C2033] hover:bg-[#252A42] text-white border border-slate-700 hover:border-indigo-500/50'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>ابدأ تجهيز {pkg.title} الآن ({pkg.price} ج.م)</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                </div>

              </div>
            );
          })}
        </div>

        {/* Work Guarantees & Important Notes Bar (ملاحظات مهمة) */}
        <div className="rounded-3xl bg-[#0E101A] border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  ملاحظات مهمة وضمانات العمل
                </h3>
                <p className="text-xs text-slate-400">
                  جميع الخدمات تخضع لمعايير الجودة والسرية التامة مع تسليم نسختين ومراجعات مجانية.
                </p>
              </div>
            </div>
            
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
              ضمان رضا 100%
            </div>
          </div>

          {/* 5 Guarantees Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {WORK_GUARANTEES_DATA.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0B0D17] border border-slate-800/90 text-center space-y-2 flex flex-col items-center justify-center"
              >
                <div className="w-9 h-9 rounded-xl bg-[#141724] border border-slate-800 flex items-center justify-center text-[#C084FC]">
                  {renderItemIcon(item.icon, "w-4 h-4")}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.title}</div>
                  <div className="text-xs font-extrabold text-[#C084FC] mt-0.5">{item.detail}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Conversion Strip (جاهز تميز بين المتقدمين؟ + تابعنا على فيسبوك) */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#141724] to-indigo-950/60 border border-[#A855F7]/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1.5 text-center md:text-right">
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              جاهز تميز بين المتقدمين؟
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              تواصل الآن وابدأ رحلتك نحو فرصة أحلامك مع باقات Career Profile المعتمدة.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <a
              id="packages-facebook-btn"
              href={BRAND_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-[#1A1D2B] hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 transition-all text-xs font-bold flex items-center gap-2 shadow-md group"
            >
              <Facebook className="w-4 h-4 text-blue-400 group-hover:text-white" />
              <span>تابعنا على فيسبوك</span>
            </a>

            <button
              id="packages-order-now-btn"
              onClick={() => onOpenEvaluationModal()}
              className="px-6 py-3 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/40 flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>تواصل وابدأ الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
