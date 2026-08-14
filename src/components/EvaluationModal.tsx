import { useState, useEffect, FormEvent } from 'react';
import { BRAND_INFO, SERVICES_DATA } from '../data/content';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  FileText, 
  ArrowLeft,
  ShieldCheck,
  Send,
  HardDrive,
  Trash2
} from 'lucide-react';
import { DriveFile } from '../services/googleDrive';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  importedDriveFile?: DriveFile | null;
  onClearImportedFile?: () => void;
  onOpenDriveModal?: () => void;
}

export const EvaluationModal = ({ 
  isOpen, 
  onClose, 
  initialServiceId,
  importedDriveFile,
  onClearImportedFile,
  onOpenDriveModal
}: EvaluationModalProps) => {
  const [selectedService, setSelectedService] = useState('cv-writing');
  const [candidateName, setCandidateName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [targetJob, setTargetJob] = useState('');
  const [experienceYears, setExperienceYears] = useState('3-5');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedService(initialServiceId);
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const handleSubmitWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    const serviceObj = SERVICES_DATA.find((s) => s.id === selectedService)?.title || 'تطوير الـ CV والهوية المهنية';
    
    let message = `مرحباً كاريير بروفايل 👋، حابب أبدأ تطوير ملفي المهني:
- الاسم: ${candidateName || 'مرشح'}
- المسمى/الوظيفة المستهدفة: ${targetJob || 'غير محدد'}
- سنوات الخبرة: ${experienceYears} سنوات
- الخدمة المطلوبة: ${serviceObj}`;

    if (importedDriveFile) {
      message += `\n- ملف الـ CV المستورد من Google Drive: ${importedDriveFile.name} (${importedDriveFile.webViewLink || 'مرفق'})`;
    }

    if (notes) {
      message += `\n- ملاحظات إضافية: ${notes}`;
    }

    message += '\nجاهز لإرسال نسختي الحالية للبدء والتنسيق معكم.';

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/201000000000?text=${encoded}`, '_blank');
    setSubmittedSuccess(true);
    setTimeout(() => {
      onClose();
      setSubmittedSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#141721] border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-purple-950/80 text-right overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-slate-400 hover:text-white bg-[#1A1D2B] border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1D2B] border border-slate-800 text-[#C084FC] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>طلب فحص وتطوير السيرة الذاتية</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
            ابدأ رحلة بناء هويتك المهنية
          </h3>
          <p className="text-xs text-slate-400">
            أدخل تفاصيلك السريعة وسيقوم مستشارنا المهني بالتواصل معك ومراجعة ملفك.
          </p>
        </div>

        {/* Imported Google Drive File Banner */}
        {importedDriveFile ? (
          <div className="mb-4 p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <HardDrive className="w-5 h-5 text-purple-400 shrink-0" />
              <div className="min-w-0">
                <div className="font-bold text-white truncate">{importedDriveFile.name}</div>
                <div className="text-[11px] text-purple-300">تم الاستيراد من Google Drive بنجاح</div>
              </div>
            </div>
            {onClearImportedFile && (
              <button 
                type="button" 
                onClick={onClearImportedFile}
                className="p-1.5 rounded-lg bg-purple-900/40 text-purple-300 hover:text-white"
                title="إلغاء الملف المرفق"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : onOpenDriveModal ? (
          <div className="mb-4">
            <button
              type="button"
              onClick={onOpenDriveModal}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0B0D17] hover:bg-[#1A1D2B] border border-slate-800 hover:border-purple-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-purple-400" />
              <span>استيراد ملف الـ CV الحالي من Google Drive™</span>
            </button>
          </div>
        ) : null}

        {submittedSuccess ? (
          <div className="py-12 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">تم تجهيز طلبك بنجاح!</h4>
            <p className="text-xs text-slate-400">جاري نقلك إلى محادثة واتساب للتنسيق وإرسال نسختك الحالية...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">
                الخدمة أو الباقة المطلوبة:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white focus:outline-none"
              >
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title} ({srv.englishTitle})
                  </option>
                ))}
                <option value="full-bundle">
                  باقة الهوية المتكاملة (CV + ATS + LinkedIn + Cover Letter)
                </option>
              </select>
            </div>

            {/* Name & WhatsApp Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  الاسم بالكامل:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد محمود"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  رقم الواتساب:
                </label>
                <input
                  type="tel"
                  placeholder="010XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Target Job & Experience Years */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  المسمى أو المجال المستهدف:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Senior Marketing Manager"
                  value={targetJob}
                  onChange={(e) => setTargetJob(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  سنوات الخبرة:
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white focus:outline-none"
                >
                  <option value="0-2">حديث تخرج / مبتدئ (0 - 2 سنة)</option>
                  <option value="3-5">متوسط (3 - 5 سنوات)</option>
                  <option value="6-10">خبير (6 - 10 سنوات)</option>
                  <option value="10+">إدارة وتنفيذي (10+ سنوات)</option>
                </select>
              </div>
            </div>

            {/* Notes / Special requirements */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ملاحظات أو أسئلة خاصة (اختياري):
              </label>
              <textarea
                rows={2}
                placeholder="حابب أقدم في شركات في الخليج، أو محتاج نسختين عربي وإنجليزي..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] text-xs text-white placeholder:text-slate-600 focus:outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>إرسال الطلب ومتابعة التنسيق عبر واتساب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>خصوصية وسرية تامة لمعلوماتك وسيرتك الذاتية</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
