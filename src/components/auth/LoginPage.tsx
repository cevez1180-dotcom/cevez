import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  Loader2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CatLoopAnimation } from './CatLoopAnimation';

interface LoginPageProps {
  onNavigate: (route: string) => void;
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onSuccess }) => {
  const { signInWithEmail, signInWithGoogle, isConfigured } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('يرجى إدخال البريد الإلكتروني.');
      return;
    }

    if (!password) {
      setErrorMessage('يرجى إدخال كلمة المرور.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signInWithEmail(email, password);
      if (result.success) {
        if (onSuccess) onSuccess();
        onNavigate('/');
      } else {
        setErrorMessage(result.error || 'فشل تسجيل الدخول، يرجى التأكد من البيانات.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ غير متوقع.');
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
        setErrorMessage(result.error || 'تعذر تسجيل الدخول عبر Google.');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء الاتصال مع Google.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-12 sm:py-16 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Visual Showcase Panel with Cat Animation (Desktop side & Mobile Header) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center order-1 lg:order-2 space-y-4">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#141724]/80 backdrop-blur-2xl border border-purple-500/20 shadow-2xl shadow-purple-950/40 w-full flex flex-col items-center overflow-hidden group">
              
              {/* Decorative Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-950/80 text-purple-300 border border-purple-700/40 mb-2">
                <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
                <span>حركة تفاعلية انسيابية • Cat Loop</span>
              </div>

              {/* The Cat Loop 3D/Segmented Motion Component */}
              <div className="my-2 sm:my-4 transition-transform duration-500 group-hover:scale-105">
                <CatLoopAnimation size="md" />
              </div>

              {/* Accompanying Tagline */}
              <div className="space-y-1.5 mt-2">
                <h3 className="text-sm sm:text-base font-black text-white">
                  طريقك المهني بانسيابية وتألق
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-xs">
                  تصميم متقن وحركات رياضية دقيقة تعكس جودة واحترافية منصة Career Profile.
                </p>
              </div>

              {/* Small Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-800/40 text-[10px] text-purple-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>30 مقطع متحرك</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-800/40 text-[10px] text-purple-200">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  <span>حركة لا نهائية</span>
                </span>
              </div>
            </div>
          </div>

          {/* Login Form Panel */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-[#141724]/90 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6">
              
              {/* Header */}
              <div className="text-right space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-950/80 text-purple-300 border border-purple-700/40 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>بوابة الدخول الآمنة</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  أهلاً بعودتك 👋
                </h1>

                <p className="text-xs sm:text-sm text-slate-400">
                  سجّل دخولك للوصول إلى ملفك المهني وخدمات Career Profile.
                </p>
              </div>

              {/* Configuration Hint Banner if Supabase .env is missing */}
              {!isConfigured && (
                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>تنبيه الإعداد:</strong> يرجى إضافة مفاتيح <code>VITE_SUPABASE_URL</code> و <code>VITE_SUPABASE_ANON_KEY</code> في ملف <code>.env</code> لتفعيل المصادقة وقاعدة البيانات السحابية.
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
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigate('/forgot-password')}
                      className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      نسيت كلمة المرور؟
                    </button>
                    <label className="block text-xs font-bold text-slate-200">
                      كلمة المرور
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      dir="ltr"
                      required
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isGoogleLoading}
                  className="w-full py-3 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري تسجيل الدخول...</span>
                    </>
                  ) : (
                    <>
                      <span>تسجيل الدخول</span>
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

              {/* Footer Link: Register */}
              <div className="pt-2 text-center text-xs text-slate-400">
                <span>ليس لديك حساب؟ </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/register')}
                  className="font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors mr-1 cursor-pointer"
                >
                  إنشاء حساب
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>بياناتك محمية ومشفرة بمعايير Supabase الأمنية</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
