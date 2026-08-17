import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const AuthLoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0A0C14] flex flex-col items-center justify-center px-4 select-none overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Brand Identity Card */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
        {/* Animated Brand Logo */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-2xl shadow-purple-900/60 border border-purple-400/30 animate-pulse">
            CP
          </div>
          <div className="absolute -inset-2 bg-purple-500/20 rounded-3xl blur-md -z-10 animate-ping opacity-60" />
        </div>

        {/* Brand Text */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-950/80 text-purple-300 border border-purple-700/40">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>منظومة الهوية المهنية الذكية</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Career Profile
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            جاري التحقق من الجلسة وتأمين الوصول...
          </p>
        </div>

        {/* Sleek Progress Spinner Bar */}
        <div className="w-48 h-1.5 bg-[#141724] border border-purple-900/40 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 bg-gradient-to-r from-purple-600 via-indigo-400 to-purple-600 rounded-full w-full animate-indeterminate" />
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>تشفير عالي الأمان • Supabase Auth</span>
        </div>
      </div>
    </div>
  );
};
