import { useState } from 'react';
import { BRAND_INFO } from '../data/content';
import { HeroTiltCard } from './motion/HeroTiltCard';
import { MagneticButton } from './motion/MagneticButton';
import { CountUp } from './motion/CountUp';
import { WordReveal } from './motion/WordReveal';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Linkedin, 
  Briefcase, 
  TrendingUp, 
  Eye, 
  Send,
  Zap,
  Star
} from 'lucide-react';

interface HeroProps {
  onOpenEvaluationModal: () => void;
}

export const Hero = ({ onOpenEvaluationModal }: HeroProps) => {
  const [activeTab, setActiveTab] = useState<'cv' | 'ats' | 'linkedin'>('cv');

  const headlineWords = [
    { text: 'حوّل' },
    { text: 'خبرتك' },
    { text: 'وإنجازاتك' },
    { text: 'إلى' },
    { isLineBreak: true, text: '' },
    { 
      text: 'هوية مهنية وCV', 
      isGradient: true, 
      customNode: (
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">
          هوية مهنية وCV
          <svg className="absolute -bottom-2 right-0 w-full h-3 text-[#A855F7]/30 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span>
      )
    },
    { text: 'تبرز' },
    { text: 'قيمتك' },
    { text: 'وتفتح' },
    { text: 'لك' },
    { text: 'فرص' },
    { text: 'أفضل' },
  ];

  return (
    <section id="hero-section" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay for tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" 
        style={{
          backgroundImage: `radial-gradient(#a855f7 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column (in RTL): Hero Text & Main Message */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Positioning Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-slate-300">نحوّل خبرتك إلى فرص حقيقية • Professional Identity</span>
            </div>

            {/* Main Headline with word-by-word mask reveal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] sm:leading-[1.18] tracking-tight mb-6">
              <WordReveal words={headlineWords} staggerMs={60} durationMs={850} />
            </h1>

            {/* Subheadline with clear industry keyword tags */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 font-normal leading-relaxed mb-6 max-w-2xl">
              مش مجرد كتابة أو تصميم CV.. إحنا بنبني حضورك المهني المتكامل عشان تتخطى فلاتر الـ ATS وتلفت انتباه مدراء التوظيف في أول 6 ثوانٍ.
            </p>

            {/* Keyword Flow Pill Band */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 text-xs font-semibold text-slate-300">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1A1D2B] border border-slate-800 text-[#C084FC] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>CV احترافي</span>
              </span>
              <span className="text-slate-600 font-bold">➔</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1A1D2B] border border-slate-800 text-indigo-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>مهيأ للـ ATS</span>
              </span>
              <span className="text-slate-600 font-bold">➔</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1A1D2B] border border-slate-800 text-sky-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>إقناع الـ HR</span>
              </span>
              <span className="text-slate-600 font-bold">➔</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1A1D2B] border border-slate-800 text-blue-300 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </span>
              <span className="text-slate-600 font-bold">➔</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-[#1A1D2B] border border-slate-800 text-amber-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span>Portfolio</span>
              </span>
            </div>

            {/* CTAs Group with Magnetic Spring Effect */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <MagneticButton>
                <button
                  id="hero-primary-cta"
                  onClick={() => onOpenEvaluationModal()}
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 border border-purple-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-purple-200 group-hover:rotate-12 transition-transform" />
                  <span>ابدأ بتطوير الـ CV بتاعك</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  id="hero-secondary-audit-btn"
                  href="#cv-audit"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-transparent border border-slate-700 hover:border-[#A855F7] transition-all flex items-center justify-center gap-2.5 text-center"
                >
                  <span>احصل على تقييم مجاني لسيرتك الحالية</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    مجاناً
                  </span>
                </a>
              </MagneticButton>
            </div>

            {/* Trust Proof Points with Animated Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 w-full max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">مهيأ تقنياً للـ ATS</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">STAR</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">صياغة مبنية على الأثر</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">PDF + DOCX</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">نسختين قابلة للتعديل</div>
              </div>
            </div>

          </div>

          {/* Left Column (in RTL): Interactive 3D Tilt Visual Card with Radial Spotlight */}
          <div className="lg:col-span-5 relative">
            <HeroTiltCard 
              perspective={900} 
              maxTiltDeg={8}
              className="rounded-2xl bg-[#1A1D2B] border border-slate-800 p-5 sm:p-6 shadow-2xl"
            >
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 mr-2">Candidate_Profile_v3.pdf</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ATS & HR Ready
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#0A0C14] p-1 rounded-xl border border-slate-800 mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('cv')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'cv'
                      ? 'bg-[#9333EA] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  CV استراتيجي
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ats')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'ats'
                      ? 'bg-[#9333EA] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  فحص الـ ATS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('linkedin')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'linkedin'
                      ? 'bg-[#9333EA] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  تأثير LinkedIn
                </button>
              </div>

              {/* Tab 1: CV Strategy Preview */}
              {activeTab === 'cv' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-[#141721] rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold text-[#C084FC]">الملخص التنفيذي • Executive Summary</div>
                      <span className="text-[10px] text-slate-400 font-mono">STAR Model</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      قائد عمليات رقمية بخبرة 7+ سنوات في قيادة فرق متعددة التخصصات، قاد تحسين الكفاءة بنسبة <strong className="text-emerald-400 font-bold"><CountUp end={38} suffix="%" /></strong> وتخفيض تكاليف التشغيل بنسبة <strong className="text-emerald-400 font-bold"><CountUp end={140} prefix="$" suffix="K+" /></strong> سنوياً عبر اعتماد حلول الأتمتة ومنهجية Agile.
                    </p>
                  </div>

                  {/* Bullet comparison visual preview */}
                  <div className="bg-[#141721] rounded-xl p-4 border border-slate-800 space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تحويل الصياغة من روتين إلى إنجاز:</div>
                    
                    <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-800/30 text-xs text-slate-400 line-through opacity-70">
                      ✗ مسؤول عن إدارة المبيعات وتطوير الفريق والتواصل مع العملاء.
                    </div>
                    
                    <div className="p-2.5 rounded-lg bg-[#1A1D2B] border border-[#A855F7]/30 text-xs text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        ✓ تحقيق نمو مبيعات بنسبة <strong className="text-white font-bold"><CountUp end={45} suffix="% YoY" /></strong> وإدارة محفظة حسابات رئيسية بقيمة <strong className="text-white font-bold"><CountUp end={1.2} prefix="$" suffix="M" decimals={1} /></strong> في السوق الإقليمي.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: ATS Scanner Preview */}
              {activeTab === 'ats' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-[#141721] rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-200">حالة التوافق البرمجي (ATS Readiness)</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        100% تهيئة هيكلية
                      </span>
                    </div>
                    
                    {/* Metrics Bars */}
                    <div className="space-y-2.5">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>قراءة النصوص بدون أخطاء (Parsing Error Rate)</span>
                          <span className="text-emerald-400 font-mono">0% خطأ</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-emerald-500 h-1.5 rounded-full w-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>مطابقة الكلمات المفتاحية (Keywords Density)</span>
                          <span className="text-[#A855F7] font-mono"><CountUp end={94} suffix="%" /> ملائمة</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-[#9333EA] h-1.5 rounded-full w-[94%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>معايير الهيكل الموحد (Single-Column Standard)</span>
                          <span className="text-indigo-400 font-mono">100% قياسي</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div className="bg-indigo-500 h-1.5 rounded-full w-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#141721] border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#A855F7] shrink-0" />
                    <span>ملف مهيأ لأنظمة التتبع لضمان وصوله إلى مرحلة المراجعة البشرية.</span>
                  </div>
                </div>
              )}

              {/* Tab 3: LinkedIn Inbound Preview */}
              {activeTab === 'linkedin' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-[#141721] rounded-xl p-4 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[#9333EA] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        CP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Mohamed Ahmed</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                        </div>
                        <div className="text-[11px] text-[#C084FC] font-medium">
                          Senior Product Strategist | SaaS & Growth
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 bg-[#0A0C14] p-2.5 rounded-xl border border-slate-800">
                      <strong>About Story:</strong> "Building high-velocity growth engines for enterprise tech across MENA. Scaled ARR from $0 to $3.5M..."
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-[#0A0C14] border border-slate-800">
                        <div className="font-extrabold text-emerald-400 text-sm">
                          <CountUp end={4.8} prefix="+" suffix="x" decimals={1} />
                        </div>
                        <div className="text-[10px] text-slate-400">Search Appearances</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0A0C14] border border-slate-800">
                        <div className="font-extrabold text-[#A855F7] text-sm">
                          <CountUp end={3.2} suffix="x" decimals={1} />
                        </div>
                        <div className="text-[10px] text-slate-400">Recruiter Inmails</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Bottom Card Pill */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  أكثر من <CountUp end={1800} suffix="+" /> سيرة ذاتية وبروفايل مطوّر
                </span>
                <span className="text-[11px] font-mono text-slate-500">Career Profile Egypt & Gulf</span>
              </div>

            </HeroTiltCard>
          </div>

        </div>
      </div>
    </section>
  );
};

