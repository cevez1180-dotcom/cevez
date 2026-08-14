import { useState, FormEvent } from 'react';
import { BRAND_INFO } from '../data/content';
import { MagneticButton } from './motion/MagneticButton';
import { 
  FileCheck2, 
  Send, 
  Sparkles, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  ArrowLeft,
  FileUp,
  ShieldCheck
} from 'lucide-react';

interface CvDiagnosticToolProps {
  onOpenEvaluationModal: () => void;
}

export const CvDiagnosticTool = ({ onOpenEvaluationModal }: CvDiagnosticToolProps) => {
  const [careerStage, setCareerStage] = useState('mid');
  const [field, setField] = useState('tech');
  const [mainIssue, setMainIssue] = useState('ats-rejection');
  const [candidateName, setCandidateName] = useState('');
  const [currentRole, setCurrentRole] = useState('');

  const stageOptions = [
    { id: 'fresh', label: 'حديث تخرج / مبتدئ (0 - 2 سنة)' },
    { id: 'mid', label: 'متوسط الخبرة (3 - 6 سنوات)' },
    { id: 'senior', label: 'خبير / Senior (7 - 12 سنة)' },
    { id: 'executive', label: 'مدير تنفيذي / Leadership (12+ سنة)' },
  ];

  const fieldOptions = [
    { id: 'tech', label: 'تكنولوجيا وبرمجيات (Tech & IT)' },
    { id: 'marketing', label: 'تسويق ومبيعات (Marketing & Sales)' },
    { id: 'management', label: 'إدارة وعمليات ومشاريع (Operations & PM)' },
    { id: 'finance', label: 'مالية ومحاسبة وبنوك (Finance & Banking)' },
    { id: 'engineering', label: 'هندسة وصناعة (Engineering)' },
    { id: 'other', label: 'مجالات أخرى (Other Fields)' },
  ];

  const issueOptions = [
    { id: 'ats-rejection', label: 'بقدم كتير ومفيش رد أو رفض تلقائي (مشكلة ATS)' },
    { id: 'salary-stuck', label: 'المرتبات المعروضة أقل من خبرتي وقيمتي الحقيقية' },
    { id: 'cv-outdated', label: 'السيرة الذاتية قديمة ومحتاجة إعادة هيكلة وصياغة كاملة' },
    { id: 'linkedin-quiet', label: 'بروفايل LinkedIn مفيش عليه أي تفاعل أو عروض من Recruiters' },
  ];

  const handleSendViaWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    const stageObj = stageOptions.find((s) => s.id === careerStage)?.label || careerStage;
    const fieldObj = fieldOptions.find((f) => f.id === field)?.label || field;
    const issueObj = issueOptions.find((i) => i.id === mainIssue)?.label || mainIssue;

    const messageText = `مرحباً، حابب أطلب فحص وتقييم مجاني لسيرتي الذاتية الحالية مع Career Profile:
- الاسم: ${candidateName.trim() || 'مرشح'}
- المسمى الحالي: ${currentRole.trim() || 'غير محدد'}
- مستوى الخبرة: ${stageObj}
- المجال المستهدف: ${fieldObj}
- التحدي الحالي: ${issueObj}
جاهز لإرسال ملف الـ CV الحالي للمراجعة والتشخيص.`;

    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/201000000000?text=${encoded}`, '_blank');
  };

  return (
    <section id="cv-audit" className="py-20 lg:py-28 relative bg-[#0A0C14] border-t border-slate-800">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#9333EA]/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1A1D2B] to-[#0A0C14] border border-[#A855F7]/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right details column */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
                <FileCheck2 className="w-4 h-4" />
                <span>تشخيص مجاني بدون أي التزام • Free CV Diagnostic</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                ابعت لنا الـ CV الحالي ونقولك <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#A855F7] to-[#C084FC]">محتاج يتطور في إيه بالضبط</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                بدل ما تفضل تقدم وتخسر فرص ووقت، ابعت سيرتك الحالية وفريقنا هيراجعها ويحدد لك مجاناً:
              </p>

              {/* Diagnostic Checklist */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#9333EA]/20 text-[#A855F7] mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">مدى جاهزية الهيكل لأنظمة الـ ATS</span>
                    <span className="text-xs text-slate-400">هل برامج التوظيف قادرة تقرأ بياناتك ومهاراتك بدون أخطاء؟</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#9333EA]/20 text-[#A855F7] mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">قوة صياغة الإنجازات (Impact & Numbers)</span>
                    <span className="text-xs text-slate-400">هل بتبيع قيمتك وأثرك الحقيقي ولا مجرد سرد واجبات ومهام مكررة؟</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#9333EA]/20 text-[#A855F7] mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">فحص الـ 6 ثوانٍ الأولى لمسؤول التوظيف</span>
                    <span className="text-xs text-slate-400">هل الملخص التنفيذي والعناوين بتلفت انتباه الـ Recruiter فوراً؟</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141721] border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>خصوصية تامة 100%: ملفاتك وبياناتك لا يتم مشاركتها أبداً مع أي طرف ثالث.</span>
              </div>
            </div>

            {/* Left Interactive Quick Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#141721] border border-slate-800 p-5 sm:p-7 shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#A855F7]" />
                    <span>طلب تقرير التشخيص السريع</span>
                  </div>
                  <span className="text-[11px] text-[#C084FC] font-mono">1-Min Request</span>
                </div>

                <form onSubmit={handleSendViaWhatsApp} className="space-y-4">
                  {/* Name & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        الاسم (اختياري)
                      </label>
                      <input
                        type="text"
                        placeholder="أدخل اسمك"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        المسمى الوظيفي الحالي / المستهدف
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: Product Manager"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Experience Level Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      مستوى الخبرة الحالية:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {stageOptions.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setCareerStage(st.id)}
                          className={`p-2.5 rounded-xl text-[11px] font-semibold text-right transition-all border cursor-pointer ${
                            careerStage === st.id
                              ? 'bg-[#9333EA]/20 border-[#A855F7] text-[#C084FC]'
                              : 'bg-[#0A0C14] border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field of Work */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      المجال والتخصص:
                    </label>
                    <select
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white focus:outline-none"
                    >
                      {fieldOptions.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Main Challenge */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      أكبر تحدي يواجهك حالياً:
                    </label>
                    <select
                      value={mainIssue}
                      onChange={(e) => setMainIssue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white focus:outline-none"
                    >
                      {issueOptions.map((iss) => (
                        <option key={iss.id} value={iss.id}>
                          {iss.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col gap-2.5">
                    <MagneticButton className="w-full">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>إرسال الـ CV للتقييم الفوري عبر واتساب</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </MagneticButton>

                    <MagneticButton className="w-full">
                      <button
                        type="button"
                        onClick={() => onOpenEvaluationModal()}
                        className="w-full py-3 rounded-xl text-xs font-semibold text-slate-300 bg-[#1A1D2B] hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FileUp className="w-3.5 h-3.5 text-[#A855F7]" />
                        <span>أو اطلب استشارة وتطوير شامل لسيرتك الآن</span>
                      </button>
                    </MagneticButton>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
