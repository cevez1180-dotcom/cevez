import { WHY_DIFFERENT_POINTS } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { 
  Sparkles, 
  XCircle, 
  CheckCircle2, 
  Layers, 
  BrainCircuit, 
  Target, 
  Users, 
  BarChart3,
  ArrowLeft
} from 'lucide-react';

interface WhyDifferentProps {
  onOpenEvaluationModal: () => void;
}

export const WhyDifferent = ({ onOpenEvaluationModal }: WhyDifferentProps) => {
  return (
    <section id="why-us" className="py-20 lg:py-28 relative bg-[#0A0C14] border-t border-slate-800">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-[#9333EA]/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 text-[#C084FC] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>الفارق الجوهري • The Identity Distinction</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            ليه إحنا <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">مش مجرد مكتب تصميم CV؟</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            الشركات مش بتوظف "ألوان وأشكال جميلة".. الشركات بتوظف شخص قادر يحل مشاكل، يحقق أرباح، ويضيف قيمة حقيقية. وده الفارق بين تصميم CV وبين بناء هوية مهنية.
          </p>
        </div>

        {/* 4 Pillars of Difference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="rounded-2xl bg-[#1A1D2B] border border-slate-800 p-5 hover:border-[#A855F7]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#0A0C14] text-[#A855F7] border border-slate-800 w-fit mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">التركيز على الـ ROI والأثر</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              بنستخرج أرقامك ونتائجك العملية (STAR Model) عشان تثبت قدرتك على صنع فارق حقيقي في الشركة.
            </p>
          </div>

          <div className="rounded-2xl bg-[#1A1D2B] border border-slate-800 p-5 hover:border-[#A855F7]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#0A0C14] text-indigo-400 border border-slate-800 w-fit mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">سيكولوجية مسؤول التوظيف (HR)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              هيكلة بصرية تضمن أن يقرأ الـ Recruiter أهم نقاط قوتك في فحص الـ 6 ثوانٍ الأولى دون تشتيت.
            </p>
          </div>

          <div className="rounded-2xl bg-[#1A1D2B] border border-slate-800 p-5 hover:border-[#A855F7]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#0A0C14] text-[#A855F7] border border-slate-800 w-fit mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">تهيئة حقيقية لأنظمة الـ ATS</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تصميم كود وهيكل نظيف خالي من تعقيدات الجداول والرموز التي تعيق قراءة برمجيات التوظيف.
            </p>
          </div>

          <div className="rounded-2xl bg-[#1A1D2B] border border-slate-800 p-5 hover:border-[#A855F7]/30 transition-colors">
            <div className="p-3 rounded-xl bg-[#0A0C14] text-indigo-400 border border-slate-800 w-fit mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">اتصال متكامل للهوية الرقمية</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تطابق نبرتك ورسائلك بين الـ CV وبروفايل LinkedIn والـ Portfolio لخلق ثقة فورية عند البحث عنك.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison Table Card */}
        <div className="rounded-2xl bg-[#141721] border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              مقارنة صريحة: الفرق بين الطريقة التقليدية ومنصة Career Profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              لماذا تحقق ملفات Career Profile معدلات استجابة ومقابلات أعلى؟
            </p>
          </div>

          <div className="space-y-4">
            {WHY_DIFFERENT_POINTS.map((point, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-[#1A1D2B] border border-slate-800 items-center"
              >
                {/* Category Name */}
                <div className="md:col-span-3 text-xs sm:text-sm font-bold text-[#C084FC] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#9333EA]" />
                  <span>{point.category}</span>
                </div>

                {/* Traditional Graphic Designer */}
                <div className="md:col-span-4 p-3 rounded-xl bg-red-950/20 border border-red-900/30 flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-0.5">
                      مكاتب التصميم / القوالب التقليدية
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      {point.traditionalWay}
                    </div>
                  </div>
                </div>

                {/* Career Profile Way */}
                <div className="md:col-span-5 p-3 rounded-xl bg-[#0A0C14] border border-[#A855F7]/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                      منصة Career Profile
                    </div>
                    <div className="text-xs text-slate-200 font-medium leading-relaxed">
                      {point.careerProfileWay}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              سيرتك الذاتية هي أول استثمار في دخلك المستقبلي.. متسبهاش للصدفة أو القوالب العشوائية.
            </span>

            <MagneticButton>
              <button
                onClick={() => onOpenEvaluationModal()}
                className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ابدأ بتطوير هويتك المهنية الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
};
