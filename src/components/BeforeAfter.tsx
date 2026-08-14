import { useState } from 'react';
import { BEFORE_AFTER_EXAMPLES } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { InfiniteBulgeGallery } from './motion/InfiniteBulgeGallery';
import { CoverFlowGallery } from './motion/CoverFlowGallery';
import { 
  Sparkles, 
  XCircle, 
  CheckCircle2, 
  ArrowLeft, 
  TrendingUp, 
  Tag, 
  Zap,
  Briefcase,
  Layers,
  Compass,
  SlidersHorizontal
} from 'lucide-react';

interface BeforeAfterProps {
  onOpenEvaluationModal: () => void;
}

export const BeforeAfter = ({ onOpenEvaluationModal }: BeforeAfterProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'coverflow' | 'gallery' | 'comparative'>('coverflow');
  const currentExample = BEFORE_AFTER_EXAMPLES[selectedIdx];

  return (
    <section id="before-after" className="py-20 lg:py-28 relative bg-[#0A0C14] border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#9333EA]/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 text-[#C084FC] text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>نماذج واقعية • 3D Transformation Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
            شاهد الفرق بنفسك: <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">قبل وبعد إعادة الصياغة</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            استكشف التحولات الحقيقية لعملائنا في مختلف المجالات وكيف انعكست الصياغة الاستراتيجية على اجتياز فلاتر الـ ATS وتضاعف العروض الوظيفية.
          </p>
        </div>

        {/* View Mode Switcher with 3 Modes */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="bg-[#141721] p-1.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setViewMode('coverflow')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-center gap-2 ${
                viewMode === 'coverflow'
                  ? 'bg-[#9333EA] text-white shadow-lg shadow-purple-900/40 border border-[#A855F7]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>معرض 3D Cover Flow</span>
            </button>

            <button
              onClick={() => setViewMode('gallery')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-center gap-2 ${
                viewMode === 'gallery'
                  ? 'bg-[#9333EA] text-white shadow-lg shadow-purple-900/40 border border-[#A855F7]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>معرض العدسة 3D (Fisheye)</span>
            </button>

            <button
              onClick={() => setViewMode('comparative')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-center gap-2 ${
                viewMode === 'comparative'
                  ? 'bg-[#9333EA] text-white shadow-lg shadow-purple-900/40 border border-[#A855F7]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>مقارنة STAR تفصيلية</span>
            </button>
          </div>
        </div>

        {/* View 1: 3D Cover Flow Motion Slider */}
        {viewMode === 'coverflow' && (
          <div className="mb-12 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] animate-fadeIn">
            <CoverFlowGallery onOpenEvaluationModal={onOpenEvaluationModal} />
            <div className="mt-4 text-center">
              <span className="text-xs text-slate-400">
                💡 يمكنك التنقل بين البطاقات بالأسهم، أو السحب (Drag / Swipe)، أو النقر مباشرة على أي بطاقة لعرض تفاصيل التقييم.
              </span>
            </div>
          </div>
        )}

        {/* View 2: 3D Infinite Bulge WebGL Transformation Canvas */}
        {viewMode === 'gallery' && (
          <div className="mb-12 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] animate-fadeIn">
            <InfiniteBulgeGallery onOpenEvaluationModal={onOpenEvaluationModal} />
            <div className="mt-4 text-center">
              <span className="text-xs text-slate-400">
                💡 نصيحة: يمكنك تحريك المعرض بالماوس أو التاتش، واستخدام أزرار (+) و (-) للتحكم في انحناء العدسة البصرية، أو الضغط على أي بطاقة لعرض تفاصيل التحول.
              </span>
            </div>
          </div>
        )}

        {/* View 3: Comparative STAR framework cards */}
        {viewMode === 'comparative' && (
          <div className="transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] animate-fadeIn">
            {/* Role Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
              {BEFORE_AFTER_EXAMPLES.map((ex, idx) => (
                <button
                  key={idx}
                  id={`tab-example-${idx}`}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-center gap-2 ${
                    selectedIdx === idx
                      ? 'bg-[#9333EA] text-white shadow-lg shadow-purple-900/30 border border-[#A855F7]/40 scale-[1.02]'
                      : 'bg-[#1A1D2B] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-[#A855F7]" />
                  <span>{ex.role}</span>
                </button>
              ))}
            </div>

            {/* The Comparative Card */}
            <div className="rounded-2xl bg-[#141721] border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-3">
                <div>
                  <span className="text-xs font-bold text-[#A855F7] font-sans block mb-1">
                    {currentExample.field}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    مقارنة صياغة الخبرات: {currentExample.role}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-lg bg-[#0A0C14] border border-slate-800 text-slate-300 text-xs font-mono w-fit">
                  نموذج معتمد STAR / CAR Framework
                </span>
              </div>

              {/* Side by side columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* BEFORE Column (Weak / Ignored) */}
                <div className="rounded-2xl bg-[#0A0C14] border border-red-900/30 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4 pb-3 border-b border-red-950/60">
                      <XCircle className="w-5 h-5" />
                      <span>{currentExample.before.title}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {currentExample.before.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                          <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weakness analysis */}
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 text-xs text-red-300/90 leading-relaxed">
                    <strong>نقطة الضعف:</strong> {currentExample.before.weakness}
                  </div>
                </div>

                {/* AFTER Column (Career Profile / High Impact) */}
                <div className="rounded-2xl bg-[#1A1D2B] border border-[#A855F7]/40 p-5 sm:p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between text-[#C084FC] text-sm font-bold mb-4 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{currentExample.after.title}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ATS & HR Approved
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {currentExample.after.points.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 font-medium leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ATS Keywords and Impact Box */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#0A0C14] border border-[#A855F7]/30 text-xs text-purple-200 leading-relaxed flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>الأثر على مسؤول التوظيف:</strong> {currentExample.after.impact}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-[#A855F7]" />
                        الكلمات المفتاحية (ATS Keywords):
                      </span>
                      {currentExample.after.atsTags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#0A0C14] border border-slate-800 text-[10px] font-mono text-[#C084FC] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Action strip */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-[#A855F7]" />
                  <span>جاهز لتحويل سيرتك الذاتية بنفس المستوى من القوة والاحترافية؟</span>
                </div>

                <MagneticButton>
                  <button
                    onClick={() => onOpenEvaluationModal()}
                    className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>ابدأ بتطوير سيرتك بنفس المعايير</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

