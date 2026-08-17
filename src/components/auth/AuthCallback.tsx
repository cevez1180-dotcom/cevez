import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface AuthCallbackProps {
  onNavigate: (route: string) => void;
}

export const AuthCallback: React.FC<AuthCallbackProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Exchange session code/token automatically handled by supabase client
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (data.session) {
          setStatus('success');
          setTimeout(() => {
            onNavigate('/');
          }, 1000);
        } else {
          // Listen once for auth state change in case hash is being processed
          const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
              setStatus('success');
              authListener.subscription.unsubscribe();
              setTimeout(() => {
                onNavigate('/');
              }, 1000);
            }
          });

          // Timeout fallback
          setTimeout(() => {
            authListener.subscription.unsubscribe();
            onNavigate('/');
          }, 2500);
        }
      } catch (err: any) {
        console.error('OAuth Callback Error:', err);
        setStatus('error');
        setErrorMsg(err.message || 'فشل استكمال تسجيل الدخول عبر Google.');
      }
    };

    handleAuthCallback();
  }, [onNavigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="bg-[#141724]/90 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl shadow-purple-950/60">
        {status === 'loading' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-400 mx-auto">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white">جاري استكمال تسجيل الدخول...</h2>
            <p className="text-xs text-slate-400">
              يتم التحقق من بيانات حسابك في Google وتجهيز مساحة العمل الخاصة بك في Career Profile.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">تم تسجيل الدخول بنجاح! 🎉</h2>
            <p className="text-xs text-slate-400">
              جاري نقلك مباشرة إلى لوحة التحكم الخاصة بك...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-800/50 flex items-center justify-center text-red-400 mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">تعذر تسجيل الدخول</h2>
            <p className="text-xs text-red-300">{errorMsg}</p>
            <button
              onClick={() => onNavigate('/login')}
              className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all"
            >
              العودة لصفحة تسجيل الدخول
            </button>
          </>
        )}
      </div>
    </div>
  );
};
