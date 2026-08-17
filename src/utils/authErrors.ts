/**
 * Maps technical Supabase Auth errors to user-friendly Arabic messages
 */
export function getArabicAuthErrorMessage(error: any): string {
  if (!error) return 'حدث خطأ غير متوقع، حاول مرة أخرى.';

  const message = (error.message || error.error_description || String(error)).toLowerCase();

  // Invalid credentials
  if (
    message.includes('invalid login credentials') ||
    message.includes('invalid_grant') ||
    message.includes('invalid email or password') ||
    message.includes('user not found')
  ) {
    return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
  }

  // Already registered
  if (
    message.includes('user already registered') ||
    message.includes('email already in use') ||
    message.includes('already exists')
  ) {
    return 'هذا البريد الإلكتروني مستخدم بالفعل. يمكنك تسجيل الدخول بدلاً من ذلك.';
  }

  // Weak password
  if (
    message.includes('password should be at least') ||
    message.includes('weak password') ||
    message.includes('password is too short')
  ) {
    return 'كلمة المرور ضعيفة. يجب أن تحتوي على 6 أحرف على الأقل.';
  }

  // Invalid email format
  if (
    message.includes('invalid email') ||
    message.includes('email address is invalid') ||
    message.includes('unable to validate email')
  ) {
    return 'يجب إدخال بريد إلكتروني صحيح وصالح.';
  }

  // Rate limit
  if (
    message.includes('rate limit') ||
    message.includes('too many requests') ||
    message.includes('over_email_send_rate_limit')
  ) {
    return 'تم إرسال عدد كبير من الطلبات. يرجى الانتظار دقيقة ثم المحاولة مجدداً.';
  }

  // Email not confirmed
  if (message.includes('email not confirmed')) {
    return 'لم يتم تفعيل بريدك الإلكتروني بعد. يرجى مراجعة صندوق الوارد والضغط على رابط التفعيل.';
  }

  // Network or Supabase unconfigured
  if (message.includes('failed to fetch') || message.includes('network')) {
    return 'تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو التأكد من إعداد مفاتيح Supabase.';
  }

  // Unconfigured placeholder warning
  if (message.includes('placeholder-project') || message.includes('dummy_key')) {
    return 'يرجى ربط مفاتيح Supabase في ملف .env أولاً لتفعيل عمليات تسجيل الدخول.';
  }

  return error.message || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.';
}
