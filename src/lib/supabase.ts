import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Safe URL validator & sanitizer
function sanitizeAndValidateSupabaseUrl(urlRaw?: string): { isValid: boolean; url: string } {
  if (!urlRaw || typeof urlRaw !== 'string') {
    return { isValid: false, url: '' };
  }

  let trimmed = urlRaw.trim();
  if (!trimmed) return { isValid: false, url: '' };

  // If user entered hostname without protocol (e.g. abc.supabase.co)
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }

  // Reject template placeholders
  if (
    trimmed.includes('your-project') ||
    trimmed.includes('your-supabase-project') ||
    trimmed.includes('placeholder-project') ||
    trimmed.includes('example.com') ||
    trimmed === 'https://' ||
    trimmed === 'http://'
  ) {
    return { isValid: false, url: trimmed };
  }

  try {
    const parsed = new URL(trimmed);
    const isValid = (parsed.protocol === 'http:' || parsed.protocol === 'https:') && Boolean(parsed.hostname);
    return { isValid, url: parsed.toString().replace(/\/$/, '') };
  } catch {
    return { isValid: false, url: '' };
  }
}

function validateSupabaseAnonKey(keyRaw?: string): { isValid: boolean; key: string } {
  if (!keyRaw || typeof keyRaw !== 'string') {
    return { isValid: false, key: '' };
  }

  const trimmed = keyRaw.trim();
  if (
    !trimmed ||
    trimmed.includes('your-anon-key') ||
    trimmed.includes('your-supabase-anon') ||
    trimmed.includes('dummy_key_for_unconfigured') ||
    trimmed.length < 20
  ) {
    return { isValid: false, key: trimmed };
  }

  return { isValid: true, key: trimmed };
}

// Read raw environment variables
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

const { isValid: hasValidUrl, url: sanitizedUrl } = sanitizeAndValidateSupabaseUrl(rawUrl);
const { isValid: hasValidKey, key: sanitizedKey } = validateSupabaseAnonKey(rawKey);

export const isSupabaseConfigured = hasValidUrl && hasValidKey;

// Guaranteed valid fallback values for unconfigured environments
const FALLBACK_DUMMY_URL = 'https://placeholder-project.supabase.co';
const FALLBACK_DUMMY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.placeholder_signature_for_unconfigured_mode';

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ [Career Profile - Supabase]: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not configured or using placeholders. ' +
    'The app will run in preview mode. To enable live authentication, please set valid Supabase credentials in .env.'
  );
}

const targetUrl = isSupabaseConfigured ? sanitizedUrl : FALLBACK_DUMMY_URL;
const targetKey = isSupabaseConfigured ? sanitizedKey : FALLBACK_DUMMY_KEY;

// Safe instantiation of SupabaseClient
let clientInstance: SupabaseClient;

try {
  clientInstance = createClient(targetUrl, targetKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: isSupabaseConfigured,
      detectSessionInUrl: isSupabaseConfigured,
      storage: window.localStorage,
    },
  });
} catch (err) {
  console.error('Failed to create Supabase client with target URL, falling back to dummy client:', err);
  clientInstance = createClient(FALLBACK_DUMMY_URL, FALLBACK_DUMMY_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export const supabase: SupabaseClient = clientInstance;
