import { BRAND_INFO } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { Sparkles, MessageSquare, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SecondaryCtaProps {
  onOpenEvaluationModal: () => void;
}

export const SecondaryCta = ({ onOpenEvaluationModal }: SecondaryCtaProps) => {
  return (
    <section id="cta-banner" className="py-16 lg:py-24 relative bg-[#0A0C14] border-t border-slate-800 overflow-hidden">
      {/* Background glow and radial rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#9333EA]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#1A1D2B] to-[#0A0C14] border border-[#A855F7]/30 p-8 sm:p-12 lg:p-16 text-center relative shadow-2xl">
          
          <div className="max-w-3xl mx-auto">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 text-[#C084FC] text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4 text-[#A855F7]" />
              <span>خطوتك المهنية القادمة تبدأ من هنا</span>
            </div>

            {/* Main CTA Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
              مستعد لتحويل خبرتك إلى <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">سيرة ذاتية وهوية تليق بطموحك؟</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
              سواء كنت بتستهدف الانتقال لشركة كبرى، العمل عن بُعد مع شركات أجنبية، أو زيادة راتبك.. إحنا هنا عشان نضمن إن قيمتك تبان من أول نظرة.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <MagneticButton>
                <button
                  id="secondary-cta-primary-btn"
                  onClick={() => onOpenEvaluationModal()}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-purple-200" />
                  <span>ابدأ بتطوير الـ CV بتاعك الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  id="secondary-cta-whatsapp-btn"
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold text-slate-200 bg-transparent hover:bg-[#1A1D2B] border border-slate-700 hover:border-[#A855F7] transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>تواصل واستشرنا مباشرة على واتساب</span>
                </a>
              </MagneticButton>
            </div>

            {/* Quick Guarantees & Features */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 pt-6 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>نسخ Word + PDF كاملة</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>مهيأة بنسبة 100% للـ ATS</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>جولات مراجعة وتعديل مجانية</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

