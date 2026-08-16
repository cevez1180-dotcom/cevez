import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Eye, 
  TrendingUp, 
  Award, 
  Share2, 
  Compass, 
  FileText,
  MousePointerClick
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SphereMotionSectionProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
}

interface StoryStage {
  badge: string;
  title: string;
  desc: string;
  highlight: string;
  metric: string;
  metricLabel: string;
}

interface CareerSphereCard {
  id: number;
  title: string;
  category: string;
  tag: string;
  imageUrl: string;
  iconBg: string;
}

export const SphereMotionSection: React.FC<SphereMotionSectionProps> = ({ onOpenEvaluationModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const metricNumRef = useRef<HTMLSpanElement>(null);
  const metricLabelRef = useRef<HTMLSpanElement>(null);

  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CareerSphereCard | null>(null);
  const [isManualDragging, setIsManualDragging] = useState(false);

  // Story stages that dynamically update as the user scrolls
  const storyStages: StoryStage[] = [
    {
      badge: '✦ الهندسة البصرية والمحتوى الفارق',
      title: 'صياغة سردية تحوّل الخبرات إلى إنجازات',
      desc: 'سيرتك الذاتية ليست مجرد سجل مهام قديم؛ إنها أداة تسويق شخصية مصممة بلغة الأرقام وأسلوب STAR لتثبت فوراً أثرك الاستثنائي في كل محطة عمل.',
      highlight: 'من مجرد موظف إلى صاحب أثر مثبت',
      metric: '+85%',
      metricLabel: 'زيادة في معدل استدعاء المقابلات'
    },
    {
      badge: '✦ التوافق الذكي مع خوارزميات التوظيف',
      title: 'تجاوز فلاتر الـ ATS وتصدر ترشيحات الـ Recruiters',
      desc: 'نبني الهيكل الرقمي والكلمات المفتاحية بدقة معيارية تضمن اجتياز مسح أنظمة تتبع المتقدمين، مع الحفاظ على جاذبية بصرية مريحة للعين البشرية.',
      highlight: 'توافق قياسي مع بوابات التوظيف العالمية والخليجية',
      metric: '98%',
      metricLabel: 'معدل التوافق مع أنظمة الفرز الأولي'
    },
    {
      badge: '✦ الحضور الرقمي والهوية المتكاملة',
      title: 'بناء Personal Branding يجذب الفرص إليك',
      desc: 'تنسيق متناغم بين الـ CV، بروفايل LinkedIn المحسّن، والـ Portfolio الرقمي ليخلق انطباعاً قيادياً يرسخ مكانتك كمرجع وخبير موثوق في مجالك.',
      highlight: 'ظهور مستمر أمام مسؤولي التوظيف والمديرين التنفيذيين',
      metric: '3.4x',
      metricLabel: 'مضاعفة المشاهدات والرسائل المباشرة'
    },
    {
      badge: '✦ جاهزية تامة للمقابلات والعروض الكبرى',
      title: 'واثق في كل كلمة.. ومستعد لاقتناص الفرصة',
      desc: 'نمنحك ملفاً متكاملاً يدعم حجتك في التفاوض على الرواتب والمناصب العليا، مع مراجعات دقيقة وتسليم بصيغ مفتوحة قابلة للتطوير المستمر.',
      highlight: 'انتقال مهني نوعي ومحسوب بدقة',
      metric: '100%',
      metricLabel: 'ضمان خصوصية ورضا كامل'
    }
  ];

  // Visual card representations for the 3D Fibonacci sphere
  const sphereCards: CareerSphereCard[] = [
    {
      id: 1,
      title: 'Executive CV Template',
      category: 'ATS Architecture',
      tag: 'ATS 100%',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-purple-600 to-indigo-600'
    },
    {
      id: 2,
      title: 'STAR Impact Metrics',
      category: 'Content Engineering',
      tag: 'Action Verbs',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-emerald-600 to-teal-600'
    },
    {
      id: 3,
      title: 'LinkedIn Optimization',
      category: 'Personal Branding',
      tag: 'All-Star Badge',
      imageUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-blue-600 to-cyan-600'
    },
    {
      id: 4,
      title: 'Creative Portfolio',
      category: 'Visual Showcase',
      tag: 'Case Studies',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-amber-600 to-orange-600'
    },
    {
      id: 5,
      title: 'Multilingual Resume',
      category: 'Arabic & English',
      tag: 'Gulf Ready',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-fuchsia-600 to-pink-600'
    },
    {
      id: 6,
      title: 'Recruiter Psychology',
      category: '6-Second Scan',
      tag: 'High Contrast',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-violet-600 to-purple-600'
    },
    {
      id: 7,
      title: 'Engineering & Tech CV',
      category: 'Keyword Matching',
      tag: 'Tech Stack',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-indigo-600 to-blue-600'
    },
    {
      id: 8,
      title: 'Leadership Branding',
      category: 'C-Level Profiles',
      tag: 'Strategic Vision',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-purple-700 to-indigo-800'
    },
    {
      id: 9,
      title: 'Medical & Healthcare CV',
      category: 'Certifications',
      tag: 'Licensing',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-cyan-600 to-teal-600'
    },
    {
      id: 10,
      title: 'Marketing & Growth',
      category: 'Conversion Data',
      tag: 'KPI Growth',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-rose-600 to-pink-600'
    },
    {
      id: 11,
      title: 'Career Switch Playbook',
      category: 'Transferable Skills',
      tag: 'Pivot Strategy',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-emerald-700 to-green-600'
    },
    {
      id: 12,
      title: 'Interview Preparation',
      category: 'Pitch Alignment',
      tag: 'Confidence',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      iconBg: 'from-purple-600 to-indigo-700'
    }
  ];

  // Repeat items to generate a 24-card full 3D Fibonacci sphere
  const galleryItems = [...sphereCards, ...sphereCards].slice(0, 24);

  useEffect(() => {
    const sphere = sphereRef.current;
    const container = containerRef.current;
    if (!sphere || !container) return;

    // Clear previous children if any to prevent duplicate elements on fast re-renders
    sphere.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 185 : 360;

    const cardsElements: HTMLDivElement[] = [];

    // 1. Generate Fibonacci Sphere 3D Layout with exact mathematical coordinates
    galleryItems.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'sphere-clay-card cursor-pointer';
      card.dataset.index = i.toString();

      // Inner card HTML with Clay styling and image
      card.innerHTML = `
        <div class="w-full h-full relative rounded-xl overflow-hidden group">
          <img 
            src="${item.imageUrl}" 
            alt="${item.title}" 
            class="card-inner-img" 
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0A0C14] via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
          <div class="absolute bottom-2.5 right-2.5 left-2.5 text-right pointer-events-none">
            <span class="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/50 mb-1">
              ${item.tag}
            </span>
            <div class="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
              ${item.title}
            </div>
            <div class="text-[9px] text-slate-400 truncate">
              ${item.category}
            </div>
          </div>
        </div>
      `;

      // Click card to inspect
      card.addEventListener('click', () => {
        setSelectedCard(item);
      });

      // Math for Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / galleryItems.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Calculate rotation so cards face outward relative to sphere center
      const rotY = Math.atan2(x, z) * (180 / Math.PI);
      const rotX = Math.asin(-y / radius) * (180 / Math.PI);

      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;

      sphere.appendChild(card);
      cardsElements.push(card);
    });

    // 2. Animate Sphere rotation on scroll via GSAP ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Rotate sphere
        gsap.set(sphere, {
          rotateY: progress * 720, // 2 full rotations
          rotateX: Math.sin(progress * Math.PI) * 35, // Dynamic 3D depth tilt
        });

        // Determine story stage index
        const stageIndex = Math.min(
          storyStages.length - 1,
          Math.floor(progress * storyStages.length)
        );

        setActiveStoryIndex(stageIndex);

        // Highlight front-facing cards
        const focusIndex = Math.floor(progress * galleryItems.length);
        cardsElements.forEach((card, idx) => {
          if (Math.abs(idx - focusIndex) <= 2 || Math.abs(idx - focusIndex) >= galleryItems.length - 2) {
            card.classList.add('active-sphere-card');
          } else {
            card.classList.remove('active-sphere-card');
          }
        });
      }
    });

    // 3. Constellation parallax in journey section
    const constellationEl = constellationRef.current;
    if (constellationEl) {
      constellationEl.innerHTML = '';
      const scatterPositions = [
        { top: '12%', left: '12%', rot: -15 },
        { top: '18%', left: '82%', rot: 22 },
        { top: '65%', left: '8%', rot: -8 },
        { top: '72%', left: '86%', rot: 14 },
        { top: '82%', left: '32%', rot: -18 },
        { top: '16%', left: '50%', rot: 10 }
      ];

      scatterPositions.forEach((pos, i) => {
        const item = galleryItems[i % galleryItems.length];
        const card = document.createElement('div');
        card.className = 'sphere-clay-card constellation-card absolute';
        card.style.top = pos.top;
        card.style.left = pos.left;
        card.style.transform = `rotate(${pos.rot}deg) scale(0.85)`;
        card.style.width = isMobile ? '100px' : '130px';
        card.style.height = isMobile ? '140px' : '180px';
        card.style.opacity = '0.55';

        card.innerHTML = `
          <div class="w-full h-full rounded-lg overflow-hidden relative">
            <img src="${item.imageUrl}" alt="${item.title}" class="card-inner-img" loading="lazy" referrerPolicy="no-referrer" />
          </div>
        `;
        constellationEl.appendChild(card);
      });

      gsap.to('.constellation-card', {
        y: -120,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.motion-journey-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container || trigger.vars.trigger === '.motion-journey-section') {
          trigger.kill();
        }
      });
    };
  }, []);

  const currentStage = storyStages[activeStoryIndex];

  return (
    <div className="relative bg-[#0A0C14] text-white selection:bg-[#9333EA] selection:text-white">
      
      {/* Background Clinical SaaS Grid Overlay */}
      <div className="grid-overlay-pattern" />

      {/* Motion Section Intro Header */}
      <header className="pt-24 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto relative z-20 space-y-4">
        <div className="inline-flex items-center gap-2 clay-badge mx-auto">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="font-extrabold tracking-wide">✦ منظومة العرض ثلاثية الأبعاد 360°</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          مسارك المهني ليس مجرد سيرة ذاتية.. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            بل قصة نجاح متكاملة تُبنى باحترافية
          </span>
        </h2>

        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          انتقل خلال الفضاء التفاعلي ثلاثي الأبعاد لاكتشاف كيف نقوم بهندسة كل تفصيلة في ملفك المهني لتلفت انتباه صناع القرار وأنظمة التوظيف العالمية.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3 text-xs text-purple-300">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
            <Compass className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>حرّك الصفحة للأسفل لتدوير فضاء الـ 3D التفاعلي</span>
          </div>
        </div>
      </header>

      {/* 3D Gallery Sticky Scroll Section (300vh scroll container) */}
      <section id="sphere-3d-gallery" ref={containerRef} className="relative h-[280vh] sm:h-[320vh] w-full">
        
        {/* Sticky 3D Viewport Scene */}
        <div className="sphere-3d-scene">
          
          {/* Subtle Ambient Network Vector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgba(168,85,247,0.4)" strokeWidth="0.15" fill="none" />
            <path d="M20,0 L80,100" stroke="rgba(168,85,247,0.2)" strokeWidth="0.1" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="rgba(147,51,234,0.15)" strokeWidth="0.1" fill="none" />
          </svg>

          {/* Floating Narrative Side Panel (Sticky) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-12 lg:right-20 z-30 max-w-xs sm:max-w-sm pointer-events-auto">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#141724]/90 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/60 space-y-4 transition-all duration-300">
              
              <div 
                ref={badgeRef}
                className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-purple-950/90 text-purple-300 border border-purple-700/50 shadow-inner"
              >
                {currentStage.badge}
              </div>

              <h3 
                ref={titleRef}
                className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug"
              >
                {currentStage.title}
              </h3>

              <p 
                ref={descRef}
                className="text-xs sm:text-sm text-slate-300 leading-relaxed"
              >
                {currentStage.desc}
              </p>

              {/* Live Metric Pill */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span ref={metricNumRef} className="text-xl sm:text-2xl font-black text-purple-400">
                    {currentStage.metric}
                  </span>
                  <span ref={metricLabelRef} className="block text-[10px] text-slate-400 font-medium">
                    {currentStage.metricLabel}
                  </span>
                </div>

                <button
                  onClick={() => onOpenEvaluationModal('cv-writing')}
                  className="chunky-clay-btn text-xs inline-flex items-center gap-1.5 py-2 px-3.5"
                >
                  <span>ابدأ ملفك</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* 3D Fibonacci Sphere Pivot Container */}
          <div className="relative w-0 h-0 flex items-center justify-center">
            <div ref={sphereRef} className="sphere-3d-pivot" />
          </div>

          {/* Interactive Hint Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#141724]/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400">
            <MousePointerClick className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            <span>انقر على أي بطاقة لعرض تفاصيلها • واصل التمرير لتدوير الكرة 360°</span>
          </div>

        </div>
      </section>

      {/* Interactive Selected Card Preview Modal (when clicked in 3D sphere) */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141724] border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800">
                {selectedCard.tag}
              </span>
              <button 
                onClick={() => setSelectedCard(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden relative border border-slate-700">
              <img 
                src={selectedCard.imageUrl} 
                alt={selectedCard.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">{selectedCard.title}</h4>
              <p className="text-xs text-purple-300 font-semibold">{selectedCard.category}</p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                هذا النموذج مصمم وفق أعلى معايير التوظيف الحديثة ليضمن إبراز نقاط قوتك والتفوق في الفرز الآلي والبشري.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCard(null);
                  onOpenEvaluationModal('cv-writing');
                }}
                className="flex-1 chunky-clay-btn text-xs py-3 flex items-center justify-center gap-2"
              >
                <span>طلب هذا التنسيق في ملفي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="chunky-clay-secondary text-xs py-3 px-4 rounded-full font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Constellation / Journey Section (Start Your Career Journey) */}
      <section className="motion-journey-section relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-4 bg-radial from-[#15192C] via-[#0A0C14] to-[#0A0C14]">
        
        {/* Parallax Scattered Constellation Cards */}
        <div ref={constellationRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

        {/* Central Chunky Clay Journey Card */}
        <div className="relative z-20 max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-[#141724]/85 backdrop-blur-2xl border border-purple-500/30 shadow-2xl shadow-purple-950/80 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-purple-950/90 text-purple-300 border border-purple-700/60 shadow-inner">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>ابدأ رحلتك نحو الفرصة الكبرى</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            جاهز لبناء سيرة وهوية مهنية <br />
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              تفتح لك أبواب الفرص القيادية؟
            </span>
          </h3>

          <p className="text-xs sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            فريق Career Profile مستعد لمرافقتك خطوة بخطوة من تقييم ملفك الحالي وحتى تسليم نسختك النهائية المتوافقة مع السوق والمراجعات المجانية.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              id="sphere-motion-cta-primary"
              onClick={() => onOpenEvaluationModal()}
              className="chunky-clay-btn text-xs sm:text-sm py-3.5 px-8 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>قيّم سيرتك المهنية مجاناً الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <a
              href="#pricing-packages"
              className="chunky-clay-secondary text-xs sm:text-sm py-3.5 px-6 rounded-full font-bold inline-flex items-center gap-2"
            >
              <span>استعرض باقات الـ CV (100 / 150 ج.م)</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تسليم نسختين PDF + Word</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>دفع 50% فقط بعد الاستلام</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>مراجعتين مجاناً</span>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
