import { useState, useRef, CSSProperties } from 'react';
import { MagneticButton } from './motion/MagneticButton';
import { 
  FileText, 
  Cpu, 
  Linkedin, 
  Briefcase, 
  Mail, 
  Award, 
  FileCheck2, 
  UserCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Zap,
  TrendingUp
} from 'lucide-react';

interface WheelPillar {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
  badge: string;
  description: string;
  keyPoints: string[];
  metric: string;
  metricLabel: string;
  icon: typeof FileText;
  serviceId?: string;
  actionText: string;
}

const PILLARS: WheelPillar[] = [
  {
    id: 'cv-writing',
    title: 'كتابة الـ CV',
    englishTitle: 'Strategic CV Writing',
    category: 'الأساس المهني',
    badge: 'الخدمة الأكثر طلباً 🥇',
    description: 'صياغة شاملة لسيرتك الذاتية من الصفر بنموذج STAR/CAR لتحويل المهام الروتينية إلى إنجازات رقمية ذات أثر مالي وتشغيلي واضح.',
    keyPoints: [
      'ملخص تنفيذي يبرز قيمتك من أول 6 ثوانٍ',
      'صياغة متوافقة مع معايير كبرى الشركات بمصر والخليج',
      'تسليم نسختين: PDF جاهز و Word قابل للتعديل'
    ],
    metric: '3.8x',
    metricLabel: 'معدل استدعاء للمقابلات',
    icon: FileText,
    serviceId: 'cv-writing',
    actionText: 'اطلب كتابة وتطوير سيرتك'
  },
  {
    id: 'ats-optimization',
    title: 'تهيئة للـ ATS',
    englishTitle: 'ATS Optimization',
    category: 'البوابة التقنية',
    badge: '90%+ Match Rate ⚡',
    description: 'إعادة بناء وتنسيق ملفك ليجتاز خوارزميات أنظمة التتبع الذكية (Workday, Taleo, Greenhouse) بدون أي مشاكل في استخلاص البيانات.',
    keyPoints: [
      'تضمين الكلمات المفتاحية الذكية حسب تخصصك',
      'هيكل أحادي العمود بدون جداول تسبب أخطاء تحليلية',
      'فحص تطابق المسميات الوظيفية المستهدفة'
    ],
    metric: '95%+',
    metricLabel: 'نسبة اجتياز فلاتر ATS',
    icon: Cpu,
    serviceId: 'ats-optimization',
    actionText: 'جهّز سيرتك لأنظمة الـ ATS'
  },
  {
    id: 'linkedin-profile',
    title: 'بروفايل LinkedIn',
    englishTitle: 'LinkedIn All-Star',
    category: 'المغناطيس الرقمي',
    badge: 'Recruiter Inbound 🎯',
    description: 'تحويل صفحتك على لينكد إن إلى واجهة جذب احترافية تجعل الـ Headhunters ومدراء التوظيف يبحثون عنك بدلاً من البحث عنهم.',
    keyPoints: [
      'Headline و About ذكي يعكس خبرتك الإنسانية والتقنية',
      'تحسين الكلمات البحثية لرفع ترتيبك في نتائج البحث',
      'استراتيجية تفعيل البروفايل وبناء شبكة علاقات قوية'
    ],
    metric: '+4.8x',
    metricLabel: 'ظهور في بحث التوظيف',
    icon: Linkedin,
    serviceId: 'linkedin-optimization',
    actionText: 'طوّر بروفايل لينكد إن'
  },
  {
    id: 'portfolio-design',
    title: 'البورتفوليو',
    englishTitle: 'Portfolio & Proof',
    category: 'دليل الكفاءة',
    badge: 'Visual Case Studies 💼',
    description: 'تنظيم وتوثيق سابقة أعمالك ومشاريعك في ملف أو منصة رقمية أنيقة تشرح التحدي، الحل، والنتائج الواقعية التي حققتها.',
    keyPoints: [
      'صياغة دراسات حالة (Case Studies) مفصلة',
      'تنسيق بصري جذاب للمطورين والمصممين والمدراء',
      'روابط مباشرة وأدلة عملية على إنجازاتك'
    ],
    metric: '100%',
    metricLabel: 'إثبات عملي ملموس',
    icon: Briefcase,
    serviceId: 'portfolio-design',
    actionText: 'صمم بورتفوليو احترافي'
  },
  {
    id: 'cover-letter',
    title: 'خطاب التقديم',
    englishTitle: 'Cover Letter',
    category: 'الخطاب الإقناعي',
    badge: 'Tailored Pitch ✉️',
    description: 'خطاب مخصص ومركّز يربط خبراتك السابقة بالمتطلبات المحددة للوظيفة التي تستهدفها، بنبرة واثقة وبعيدة عن الكليشيهات المكررة.',
    keyPoints: [
      'ربط مباشر بين نقاط قوتك وتحديات الشركة المستهدفة',
      'نبرة مهنية راقية تجذب انتباه مدير القسم المعني',
      'قابل للتخصيص السريع للفرص المختلفة'
    ],
    metric: '2.5x',
    metricLabel: 'قوة إقناع إضافية',
    icon: Mail,
    actionText: 'اطلب خطاب تقديم مخصص'
  },
  {
    id: 'personal-branding',
    title: 'الهوية المهنية',
    englishTitle: 'Personal Branding',
    category: 'الصوت والسمعة',
    badge: 'Executive Presence ⭐',
    description: 'رسم استراتيجية متكاملة لترسيخ مكانتك كمرجع وخبير في مجالك، من تحديد صوتك المهني وصورتك الذهنية وحتى استراتيجية المحتوى.',
    keyPoints: [
      'تحديد القيمة التنافسية الفريدة (USP) الخاصة بك',
      'رسائل تعريفية موحدة عبر كافة المنصات الرقمية',
      'خطة نشر وتفاعل لبناء حضور تنفيذي مؤثر'
    ],
    metric: 'Top 1%',
    metricLabel: 'حضور ذهني ريادي',
    icon: Award,
    serviceId: 'personal-branding',
    actionText: 'ابنِ هويتك المهنية المتكاملة'
  },
  {
    id: 'cv-diagnostic',
    title: 'فحص الـ CV',
    englishTitle: 'Free CV Audit',
    category: 'التقييم المجاني',
    badge: 'فحص فوري مجاني 🔍',
    description: 'تحليل دقيق لسيرتك الذاتية الحالية لتحديد نقاط القوة، فجوات الـ ATS، ونقاط الضعف التي قد تمنعك من الوصول لمرحلة المقابلة.',
    keyPoints: [
      'تقرير فوري يوضح جاهزية سيرتك ومطابقتها',
      'اقتراحات عملية وسريعة للتحسين والتطوير',
      'إمكانية الإرسال المباشر للمراجعة مع خبرائنا'
    ],
    metric: '1 Min',
    metricLabel: 'تشخيص سريع مجاني',
    icon: FileCheck2,
    actionText: 'افحص سيرتك الذاتية الآن'
  },
  {
    id: 'career-consultation',
    title: 'استشارة مهنية',
    englishTitle: '1-on-1 Consultation',
    category: 'التوجيه المباشر',
    badge: 'جلسة توجيه خاصة 🤝',
    description: 'جلسة استشارية فردية لمناقشة مسارك المهني، مراجعة نقاط القوة، وكيفية التفاوض على العروض الوظيفية والاستعداد للمقابلات.',
    keyPoints: [
      'تحديد المسار والخطوات التالية لتطوير راتبك',
      'تدريب عملي على الإجابة على الأسئلة المعقدة',
      'تجهيز استراتيجية البحث والتفاوض المالي'
    ],
    metric: '+50%',
    metricLabel: 'جاهزية أعلى للتفاوض',
    icon: UserCheck,
    actionText: 'احجز استشارة مع خبيرنا'
  }
];

