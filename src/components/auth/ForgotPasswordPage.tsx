import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  KeyRound,
  ArrowRight
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (route: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { resetPasswordForEmail, isConfigured } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPasswordForEmail(email);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.error || 'تعذر إرسال رابط الاستعادة، يرجى المحاولة مرة أخرى.');
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
              استعادة كلمة المرور 🔐
            </h1>

            <p className="text-xs sm:text-sm text-slate-400">
              أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً آمناً لإعادة تعيين كلمة المرور.
            </p>
          </div>

          {!isConfigured && (
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                يرجى ضبط مفاتيح Supabase في ملف <code>.env</code> لتفعيل إرسال رسائل الاستعادة.
              </div>
            </div>
          )}

          {/* Success State Banner */}
          {isSubmitted ? (
            <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-700/60 text-emerald-200 text-xs sm:text-sm space-y-3 animate-in fade-in duration-300 text-right">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>تم إرسال رابط استعادة كلمة المرور بنجاح!</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                تحقق من صندوق الوارد (أو مجلد الرسائل غير المرغوب فيها Spam) الخاص بالبريد: <strong className="text-white font-mono">{email}</strong> واضغط على الرابط لإعادة تعيين كلمة المرور.
              </p>
              <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-purple-300 hover:text-white underline"
                >
                  إعادة إرسال البريد
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1"
                >
                  <span>العودة لتسجيل الدخول</span>
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
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-bold text-slate-200">
                    البريد الإلكتروني المسجل
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
                      disabled={isLoading}
                      className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-[#0A0C14] border border-slate-800 focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all disabled:opacity-50 text-left"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري إرسال الرابط...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال رابط الاستعادة</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Back to Login Link */}
          <div className="pt-2 text-center text-xs text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="inline-flex items-center gap-1.5 font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>تذكرت كلمة المرور؟ تسجيل الدخول</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
