import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, 
  Search, 
  UploadCloud, 
  FileText, 
  Folder, 
  File, 
  ExternalLink, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HardDrive, 
  Plus, 
  Lock, 
  FileUp, 
  LogOut,
  SlidersHorizontal,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken, 
  initAuth 
} from '../services/googleAuth';
import { 
  listDriveFiles, 
  getDriveQuota, 
  uploadFileToDrive, 
  createCareerReportInDrive, 
  deleteDriveFile, 
  formatBytes,
  DriveFile, 
  DriveQuota 
} from '../services/googleDrive';
import { MagneticButton } from './motion/MagneticButton';
import { User } from 'firebase/auth';

interface GoogleDriveHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCvFile?: (file: DriveFile) => void;
}

export const GoogleDriveHubModal: React.FC<GoogleDriveHubModalProps> = ({
  isOpen,
  onClose,
  onSelectCvFile,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [quota, setQuota] = useState<DriveQuota | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'cv' | 'documents' | 'folders'>('cv');
  
  // Upload State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Destructive Delete Confirmation Modal State (Mandatory Workspace Requirement)
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Initialize Auth on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        if (token) setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Drive Files and Quota
  const fetchDriveData = useCallback(async (token: string) => {
    setIsLoadingFiles(true);
    setStatusMessage(null);
    try {
      const [filesRes, quotaRes] = await Promise.all([
        listDriveFiles(token, {
          query: searchQuery,
          filterType: filterType,
          pageSize: 40,
        }),
        getDriveQuota(token).catch(() => null),
      ]);

      setFiles(filesRes.files);
      if (quotaRes) setQuota(quotaRes);
    } catch (err: any) {
      console.error('Error fetching Google Drive files:', err);
      // If token expired, clear token to prompt re-login
      if (err?.message?.includes('401') || err?.message?.includes('credentials')) {
        setAccessToken(null);
        setStatusMessage({ type: 'error', text: 'انتهت صلاحية جلسة Google Drive، يرجى تسجيل الدخول مجدداً.' });
      } else {
        setStatusMessage({ type: 'error', text: err?.message || 'تعذر جلب الملفات من Google Drive.' });
      }
    } finally {
      setIsLoadingFiles(false);
    }
  }, [searchQuery, filterType]);

  // Load files when accessToken changes or search/filter updates
  useEffect(() => {
    if (isOpen && accessToken) {
      const timeoutId = setTimeout(() => {
        fetchDriveData(accessToken);
      }, 250);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, accessToken, fetchDriveData]);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      setUser(res.user);
      setAccessToken(res.accessToken);
      setStatusMessage({ type: 'success', text: `تم الاتصال بنجاح مع حساب Google Drive (${res.user.email})` });
    } catch (err: any) {
      console.error('Sign In error:', err);
      setStatusMessage({ type: 'error', text: err?.message || 'فشل تسجيل الدخول بواسطة Google.' });
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
    setQuota(null);
    setStatusMessage({ type: 'success', text: 'تم تسجيل الخروج بنجاح.' });
  };

  // Handle Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !accessToken) return;

    setIsUploading(true);
    setUploadProgressMsg(`جاري رفع الملف "${file.name}" إلى Google Drive...`);
    try {
      const uploadedFile = await uploadFileToDrive(accessToken, file);
      setStatusMessage({ type: 'success', text: `تم رفع "${uploadedFile.name}" بنجاح إلى Google Drive!` });
      await fetchDriveData(accessToken);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'فشل رفع الملف إلى Google Drive.' });
    } finally {
      setIsUploading(false);
      setUploadProgressMsg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle Creating a Starter Career Report in Drive
  const handleCreateStarterDoc = async () => {
    if (!accessToken) return;
    setIsUploading(true);
    setUploadProgressMsg('جاري إنشاء مسودة الـ CV الاستراتيجية في Google Drive...');
    try {
      const reportText = `# نموذج السيرة الذاتية المهنية المطورة - Career Profile (STAR Framework)
الاسم الكامل: ${user?.displayName || 'المرشح المهني'}
البريد الإلكتروني: ${user?.email || 'email@example.com'}
المجال المستهدف: هندسة برمجيات / إدارة أعمال / تسويق

## الملخص التنفيذي (Executive Summary)
متخصص مهني ذو خبرة في قيادة المشاريع وتحقيق نمو نوعي، متخصص في تحويل الأهداف الاستراتيجية لنتائج رقمية قابلة للقياس وفق منهجيات العمل العالمية.

## الخبرات المهنية وفق صياغة (STAR Framework)
- الموقف (Situation): قيادة فريق التطوير لمعالجة فجوات الأداء والتحول السحابي.
- المهمة (Task): إعادة هيكلة البنية التحتية لتقليل زمن الاستجابة بنسبة 40%.
- الإجراء (Action): هندسة خدمات Microservices باستخدام أحدث المعايير البرمجية.
- النتيجة (Result): تحقيق خفض في استهلاك الموارد بنسبة 35% واستيعاب 2 مليون مستخدم نشط.

## المهارات المعتمدة لأنظمة الـ ATS
Keywords: Strategic Planning, Cloud Architecture, Leadership, Agile, Performance Optimization.`;

      const newDoc = await createCareerReportInDrive(accessToken, 'نموذج السيرة الذاتية المطورة', reportText);
      setStatusMessage({ type: 'success', text: `تم إنشاء المستند "${newDoc.name}" في Google Drive بنجاح!` });
      await fetchDriveData(accessToken);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'تعذر إنشاء المستند في Google Drive.' });
    } finally {
      setIsUploading(false);
      setUploadProgressMsg(null);
    }
  };

  // Handle Delete Confirmation Execution
  const handleConfirmDelete = async () => {
    if (!fileToDelete || !accessToken) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, fileToDelete.id);
      setStatusMessage({ type: 'success', text: `تم حذف "${fileToDelete.name}" من Google Drive.` });
      setFileToDelete(null);
      await fetchDriveData(accessToken);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'فشل حذف الملف من Google Drive.' });
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper icon for mimeTypes
  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-6 h-6 text-amber-400 shrink-0" />;
    }
    if (mimeType.includes('pdf')) {
      return <FileText className="w-6 h-6 text-red-400 shrink-0" />;
    }
    if (mimeType.includes('word') || mimeType.includes('document')) {
      return <FileText className="w-6 h-6 text-blue-400 shrink-0" />;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('sheet')) {
      return <FileText className="w-6 h-6 text-emerald-400 shrink-0" />;
    }
    return <File className="w-6 h-6 text-purple-400 shrink-0" />;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-fadeIn overflow-y-auto duration-300"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#141724] border border-[#A855F7]/40 rounded-2xl sm:rounded-3xl shadow-2xl text-right relative my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-800/90 bg-[#0E101A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#9333EA]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#C084FC] shadow-inner">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  مركز سحابة Google Drive™
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#9333EA]/25 text-[#C084FC] border border-[#A855F7]/30">
                  سحابي وآمن
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تصفح سيرك الذاتية ومستنداتك المهنية، واستوردها للفحص أو صدّر تقاريرك المطورة مباشرة إلى Drive.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#1A1D2B] hover:bg-red-950/80 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center cursor-pointer transition-colors"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth / Account Profile Bar */}
        <div className="p-4 sm:p-5 bg-[#0B0D17] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {user && accessToken ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'Google User'} 
                  className="w-10 h-10 rounded-full border-2 border-purple-500 shadow-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-900/60 border border-purple-500 flex items-center justify-center text-white font-bold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{user.displayName || 'مستخدم Google'}</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>متصل بـ Drive</span>
                  </span>
                </div>
                <div className="text-xs text-slate-400">{user.email}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span className="text-xs sm:text-sm text-slate-300">
                قم بالاتصال بحساب Google للوصول إلى سيرك الذاتية ومستنداتك على Google Drive.
              </span>
            </div>
          )}

          {/* Account Controls */}
          <div className="flex items-center gap-2 mr-auto">
            {user && accessToken ? (
              <>
                {quota && quota.usage && quota.limit && (
                  <div className="hidden md:flex flex-col text-left font-mono text-[11px] text-slate-400 bg-[#141724] px-3 py-1.5 rounded-xl border border-slate-800">
                    <span className="text-slate-300">المساحة: {formatBytes(quota.usage)} / {formatBytes(quota.limit)}</span>
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                        style={{ width: `${Math.min(100, (parseInt(quota.usage, 10) / parseInt(quota.limit, 10)) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-red-950/40 border border-slate-800 hover:border-red-800/50 text-slate-300 hover:text-red-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>قطع الاتصال</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {/* Official Google Icon SVG */}
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{isAuthenticating ? 'جاري الاتصال...' : 'تسجيل الدخول بـ Google'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Toast Alert */}
        {statusMessage && (
          <div className={`p-3 mx-4 sm:mx-6 mt-3 rounded-xl border flex items-center justify-between text-xs animate-fadeIn ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
              : 'bg-red-950/40 border-red-800/60 text-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Drive Workspace Content */}
        {user && accessToken ? (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4">
            
            {/* Toolbar: Search, Filters, Upload & Create */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              {/* Search Box */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث في ملفات Google Drive بالاسم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B0D17] border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-right"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#0B0D17] p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setFilterType('cv')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterType === 'cv' ? 'bg-[#9333EA] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  السير الذاتية (CVs)
                </button>
                <button
                  onClick={() => setFilterType('documents')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterType === 'documents' ? 'bg-[#9333EA] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  المستندات
                </button>
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterType === 'all' ? 'bg-[#9333EA] text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  كل الملفات
                </button>
              </div>

              {/* Action Buttons: Upload & Create */}
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden" 
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3.5 py-2 rounded-xl bg-[#9333EA]/20 hover:bg-[#9333EA]/30 border border-[#A855F7]/40 text-[#C084FC] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="رفع ملف PDF أو Word إلى Google Drive"
                >
                  <FileUp className="w-4 h-4" />
                  <span>رفع CV لـ Drive</span>
                </button>

                <button
                  onClick={handleCreateStarterDoc}
                  disabled={isUploading}
                  className="px-3.5 py-2 rounded-xl bg-[#0B0D17] hover:bg-[#1A1D2B] border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="إنشاء مسودة سيرة مهنية جديدة وحفظها في Drive"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>مسودة STAR جديدة</span>
                </button>

                <button
                  onClick={() => fetchDriveData(accessToken)}
                  disabled={isLoadingFiles}
                  className="p-2 rounded-xl bg-[#0B0D17] border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="تحديث قائمة الملفات"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin text-purple-400' : ''}`} />
                </button>
              </div>

            </div>

            {/* Uploading Banner */}
            {isUploading && (
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-center gap-2 text-xs text-purple-200 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                <span>{uploadProgressMsg || 'جاري معالجة الملف في Google Drive...'}</span>
              </div>
            )}

            {/* Files Grid / List */}
            {isLoadingFiles ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
                <RefreshCw className="w-8 h-8 text-[#A855F7] animate-spin mb-3" />
                <p className="text-sm font-medium">جاري استرجاع المستندات من Google Drive الخاص بك...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-[#0B0D17]/50">
                <div className="w-14 h-14 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-purple-400 mb-3">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">لم يتم العثور على ملفات تطابق البحث</h4>
                <p className="text-xs text-slate-400 max-w-md mb-4">
                  يمكنك رفع ملف سيرتك الذاتية الآن، أو إنشاء مسودة STAR وحفظها تلقائياً في حساب Google Drive الخاص بك.
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-[#9333EA] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/30 cursor-pointer"
                >
                  <FileUp className="w-4 h-4" />
                  <span>رفع أول ملف CV إلى Google Drive</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 rounded-2xl bg-[#0B0D17] border border-slate-800 hover:border-[#A855F7]/50 transition-all duration-300 flex items-center justify-between gap-3 group"
                  >
                    {/* Left/Start: File Icon & Meta */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {getFileIcon(file.mimeType)}
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors" title={file.name}>
                          {file.name}
                        </h5>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{formatBytes(file.size)}</span>
                          <span>•</span>
                          <span>{file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('ar-SA') : ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right/End: Quick Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Import CV Action */}
                      {onSelectCvFile && (
                        <button
                          onClick={() => {
                            onSelectCvFile(file);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          title="استيراد هذا الملف لفحصه في أداة تقييم الـ ATS"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>استيراد للفحص</span>
                        </button>
                      )}

                      {/* Open in Drive Preview */}
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#141724] hover:bg-purple-950 text-slate-400 hover:text-purple-300 border border-slate-800 transition-colors cursor-pointer"
                          title="فتح ومعاينة في Google Drive"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* Delete File (Triggers Mandatory Confirmation) */}
                      <button
                        onClick={() => setFileToDelete(file)}
                        className="p-1.5 rounded-lg bg-[#141724] hover:bg-red-950/80 text-slate-400 hover:text-red-300 border border-slate-800 transition-colors cursor-pointer"
                        title="حذف الملف من Google Drive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          /* Logged-out State */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-18 h-18 rounded-3xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-center text-purple-400 mb-4 shadow-xl">
              <HardDrive className="w-9 h-9" />
            </div>
            
            <h4 className="text-xl font-extrabold text-white mb-2">
              اربط سيرتك ومستنداتك بسحابة Google Drive™
            </h4>
            
            <p className="text-sm text-slate-400 max-w-lg mb-6 leading-relaxed">
              يمكّنك التكامل مع Google Drive من استيراد سيرتك الذاتية بنقرة واحدة لتحليلها بالذكاء الاصطناعي، ومزامنة صياغات الـ STAR المطورة وتقارير الـ ATS مباشرة إلى حسابك السحابي بأمان كامل.
            </p>

            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm sm:text-base transition-all shadow-xl flex items-center gap-3 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>{isAuthenticating ? 'جاري الاتصال السحابي...' : 'تسجيل الدخول بـ Google وحفظ الـ CV'}</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#0E101A] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>جميع الصلاحيات والملفات تُدار حصرياً بموافقة المستخدم وتشفير Google OAuth 2.0 القياسي.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#1A1D2B] hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>

      {/* Mandatory Destructive Operation Confirmation Dialog (Per Workspace Skill Rules) */}
      {fileToDelete && (
        <div 
          className="fixed inset-0 z-[10010] bg-black/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn"
          onClick={() => setFileToDelete(null)}
        >
          <div 
            className="w-full max-w-md bg-[#141724] border border-red-900/60 rounded-2xl p-6 shadow-2xl text-right relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400 mb-4 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <h4 className="text-lg font-bold text-white text-center mb-2">
              تأكيد حذف الملف من Google Drive
            </h4>

            <p className="text-xs text-slate-300 text-center leading-relaxed mb-6">
              هل أنت متأكد من رغبتك في حذف الملف:
              <br />
              <strong className="text-red-400 text-sm font-mono mt-1 block">"{fileToDelete.name}"</strong>
              من حساب Google Drive الخاص بك؟ هذا الإجراء لا يمكن التراجع عنه.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="py-2.5 px-4 rounded-xl bg-[#0B0D17] hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-900/40 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                <span>{isDeleting ? 'جاري الحذف...' : 'نعم، احذف الملف'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