interface WheelNavigationProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
}

export const WheelNavigation = ({ onOpenEvaluationModal }: WheelNavigationProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const totalStops = PILLARS.length; // 8
  const step = 360 / totalStops; // 45deg
  const liveRef = useRef<HTMLParagraphElement>(null);

  const activePillar = PILLARS[activeIdx];
  const ActiveIcon = activePillar.icon;

  const goTo = (idx: number) => {
    // Wrap index between 0 and 7
    const normalizedIdx = ((idx % totalStops) + totalStops) % totalStops;
    const target = -normalizedIdx * step;
    
    // Calculate shortest rotational distance
    let currentRotMod = ((rotation % 360) + 360) % 360;
    if (currentRotMod === 360) currentRotMod = 0;
    
    let delta = target - currentRotMod;
    delta = ((delta % 360) + 540) % 360 - 180;
    
    const newRot = rotation + delta;
    setRotation(newRot);
    setActiveIdx(normalizedIdx);

    if (liveRef.current) {
      liveRef.current.textContent = `${PILLARS[normalizedIdx].title} selected`;
    }
  };

  return (
    <section 
      id="wheel-navigator" 
      className="relative py-20 lg:py-28 overflow-hidden bg-[#0A0C14] border-y border-slate-800/80"
      aria-label="360 degree wheel navigation"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4F46E5]/08 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D2B] border border-[#A855F7]/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC] animate-pulse" />
            <span className="text-xs font-bold text-slate-200">
              عجلة الهوية المهنية التفاعلية • 360° Navigation Wheel
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            استكشف المحطات الـ 8 لبناء <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">حضورك المهني الكامل</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            اضغط على أي قسم في العجلة أو استخدم أزرار التوجيه لتصفح عناصر منظومة Career Profile وكيف يكمل كل عنصر الآخر للوصول إلى الوظيفة المناسبة.
          </p>
        </div>

        {/* Interactive Layout: Left Side (360 Wheel) & Right Side (Pillar Showcase Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 360° Wheel Navigation Stage */}
          <div className="lg:col-span-6 flex justify-center order-1">
            <div className="ccm-11">
              <div className="ccm-11__stage p-8 sm:p-12 min-h-[460px] sm:min-h-[500px]">
                
                {/* Pointer at the active top position */}
                <div className="ccm-11__pointer" aria-hidden="true" />
                
                {/* Interactive Machine Core */}
                <nav 
                  className="ccm-11__machine" 
                  style={{ '--n': totalStops } as CSSProperties} 
                  aria-label="Career Profile Pillars"
                >
                  
                  {/* Rotating Wheel Circle */}
                  <ul 
                    className="ccm-11__wheel" 
                    style={{ '--rot': `${rotation}deg` } as CSSProperties}
                  >
                    {PILLARS.map((pillar, i) => {
                      const isActive = i === activeIdx;
                      return (
                        <li 
                          key={pillar.id} 
                          style={{ '--i': i } as CSSProperties}
                        >
                          <button
                            type="button"
                            onClick={() => goTo(i)}
                            className={`ccm-11__stop ${isActive ? 'is-active' : ''}`}
                            aria-pressed={isActive}
                            style={{
                              rotate: `${-rotation}deg`,
                            }}
                          >
                            <span>{pillar.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Center Circle Face */}
                  <div className="ccm-11__face">
                    <em>القسم النشط</em>
                    <strong className="ccm-11__current font-sans">
                      {activePillar.title}
                    </strong>
                    <span className="text-[11px] text-slate-400 font-mono -mt-1">
                      {activePillar.englishTitle}
                    </span>
                    
                    {/* Steer Navigation Buttons */}
                    <div className="ccm-11__steer">
                      <button
                        type="button"
                        onClick={() => goTo(activeIdx - 1)}
                        className="ccm-11__prev"
                        aria-label="القسم السابق"
                        title="القسم السابق"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goTo(activeIdx + 1)}
                        className="ccm-11__next"
                        aria-label="القسم التالي"
                        title="القسم التالي"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Polite Live Announcer */}
                  <p ref={liveRef} className="ccm-11__live" aria-live="polite">
                    {activePillar.title} selected
                  </p>

                </nav>

              </div>
            </div>
          </div>

          {/* Dynamic Details Showcase for the Selected Pillar */}
          <div className="lg:col-span-6 order-2">
            <div className="rounded-2xl bg-[#1A1D2B] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
              
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-[#9333EA] via-[#A855F7] to-[#C084FC]" />

              {/* Header with Icon, Category & Badge */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#9333EA]/20 border border-[#A855F7]/30 flex items-center justify-center text-[#C084FC] shadow-inner">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#A855F7]">
                      {activePillar.category} • المحطة {activeIdx + 1} من 8
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {activePillar.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#9333EA]/20 text-[#C084FC] border border-[#A855F7]/30">
                  {activePillar.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {activePillar.description}
              </p>

              {/* Highlights & Features Box */}
              <div className="bg-[#141721] rounded-xl p-4 sm:p-5 border border-slate-800 mb-6">
                <div className="text-xs font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#A855F7]" />
                  <span>المعايير المعتمدة في هذا القسم:</span>
                </div>
                <ul className="space-y-2.5">
                  {activePillar.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metric Card & Action CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3 bg-[#0A0C14] px-4 py-2.5 rounded-xl border border-slate-800">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-lg font-extrabold text-white leading-none">
                      {activePillar.metric}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {activePillar.metricLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MagneticButton className="w-full sm:w-auto">
                    <button
                      onClick={() => onOpenEvaluationModal(activePillar.serviceId)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 border border-purple-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-purple-200" />
                      <span>{activePillar.actionText}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
