import { useState } from 'react';
import { FAQS_DATA, BRAND_INFO } from '../data/content';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';

interface FaqSectionProps {
  onOpenEvaluationModal: () => void;
}

export const FaqSection = ({ onOpenEvaluationModal }: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-[#0A0C14] border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#9333EA]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1A1D2B] border border-slate-800 rounded-full px-4 py-1.5 text-[#C084FC] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>إجابات واضحة وشفافة • FAQs</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3">
            الأسئلة الشائعة حول <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">تطوير الـ CV والهوية المهنية</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
            كل ما تحتاج معرفته عن معايير الـ ATS، طريقة العمل، والتسليم لضمان بداية واثقة.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5 mb-12">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#141721] border-[#A855F7]/40 shadow-lg shadow-purple-950/40'
                    : 'bg-[#1A1D2B] border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-[#0A0C14] text-[#A855F7] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#9333EA] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Contact Strip */}
        <div className="rounded-2xl bg-[#141721] border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1A1D2B] text-[#C084FC] shrink-0 border border-slate-800 hidden sm:block">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">عندك سؤال خاص بمسارك أو مجالك الوظيفي؟</div>
              <div className="text-xs text-slate-400">فريقنا متاح للرد على أي استفسار ومساعدتك في اختيار الخدمة المناسبة.</div>
            </div>
          </div>

          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-xl text-xs font-bold text-white bg-transparent border border-slate-700 hover:border-[#A855F7] hover:bg-[#9333EA] transition-all flex items-center gap-2"
          >
            <span>تحدث مع مستشارنا عبر واتساب</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
