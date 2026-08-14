import { SERVICES_DATA, ADDITIONAL_SERVICES } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { 
  FileText, 
  Cpu, 
  Linkedin, 
  Briefcase, 
  Award, 
  Mail, 
  UserCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
}

export const ServicesSection = ({ onOpenEvaluationModal }: ServicesSectionProps) => {
  const iconMap: Record<string, any> = {
    FileText,
    Cpu,
    Linkedin,
    Briefcase,
    Award,
    Mail,
    UserCheck,
  };

  const heroService = SERVICES_DATA.find((s) => s.isHero);
  const secondaryServices = SERVICES_DATA.filter((s) => s.tier === 'primary');
  const standardServices = SERVICES_DATA.filter((s) => s.tier === 'standard');

  return (
    <section id="services" className="py-20 lg:py-32 relative bg-[#0A0C14] border-t border-slate-800 overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#9333EA]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 text-[#C084FC] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>خدماتنا المتخصصة • Identity Services</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            حلول متدرجة لبناء <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">هويتك وقيمتك المهنية</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            خدمات مدروسة لتغطية كل نقطة اتصال بينك وبين سوق العمل، مرتبة حسب الأولوية والأثر على فرصك الوظيفية.
          </p>
        </div>

        {/* 🥇 1. HERO SERVICE (Rank 1 - Featured Visual Prominence) */}
        {heroService && (
          <div 
            id={`service-${heroService.id}`}
            className="relative rounded-2xl bg-gradient-to-br from-[#1A1D2B] to-[#0A0C14] border border-[#A855F7]/30 p-6 sm:p-8 lg:p-10 shadow-2xl mb-10 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Content Column */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#9333EA]/20 text-[#C084FC] border border-[#A855F7]/30 text-xs font-bold flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{heroService.rank}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0A0C14] text-slate-300 text-[11px] font-mono border border-slate-800">
                    {heroService.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {heroService.title}
                </h3>
                <span className="text-xs sm:text-sm font-semibold text-[#A855F7] font-sans block mb-4">
                  {heroService.englishTitle}
                </span>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                  {heroService.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-3 mb-8">
                  {heroService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-[#9333EA]/20 text-[#A855F7] mt-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-300 leading-normal">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton>
                    <button
                      onClick={() => onOpenEvaluationModal(heroService.id)}
                      className="px-8 py-4 rounded-xl text-sm font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-purple-200" />
                      <span>اطلب تطوير سيرتك الذاتية الآن</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </MagneticButton>

                  <span className="text-xs text-slate-400 font-medium">
                    تسليم بصيغتي PDF + Word قابل للتعديل
                  </span>
                </div>
              </div>

              {/* Visual Mini-Mockup for Hero Service */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-[#141721] border border-slate-800 p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="text-xs font-bold text-slate-300">هيكل الـ CV الاحترافي المقترح</div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Standard & Executive Format
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#0A0C14] border border-slate-800">
                      <div className="font-bold text-[#C084FC] mb-0.5">1. الرأس والبيانات المهنية (Header)</div>
                      <div className="text-[11px] text-slate-400">مسمى مستهدف + رابط LinkedIn مفعل + وسائل تواصل واضحة.</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0C14] border border-slate-800">
                      <div className="font-bold text-indigo-300 mb-0.5">2. الملخص التنفيذي (Executive Summary)</div>
                      <div className="text-[11px] text-slate-400">3-4 أسطر صلبة توجز سنوات الخبرة وأقوى قيمة تقدمها للشركة.</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0C14] border border-slate-800">
                      <div className="font-bold text-[#C084FC] mb-0.5">3. الخبرات العملية (STAR Achievements)</div>
                      <div className="text-[11px] text-slate-400">صياغة بالإنجازات الرقمية والـ Impact، لا مجرد مهام روتينية.</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0C14] border border-slate-800">
                      <div className="font-bold text-indigo-300 mb-0.5">4. الكلمات المفتاحية والمهارات (Core Competencies)</div>
                      <div className="text-[11px] text-slate-400">توزيع ذكي لمهاراتك الفنية والقيادية المتوافقة مع الـ ATS.</div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-400 text-center bg-[#1A1D2B] p-2 rounded-lg border border-slate-800">
                    💡 مناسب للمحترفين في السوق المصري، الخليجي، والشركات العالمية.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 🥈 & 🥉 2. SECONDARY TIER (Rank 2: ATS + Rank 3: LinkedIn) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {secondaryServices.map((service) => {
            const Icon = iconMap[service.iconName] || Cpu;
            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="rounded-2xl bg-[#1A1D2B] border border-slate-800 hover:border-[#A855F7]/40 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#0A0C14] text-[#C084FC] border border-slate-800 text-xs font-bold">
                      {service.rank}
                    </span>
                    <div className="p-3 rounded-xl bg-[#0A0C14] text-[#A855F7] border border-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#A855F7] font-sans block mb-4">
                    {service.englishTitle}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 max-w-[200px] leading-tight">
                    {service.highlightText}
                  </span>
                  <button
                    onClick={() => onOpenEvaluationModal(service.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-transparent border border-slate-700 hover:border-[#A855F7] hover:bg-[#9333EA] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>طلب الخدمة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 & 5. STANDARD TIER (Portfolio & Personal Branding) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {standardServices.map((service) => {
            const Icon = iconMap[service.iconName] || Briefcase;
            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="rounded-2xl bg-[#1A1D2B] border border-slate-800 hover:border-[#A855F7]/30 transition-all p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-[#0A0C14] text-slate-300 text-xs font-semibold border border-slate-800">
                      {service.badge}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#0A0C14] text-[#A855F7] border border-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-400 font-sans block mb-3">
                    {service.englishTitle}
                  </span>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5 shrink-0" />
                        <span className="text-xs text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {service.highlightText}
                  </span>
                  <button
                    onClick={() => onOpenEvaluationModal(service.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-transparent border border-slate-700 hover:border-[#A855F7] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>تفاصيل</span>
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bonus Services Strip (Cover Letter + Career Consulting) */}
        <div className="rounded-2xl bg-[#141721] border border-slate-800 p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              خدمات تكميلية لدعم خطوتك الوظيفية القادمة
            </h4>
            <p className="text-xs text-slate-400">
              خدمات مخصصة لرفع جاهزيتك للمقابلات وتخصيص تقديمك للوظائف الحساسة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADDITIONAL_SERVICES.map((addService, idx) => {
              const Icon = addService.icon === 'Mail' ? Mail : UserCheck;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-[#1A1D2B] border border-slate-800 flex items-start gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 text-[#C084FC] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{addService.title}</span>
                      <span className="text-[10px] text-[#A855F7] font-sans">({addService.english})</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {addService.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
