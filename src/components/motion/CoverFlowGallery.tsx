import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Briefcase, 
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';
import { TRANSFORMATION_DATA, CATEGORIES, TransformationItem, CandidateCategory } from '../../data/transformations';
import { MagneticButton } from './MagneticButton';

interface CoverFlowGalleryProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
}

export const CoverFlowGallery: React.FC<CoverFlowGalleryProps> = ({ onOpenEvaluationModal }) => {
  const [activeIndex, setActiveIndex] = useState<number>(3); // start at a balanced center candidate
  const [selectedCategory, setSelectedCategory] = useState<CandidateCategory>('all');
  const [selectedItem, setSelectedItem] = useState<TransformationItem | null>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showInspectorComparison, setShowInspectorComparison] = useState<'visual' | 'code'>('visual');

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragDistanceRef = useRef<number>(0);

  // Filtered dataset
  const filteredCandidates = useMemo(() => {
    if (selectedCategory === 'all') return TRANSFORMATION_DATA;
    return TRANSFORMATION_DATA.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const totalSlides = filteredCandidates.length;

  // Safe activeIndex clamp when category changes
  useEffect(() => {
    setActiveIndex(prev => Math.min(prev, Math.max(0, filteredCandidates.length - 1)));
  }, [filteredCandidates.length]);

  // Next and Prev handlers
  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || isHovered || selectedItem !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4200);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, selectedItem, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        handlePrev(); // In RTL Arabic, ArrowRight goes to previous/right
      } else if (e.key === 'ArrowLeft') {
        handleNext(); // In RTL Arabic, ArrowLeft goes to next/left
      } else if (e.key === 'Escape' && selectedItem) {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, selectedItem]);

  // Touch & Pointer Drag Gestures for smooth swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    touchStartXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    dragDistanceRef.current = e.clientX - touchStartXRef.current;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const threshold = 40; // minimum drag distance in px
    if (dragDistanceRef.current > threshold) {
      handlePrev(); // Dragged right
    } else if (dragDistanceRef.current < -threshold) {
      handleNext(); // Dragged left
    }
  };

  // Wheel horizontal navigation with debounce
  const lastWheelTimeRef = useRef<number>(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 350) return;
    if (Math.abs(e.deltaX) > 25 || (e.shiftKey && Math.abs(e.deltaY) > 25)) {
      lastWheelTimeRef.current = now;
      if (e.deltaX > 0 || (e.shiftKey && e.deltaY > 0)) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Filter & Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#141724]/90 p-2.5 sm:p-3.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#9333EA] text-white shadow-lg shadow-purple-900/40 border border-[#A855F7]/50 scale-[1.02]'
                  : 'bg-[#0B0D17] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Play/Pause & Reset Controls */}
        <div className="flex items-center gap-2 mr-auto">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              autoPlay 
                ? 'bg-purple-950/50 border-[#A855F7]/40 text-[#C084FC]' 
                : 'bg-[#0B0D17] border-slate-800 text-slate-400'
            }`}
            title={autoPlay ? 'إيقاف التحريك التلقائي' : 'تشغيل التحريك التلقائي'}
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoPlay ? 'تحريك تلقائي' : 'موقوف'}</span>
          </button>

          <button
            onClick={() => setActiveIndex(0)}
            className="w-8 h-8 rounded-xl bg-[#0B0D17] border border-slate-800 hover:border-purple-500/50 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            title="إعادة للبداية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main 3D Cover Flow Stage */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full h-[470px] sm:h-[500px] md:h-[530px] flex items-center justify-center overflow-hidden py-6 touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ perspective: '1100px' }}
      >
        {/* Subtle Ambient Stage Glow in the Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#9333EA]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* 3D Slides Rendering */}
        <div className="relative w-full h-full flex items-center justify-center">
          {filteredCandidates.map((candidate, idx) => {
            const distance = idx - activeIndex;
            const absDist = Math.abs(distance);
            const isCenter = distance === 0;

            // Mathematical 3D Cover Flow transforms
            // Rotation angle: 50 degrees on side cards
            const rotateY = distance < 0 ? 50 : distance > 0 ? -50 : 0;
            // Scale: 1 for center, decreasing for neighbors
            const scale = Math.max(0.68, 1 - absDist * 0.14);
            // Dynamic horizontal translation offset
            const translateX = distance * (window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 220 : 270);
            // Translate Z for depth stack
            const translateZ = -absDist * 160;
            // Opacity falloff for distant items
            const opacity = absDist > 3 ? 0 : Math.max(0.2, 1 - absDist * 0.28);
            // Z-Index ordering (highest at center)
            const zIndex = 100 - absDist * 10;

            // Visibility optimization: hide if too far
            if (absDist > 3) return null;

            return (
              <div
                key={candidate.id}
                onClick={(e) => {
                  if (isCenter) {
                    setSelectedItem(candidate);
                  } else {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }
                }}
                className="absolute w-[290px] sm:w-[340px] md:w-[370px] rounded-3xl transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* The Card Container with Luxury Dark Aesthetics */}
                <div className={`relative w-full rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#181B29] to-[#0E101A] border transition-all duration-500 overflow-hidden shadow-2xl ${
                  isCenter 
                    ? 'border-[#A855F7] shadow-purple-900/40 ring-1 ring-[#A855F7]/30' 
                    : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}>
                  
                  {/* Subtle Top Gradient Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    isCenter ? 'from-[#9333EA] via-[#C084FC] to-[#9333EA]' : 'from-transparent via-slate-700 to-transparent'
                  }`} />

                  {/* Header: Avatar, Name & Category */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="relative shrink-0">
                      <img 
                        src={candidate.imageUrl} 
                        alt={candidate.name}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 shadow-lg transition-transform ${
                          isCenter ? 'border-[#9333EA] scale-105' : 'border-slate-700'
                        }`} 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0E101A] flex items-center justify-center text-white text-[10px] font-bold">
                        ✓
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 text-right">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#9333EA]/25 text-[#C084FC] border border-[#A855F7]/30">
                          {candidate.categoryLabel}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {candidate.timelineDays} يوم
                        </span>
                      </div>
                      
                      <h4 className="text-base sm:text-lg font-bold text-white truncate">
                        {candidate.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {candidate.role}
                      </p>
                      <p className="text-[11px] text-purple-400 truncate mt-0.5">
                        {candidate.company}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badge Box (ATS & Salary Growth) */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-[#0A0C14]/80 p-2.5 rounded-xl border border-slate-800/80 text-right">
                      <div className="text-[10px] text-slate-400 mb-0.5">فحص الـ ATS</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-red-400 line-through font-mono">{candidate.beforeScore}%</span>
                        <span className="text-xs text-slate-500">➔</span>
                        <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">{candidate.afterScore}%</span>
                      </div>
                    </div>

                    <div className="bg-[#9333EA]/15 p-2.5 rounded-xl border border-[#A855F7]/30 text-right">
                      <div className="text-[10px] text-purple-300 mb-0.5">نمو الراتب</div>
                      <div className="text-sm sm:text-base font-extrabold text-white">
                        {candidate.salaryIncrease}
                      </div>
                    </div>
                  </div>

                  {/* Key Transformation Takeaway */}
                  <div className="bg-[#0A0C14]/60 p-3 rounded-xl border border-slate-800/60 mb-4 text-right">
                    <div className="text-[11px] text-[#C084FC] font-semibold flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-[#A855F7]" />
                      <span>الصياغة الاستراتيجية:</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      "{candidate.keyAchievement}"
                    </p>
                  </div>

                  {/* Card Action Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {isCenter ? 'اضغط لعرض القصة كاملة' : 'اضغط للمعاينة'}
                    </span>
                    <span className={`text-xs font-bold flex items-center gap-1 transition-transform ${
                      isCenter ? 'text-[#C084FC] translate-x-0' : 'text-slate-500'
                    }`}>
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Cover Flow Scroll Buttons: Left & Right */}
        {/* Previous Button (Right in RTL) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          disabled={filteredCandidates.length <= 1}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#141724]/90 hover:bg-[#9333EA] text-white border border-slate-700/80 hover:border-[#A855F7] shadow-xl backdrop-blur-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          title="القصة السابقة"
          aria-label="Previous Slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current rotate-180" viewBox="0 0 600 600">
            <path d="M225 132.3 207.3 150 357.3 300 207.3 450 225 467.65 392.65 300 225 132.3Z"/>
          </svg>
        </button>

        {/* Next Button (Left in RTL) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          disabled={filteredCandidates.length <= 1}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#141724]/90 hover:bg-[#9333EA] text-white border border-slate-700/80 hover:border-[#A855F7] shadow-xl backdrop-blur-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          title="القصة التالية"
          aria-label="Next Slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 600 600">
            <path d="M225 132.3 207.3 150 357.3 300 207.3 450 225 467.65 392.65 300 225 132.3Z"/>
          </svg>
        </button>
      </div>

      {/* Dynamic Expandable Scroll Markers (Pills Pagination matching Cover Flow spec) */}
      <div className="flex items-center justify-center gap-2 mt-4 mb-8">
        {filteredCandidates.map((c, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={c.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                isActive 
                  ? 'w-9 sm:w-11 bg-[#9333EA] shadow-md shadow-purple-900/50' 
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`${c.name} - ${c.role}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Fast Jump Thumbnails Ribbon */}
      <div className="bg-[#141724]/80 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-md mb-8">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60 px-1">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>انتقال سريع لقصص التحول ({filteredCandidates.length} قصص متوفرة):</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {activeIndex + 1} من {filteredCandidates.length}
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar">
          {filteredCandidates.map((candidate, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={candidate.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] shrink-0 cursor-pointer text-right ${
                  isCurrent
                    ? 'bg-[#9333EA]/25 border-[#A855F7] shadow-md shadow-purple-900/30'
                    : 'bg-[#0B0D17] border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <img 
                  src={candidate.imageUrl} 
                  alt={candidate.name}
                  className="w-6 h-6 rounded-lg object-cover" 
                />
                <div className="leading-tight">
                  <div className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                    {candidate.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {candidate.salaryIncrease}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep Transformation Inspector Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md p-3 sm:p-6 lg:p-8 flex items-center justify-center animate-fadeIn overflow-y-auto duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#141724] border border-[#A855F7]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 shadow-2xl text-right relative my-auto transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Control Bar: Separates Navigation & Meta */}
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
              {/* Meta Badges on Right */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#9333EA]/25 text-[#C084FC] border border-[#A855F7]/30">
                  {selectedItem.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] text-slate-300 font-mono bg-[#0A0C14] border border-slate-800">
                  مدة التحول: <strong className="text-purple-400">{selectedItem.timelineDays}</strong> يوم
                </span>
              </div>

              {/* Modal Navigation Arrows on Left */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    const cur = TRANSFORMATION_DATA.findIndex(c => c.id === selectedItem.id);
                    const prev = (cur - 1 + TRANSFORMATION_DATA.length) % TRANSFORMATION_DATA.length;
                    setSelectedItem(TRANSFORMATION_DATA[prev]);
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0A0C14] hover:bg-[#9333EA] text-slate-300 hover:text-white border border-slate-800 transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer"
                  title="القصة السابقة"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => {
                    const cur = TRANSFORMATION_DATA.findIndex(c => c.id === selectedItem.id);
                    const next = (cur + 1) % TRANSFORMATION_DATA.length;
                    setSelectedItem(TRANSFORMATION_DATA[next]);
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0A0C14] hover:bg-[#9333EA] text-slate-300 hover:text-white border border-slate-800 transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer"
                  title="القصة التالية"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0A0C14] hover:bg-red-950/80 text-slate-400 hover:text-white border border-slate-800 transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer mr-1"
                  title="إغلاق (ESC)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 pb-6 border-b border-slate-800/80">
              <div className="relative shrink-0">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#9333EA] shadow-xl" 
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 border-2 border-[#141724] flex items-center justify-center text-white text-[10px] sm:text-xs">
                  ✓
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-2xl font-extrabold text-white truncate">
                  {selectedItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  {selectedItem.role}
                </p>
                <p className="text-[11px] sm:text-xs text-purple-400 mt-0.5 truncate">
                  {selectedItem.company}
                </p>
              </div>
            </div>

            {/* Metric Summary Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-[#0B0D17] p-3 sm:p-4 rounded-2xl border border-red-900/40 text-center flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2">
                <div className="text-right sm:text-center">
                  <div className="text-[11px] text-red-400 font-medium">فحص الـ ATS السابق</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">استبعاد آلي متكرر</div>
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-red-400 shrink-0">
                  {selectedItem.beforeScore}%
                </div>
              </div>

              <div className="bg-[#0B0D17] p-3 sm:p-4 rounded-2xl border border-emerald-900/40 text-center flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2">
                <div className="text-right sm:text-center">
                  <div className="text-[11px] text-emerald-400 font-medium">فحص الـ ATS بعد التطوير</div>
                  <div className="text-[10px] text-emerald-500/80 mt-0.5">تطابق معايير 100%</div>
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400 shrink-0">
                  {selectedItem.afterScore}%
                </div>
              </div>

              <div className="bg-[#9333EA]/20 p-3 sm:p-4 rounded-2xl border border-[#A855F7]/50 text-center flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-2">
                <div className="text-right sm:text-center">
                  <div className="text-[11px] text-purple-200 font-medium">الزيادة في الراتب</div>
                  <div className="text-[10px] text-purple-300 mt-0.5">{selectedItem.interviewsAfter}</div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white shrink-0">
                  {selectedItem.salaryIncrease}
                </div>
              </div>
            </div>

            {/* Sub-tabs: Visual Experience vs STAR Code Comparison */}
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-1.5 mb-5 bg-[#0B0D17] p-1.5 rounded-xl border border-slate-800 w-full sm:w-fit mx-auto">
              <button
                onClick={() => setShowInspectorComparison('visual')}
                className={`py-2 px-3 sm:px-4 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  showInspectorComparison === 'visual'
                    ? 'bg-[#9333EA] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                رأي وتجربة العميل
              </button>
              <button
                onClick={() => setShowInspectorComparison('code')}
                className={`py-2 px-3 sm:px-4 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  showInspectorComparison === 'code'
                    ? 'bg-[#9333EA] text-white shadow-md shadow-purple-900/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                مقارنة الصياغة قبل / بعد (STAR)
              </button>
            </div>

            {/* Content Tab 1: Client Quote & Story */}
            {showInspectorComparison === 'visual' && (
              <div className="space-y-3 mb-6 text-xs sm:text-sm leading-relaxed animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#0B0D17] border border-red-950/60 text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-red-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span>❌</span>
                      <span>التحدي قبل الانضمام لـ Career Profile:</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-slate-800 w-fit">
                      {selectedItem.interviewsBefore}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">"{selectedItem.beforeQuote}"</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-emerald-400 font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span>✅</span>
                      <span>النتيجة بعد التطوير الشامل:</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 w-fit font-bold">
                      {selectedItem.interviewsAfter}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">"{selectedItem.afterQuote}"</p>
                </div>
              </div>
            )}

            {/* Content Tab 2: Bullet Point Formulation (STAR) */}
            {showInspectorComparison === 'code' && (
              <div className="space-y-3 mb-6 text-xs sm:text-sm leading-relaxed animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#0B0D17] border border-red-950/60 text-slate-300">
                  <div className="text-red-400 font-bold mb-2 text-xs">❌ الصياغة الضعيفة السابقة (سرد روتيني بدون أرقام):</div>
                  <div className="p-3 rounded-xl bg-black/60 text-red-300/90 text-xs sm:text-[13px] dir-ltr text-left font-mono break-words leading-relaxed border border-red-950/50">
                    "{selectedItem.beforeBullet}"
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 text-slate-200">
                  <div className="text-purple-300 font-bold mb-2 text-xs">✨ صياغة Career Profile الاستراتيجية (STAR Framework):</div>
                  <div className="p-3 rounded-xl bg-black/60 text-emerald-300 text-xs sm:text-[13px] dir-ltr text-left font-mono break-words leading-relaxed border border-purple-900/30">
                    "{selectedItem.afterBullet}"
                  </div>
                </div>
              </div>
            )}

            {/* Tags Ribbon */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-400">الكلمات المفتاحية المعتمدة:</span>
              {selectedItem.tags.map((t, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#0B0D17] border border-slate-800 text-purple-300"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Footer Modal Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                هل ترغب في ترقية ملفك المهني بنفس المعايير العالمية؟
              </div>
              <div className="flex items-center gap-2">
                <MagneticButton
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenEvaluationModal();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#7E22CE] text-white font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-purple-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>اطلب تقييم وتطوير ملفك المهني الآن</span>
                </MagneticButton>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
