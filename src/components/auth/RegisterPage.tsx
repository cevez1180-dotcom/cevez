import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ShieldCheck,
  Check
} from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (route: string) => void;
  onSuccess?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onSuccess }) => {
  const { signUpWithEmail, signInWithGoogle, isConfigured } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('يرجى إدخال اسمك الكامل.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('يجب إدخال بريد إلكتروني صحيح.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('كلمة المرور يجب أن تحتوي على 6 أحرف أو أرقام على الأقل.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين، يرجى التأكد وإعادة الكتابة.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUpWithEmail(email, password, fullName);

      if (result.success) {
        if (result.requiresEmailVerification) {
          setSuccessInfo('تم إنشاء حسابك بنجاح! ✉️ يرجى مراجعة بريدك الإلكتروني لتفعيل الحساب ثم تسجيل الدخول.');
        } else {
          setSuccessInfo('تم إنشاء حسابك بنجاح! جاري تحويلك إلى المنصة...');
          setTimeout(() => {
            if (onSuccess) onSuccess();
            onNavigate('/');
          }, 1000);
        }
      } else {
        setErrorMessage(result.error || 'تعذر إنشاء الحساب، يرجى المحاولة مرة أخرى.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ غير متوقع أثناء التسجيل.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    setIsGoogleLoading(true);

    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        setErrorMessage(result.error || 'تعذر التسجيل عبر Google.');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الاتصال مع Google.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#141724]/90 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-950/80 text-purple-300 border border-purple-700/40 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>انضم لمنصة Career Profile</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              أنشئ حسابك في Career Profile 🚀
            </h1>

            <p className="text-xs sm:text-sm text-slate-400">
              سجّل حسابك الجديد للوصول إلى كافة خدمات المنصة والتحليل الذكي.
            </p>
          </div>

          {/* Configuration Hint Banner if Supabase .env is missing */}
          {!isConfigured && (
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>تنبيه الإعداد:</strong> يرجى ربط مفاتيح <code>VITE_SUPABASE_URL</code> و <code>VITE_SUPABASE_ANON_KEY</code> في ملف <code>.env</code> لتفعيل المصادقة.
              </div>
            </div>
          )}

          {/* Success Message Banner */}
          {successInfo && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block font-bold text-white">نجحت العملية!</strong>
                <p className="leading-relaxed text-emerald-200/90">{successInfo}</p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('/login')}
                    className="text-xs font-bold underline text-emerald-300 hover:text-white"
                  >
                    الانتقال لصفحة تسجيل الدخول الآن ←
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed flex-1">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-bold text-slate-200">
                الاسم الكامل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: أحمد محمد عبد الله"
                  required
                  disabled={isLoading || isGoogleLoading}
                  className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-bold text-slate-200">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  dir="ltr"
                  required
                  disabled={isLoading || isGoogleLoading}
                  className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all disabled:opacity-50 text-left"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-bold text-slate-200">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 أحرف أو أرقام على الأقل"
                  dir="ltr"
                  required
                  minLength={6}
                  disabled={isLoading || isGoogleLoading}
                  className="w-full pr-10 pl-10 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all disabled:opacity-50 text-left"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-bold text-slate-200">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد كتابة كلمة المرور"
                  dir="ltr"
                  required
                  minLength={6}
                  disabled={isLoading || isGoogleLoading}
                  className="w-full pr-10 pl-10 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all disabled:opacity-50 text-left"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Real-time match indicator */}
              {password && confirmPassword && (
                <div className="pt-1 text-[11px] flex items-center gap-1.5">
                  {password === confirmPassword ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> كلمتا المرور متطابقتان
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      ⚠️ كلمتا المرور غير متطابقتين بعد
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري إنشاء الحساب...</span>
                </>
              ) : (
                <>
                  <span>إنشاء الحساب</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-[#141724] px-3 text-[11px] font-semibold text-slate-500 shrink-0">
              أو
            </span>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full py-3 rounded-xl bg-[#1A1D2B] hover:bg-[#222738] border border-slate-700 hover:border-slate-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 shadow-md group"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <span>جاري الاتصال بـ Google...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>المتابعة باستخدام Google</span>
              </>
            )}
          </button>

          {/* Footer Link: Login */}
          <div className="pt-2 text-center text-xs text-slate-400">
            <span>لديك حساب بالفعل؟ </span>
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors mr-1"
            >
              تسجيل الدخول
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>خصوصيتك مضمونة بنسبة 100% مع معايير الأمان العالمية</span>
          </div>

        </div>
      </div>
    </div>
  );
};
