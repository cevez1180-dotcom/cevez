import { FLOW_STEPS } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { 
  FileText, 
  Cpu, 
  Eye, 
  Linkedin, 
  Trophy, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

interface IdentityFlowProps {
  onOpenEvaluationModal: () => void;
}

export const IdentityFlow = ({ onOpenEvaluationModal }: IdentityFlowProps) => {
  const stepIcons = [FileText, Cpu, Eye, Linkedin, Trophy];

  return (
    <section id="journey" className="py-20 lg:py-28 relative border-t border-slate-800 bg-[#0A0C14]">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#9333EA]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 text-[#C084FC] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>مسار الهوية المهنية • The Candidate Funnel</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            كيف تتحول خبرتك من ملف مهمل إلى <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">فرص حقيقية وعروض عمل؟</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            الرحلة مش مجرد إرسال إيميل عشوائي. عشان توصل للـ Offer، لازم سيرتك تعدي بنجاح من كل حلقة في سلسلة التوظيف الحديثة:
          </p>
        </div>

        {/* The 5-Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || FileText;
            const isLast = idx === FLOW_STEPS.length - 1;

            return (
              <div
                key={step.step}
                id={`flow-step-${step.step}`}
                className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-200 border flex flex-col justify-between ${
                  isLast
                    ? 'bg-gradient-to-br from-[#1A1D2B] to-[#0A0C14] border-[#A855F7]/40 shadow-xl shadow-purple-950/40'
                    : 'bg-[#1A1D2B] hover:bg-[#1f2335] border-slate-800 hover:border-[#A855F7]/30'
                }`}
              >
                {/* Step number badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#0A0C14] text-[#C084FC] border border-slate-800">
                      {step.step}
                    </span>
                    <div className={`p-2.5 rounded-xl ${
                      isLast 
                        ? 'bg-[#9333EA] text-white shadow-md shadow-purple-900/40' 
                        : 'bg-[#0A0C14] text-[#A855F7] border border-slate-800'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title & English subtitle */}
                  <div className="mb-2">
                    <span className="text-[11px] font-semibold text-[#A855F7] block mb-1">
                      {step.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-0.5">
                      {step.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium font-sans">
                      {step.english}
                    </span>
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom connector indicator for desktop */}
                {!isLast && (
                  <div className="hidden lg:flex items-center gap-1 text-slate-500 text-xs font-bold pt-4 mt-2 border-t border-slate-800">
                    <span>التالي في المسار</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-[#A855F7]" />
                  </div>
                )}

                {isLast && (
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold pt-4 mt-2 border-t border-[#A855F7]/30">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>النتيجة: وظيفة تستحق قيمتك</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Context Callout */}
        <div className="mt-12 rounded-2xl bg-[#141721] border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#1A1D2B] border border-slate-800 text-[#C084FC] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                سؤال شائع: "أنا بقدم في وظائف كتير ومحدش بيكلمني؟"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                في الغالب السبب مش ضعف في خبرتك، ولكن انقطاع في سلسلة الهوية: إما الـ CV بيقع في فلتر الـ ATS، أو الصياغة مش بتوصل الإنجاز للـ HR في أول 6 ثوانٍ، أو بروفايل لينكد إن مش مطابق.
              </p>
            </div>
          </div>

          <MagneticButton>
            <button
              onClick={() => onOpenEvaluationModal()}
              className="shrink-0 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>افحص نقطة الضعف في سيرتك</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
};
