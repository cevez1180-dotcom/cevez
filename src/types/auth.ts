import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone?: string | null;
  job_title?: string | null;
  target_role?: string | null;
  experience_years?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
}

export interface AuthErrorResponse {
  message: string;
  code?: string;
}
