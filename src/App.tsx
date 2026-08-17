import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SphereMotionSection } from './components/SphereMotionSection';
import { WheelNavigation } from './components/WheelNavigation';
import { IdentityFlow } from './components/IdentityFlow';
import { ServicesSection } from './components/ServicesSection';
import { CvPackagesSection } from './components/CvPackagesSection';
import { WhyDifferent } from './components/WhyDifferent';
import { BeforeAfter } from './components/BeforeAfter';
import { CvDiagnosticTool } from './components/CvDiagnosticTool';
import { FaqSection } from './components/FaqSection';
import { SecondaryCta } from './components/SecondaryCta';
import { Footer } from './components/Footer';
import { EvaluationModal } from './components/EvaluationModal';
import { GoogleDriveHubModal } from './components/GoogleDriveHubModal';
import { ScrollReveal } from './components/motion/ScrollReveal';
import { HardDrive } from 'lucide-react';
import { DriveFile } from './services/googleDrive';

// Auth Components
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { AuthCallback } from './components/auth/AuthCallback';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthenticatedRoute } from './components/auth/AuthenticatedRoute';
import { AuthLoadingScreen } from './components/auth/AuthLoadingScreen';
import { UserDashboard } from './components/dashboard/UserDashboard';

function MainAppContent() {
  const { user, isLoading } = useAuth();

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [driveModalOpen, setDriveModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [importedDriveFile, setImportedDriveFile] = useState<DriveFile | null>(null);

  // Sync route with browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEvaluationModal = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setModalOpen(true);
  };

  const handleCloseEvaluationModal = () => {
    setModalOpen(false);
    setSelectedServiceId(undefined);
  };

  const handleSelectDriveFileForAudit = (file: DriveFile) => {
    setImportedDriveFile(file);
    setDriveModalOpen(false);
    // Open Evaluation Modal with prefilled Drive CV info
    setSelectedServiceId('cv-writing');
    setModalOpen(true);
  };

  // 1. Initial Loading Screen while checking Supabase Session (ZERO FLASH OF LANDING PAGE)
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  // 2. Public Authentication Routes (Standalone - No Navbar or Footer)
  
  // Login Page (Protected against already authenticated users)
  if (currentRoute === '/login') {
    return (
      <AuthenticatedRoute onRedirectToHome={() => navigateTo('/')}>
        <LoginPage 
          onNavigate={navigateTo} 
          onSuccess={() => navigateTo('/')} 
        />
      </AuthenticatedRoute>
    );
  }

  // Register Page (Protected against already authenticated users)
  if (currentRoute === '/register') {
    return (
      <AuthenticatedRoute onRedirectToHome={() => navigateTo('/')}>
        <RegisterPage 
          onNavigate={navigateTo} 
          onSuccess={() => navigateTo('/')} 
        />
      </AuthenticatedRoute>
    );
  }

  // Forgot Password Page
  if (currentRoute === '/forgot-password') {
    return (
      <AuthenticatedRoute onRedirectToHome={() => navigateTo('/')}>
        <ForgotPasswordPage onNavigate={navigateTo} />
      </AuthenticatedRoute>
    );
  }

  // Reset Password Page
  if (currentRoute === '/reset-password') {
    return <ResetPasswordPage onNavigate={navigateTo} />;
  }

  // Auth Callback Page (Google OAuth / Email Verification)
  if (currentRoute === '/auth/callback') {
    return <AuthCallback onNavigate={navigateTo} />;
  }

  // 3. Protected Application View (All internal pages require active Session)
  return (
    <ProtectedRoute
      currentRoute={currentRoute}
      onRedirectToLogin={() => navigateTo('/login')}
    >
      <div className="min-h-screen bg-[#0A0C14] text-[#F8FAFC] selection:bg-[#9333EA] selection:text-white flex flex-col font-sans overflow-x-hidden">
        {/* Sticky Navbar (Only shown to authenticated users) */}
        <Navbar 
          onOpenEvaluationModal={handleOpenEvaluationModal} 
          onOpenDriveHub={() => setDriveModalOpen(true)}
          onNavigate={navigateTo}
          currentRoute={currentRoute}
        />

        {/* Dynamic Route Body */}
        {currentRoute === '/dashboard' || currentRoute === '/profile' || currentRoute === '/my-cv' || currentRoute === '/settings' ? (
          <main className="flex-1">
            <UserDashboard
              onOpenEvaluationModal={handleOpenEvaluationModal}
              onOpenDriveHub={() => setDriveModalOpen(true)}
              onNavigate={navigateTo}
            />
          </main>
        ) : (
          /* Main Protected Landing Page (Default: '/') */
          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero onOpenEvaluationModal={() => handleOpenEvaluationModal('cv-writing')} />

            {/* 2. 3D Fibonacci Sphere & Constellation Motion Section */}
            <SphereMotionSection onOpenEvaluationModal={handleOpenEvaluationModal} />

            {/* 3. 360 Degree Wheel Navigation (CCM-11 Interactive Experience) */}
            <ScrollReveal durationMs={900}>
              <WheelNavigation onOpenEvaluationModal={handleOpenEvaluationModal} />
            </ScrollReveal>

            {/* 4. Identity Flow Section (CV -> ATS -> HR -> LinkedIn -> Portfolio -> Job Offer) */}
            <ScrollReveal durationMs={900}>
              <IdentityFlow onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
            </ScrollReveal>

            {/* 5. CV Packages Section (CV ATS 150 EGP vs CV STANDARD 100 EGP + Requirements & Guarantees) */}
            <ScrollReveal durationMs={900}>
              <CvPackagesSection onOpenEvaluationModal={handleOpenEvaluationModal} />
            </ScrollReveal>

            {/* 6. Services Section (5 prioritized tiers + Bonus services) */}
            <ScrollReveal durationMs={900}>
              <ServicesSection onOpenEvaluationModal={handleOpenEvaluationModal} />
            </ScrollReveal>

            {/* 7. Why We're Different (Platform vs Graphic Shop / AI Slop) */}
            <ScrollReveal durationMs={900}>
              <WhyDifferent onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
            </ScrollReveal>

            {/* 8. Before & After Interactive Showcase */}
            <ScrollReveal durationMs={900}>
              <BeforeAfter onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
            </ScrollReveal>

            {/* 9. CV Diagnostic Tool & Secondary CTA Band */}
            <ScrollReveal durationMs={900}>
              <CvDiagnosticTool onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
            </ScrollReveal>

            {/* 10. FAQs */}
            <ScrollReveal durationMs={900}>
              <FaqSection onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
            </ScrollReveal>

            {/* 11. Secondary CTA Banner */}
            <ScrollReveal durationMs={900}>
              <SecondaryCta onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
            </ScrollReveal>
          </main>
        )}

        {/* Floating Google Drive Quick Access Launcher */}
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setDriveModalOpen(true)}
            className="p-3.5 sm:px-4 sm:py-3 rounded-2xl bg-[#141724]/90 hover:bg-[#1C2033] border border-[#A855F7]/40 text-white shadow-2xl backdrop-blur-md flex items-center gap-2.5 group cursor-pointer hover:scale-105 transition-all"
            title="افتح مركز ملفات Google Drive"
          >
            <div className="w-8 h-8 rounded-xl bg-[#9333EA]/30 border border-[#A855F7]/40 flex items-center justify-center text-purple-300 group-hover:rotate-12 transition-transform">
              <HardDrive className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <span className="text-xs font-extrabold text-white">Google Drive™</span>
              <span className="text-[10px] text-purple-300">سحابتي وملفاتي المهنية</span>
            </div>
          </button>
        </div>

        {/* Footer (Only shown to authenticated users) */}
        <Footer />

        {/* Evaluation & Order Modal */}
        <EvaluationModal
          isOpen={modalOpen}
          onClose={handleCloseEvaluationModal}
          initialServiceId={selectedServiceId}
          importedDriveFile={importedDriveFile}
          onClearImportedFile={() => setImportedDriveFile(null)}
          onOpenDriveModal={() => {
            setModalOpen(false);
            setDriveModalOpen(true);
          }}
        />

        {/* Google Drive Hub Modal */}
        <GoogleDriveHubModal
          isOpen={driveModalOpen}
          onClose={() => setDriveModalOpen(false)}
          onSelectCvFile={handleSelectDriveFileForAudit}
        />
      </div>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
