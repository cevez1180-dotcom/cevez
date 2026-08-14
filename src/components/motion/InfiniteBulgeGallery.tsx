import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Plus, 
  Minus, 
  RotateCcw, 
  Sparkles, 
  ArrowLeft, 
  Filter,
  Play,
  Pause,
  Move,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Award
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export type CandidateCategory = 'all' | 'tech' | 'growth' | 'finance' | 'design' | 'operations';

export interface TransformationItem {
  id: string;
  category: CandidateCategory;
  categoryLabel: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  beforeScore: number;
  afterScore: number;
  salaryIncrease: string;
  interviewsBefore: string;
  interviewsAfter: string;
  keyAchievement: string;
  tags: string[];
  beforeQuote: string;
  afterQuote: string;
  beforeBullet: string;
  afterBullet: string;
  timelineDays: number;
}

export const TRANSFORMATION_DATA: TransformationItem[] = [
  {
    id: 't-1',
    category: 'tech',
    categoryLabel: 'هندسة وبرمجة',
    name: 'أحمد الشناوي',
    role: 'Senior Full-Stack Engineer',
    company: 'شركة تقنية بالرياض (Remotely)',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop',
    beforeScore: 38,
    afterScore: 96,
    salaryIncrease: '+85%',
    interviewsBefore: 'مقابلة واحدة كل شهرين',
    interviewsAfter: '5 مقابلات أسبوعياً',
    keyAchievement: 'تحويل المهام الروتينية لصياغة STAR مع توثيق تقنيات Cloud & Microservices',
    tags: ['Next.js', 'AWS', 'Microservices', 'GraphQL'],
    beforeQuote: 'كان الـ CV عبارة عن سرد مكرر للمهام بدون أي مؤشرات أداء أو كلمات مفتاحية لأنظمة التوظيف.',
    afterQuote: 'بعد التطوير تم قبولي في شركتين كبريات بالسعودية ومصر خلال 3 أسابيع براتب مضاعف.',
    beforeBullet: 'Responsible for writing React code and fixing bugs in the web backend database.',
    afterBullet: 'Architected high-throughput microservices reducing latency by 42% and scaling to 1.8M active users.',
    timelineDays: 14
  },
  {
    id: 't-2',
    category: 'growth',
    categoryLabel: 'تسويق ونمو',
    name: 'سارة عبد المنعم',
    role: 'Product Marketing Manager',
    company: 'Fintech Scale-up',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop',
    beforeScore: 44,
    afterScore: 94,
    salaryIncrease: '+60%',
    interviewsBefore: 'تجاهل مستمر من مسؤولي التوظيف',
    interviewsAfter: '4 عروض عمل متزامنة',
    keyAchievement: 'إبراز أثر حملات النمو بمعدلات CAC و ROAS وتحسين ترتيب الظهور على LinkedIn',
    tags: ['Product Growth', 'GTM Strategy', 'Fintech', 'B2B'],
    beforeQuote: 'كنت أرسل الـ CV لعشرات الوظائف يومياً دون أي رد أو اتصال أولي.',
    afterQuote: 'الصياغة الجديدة أبرزت إنجازاتي الرقمية وحصلت على وظيفتي المستهدفة بأعلى من توقعاتي.',
    beforeBullet: 'Handled social media marketing campaigns and managed digital advertising budget.',
    afterBullet: 'Spearheaded B2B GTM strategy generating $3.4M pipeline while slashing CAC by 34%.',
    timelineDays: 12
  },
  {
    id: 't-3',
    category: 'finance',
    categoryLabel: 'مالية واستثمار',
    name: 'كريم المنشاوي',
    role: 'FP&A Lead',
    company: 'مجموعة استثمارية قابضة',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    beforeScore: 41,
    afterScore: 98,
    salaryIncrease: '+110%',
    interviewsBefore: 'مرفوض آلياً من فلاتر ATS',
    interviewsAfter: 'عروض مباشرة من Headhunters',
    keyAchievement: 'إعادة هيكلة السيرة لتجاوز فلاتر Taleo و Workday مع توثيق وفر 4.2 مليون دولار',
    tags: ['FP&A', 'Financial Modeling', 'Cost Reduction', 'CFO Advisory'],
    beforeQuote: 'التصميم القديم كان يحتوي على جداول وأعمدة سببت استبعادي آلياً من أنظمة الـ ATS.',
    afterQuote: 'تم تجهيز سيرة ذاتية نظيفة ومؤثرة جلبت لي مقابلات مع كبار المدراء التنفيذيين مباشرة.',
    beforeBullet: 'Prepared monthly financial sheets and budget comparison reports for management.',
    afterBullet: 'Delivered financial model unlocking $4.2M operational savings and streamlined budget variance by 18%.',
    timelineDays: 10
  },
  {
    id: 't-4',
    category: 'design',
    categoryLabel: 'تصميم و UX',
    name: 'مروة الزغبي',
    role: 'Lead Product Designer',
    company: 'استوديو تصميم رقمي بدبي',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop',
    beforeScore: 50,
    afterScore: 97,
    salaryIncrease: '+75%',
    interviewsBefore: 'سيرة تقليدية لا تبرز البورتفوليو',
    interviewsAfter: 'تواصل مباشر عبر LinkedIn',
    keyAchievement: 'دمج الـ CV مع دراسات حالة (Case Studies) توضح رحلة المستخدم ومعدل التحويل',
    tags: ['Design Systems', 'Figma', 'UX Research', 'Conversion Rate'],
    beforeQuote: 'كنت أعتمد على بورتفوليو مبعثر بدون صياغة مقنعة تحكي قصة نجاح وقيمة المشاريع.',
    afterQuote: 'الباقة المتكاملة ساعدتني في بناء بروفايل لينكد إن وسيرة ذاتية فتحت لي فرصاً خليجية ممتازة.',
    beforeBullet: 'Created mockups, wireframes, and UI design assets for mobile and web apps.',
    afterBullet: 'Revamped enterprise design system across 6 platforms, lifting user checkout conversion by 26%.',
    timelineDays: 15
  },
  {
    id: 't-5',
    category: 'operations',
    categoryLabel: 'إدارة وعمليات',
    name: 'عمر الفاروق',
    role: 'Operations & Supply Chain Director',
    company: 'شركة لوجستيات إقليمية',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
    beforeScore: 35,
    afterScore: 95,
    salaryIncrease: '+90%',
    interviewsBefore: 'صعوبة في الوصول للمستوى القيادي',
    interviewsAfter: '3 مقابلات لمناصب C-Level',
    keyAchievement: 'صياغة قيادية تنفيذية تركز على إدارة الأزمات والتحول الرقمي للعمليات',
    tags: ['Logistics', 'Operations', 'Six Sigma', 'Leadership'],
    beforeQuote: 'خبرتي تتجاوز 12 عاماً لكن سيرتي الذاتية كانت تبدو مكررة وغير معبرة عن وزني الوظيفي.',
    afterQuote: 'الصياغة التنفيذية وضعتني في مصاف القيادات الأولى للشركات الكبرى وتلقيت عروضاً استثنائية.',
    beforeBullet: 'Managed warehouse logistics, delivery schedules, and fleet operations.',
    afterBullet: 'Restructured end-to-end supply chain across 4 countries, cutting fulfillment cycles by 38%.',
    timelineDays: 14
  },
  {
    id: 't-6',
    category: 'tech',
    categoryLabel: 'ذكاء اصطناعي وبيانات',
    name: 'ياسمين الهواري',
    role: 'Senior Data & AI Engineer',
    company: 'Tech Enterprise',
    imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&h=500&fit=crop',
    beforeScore: 46,
    afterScore: 99,
    salaryIncrease: '+120%',
    interviewsBefore: 'مسميات غير دقيقة وفجوات تقنية',
    interviewsAfter: 'عروض من 3 شركات عالمية',
    keyAchievement: 'تضمين نماذج الـ LLMs والـ Predictive Analytics بما يطابق خوارزميات التوظيف',
    tags: ['Machine Learning', 'PyTorch', 'LLMs', 'Big Data'],
    beforeQuote: 'لم أكن أعلم أن خوارزميات الـ ATS ترفض ملفي بسبب نقص الكلمات المفتاحية الدقيقة.',
    afterQuote: 'تم تحديث كافة المهارات والمشاريع وأصبحت سيرتي تتصدر نتائج البحث لدى مسؤولي التوظيف.',
    beforeBullet: 'Built machine learning scripts and analyzed big datasets using Python.',
    afterBullet: 'Deployed enterprise RAG & LLM classification pipelines processing 500k queries/day at 99.4% precision.',
    timelineDays: 11
  },
  {
    id: 't-7',
    category: 'growth',
    categoryLabel: 'مبيعات وتوسع',
    name: 'طارق عبد الباسط',
    role: 'Regional Sales Director',
    company: 'FMCG Multinational',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop',
    beforeScore: 42,
    afterScore: 96,
    salaryIncrease: '+65%',
    interviewsBefore: 'غياب الأرقام والنسب المئوية',
    interviewsAfter: 'تجاوز تارجت التوظيف بـ 3 عروض',
    keyAchievement: 'توثيق نمو المبيعات بنسبة +140% وفتح 4 أسواق جديدة بالشرق الأوسط',
    tags: ['B2B Sales', 'Key Account Mgmt', 'Revenue Growth', 'Negotiation'],
    beforeQuote: 'كنت أكتب مسؤولياتي العامة دون إبراز الأثر المالي الحقيقي الذي حققته للشركات.',
    afterQuote: 'الـ CV الجديد أصبح سلاحي الأقوى في المفاوضات على الراتب والمزايا والبدلات.',
    beforeBullet: 'Responsible for meeting sales targets and managing regional sales teams.',
    afterBullet: 'Drove 140% YoY ARR expansion across MENA territories, securing $6.8M in enterprise annual contracts.',
    timelineDays: 10
  },
  {
    id: 't-8',
    category: 'operations',
    categoryLabel: 'موارد بشرية',
    name: 'نورهان السعيد',
    role: 'People & Culture (HR) Manager',
    company: 'Fintech Unicorn',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop',
    beforeScore: 48,
    afterScore: 97,
    salaryIncrease: '+70%',
    interviewsBefore: 'سيرة تقليدية لم تعكس التطور في إدارة المواهب',
    interviewsAfter: 'مقابلة مع مجلس الإدارة في أسبوع',
    keyAchievement: 'إبراز برامج استبقاء المواهب وتقليل معدل التسرب بنسبة 28%',
    tags: ['Talent Acquisition', 'HR Strategy', 'Culture', 'HR Tech'],
    beforeQuote: 'كمتخصصة موارد بشرية كنت أعرف المعايير ولكن واجهت صعوبة في صياغة ملفي الشخصي بحيادية.',
    afterQuote: 'فريق Career Profile قام بصياغة محترفة اختصرت عليّ شهوراً من التجربة والخطأ.',
    beforeBullet: 'Recruited candidates, managed onboarding sessions, and handled employee relations.',
    afterBullet: 'Scaled headcount from 80 to 260 while reducing annual attrition by 28% and onboarding time by 40%.',
    timelineDays: 9
  }
];

