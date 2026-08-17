import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, User, Mail, Phone, Briefcase, Award, Save, Loader2, CheckCircle2 } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || '');
  const [jobTitle, setJobTitle] = useState(profile?.job_title || '');
  const [targetRole, setTargetRole] = useState(profile?.target_role || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [experienceYears, setExperienceYears] = useState(profile?.experience_years || '3-5 سنوات');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);

    try {
      const res = await updateProfile({
        full_name: fullName,
        job_title: jobTitle,
        target_role: targetRole,
        phone,
        experience_years: experienceYears,
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1200);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141724] border border-purple-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl space-y-5 p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 text-right">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" />
            <span>تعديل الملف الشخصي والمهني</span>
          </h2>
          <p className="text-xs text-slate-400">
            تحديث بيانات حسابك وهويتك المهنية على منصة Career Profile
          </p>
        </div>

        {success && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم حفظ بياناتك بنجاح!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني (غير قابل للتغيير هنا)</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              dir="ltr"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14]/50 border border-slate-800 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">المسمى الوظيفي الحالي</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="مثال: Software Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">الدور المستهدف</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="مثال: Senior Full Stack"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 100 000 0000"
                dir="ltr"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">سنوات الخبرة</label>
              <select
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="حديث تخرج (0-1 سنة)">حديث تخرج (0-1 سنة)</option>
                <option value="1-3 سنوات">1-3 سنوات</option>
                <option value="3-5 سنوات">3-5 سنوات</option>
                <option value="5-8 سنوات">5-8 سنوات</option>
                <option value="+8 سنوات">+8 سنوات</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>حفظ التعديلات</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
