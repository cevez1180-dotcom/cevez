import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  KeyRound,
  Check
} from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigate: (route: string) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage('كلمة المرور يجب أن تحتوي على 6 أحرف أو أرقام على الأقل.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين، يرجى إعادة التأكد.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await updatePassword(password);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onNavigate('/');
        }, 2000);
      } else {
        setErrorMessage(result.error || 'تعذر تحديث كلمة المرور، يرجى المحاولة مرة أخرى.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#141724]/90 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-300 mx-auto mb-2">
              <KeyRound className="w-6 h-6" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              تعيين كلمة مرور جديدة 🔒
            </h1>

            <p className="text-xs sm:text-sm text-slate-400">
              أدخل كلمة المرور الجديدة لحسابك لتأمين وصولك إلى Career Profile.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm space-y-3 animate-in fade-in duration-300 text-right">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>تم تحديث كلمة المرور بنجاح!</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                تم تغيير كلمة المرور وتأمين حسابك. جاري تحويلك الآن إلى لوحة التحكم الخاصة بك...
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>الدخول إلى المنصة الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed flex-1">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-bold text-slate-200">
                    كلمة المرور الجديدة
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
                      disabled={isLoading}
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

                {/* Confirm New Password */}
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-bold text-slate-200">
                    تأكيد كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="أعد كتابة كلمة المرور الجديدة"
                      dir="ltr"
                      required
                      minLength={6}
                      disabled={isLoading}
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

                  {password && confirmPassword && (
                    <div className="pt-1 text-[11px] flex items-center gap-1.5">
                      {password === confirmPassword ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> كلمتا المرور متطابقتان
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1">
                          ⚠️ كلمتا المرور غير متطابقتين
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري تحديث كلمة المرور...</span>
                    </>
                  ) : (
                    <>
                      <span>تحديث كلمة المرور والدخول</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <div className="pt-2 text-center text-xs text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="text-purple-400 hover:text-purple-300 font-bold transition-colors"
            >
              العودة لتسجيل الدخول
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
