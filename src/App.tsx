import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WheelNavigation } from './components/WheelNavigation';
import { IdentityFlow } from './components/IdentityFlow';
import { ServicesSection } from './components/ServicesSection';
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

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [driveModalOpen, setDriveModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [importedDriveFile, setImportedDriveFile] = useState<DriveFile | null>(null);

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

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#F8FAFC] selection:bg-[#9333EA] selection:text-white flex flex-col font-sans overflow-x-hidden">
      {/* Sticky Navbar */}
      <Navbar 
        onOpenEvaluationModal={handleOpenEvaluationModal} 
        onOpenDriveHub={() => setDriveModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenEvaluationModal={() => handleOpenEvaluationModal('cv-writing')} />

        {/* 2. 360 Degree Wheel Navigation (CCM-11 Interactive Experience) */}
        <ScrollReveal durationMs={900}>
          <WheelNavigation onOpenEvaluationModal={handleOpenEvaluationModal} />
        </ScrollReveal>

        {/* 3. Identity Flow Section (CV -> ATS -> HR -> LinkedIn -> Portfolio -> Job Offer) */}
        <ScrollReveal durationMs={900}>
          <IdentityFlow onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
        </ScrollReveal>

        {/* 4. Services Section (5 prioritized tiers + Bonus services) */}
        <ScrollReveal durationMs={900}>
          <ServicesSection onOpenEvaluationModal={handleOpenEvaluationModal} />
        </ScrollReveal>

        {/* 5. Why We're Different (Platform vs Graphic Shop / AI Slop) */}
        <ScrollReveal durationMs={900}>
          <WhyDifferent onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
        </ScrollReveal>

        {/* 6. Before & After Interactive Showcase */}
        <ScrollReveal durationMs={900}>
          <BeforeAfter onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
        </ScrollReveal>

        {/* 7. CV Diagnostic Tool & Secondary CTA Band ("ابعت لنا الـ CV الحالي") */}
        <ScrollReveal durationMs={900}>
          <CvDiagnosticTool onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
        </ScrollReveal>

        {/* 8. FAQs */}
        <ScrollReveal durationMs={900}>
          <FaqSection onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
        </ScrollReveal>

        {/* 9. Secondary CTA Banner */}
        <ScrollReveal durationMs={900}>
          <SecondaryCta onOpenEvaluationModal={() => handleOpenEvaluationModal()} />
        </ScrollReveal>
      </main>

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

      {/* Footer */}
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
  );
}

