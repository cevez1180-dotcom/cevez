import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Sparkles, 
  HardDrive, 
  FileText, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  CheckCircle2, 
  ArrowLeft,
  ExternalLink,
  Layers,
  Award,
  TrendingUp,
  Clock,
  ChevronLeft,
  Save,
  Loader2
} from 'lucide-react';
import { BRAND_INFO } from '../../data/content';

interface UserDashboardProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
  onOpenDriveHub: () => void;
  onNavigate: (route: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onOpenEvaluationModal,
  onOpenDriveHub,
  onNavigate,
}) => {
  const { user, profile, updateProfile, signOut } = useAuth();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || '');
  const [jobTitle, setJobTitle] = useState(profile?.job_title || '');
  const [targetRole, setTargetRole] = useState(profile?.target_role || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [experienceYears, setExperienceYears] = useState(profile?.experience_years || '3-5 سنوات');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await updateProfile({
        full_name: fullName,
        job_title: jobTitle,
        target_role: targetRole,
        phone,
        experience_years: experienceYears,
      });

      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setIsEditingProfile(false);
          setSaveSuccess(false);
        }, 1500);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onNavigate('/login');
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'المهني المتميز';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* 1. Header & Welcome Banner */}
      <div className="bg-gradient-to-r from-[#141724] via-[#1A1D2B] to-[#141724] border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* User Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 p-0.5 shadow-xl shadow-purple-900/40">
                <div className="w-full h-full rounded-2xl bg-[#0A0C14] flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url || user?.user_metadata?.avatar_url ? (
                    <img
                      src={profile?.avatar_url || user?.user_metadata?.avatar_url}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl font-black text-purple-300">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0A0C14]" title="حساب مفعل وموثق" />
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  مرحباً، {displayName} 👋
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-700/50">
                  حساب مهني معتمد
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono" dir="ltr">
                {user?.email}
              </p>
              <div className="text-[11px] text-purple-400 font-medium">
                {profile?.job_title ? `${profile.job_title} | مستهدف: ${profile.target_role || 'وظائف قيادية'}` : 'لم يتم تحديد المسمى الوظيفي بعد'}
              </div>
            </div>
          </div>

          {/* Action Buttons in Header */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-[#1A1D2B] hover:bg-[#222738] border border-slate-700 transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-purple-400" />
              <span>{isEditingProfile ? 'إلغاء التعديل' : 'تعديل بياناتي'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Form Collapsible */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم الكامل</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
                placeholder="اسمك الكامل"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">المسمى الوظيفي الحالي</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
                placeholder="مثال: Senior Frontend Engineer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">الدور الوظيفي المستهدف</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
                placeholder="مثال: Tech Lead / Engineering Manager"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف / واتساب</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
                placeholder="مثال: +20 100 000 0000"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">سنوات الخبرة المهنية</label>
              <select
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#0A0C14] border border-slate-700 text-xs text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="حديث تخرج (0-1 سنة)">حديث تخرج (0-1 سنة)</option>
                <option value="1-3 سنوات">1-3 سنوات (Junior / Mid)</option>
                <option value="3-5 سنوات">3-5 سنوات (Mid / Senior)</option>
                <option value="5-8 سنوات">5-8 سنوات (Senior)</option>
                <option value="+8 سنوات">+8 سنوات (Lead / Executive)</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2.5 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/40"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>حفظ البيانات</span>
                  </>
                )}
              </button>
            </div>

            {saveSuccess && (
              <div className="sm:col-span-2 lg:col-span-3 text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم تحديث بيانات البروفايل بنجاح!</span>
              </div>
            )}
          </form>
        )}
      </div>

      {/* 2. Key Metrics & Status Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#141724] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 space-y-2 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">جاهزية ATS المعتمدة</span>
            <div className="w-8 h-8 rounded-xl bg-purple-950/70 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">98.4%</div>
          <p className="text-[11px] text-slate-400">متوافق تماماً مع أنظمة الفرز الآلي</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#141724] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 space-y-2 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">منهجية STAR في الإنجازات</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-950/70 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">100%</div>
          <p className="text-[11px] text-slate-400">صياغة مبنية على الأثر والأرقام</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#141724] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 space-y-2 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">سحابة Google Drive™</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/70 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-emerald-400">تكامل سحابي متوفر</div>
          <button
            onClick={onOpenDriveHub}
            className="text-[11px] text-purple-400 hover:text-purple-300 underline block cursor-pointer"
          >
            فتح سحابة ملفاتي ←
          </button>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#141724] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 space-y-2 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">تعديلات غير محدودة</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/70 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">مضمونة</div>
          <p className="text-[11px] text-slate-400">حتى الرضا الكامل عن النتائج</p>
        </div>
      </div>

      {/* 3. Action Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Fast CV Evaluation */}
        <div className="bg-[#141724] border border-purple-500/20 rounded-3xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#9333EA]/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">تقييم مجاني شامل للـ CV</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              أرسل سيرتك الذاتية الحالية ليقوم خبراؤنا بفحص نسبة اجتياز الـ ATS ونقاط الضعف والقوة قبل التقديم على الوظائف.
            </p>
          </div>

          <button
            onClick={() => onOpenEvaluationModal('cv-writing')}
            className="w-full py-3 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white text-xs font-bold transition-all shadow-lg shadow-purple-950/40 flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>طلب فحص وتقييم مجاني الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Google Drive Career Cloud Hub */}
        <div className="bg-[#141724] border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">مركز ملفات Google Drive™</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              اربط حساب Google Drive لاستيراد ملفات السيرة الذاتية بصيغة PDF أو Word، أو رفع النسخ المطورة وحفظ تقارير STAR.
            </p>
          </div>

          <button
            onClick={onOpenDriveHub}
            className="w-full py-3 rounded-xl bg-[#1A1D2B] hover:bg-[#222738] border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <HardDrive className="w-4 h-4 text-purple-400" />
            <span>فتح نافذة Google Drive</span>
          </button>
        </div>

        {/* Card 3: WhatsApp Direct Advisor */}
        <div className="bg-[#141724] border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-300">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">المستشار المهني المباشر</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تحدث مباشرة مع فريق المستشارين المهنيين لدينا على الواتساب لمتابعة طلبك أو الحصول على استشارة فورية.
            </p>
          </div>

          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <ExternalLink className="w-4 h-4" />
            <span>تواصل عبر واتساب</span>
          </a>
        </div>

      </div>

      {/* 4. Recommended Services for Career Acceleration */}
      <div className="bg-[#141724]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">خدمات تطوير المسار المهني المتاحة لك</h2>
            <p className="text-xs text-slate-400">باقات مصممة خصيصاً لمطابقة معايير كبرى الشركات الإقليمية والعالمية</p>
          </div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>استعراض كافة الباقات في الموقع</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Item 1 */}
          <div className="bg-[#0A0C14] border border-slate-800 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-purple-400 px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-800/40 inline-block">
                الأكثر طلباً
              </span>
              <h4 className="text-sm font-bold text-white">CV ATS الاحترافي</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                إعادة صياغة كاملة بالإنجليزية أو العربية تضمن تجاوز فلاتر التوظيف بنسبة 98%+.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-900">
              <span className="text-sm font-black text-purple-300">150 EGP</span>
              <button
                onClick={() => onOpenEvaluationModal('cv-writing')}
                className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded-lg transition-all"
              >
                طلب الخدمة
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-[#0A0C14] border border-slate-800 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/40 inline-block">
                تطوير الهوية
              </span>
              <h4 className="text-sm font-bold text-white">تحسين بروفايل LinkedIn</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                تحسين الـ Headline, About, والـ SEO لجذب مسؤولي التوظيف والـ Headhunters.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-900">
              <span className="text-sm font-black text-indigo-300">100 EGP</span>
              <button
                onClick={() => onOpenEvaluationModal('linkedin-optimization')}
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all"
              >
                طلب الخدمة
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-[#0A0C14] border border-slate-800 rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/40 inline-block">
                خطاب مخصص
              </span>
              <h4 className="text-sm font-bold text-white">Cover Letter مخصصة</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                خطاب تقديم قوي وموجه لوظيفة معينة يبرز نقاط تميزك وقيمتك المضافة للشركة.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-900">
              <span className="text-sm font-black text-emerald-300">50 EGP</span>
              <button
                onClick={() => onOpenEvaluationModal('cover-letter')}
                className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-all"
              >
                طلب الخدمة
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
