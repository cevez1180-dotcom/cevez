import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile } from '../types/auth';
import { getArabicAuthErrorMessage } from '../utils/authErrors';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ success: boolean; requiresEmailVerification?: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  resetPasswordForEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch or safely build user profile from Supabase profiles table
  const fetchProfile = async (currentUser: User) => {
    if (!isSupabaseConfigured) {
      setProfile({
        id: currentUser.id,
        email: currentUser.email || '',
        full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'مستخدم Career Profile',
        avatar_url: currentUser.user_metadata?.avatar_url || null,
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('Could not fetch profile from table (table might not exist yet):', error.message);
      }

      if (data) {
        setProfile(data as UserProfile);
      } else {
        // Build fallback profile from Auth metadata
        const fallbackProfile: UserProfile = {
          id: currentUser.id,
          email: currentUser.email || '',
          full_name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'مستخدم Career Profile',
          avatar_url: currentUser.user_metadata?.avatar_url || currentUser.user_metadata?.picture || null,
          created_at: currentUser.created_at,
          updated_at: new Date().toISOString()
        };
        setProfile(fallbackProfile);

        // Try inserting into profiles table if RLS allows
        try {
          await supabase.from('profiles').upsert([fallbackProfile], { onConflict: 'id' });
        } catch {
          // Non-blocking if table is not setup yet
        }
      }
    } catch (err) {
      console.warn('Error handling profile:', err);
    }
  };

  useEffect(() => {
    // 1. Initial getSession call
    const initSession = async () => {
      try {
        if (!isSupabaseConfigured) {
          setIsLoading(false);
          return;
        }

        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Error getting Supabase session:', error.message);
        }

        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          await fetchProfile(initialSession.user);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    // 2. Set up onAuthStateChange listener
    if (!isSupabaseConfigured) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);

        if (currentSession?.user) {
          await fetchProfile(currentSession.user);
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'لم يتم ضبط إعدادات Supabase في بيئة التشغيل (.env). يرجى إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { success: false, error: getArabicAuthErrorMessage(error) };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  // Sign Up with Email & Password
  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'لم يتم ضبط إعدادات Supabase في بيئة التشغيل (.env).',
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { success: false, error: getArabicAuthErrorMessage(error) };
      }

      // Check if session was immediately provided (email confirmation disabled) or if verification email was sent
      const requiresEmailVerification = !data.session && !!data.user && !data.user.confirmed_at;

      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user);
      }

      return { 
        success: true, 
        requiresEmailVerification 
      };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  // Sign In with Google via Supabase OAuth
  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'لم يتم ضبط إعدادات Supabase في بيئة التشغيل (.env).',
      };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return { success: false, error: getArabicAuthErrorMessage(error) };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  // Request password reset email
  const resetPasswordForEmail = async (email: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'لم يتم ضبط إعدادات Supabase في بيئة التشغيل (.env).',
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { success: false, error: getArabicAuthErrorMessage(error) };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  // Update password (used on /reset-password)
  const updatePassword = async (password: string) => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'لم يتم ضبط إعدادات Supabase في بيئة التشغيل (.env).',
      };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return { success: false, error: getArabicAuthErrorMessage(error) };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  // Update User Profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { success: false, error: 'يجب تسجيل الدخول أولاً لتحديث بياناتك.' };
    }

    try {
      // 1. Update user metadata in auth if full_name is provided
      if (updates.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: updates.full_name },
        });
      }

      // 2. Update profiles table if available
      const updatedData: Partial<UserProfile> = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      if (isSupabaseConfigured) {
        try {
          await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email,
              ...updatedData,
            });
        } catch {
          // Continue even if table is not yet migrated
        }
      }

      setProfile((prev) => (prev ? { ...prev, ...updatedData } : null));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
      setProfile(null);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: getArabicAuthErrorMessage(err) };
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      session,
      profile,
      isLoading,
      isConfigured: isSupabaseConfigured,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      resetPasswordForEmail,
      updatePassword,
      updateProfile,
      signOut,
      refreshProfile,
    }),
    [user, session, profile, isLoading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