const CATEGORIES: { id: CandidateCategory; label: string }[] = [
  { id: 'all', label: 'جميع المجالات (8 قصص)' },
  { id: 'tech', label: 'هندسة وبرمجة (Tech)' },
  { id: 'growth', label: 'تسويق ونمو (Marketing)' },
  { id: 'finance', label: 'مالية واستثمار (Finance)' },
  { id: 'design', label: 'تصميم وبورتفوليو (Design)' },
  { id: 'operations', label: 'إدارة وموارد بشرية (HR)' },
];

interface InfiniteBulgeGalleryProps {
  onOpenEvaluationModal: (serviceId?: string) => void;
}

export const InfiniteBulgeGallery: React.FC<InfiniteBulgeGalleryProps> = ({ onOpenEvaluationModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedItem, setSelectedItem] = useState<TransformationItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CandidateCategory>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [bulgeStrength, setBulgeStrength] = useState(0.35);
  const [isInteracting, setIsInteracting] = useState(false);
  const [autoGlide, setAutoGlide] = useState(true);
  const [showInspectorComparison, setShowInspectorComparison] = useState<'visual' | 'code'>('visual');

  // Analytical solver for cubic-bezier(0.16, 1.0, 0.3, 1.0)
  const evaluateCubicBezier = useCallback((t: number): number => {
    const p1x = 0.16, p1y = 1.0, p2x = 0.3, p2y = 1.0;
    const cX = 3 * p1x;
    const bX = 3 * (p2x - p1x) - cX;
    const aX = 1 - cX - bX;

    const cY = 3 * p1y;
    const bY = 3 * (p2y - p1y) - cY;
    const aY = 1 - cY - bY;

    let u = t;
    for (let i = 0; i < 6; i++) {
      const currentX = ((aX * u + bX) * u + cX) * u;
      const currentSlope = (3 * aX * u + 2 * bX) * u + cX;
      if (Math.abs(currentSlope) < 1e-6) break;
      u -= (currentX - t) / currentSlope;
      u = Math.max(0, Math.min(1, u));
    }
    return ((aY * u + bY) * u + cY) * u;
  }, []);

  // Filtered list for fast-jump thumbnails
  const displayedCandidates = useMemo(() => {
    if (selectedCategory === 'all') return TRANSFORMATION_DATA;
    return TRANSFORMATION_DATA.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  // Ref storage for WebGL state & physics
  const stateRef = useRef({
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    positionBuffer: null as WebGLBuffer | null,
    texCoordBuffer: null as WebGLBuffer | null,
    indexBuffer: null as WebGLBuffer | null,
    indexCount: 0,
    textures: [] as WebGLTexture[],
    images: [] as HTMLImageElement[],
    imageWidth: 260,
    imageHeight: 335,
    gap: 26,
    viewOffset: { x: 0, y: 0 },
    startOffset: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 },
    hasTargetOffset: false,
    transitionStartTime: 0,
    transitionDuration: 850,
    drag: {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      velocityX: 0,
      velocityY: 0
    },
    inertia: 0.958,
    bulgeStrength: 0.35,
    bulgeRadius: 1.5,
    adjustedBulgeRadius: 1.5,
    animFrameId: 0,
    autoGlide: true,
    isRunning: true,
    hoveredIndex: -1,
    dpr: 1,
    time: 0
  });

  // High-DPI Texture Creator for maximum Arabic readability & sleek vertical card aspect ratio
  const createCardTexture = (gl: WebGLRenderingContext, img: HTMLImageElement, item: TransformationItem): WebGLTexture | null => {
    const canvas = document.createElement('canvas');
    // High-resolution Retina texture (520x670)
    const texW = 520;
    const texH = 670;
    canvas.width = texW;
    canvas.height = texH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Dark Luxury Glass Card Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, texH);
    bgGrad.addColorStop(0, '#131627');
    bgGrad.addColorStop(1, '#0C0E1A');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.roundRect(10, 10, texW - 20, texH - 20, 32);
    ctx.fill();

    // 2. High-Tech Perimeter Neon Border
    ctx.strokeStyle = '#9333EA';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner subtle glow border
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(14, 14, texW - 28, texH - 28, 28);
    ctx.stroke();

    // 3. Candidate Photo Container (Top Section)
    const photoH = 310;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(22, 22, texW - 44, photoH, 24);
    ctx.clip();
    try {
      ctx.drawImage(img, 22, 22, texW - 44, photoH);
    } catch {
      ctx.fillStyle = '#22263D';
      ctx.fillRect(22, 22, texW - 44, photoH);
    }

    // Photo Gradient Scrim for crisp text contrast
    const scrim = ctx.createLinearGradient(0, 80, 0, photoH + 22);
    scrim.addColorStop(0, 'rgba(10, 12, 20, 0.05)');
    scrim.addColorStop(0.5, 'rgba(10, 12, 20, 0.55)');
    scrim.addColorStop(1, 'rgba(10, 12, 20, 0.96)');
    ctx.fillStyle = scrim;
    ctx.fillRect(22, 22, texW - 44, photoH);
    ctx.restore();

    // 4. Category Chip on Top Right
    ctx.fillStyle = 'rgba(10, 12, 22, 0.88)';
    ctx.beginPath();
    ctx.roundRect(texW - 200, 34, 166, 38, 12);
    ctx.fill();
    ctx.strokeStyle = '#9333EA';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#E9D5FF';
    ctx.font = 'bold 15px "Tajawal", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.categoryLabel, texW - 117, 58);

    // 5. Name Banner on Photo
    ctx.fillStyle = '#9333EA';
    ctx.beginPath();
    ctx.roundRect(34, photoH - 42, 230, 46, 14);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 21px "Tajawal", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(item.name, 244, photoH - 12);

    // Verified badge check
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(58, photoH - 19, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✓', 58, photoH - 15);

    // 6. Role & Company Title Section
    ctx.fillStyle = '#C084FC';
    ctx.font = 'bold 20px "Tajawal", sans-serif';
    ctx.textAlign = 'right';
    const roleText = item.role.length > 30 ? item.role.substring(0, 30) + '...' : item.role;
    ctx.fillText(roleText, texW - 32, 380);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '16px "Tajawal", sans-serif';
    ctx.fillText(item.company, texW - 32, 412);

    // Key achievement teaser
    ctx.fillStyle = '#64748B';
    ctx.font = '13px "Tajawal", sans-serif';
    const achText = item.keyAchievement.length > 40 ? item.keyAchievement.substring(0, 40) + '...' : item.keyAchievement;
    ctx.fillText(achText, texW - 32, 442);

    // 7. Bottom Stats Deck (3 Neatly Balanced Columns)
    ctx.fillStyle = '#080A12';
    ctx.beginPath();
    ctx.roundRect(22, 480, texW - 44, 150, 20);
    ctx.fill();
    ctx.strokeStyle = '#1E2338';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Box A: ATS Before (Red)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.14)';
    ctx.beginPath();
    ctx.roundRect(36, 498, 120, 114, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#F87171';
    ctx.font = 'bold 13px "Tajawal", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ATS قبل', 96, 528);
    ctx.font = 'bold 30px monospace';
    ctx.fillText(`${item.beforeScore}%`, 96, 572);
    ctx.font = '11px "Tajawal", sans-serif';
    ctx.fillStyle = '#EF4444';
    ctx.fillText('استبعاد آلي', 96, 598);

    // Center Transition Arrow
    ctx.fillStyle = '#A855F7';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('←', 180, 564);

    // Box B: ATS After (Emerald)
    ctx.fillStyle = 'rgba(16, 185, 129, 0.16)';
    ctx.beginPath();
    ctx.roundRect(204, 498, 126, 114, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 13px "Tajawal", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ATS بعد', 267, 528);
    ctx.font = 'bold 30px monospace';
    ctx.fillText(`${item.afterScore}%`, 267, 572);
    ctx.font = '11px "Tajawal", sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.fillText('تطابق كامل', 267, 598);

    // Box C: Salary Increase (Purple Gradient)
    const salGrad = ctx.createLinearGradient(350, 498, 480, 612);
    salGrad.addColorStop(0, '#9333EA');
    salGrad.addColorStop(1, '#6B21A8');
    ctx.fillStyle = salGrad;
    ctx.beginPath();
    ctx.roundRect(350, 498, 134, 114, 14);
    ctx.fill();

    ctx.fillStyle = '#E9D5FF';
    ctx.font = 'bold 12px "Tajawal", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('زيادة الراتب', 417, 528);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(item.salaryIncrease, 417, 572);
    ctx.font = '11px "Tajawal", sans-serif';
    ctx.fillStyle = '#F3E8FF';
    ctx.fillText('عروض مضاعفة', 417, 598);

    // WebGL Texture Setup
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    return tex;
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = container.clientWidth;
    const height = isFullscreen ? window.innerHeight : Math.min(680, Math.max(500, window.innerHeight * 0.7));

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const s = stateRef.current;
    s.dpr = dpr;

    // Responsive Card Sizing
    const isMobile = width < 640;
    s.imageWidth = isMobile ? 220 : 260;
    s.imageHeight = isMobile ? 285 : 335;
    s.gap = isMobile ? 20 : 26;

    const diagonal = Math.sqrt(
      Math.pow(canvas.width / Math.min(canvas.width, canvas.height), 2) +
      Math.pow(canvas.height / Math.min(canvas.width, canvas.height), 2)
    );
    s.adjustedBulgeRadius = Math.max(s.bulgeRadius, diagonal * 0.6 * 1.25);

    if (s.gl) {
      s.gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }, [isFullscreen]);

  // Main WebGL Initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true
    });

    if (!gl) {
      console.warn('WebGL unavailable, falling back');
      setIsLoading(false);
      return;
    }

    const s = stateRef.current;
    s.gl = gl;

    const vsSource = `
      attribute vec2 aPosition;
      attribute vec2 aTexCoord;
      varying vec2 vTexCoord;
      uniform vec2 uResolution;
      uniform vec2 uOffset;
      uniform vec2 uImagePosition;
      uniform vec2 uCardSize;
      uniform float uBulgeStrength;
      uniform float uBulgeRadius;

      // 2D Rotation Matrix for smooth organic curvature and perspective dynamics
      mat2 rotationMatrix(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat2(c, -s, s, c);
      }

      vec2 applyBulgeEffect(vec2 pos){
        vec2 normalizedPos = pos / uResolution;
        vec2 center = vec2(0.5, 0.5);
        vec2 delta = normalizedPos - center;

        float aspect = uResolution.x / uResolution.y;
        delta.x *= aspect;

        float dist = length(delta);

        if(dist < uBulgeRadius){
          float t = dist / uBulgeRadius;
          // Smooth harmonic falloff
          float smoothFactor = cos(t * 1.57079632679);
          float z = sqrt(max(0.01, 1.0 - t * t));

          // Apply rotation matrix in shader for ultra-smooth dynamic optical twist
          float swirlAngle = (delta.x * delta.y * 0.22) * (1.0 - t * t);
          mat2 rotMat = rotationMatrix(swirlAngle);
          delta = rotMat * delta;

          delta *= 1.0 + (uBulgeStrength * 0.88 * smoothFactor) / z;
          delta.x /= aspect;

          normalizedPos = center + delta;
          pos = normalizedPos * uResolution;
        }
        return pos;
      }

      void main(){
        // Local position centered on card anchor point
        vec2 localPos = (aPosition - vec2(0.5, 0.5)) * uCardSize;
        
        // Card center in canvas world space
        vec2 cardCenterWorld = uImagePosition + (uCardSize * 0.5) - uOffset;
        
        // Calculate offset from screen center for subtle rotational matrix tilt
        vec2 normOffset = (cardCenterWorld / uResolution) - vec2(0.5, 0.5);
        normOffset.x *= (uResolution.x / uResolution.y);
        
        // Apply smooth rotation matrix based on horizontal coordinate for natural 3D curvature
        float tiltAngle = normOffset.x * -0.045;
        mat2 cardRotMat = rotationMatrix(tiltAngle);
        vec2 rotatedLocalPos = cardRotMat * localPos;

        vec2 pos = rotatedLocalPos + cardCenterWorld;
        pos = applyBulgeEffect(pos);

        vec2 clip = (pos / uResolution) * 2.0 - 1.0;
        gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);
        vTexCoord = aTexCoord;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vTexCoord;
      uniform sampler2D uSampler;
      void main(){
        vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
        vec4 color = texture2D(uSampler, uv);
        if(color.a < 0.01) discard;
        gl_FragColor = color;
      }
    `;

    const loadShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = loadShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    s.program = prog;

    // High density 32x32 vertex grid for silky smooth curvature
    const SUBDIV = 32;
    const positions: number[] = [];
    const texCoords: number[] = [];
    const indices: number[] = [];

    for (let y = 0; y <= SUBDIV; y++) {
      for (let x = 0; x <= SUBDIV; x++) {
        positions.push(x / SUBDIV, y / SUBDIV);
        texCoords.push(x / SUBDIV, y / SUBDIV);
      }
    }

    for (let y = 0; y < SUBDIV; y++) {
      for (let x = 0; x < SUBDIV; x++) {
        const i = y * (SUBDIV + 1) + x;
        indices.push(i, i + 1, i + SUBDIV + 1);
        indices.push(i + 1, i + SUBDIV + 2, i + SUBDIV + 1);
      }
    }

    s.indexCount = indices.length;

    s.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    s.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, s.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    s.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, s.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    resizeCanvas();

    // Async Image & Texture Loader
    let loaded = 0;
    const total = TRANSFORMATION_DATA.length;

    TRANSFORMATION_DATA.forEach((item, idx) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = item.imageUrl;

      const onDone = () => {
        s.images[idx] = img;
        const tex = createCardTexture(gl, img, item);
        if (tex) s.textures[idx] = tex;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= total) {
          setIsLoading(false);
        }
      };

      img.onload = onDone;
      img.onerror = () => {
        img.src = `https://picsum.photos/seed/${item.id}/500/500`;
        img.onload = onDone;
        img.onerror = onDone;
      };
    });

    // Render Animation Loop with Silky Interpolation & Cubic-Bezier Transition
    const render = () => {
      if (!s.isRunning || !s.program || s.textures.length === 0) {
        s.animFrameId = requestAnimationFrame(render);
        return;
      }

      // 1. Ultra-Smooth Cubic-Bezier (0.16, 1, 0.3, 1) Transition to target candidate
      if (s.hasTargetOffset) {
        const elapsed = Math.min(1.0, (performance.now() - s.transitionStartTime) / s.transitionDuration);
        if (elapsed >= 1.0) {
          s.viewOffset.x = s.targetOffset.x;
          s.viewOffset.y = s.targetOffset.y;
          s.hasTargetOffset = false;
        } else {
          const progress = evaluateCubicBezier(elapsed);
          s.viewOffset.x = s.startOffset.x + (s.targetOffset.x - s.startOffset.x) * progress;
          s.viewOffset.y = s.startOffset.y + (s.targetOffset.y - s.startOffset.y) * progress;
        }
      } else if (!s.drag.isDragging) {
        // 2. Harmonic Ambient Floating Wave Drift when idle
        if (s.autoGlide) {
          s.time += 0.016;
          const driftX = 0.32 + Math.cos(s.time * 0.5) * 0.08;
          const driftY = 0.07 + Math.sin(s.time * 0.7) * 0.04;
          s.viewOffset.x += driftX;
          s.viewOffset.y += driftY;
        }

        // 3. Inertia glide after user flick/drag
        s.viewOffset.x -= s.drag.velocityX;
        s.viewOffset.y -= s.drag.velocityY;
        s.drag.velocityX *= s.inertia;
        s.drag.velocityY *= s.inertia;
        if (Math.abs(s.drag.velocityX) < 0.003) s.drag.velocityX = 0;
        if (Math.abs(s.drag.velocityY) < 0.003) s.drag.velocityY = 0;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.04, 0.05, 0.08, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(s.program);

      const posLoc = gl.getAttribLocation(s.program, 'aPosition');
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, s.positionBuffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const texLoc = gl.getAttribLocation(s.program, 'aTexCoord');
      gl.enableVertexAttribArray(texLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, s.texCoordBuffer);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, s.indexBuffer);

      const resLoc = gl.getUniformLocation(s.program, 'uResolution');
      gl.uniform2f(resLoc, canvas.width, canvas.height);

      const offsetLoc = gl.getUniformLocation(s.program, 'uOffset');
      const imgPosLoc = gl.getUniformLocation(s.program, 'uImagePosition');
      const cardSizeLoc = gl.getUniformLocation(s.program, 'uCardSize');
      const samplerLoc = gl.getUniformLocation(s.program, 'uSampler');
      const bulgeStrengthLoc = gl.getUniformLocation(s.program, 'uBulgeStrength');
      const bulgeRadiusLoc = gl.getUniformLocation(s.program, 'uBulgeRadius');

      gl.uniform2f(cardSizeLoc, s.imageWidth * s.dpr, s.imageHeight * s.dpr);
      gl.uniform1f(bulgeStrengthLoc, s.bulgeStrength);
      gl.uniform1f(bulgeRadiusLoc, s.adjustedBulgeRadius);

      // Calculate visible infinite tiles
      const tileW = (s.imageWidth + s.gap) * s.dpr;
      const tileH = (s.imageHeight + s.gap) * s.dpr;
      const visibleLeft = s.viewOffset.x * s.dpr - canvas.width * 0.6;
      const visibleRight = s.viewOffset.x * s.dpr + canvas.width * 1.6;
      const visibleTop = s.viewOffset.y * s.dpr - canvas.height * 0.6;
      const visibleBottom = s.viewOffset.y * s.dpr + canvas.height * 1.6;

      const startX = Math.floor(visibleLeft / tileW) - 1;
      const endX = Math.ceil(visibleRight / tileW) + 1;
      const startY = Math.floor(visibleTop / tileH) - 1;
      const endY = Math.ceil(visibleBottom / tileH) + 1;

      for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
          const hash = Math.abs((x * 7919 + y * 7307) % s.textures.length);
          const texture = s.textures[hash];
          if (!texture) continue;

          gl.uniform2f(offsetLoc, s.viewOffset.x * s.dpr, s.viewOffset.y * s.dpr);
          gl.uniform2f(imgPosLoc, x * tileW, y * tileH);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.uniform1i(samplerLoc, 0);

          gl.drawElements(gl.TRIANGLES, s.indexCount, gl.UNSIGNED_SHORT, 0);
        }
      }

      s.animFrameId = requestAnimationFrame(render);
    };

    s.animFrameId = requestAnimationFrame(render);

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      s.isRunning = false;
      cancelAnimationFrame(s.animFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeCanvas]);

  // Focus on specific candidate smoothly with center-in-viewport precision & cubic-bezier glide
  const focusOnCandidate = (index: number) => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tileW = s.imageWidth + s.gap;
    const tileH = s.imageHeight + s.gap;

    // Grid coordinates
    const targetCardX = (index % 4) * tileW;
    const targetCardY = Math.floor(index / 4) * tileH;

    // Center in viewport
    const viewportW = canvas.width / s.dpr;
    const viewportH = canvas.height / s.dpr;

    s.hasTargetOffset = true;
    s.startOffset = { x: s.viewOffset.x, y: s.viewOffset.y };
    s.transitionStartTime = performance.now();
    s.transitionDuration = 850;
    s.targetOffset = {
      x: targetCardX - (viewportW - s.imageWidth) / 2,
      y: targetCardY - (viewportH - s.imageHeight) / 2
    };

    setSelectedItem(TRANSFORMATION_DATA[index]);
  };

  // Adjust bulge strength
  const handleBulgeChange = (delta: number) => {
    const s = stateRef.current;
    const nextVal = Math.min(1.0, Math.max(0.05, s.bulgeStrength + delta));
    s.bulgeStrength = nextVal;
    setBulgeStrength(nextVal);
  };

  const handleResetBulge = () => {
    const s = stateRef.current;
    s.bulgeStrength = 0.35;
    s.bulgeRadius = 1.5;
    s.viewOffset = { x: 0, y: 0 };
    setBulgeStrength(0.35);
    resizeCanvas();
  };

  const toggleAutoGlide = () => {
    const s = stateRef.current;
    s.autoGlide = !s.autoGlide;
    setAutoGlide(s.autoGlide);
  };

  // Mouse & Touch interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    s.drag.isDragging = true;
    s.hasTargetOffset = false;
    s.drag.lastX = e.clientX;
    s.drag.lastY = e.clientY;
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    if (!s.drag.isDragging) return;
    const dx = e.clientX - s.drag.lastX;
    const dy = e.clientY - s.drag.lastY;
    s.drag.velocityX = dx * 0.35 + s.drag.velocityX * 0.65;
    s.drag.velocityY = dy * 0.35 + s.drag.velocityY * 0.65;
    s.viewOffset.x -= s.drag.velocityX;
    s.viewOffset.y -= s.drag.velocityY;
    s.drag.lastX = e.clientX;
    s.drag.lastY = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    const moveDist = Math.hypot(s.drag.velocityX, s.drag.velocityY);
    if (moveDist < 1.8) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const tileW = s.imageWidth + s.gap;
        const tileH = s.imageHeight + s.gap;
        const worldX = s.viewOffset.x + clickX;
        const worldY = s.viewOffset.y + clickY;
        const gridX = Math.floor(worldX / tileW);
        const gridY = Math.floor(worldY / tileH);
        const hash = Math.abs((gridX * 7919 + gridY * 7307) % TRANSFORMATION_DATA.length);
        setSelectedItem(TRANSFORMATION_DATA[hash]);
      }
    }
    s.drag.isDragging = false;
    setIsInteracting(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const s = stateRef.current;
    s.drag.isDragging = true;
    s.hasTargetOffset = false;
    s.drag.lastX = e.touches[0].clientX;
    s.drag.lastY = e.touches[0].clientY;
    setIsInteracting(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const s = stateRef.current;
    if (!s.drag.isDragging) return;
    const dx = e.touches[0].clientX - s.drag.lastX;
    const dy = e.touches[0].clientY - s.drag.lastY;
    s.drag.velocityX = dx * 0.35 + s.drag.velocityX * 0.65;
    s.drag.velocityY = dy * 0.35 + s.drag.velocityY * 0.65;
    s.viewOffset.x -= s.drag.velocityX;
    s.viewOffset.y -= s.drag.velocityY;
    s.drag.lastX = e.touches[0].clientX;
    s.drag.lastY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const s = stateRef.current;
    s.drag.isDragging = false;
    setIsInteracting(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const s = stateRef.current;
    s.hasTargetOffset = false;
    s.drag.velocityX += e.deltaX * 0.35;
    s.drag.velocityY += e.deltaY * 0.35;
  };

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        handleBulgeChange(0.06);
      } else if (e.key === '-' || e.key === '_') {
        handleBulgeChange(-0.06);
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetBulge();
      } else if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (selectedItem && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const curIdx = TRANSFORMATION_DATA.findIndex(c => c.id === selectedItem.id);
        if (curIdx !== -1) {
          const nextIdx = e.key === 'ArrowRight' 
            ? (curIdx + 1) % TRANSFORMATION_DATA.length
            : (curIdx - 1 + TRANSFORMATION_DATA.length) % TRANSFORMATION_DATA.length;
          setSelectedItem(TRANSFORMATION_DATA[nextIdx]);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(resizeCanvas, 100);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, [resizeCanvas]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full rounded-2xl overflow-hidden border border-purple-500/30 bg-[#0A0C14] transition-all shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-none' : ''
      }`}
    >
      {/* 1. Category Quick Filter Strip */}
      <div className="relative z-20 px-4 pt-4 pb-2 bg-[#0E111B]/95 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 text-xs text-[#C084FC] font-bold shrink-0 ml-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تصفية التخصص:</span>
          </div>

          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                // Smooth pan to first matching candidate
                const idx = TRANSFORMATION_DATA.findIndex(c => cat.id === 'all' || c.category === cat.id);
                if (idx !== -1) focusOnCandidate(idx);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#9333EA] text-white shadow-md shadow-purple-900/40 border border-[#A855F7]/40'
                  : 'bg-[#1A1D2B] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ambient drift toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleAutoGlide}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5 cursor-pointer ${
              autoGlide 
                ? 'bg-purple-950/40 border-[#A855F7]/40 text-[#C084FC]' 
                : 'bg-[#1A1D2B] border-slate-800 text-slate-400'
            }`}
            title="تشغيل / إيقاف الدوران الانسيابي التلقائي"
          >
            {autoGlide ? <Pause className="w-3 h-3 text-[#A855F7]" /> : <Play className="w-3 h-3" />}
            <span className="text-[11px]">{autoGlide ? 'حركة انسيابية' : 'ثابت'}</span>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0A0C14]/90 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full border-4 border-[#9333EA] border-t-transparent animate-spin mb-4" />
          <div className="text-white text-sm font-bold tracking-wide">
            جاري تهيئة محرك WebGL ثلاثي الأبعاد... ({Math.round((loadedCount / TRANSFORMATION_DATA.length) * 100)}%)
          </div>
          <p className="text-xs text-slate-400 mt-2">
            يتم توليد بطاقات تفاعلية عالية الدقة (Retina HD Textures)
          </p>
        </div>
      )}

      {/* Main WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className={`w-full block select-none touch-none ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-20 sm:bottom-24 right-4 z-20 flex items-center gap-2">
        {/* Fisheye Strength controls */}
        <div className="flex items-center gap-1 bg-[#1A1D2B]/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-xl">
          <button
            type="button"
            onClick={() => handleBulgeChange(0.06)}
            className="w-8 h-8 rounded-lg bg-[#0A0C14] hover:bg-[#9333EA] text-slate-200 hover:text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer"
            title="زيادة تقوس العدسة (+)"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleBulgeChange(-0.06)}
            className="w-8 h-8 rounded-lg bg-[#0A0C14] hover:bg-[#9333EA] text-slate-200 hover:text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer"
            title="تقليل تقوس العدسة (-)"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetBulge}
            className="w-8 h-8 rounded-lg bg-[#0A0C14] hover:bg-[#9333EA] text-slate-200 hover:text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center cursor-pointer"
            title="إعادة ضبط الرؤية للمركز (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="w-11 h-11 rounded-xl bg-[#1A1D2B]/90 backdrop-blur-md border border-[#A855F7]/30 hover:border-[#A855F7] text-white hover:bg-[#9333EA] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shadow-xl cursor-pointer"
          title={isFullscreen ? 'إنهاء وضع الشاشة الكاملة (ESC)' : 'ملء الشاشة'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Interactive Helper Banner */}
      <div className="absolute top-16 left-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0C14]/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 pointer-events-none">
        <Move className="w-3 h-3 text-[#A855F7]" />
        <span>اسحب في أي اتجاه للاستكشاف • اضغط على أي بطاقة لعرض تفاصيل التحول</span>
      </div>

      {/* 2. Fast Jump Candidate Carousel Strip at Bottom */}
      <div className="relative z-20 px-4 py-3 bg-[#0E111B]/95 backdrop-blur-md border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium">
            الوصول السريع لقصص النجاح ({displayedCandidates.length}):
          </span>
          <span className="text-[11px] text-purple-400 font-mono">
            انتقال انسيابي مباشر ⚡
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {displayedCandidates.map((candidate) => {
            const isCurrent = selectedItem?.id === candidate.id;
            const originalIdx = TRANSFORMATION_DATA.findIndex(c => c.id === candidate.id);
            return (
              <button
                key={candidate.id}
                onClick={() => focusOnCandidate(originalIdx)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] shrink-0 cursor-pointer text-right ${
                  isCurrent
                    ? 'bg-[#9333EA]/20 border-[#A855F7] shadow-lg shadow-purple-900/30'
                    : 'bg-[#141724] border-slate-800 hover:border-purple-500/50 text-slate-300'
                }`}
              >
                <img 
                  src={candidate.imageUrl} 
                  alt={candidate.name} 
                  className="w-7 h-7 rounded-full object-cover border border-purple-400"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{candidate.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">({candidate.salaryIncrease})</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                    {candidate.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Deep Transformation Inspector Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md p-3 sm:p-6 lg:p-8 flex items-center justify-center animate-fadeIn overflow-y-auto duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#141724] border border-[#A855F7]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 shadow-2xl text-right relative my-auto transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Control Bar: Separates Navigation & Meta to prevent any overlap on mobile/desktop */}
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

            {/* Metric Summary Ribbon: Fully responsive grid */}
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

            {/* Comparison Switcher Tabs */}
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

            {/* Content Tab 1: Quotes */}
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
                  className="px-2.5 py-1 rounded-lg bg-[#0B0D17] border border-slate-800 text-[11px] font-mono text-[#C084FC]"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Modal Bottom Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 text-center sm:text-right">
                هل ترغب في إعادة صياغة خبراتك بنفس المعايير الاحترافية؟
              </div>

              <MagneticButton>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onOpenEvaluationModal();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#9333EA] hover:bg-[#A855F7] shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>اطلب تطوير وتجهيز ملفك المهني الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </MagneticButton>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
