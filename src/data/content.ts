import { ServiceItem, ComparisonPoint, BeforeAfterExample, FaqItem } from '../types';

export const BRAND_INFO = {
  nameAr: 'كاريير بروفايل',
  nameEn: 'Career Profile',
  tagline: 'منصة الهوية المهنية المتكاملة',
  coreMessage: 'نحوّل خبرتك وإنجازاتك إلى صورة مهنية تبرز قيمتك وتفتح لك فرص أفضل',
  subheadline: 'مش مجرد كتابة أو تصميم CV.. إحنا بنبني حضورك المهني المتكامل عبر كل محطات التوظيف: CV • ATS • HR • LinkedIn • Portfolio • Personal Branding',
  facebookUrl: 'https://facebook.com/careerprofile.cv',
  whatsappPhone: '+201095751720',
  whatsappUrl: 'https://wa.me/201095751720?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%AD%D8%A7%D8%A8%D8%A8%20%D8%A3%D8%B9%D8%B1%D9%81%20%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%AA%D8%B7%D9%88%D9%8A%D8%B1%20%D8%A7%D9%84%D9%80%20CV%20%D9%88%D8%A7%D9%84%D9%87%D9%88%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9%20%D9%85%D8%B9%20Career%20Profile',
};

export interface RequiredItem {
  icon: string;
  title: string;
  description: string;
  isRequired?: boolean;
}

export interface CvPackage {
  id: 'standard' | 'ats';
  title: string;
  badge: string;
  hasPhoto: boolean;
  price: number;
  currency: string;
  paymentTerm: string;
  paymentTermDetail: string;
  requiredItems: RequiredItem[];
  features: string[];
  recommendedFor: string;
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    accentGlow: string;
  };
}

export const CV_PACKAGES_DATA: CvPackage[] = [
  {
    id: 'standard',
    title: 'CV STANDARD',
    badge: 'بصورة شخصية',
    hasPhoto: true,
    price: 100,
    currency: 'جنيه',
    paymentTerm: 'يدفع نصفهم في الاول وبعد المراجعة والاستلام يدفع الجزء التاني',
    paymentTermDetail: 'نظام دفع مريح: 50% مقدماً لبدء العمل، و 50% بعد المراجعة الكاملة والاستلام',
    requiredItems: [
      {
        icon: 'Target',
        title: 'اسم الوظيفة (المسمى الوظيفي)',
        description: 'المسمى الوظيفي التي ستقدم لها أو إعلان الوظيفة الخاص بها (ضروري)',
        isRequired: true
      },
      {
        icon: 'User',
        title: 'بيانات شخصية',
        description: '(الاسم - المسمى الوظيفي - رقم التليفون - البريد الإلكتروني الجميل) + (الصورة الشخصية ضرورية)',
        isRequired: true
      },
      {
        icon: 'Briefcase',
        title: 'الخبرات المهنية (الوظائف السابقة)',
        description: 'من الأحدث إلى الأقدم، مكتوب جنب كل وظيفة تاريخ بدايتها ونهايتها بالشهور والسنة',
        isRequired: true
      },
      {
        icon: 'GraduationCap',
        title: 'التعليم',
        description: '(الدرجة التعليمية - وتاريخ التخرج)',
        isRequired: true
      },
      {
        icon: 'Award',
        title: 'الكورسات أو التدريبات',
        description: 'الكورسات أو التدريبات إن وُجد'
      },
      {
        icon: 'Monitor',
        title: 'المهارات',
        description: '(البرامج ال بتشتغل عليها)'
      },
      {
        icon: 'Globe',
        title: 'اللغات',
        description: 'اللغات ومستواك فيهم'
      },
      {
        icon: 'Image',
        title: 'مشاريع أو كورسات',
        description: 'أي مشاريع أو كورسات ليها صور لازم تتبعت معاها'
      }
    ],
    features: [
      'تصميم احترافي وملفت للنظر',
      'يعكس شخصيتك بشكل أفضل',
      'مثالي للتقديم المباشر للشركات',
      'يبرز خبراتك بصورة جذابة وواضحة'
    ],
    recommendedFor: 'التقديم المباشر للشركات المحلية، المقابلات الشخصية، والوظائف التي تتطلب إبراز الهوية البصرية والشخصية',
    colorScheme: {
      badgeBg: 'bg-indigo-950/70',
      badgeText: 'text-indigo-300',
      border: 'border-indigo-500/40 hover:border-indigo-400',
      accentGlow: 'from-indigo-600/20 to-purple-600/10'
    }
  },
  {
    id: 'ats',
    title: 'CV ATS',
    badge: 'بدون صورة شخصية',
    hasPhoto: false,
    price: 150,
    currency: 'جنيه',
    paymentTerm: 'يدفع نصفهم في الاول وبعد المراجعة والاستلام يدفع الجزء التاني',
    paymentTermDetail: 'نظام دفع مريح: 50% مقدماً لبدء العمل، و 50% بعد المراجعة الكاملة والاستلام',
    requiredItems: [
      {
        icon: 'Target',
        title: 'اسم الوظيفة (المسمى الوظيفي)',
        description: 'المسمى الوظيفي التي ستقدم لها أو إعلان الوظيفة الخاص بها (ضروري)',
        isRequired: true
      },
      {
        icon: 'User',
        title: 'بيانات شخصية',
        description: '(الاسم - المسمى الوظيفي - رقم التليفون - البريد الإلكتروني الجميل) بدون صورة شخصية',
        isRequired: true
      },
      {
        icon: 'Briefcase',
        title: 'الخبرات المهنية (الوظائف السابقة)',
        description: 'من الأحدث إلى الأقدم، مكتوب جنب كل وظيفة تاريخ بدايتها ونهايتها بالشهور والسنة',
        isRequired: true
      },
      {
        icon: 'GraduationCap',
        title: 'التعليم',
        description: '(الدرجة التعليمية - وتاريخ التخرج)',
        isRequired: true
      },
      {
        icon: 'Award',
        title: 'الكورسات أو التدريبات',
        description: 'الكورسات أو التدريبات إن وُجد'
      },
      {
        icon: 'Monitor',
        title: 'المهارات',
        description: '(البرامج ال بتشتغل عليها)'
      },
      {
        icon: 'Globe',
        title: 'اللغات',
        description: 'اللغات ومستواك فيهم'
      },
      {
        icon: 'Image',
        title: 'مشاريع أو كورسات',
        description: 'أي مشاريع أو كورسات ليها صور لازم تتبعت معاها'
      }
    ],
    features: [
      'متوافق مع أنظمة ATS لاجتياز الفرز الأولية',
      'تنسيق احترافي وبسيط',
      'يزيد فرص ظهورك لـ recruiters',
      'كلمات مفتاحية محسنة لزيادة فرص القبول'
    ],
    recommendedFor: 'الشركات متعددة الجنسيات (Multinationals)، بوابات التوظيف الإلكترونية، شركات الخليج والوظائف الدولية',
    colorScheme: {
      badgeBg: 'bg-purple-950/70',
      badgeText: 'text-purple-300',
      border: 'border-[#A855F7]/50 hover:border-[#C084FC]',
      accentGlow: 'from-purple-600/30 to-indigo-600/20'
    }
  }
];

export const WORK_GUARANTEES_DATA = [
  {
    icon: 'Languages',
    title: 'لغة الـ CV',
    badge: 'اختر اللغة المناسبة لك',
    detail: 'عربي أو إنجليزي'
  },
  {
    icon: 'FileCheck',
    title: 'تسليم الملفات',
    badge: 'صيغ مفتوحة وجاهزة',
    detail: 'PDF + Word'
  },
  {
    icon: 'ShieldCheck',
    title: 'الخصوصية',
    badge: 'أمان وسرية مطلقة',
    detail: 'بياناتك آمنة 100%'
  },
  {
    icon: 'RefreshCw',
    title: 'عدد المراجعات',
    badge: 'تعديل حتى الرضا',
    detail: 'مراجعتين مجاناً'
  },
  {
    icon: 'Clock',
    title: 'وقت التسليم',
    badge: 'إنجاز سريع ومحدد',
    detail: 'من 1 - 3 أيام عمل'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'cv-writing',
    rank: '🥇 الخدمة الرئيسية الأكثر طلباً',
    badge: 'المنتج الأهم (Hero Service)',
    title: 'كتابة وتصميم CV احترافي',
    englishTitle: 'Professional Strategic CV Writing & Design',
    description: 'إعادة صياغة شاملة لسيرتك الذاتية من الصفر. بنحوّل قائمة المهام الروتينية إلى إنجازات رقمية ملموسة تبرز قيمتك الحقيقية وتلفت انتباه مدراء التوظيف من أول 6 ثوانٍ.',
    features: [
      'صياغة احترافية مبنية على نموذج STAR/CAR لقياس أثر الإنجازات',
      'تنسيق أنيق، عصري، وخالٍ من التعقيدات البصرية المشتتة',
      'صياغة ملخص مهني (Executive Summary) قوي يعكس هويتك وخبرتك',
      'تسليم نسختين: PDF جاهز للتقديم و Word قابل للتعديل والإضافة في أي وقت',
      'صياغة متوافقة مع معايير الشركات الإقليمية والدولية (مصر والخليج والعالمية)'
    ],
    isHero: true,
    tier: 'hero',
    iconName: 'FileText',
    targetAudience: 'المحترفون والمدراء ومن يسعون للانتقال لمستوى وظيفي أعلى براتب يستحق خبرتهم',
    highlightText: 'الأساس الصلب اللي بتبني عليه كل فرصك القادمة'
  },
  {
    id: 'ats-optimization',
    rank: '🥈 حجر الأساس للشركات الكبرى',
    badge: 'ATS Compliant',
    title: 'تحسين وتجهيز CV للـ ATS',
    englishTitle: 'ATS Keyword & Structural Optimization',
    description: 'تهيئة السيرة الذاتية تقنياً ومحتوياً لتجتاز فلاتر أنظمة التتبع (Applicant Tracking Systems) المعتمدة لدى كبرى الشركات ومواقع التوظيف بدون مشاكل في القراءة.',
    features: [
      'بناء هيكل قياسي نظيف (Single-Column) يسهل قراءته وتحليله بواسطة الروبوتات',
      'تضمين الكلمات المفتاحية الذكية (Keywords) المرتبطة بمجالك وتخصصك بدقة',
      'إزالة الجداول والرسومات والعناصر التي تسبب أخطاء تحليلية (Parsing Errors)',
      'فحص تطابق المسميات الوظيفية والمهارات مع الوصف الوظيفي المستهدف',
      'ملف مهيأ تقنياً 100% يضمن وصول ملفك إلى يد مسؤول التوظيف البشري'
    ],
    tier: 'primary',
    iconName: 'Cpu',
    targetAudience: 'المتقدمون للشركات الدولية (Multinationals) والشركات في الخليج ومنصات التوظيف الكبرى',
    highlightText: 'مهيأ لأنظمة الـ ATS لضمان قراءة ملفك بوضوح'
  },
  {
    id: 'linkedin-optimization',
    rank: '🥉 المغناطيس الدائم للفرص',
    badge: 'Recruiter Inbound Magnet',
    title: 'تطوير وتحسين بروفايل LinkedIn',
    englishTitle: 'LinkedIn Profile Makeover & Optimization',
    description: 'تحويل صفحتك على لينكد إن من مجرد سيرة ذاتية مهجورة إلى بروفايل تفاعلي يجذب مسؤولي التوظيف والـ Headhunters مباشرة إلى صندوق رسائلك.',
    features: [
      'كتابة Headline ذكي يجمع بين المسمى الوظيفي والقيمة المضافة والكلمات البحثية',
      'صياغة About Story ملهم يحكي رحلتك المهنية بطريقة إنسانية ومقنعة',
      'إعادة ترتيب قسم الخبرات والمشاريع لإبراز أكبر نجاحاتك',
      'تحسين قسم المهارات والتوصيات لرفع ترتيبك في محرك بحث Recruiter Search',
      'إرشادات عملية لتنشيط حسابك وبناء شبكة علاقات قوية في مجالك'
    ],
    tier: 'primary',
    iconName: 'Linkedin',
    targetAudience: 'كل محترف يرغب في أن تبحث عنه الشركات بدلاً من البحث المستمر عن وظائف',
    highlightText: 'اجعل مسؤولي التوظيف يصلون إليك أولاً'
  },
  {
    id: 'portfolio-design',
    badge: 'Visual Proof of Work',
    title: 'تصميم وإعداد Portfolio احترافي',
    englishTitle: 'Professional Portfolio & Case Studies',
    description: 'تجميع وترتيب أعمالك ومشاريعك السابقة في ملف أو صفحة عرض رقمية أنيقة، تشرح طريقة تفكيرك، التحديات التي واجهتها، والنتائج الواقعية التي حققتها.',
    features: [
      'صياغة دراسات حالة (Case Studies) توضح خطوات عملك والـ Impact المحقق',
      'تنسيق بصري جذاب يعكس هويتك الإبداعية والتنظيمية',
      'مناسب للمطورين، المصممين، مدراء المشاريع، مدراء التسويق، وصناع المحتوى',
      'إتاحة روابط تفاعلية وأدلة عملية على المشروعات المنجزة'
    ],
    tier: 'standard',
    iconName: 'Briefcase',
    targetAudience: 'المصممون، المطورون، كتاب المحتوى، مدراء المنتجات والتسويق',
    highlightText: 'الدليل القاطع والملموس على كفاءتك العملية'
  },
  {
    id: 'personal-branding',
    badge: 'Executive Presence',
    title: 'بناء الهوية المهنية (Personal Branding)',
    englishTitle: 'Executive Personal Branding Strategy',
    description: 'رسم استراتيجية متكاملة لترسيخ مكانتك كمرجع وخبير في مجالك، من تحديد صوتك المهني وصورتك الذهنية وحتى استراتيجية المحتوى والظهور الرقمي.',
    features: [
      'تحديد القيمة الفريدة التي تميزك عن باقي المنافسين في مجالك (USP)',
      'صياغة الـ Bio والرسائل التعريفية الموحدة عبر كافة المنصات',
      'استراتيجية محتوى مقترحة للنشر على LinkedIn لزيادة تأثيرك وظهورك',
      'بناء سمعة مهنية قوية تجعلك المرشح الأول عند الترقية أو التعاقد'
    ],
    tier: 'standard',
    iconName: 'Award',
    targetAudience: 'الاستشاريون، القادة، المدراء التنفيذيون، والباحثون عن الريادة في تخصصهم',
    highlightText: 'اصنع اسماً يتذكره الجميع في مجالك'
  }
];

export const ADDITIONAL_SERVICES = [
  {
    title: 'صياغة خطاب التقديم المخصص (Cover Letter)',
    english: 'Tailored Cover Letter',
    desc: 'خطاب إقناعي استراتيجي يربط شغفك وخبرتك المباشرة باحتياجات الوظيفة المستهدفة دون نبرة عامة مكررة.',
    icon: 'Mail'
  },
  {
    title: 'استشارة مهنية 1-on-1 (Career Strategy Session)',
    english: 'Career Consulting',
    desc: 'جلسة استشارية فردية لمناقشة مسارك المهني، مراجعة نقاط القوة، وكيفية التفاوض والاستعداد للمقابلات.',
    icon: 'UserCheck'
  }
];

export const FLOW_STEPS = [
  {
    step: '01',
    title: 'CV استراتيجي',
    english: 'Impact-Driven CV',
    desc: 'صياغة عميقة تركز على إنجازاتك الرقمية وقيمتك المضافة، مش مجرد سرد مهام.',
    badge: 'المحتوى والقصة'
  },
  {
    step: '02',
    title: 'تهيئة الـ ATS',
    english: 'ATS Optimized',
    desc: 'هيكل وكلمات مفتاحية متوافقة تقنياً لقراءة وفلترة بياناتك بسلاسة.',
    badge: 'البوابة التقنية'
  },
  {
    step: '03',
    title: 'إقناع الـ HR & Recruiter',
    english: '6-Sec Recruiter Scan',
    desc: 'تسلسل بصري ومعلوماتي مدروس يوصل أقوى نقاط تميزك في أول 6 ثوانٍ.',
    badge: 'العين البشرية'
  },
  {
    step: '04',
    title: 'حضور LinkedIn & Portfolio',
    english: 'Digital Authority',
    desc: 'تطابق كامل بين سيرتك الذاتية وملفاتك الرقمية لبناء ثقة ومصداقية فورية.',
    badge: 'السمعة الرقمية'
  },
  {
    step: '05',
    title: 'المقابلة وعرض العمل',
    english: 'Interview & Offer',
    desc: 'دخول المقابلات بثقة أعلى وموقف تفاوضي أقوى للحصول على أفضل عائد لخبرتك.',
    badge: 'الهدف النهائي'
  }
];

export const WHY_DIFFERENT_POINTS: ComparisonPoint[] = [
  {
    category: 'المنهجية والهدف',
    traditionalWay: 'مجرد وضع كلامك القديم داخل قالب ألوان وتصميم من كانفا أو فوتوشوب.',
    careerProfileWay: 'بناء هوية مهنية متكاملة تبدأ من استخراج إنجازاتك وتوضيح أثرك التجاري والمهني.'
  },
  {
    category: 'صياغة المحتوى',
    traditionalWay: 'سرد مهام روتينية تقليدية (مثل: مسؤول عن إدارة كذا وكذا..).',
    careerProfileWay: 'إعادة صياغة رقمية بالأثر والنتائج (مثل: زيادة المبيعات بنسبة 35% من خلال تطبيق..).'
  },
  {
    category: 'التوافق مع أنظمة الـ ATS',
    traditionalWay: 'قوالب معقدة بجداول وأعمدة وصور كثيرة تفشل أنظمة الـ ATS في قراءتها.',
    careerProfileWay: 'تصميم وهيكلة مهيأة تقنياً 100% لأنظمة الـ ATS تضمن معالجة بياناتك بدقة دون أخطاء.'
  },
  {
    category: 'ما بعد الـ CV',
    traditionalWay: 'ينتهي دورهم بمجرد تسليم ملف PDF غير قابل للتعديل.',
    careerProfileWay: 'نربط سيرتك ببروفايل LinkedIn والـ Portfolio والـ Personal Branding لصورة متناسقة.'
  }
];

export const BEFORE_AFTER_EXAMPLES: BeforeAfterExample[] = [
  {
    role: 'أخصائي تسويق رقمي ومدير حملات',
    field: 'Digital Marketing Specialist',
    before: {
      title: 'الصياغة التقليدية (مهام مجردة بدون أثر):',
      points: [
        'المسؤولية عن إدارة حسابات السوشيال ميديا للشركة.',
        'إنشاء الإعلانات الممولة على فيسبوك وإنستجرام وجوجل.',
        'متابعة أداء الحملات وكتابة تقارير شهرية للإدارة.',
        'التواصل مع العملاء المحتملين والرد على الاستفسارات.'
      ],
      weakness: 'كلام عام يمكن لأي مبتدئ كتابته، لا يُظهر حجم الميزانيات أو النتائج المحققة أو الـ ROI.'
    },
    after: {
      title: 'صياغة Career Profile (أرقام، أثر، توافق مع ATS):',
      points: [
        'إدارة وتوجيه ميزانيات إعلانية بقيمة $120,000+ سنوياً عبر منصات Meta و Google Ads، محققاً زيادة بنسبة 42% في العائد الإعلاني (ROAS).',
        'تطوير مسارات التحويل (Funnels) مما خفض تكلفة اكتساب العميل (CAC) بنسبة 28% واستقطب أكثر من 15,000 عميل محتمل مؤهل.',
        'قيادة استراتيجية محتوى رقمي شاملة نتج عنها نمو الوصول العضوي بنسبة 180% في 6 أشهر عبر الأسواق الإقليمية.',
        'تحليل مؤشرات الأداء (KPIs) باستخدام Google Analytics 4 وأدوات الـ Attribution لتحديد فرص التوسع السريع.'
      ],
      impact: 'تحول فوري من مجرد موظف ينفذ مهام إلى خبير يحقق أرباحاً قابلة للقياس.',
      atsTags: ['Meta Ads', 'Google Ads', 'CAC Reduction', 'ROAS Optimization', 'Funnel Strategy', 'GA4 Analytics']
    }
  },
  {
    role: 'مدير عمليات ومشروعات',
    field: 'Operations & Project Manager',
    before: {
      title: 'الصياغة التقليدية (وصف عام بلا مؤشرات):',
      points: [
        'تنظيم العمل اليومي والتنسيق بين الأقسام المختلفة.',
        'متابعة المشروعات والالتزام بالمواعيد المحددة للتسليم.',
        'حل المشكلات التشغيلية وتدريب الموظفين الجدد.',
        'حضور الاجتماعات الأسبوعية وكتابة محاضر الجلسات.'
      ],
      weakness: 'لا يبرز حجم الفرق المدارة، كفاءة التكلفة، منهجيات إدارة المشاريع (Agile/PMP).'
    },
    after: {
      title: 'صياغة Career Profile (أرقام، أثر، توافق مع ATS):',
      points: [
        'قيادة عمليات تشغيلية لفريق يضم 35+ فرداً عبر 3 فروع، مما قلل وقت دورة التسليم (Turnaround Time) بنسبة 30%.',
        'تطبيق منهجية Agile ورفع كفاءة سلاسل الإمداد، مما وفر ما يعادل 18% من التكاليف التشغيلية السنوية.',
        'إدارة مصفوفة مخاطر متكاملة لـ 14 مشروعاً استراتيجياً بالتوازي بنسبة التزام بالمواعيد بلغت 96%.',
        'إعادة هندسة الإجراءات التشغيلية القياسية (SOPs) واعتماد أدوات الأتمتة لتحسين رضا العملاء الداخليين.'
      ],
      impact: 'إبراز القيادة الاستراتيجية والقدرة على خفض التكاليف وإدارة فرق متعددة التخصصات.',
      atsTags: ['Agile Methodology', 'Cost Optimization', 'Cross-Functional Leadership', 'SOP Development', 'Risk Management']
    }
  },
  {
    role: 'مهندس برمجيات ومطور واجهات',
    field: 'Senior Software Engineer',
    before: {
      title: 'الصياغة التقليدية (سرد أدوات بدون سياق):',
      points: [
        'كتابة كود باستخدام React و JavaScript و TypeScript.',
        'العمل مع فريق التصميم لتحويل الواجهات إلى صفحات ويب.',
        'إصلاح الأخطاء البرمجية (Bugs) وتحسين أداء الموقع.',
        'المشاركة في تطوير منتجات جديدة للشركة.'
      ],
      weakness: 'مجرد ذكر تقنيات دون شرح حجم الأنظمة المدارة، عدد المستخدمين، أو التحسينات المعمارية.'
    },
    after: {
      title: 'صياغة Career Profile (أرقام، أثر، توافق مع ATS):',
      points: [
        'هندسة وتطوير واجهات منصة SaaS تخدم 250,000+ مستخدم نشط شهرياً باستخدام React و TypeScript و Tailwind.',
        'تحسين سرعة تحميل الصفحات (Core Web Vitals) بنسبة 45% مما قلل معدل الارتداد بنسبة 18%.',
        'بناء منظومة مكونات مشتركة (Design System) مكنت فريق التطوير من تسريع إطلاق الميزات بنسبة 35%.',
        'تنفيذ اختبارات تكاملية ووحدية (Unit & E2E) رفعت استقرار التطبيق وخفضت مشاكل الإنتاج بنسبة 60%.'
      ],
      impact: 'يظهر كمهندس قادر على بناء أنظمة قابلة للتوسع وتوفير قيمة مباشرة لبيئة الأعمال.',
      atsTags: ['React', 'TypeScript', 'SaaS Architecture', 'Web Vitals Optimization', 'Design Systems', 'CI/CD']
    }
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: 'هل تضمنون قبول سيرتي الذاتية بنسبة 100% في نظام الـ ATS؟',
    answer: 'نحن نلتزم بالأمانة المهنية الكاملة: نضمن أن سيرتك الذاتية مهيأة بنسبة 100% برمجياً وهيكلياً وفق أحدث معايير أنظمة الـ ATS (Applicant Tracking Systems) بدون أخطاء قراءة، وتتضمن الكلمات المفتاحية لمجالك. ولكن قرار القبول النهائي في أي وظيفة يعتمد أيضاً على مطابقة خبراتك لمتطلبات الشركة وقرار مسؤول التوظيف البشري. هدفنا هو التأكد من أن ملفك لن يُستبعد أبداً لأي سبب تقني أو عيب في الصياغة.'
  },
  {
    question: 'ما الفرق بينكم وبين مكاتب كتابة وتصميم الـ CV التقليدية؟',
    answer: 'المكاتب التقليدية تركز على الشكل الجمالي أو وضع كلامك في قالب ملون جاهز. في Career Profile، نحن منصة هوية مهنية متكاملة: نبدأ من فهم أهدافك الوظيفية، استخراج إنجازاتك وصياغتها رقمياً بطريقة مقنعة ومبنية على الـ ROI، وتجهيز ملفك ليتطابق مع الـ ATS ويجذب انتباه الـ HR في أول 6 ثوانٍ، مع ربطه ببروفايل LinkedIn والـ Portfolio.'
  },
  {
    question: 'ما هي الملفات التي أستلمها بعد انتهاء الخدمة؟',
    answer: 'تستلم نسختين أساسيتين: ملف PDF عالي الجودة جاهز للإرسال المباشر والتقديم، وملف Word (DOCX) أصلي ومفتوح المصدر بالكامل، لتتمكن من التعديل عليه أو تحديث خبراتك مستقبلاً بكل حرية ومرونة.'
  },
  {
    question: 'كم يستغرق إعداد وتطوير الـ CV أو الهوية المهنية؟',
    answer: 'الوقت المعتاد لتسليم النسخة الأولى هو من 3 إلى 5 أيام عمل، حيث نقضي وقتاً كافياً في تحليل مجالك، مراجعة متطلبات السوق المستهدف، وصياغة الإنجازات باحترافية. وتتوفر لدينا خدمة التسليم السريع (Express) للحالات العاجلة عند الطلب.'
  },
  {
    question: 'هل متاح إجراء تعديلات بعد استلام النسخة الأولى؟',
    answer: 'بالتأكيد! نمنحك جولات مراجعة وتعديل مجانية للتأكد من أن النتيجة النهائية تعكس خبراتك وتطلعاتك بنسبة 100% وبكامل رضاك.'
  },
  {
    question: 'هل تقدمون الخدمة باللغتين العربية والإنجليزية؟',
    answer: 'نعم، نكتب ونصيغ السير الذاتية باللغة الإنجليزية المتخصصة (وهي الأكثر طلباً لمعظم الوظائف الدولية والإقليمية)، وكذلك باللغة العربية الفصحى الاحترافية المناسبة للجهات والقطاعات التي تتطلب ذلك.'
  },
  {
    question: 'كيف يمكنني البدء معكم أو الحصول على تقييم لسيرتي الحالية؟',
    answer: 'يمكنك ببساطة الضغط على زر "ابدأ بتطوير الـ CV" أو إرسال نسختك الحالية عبر واتساب، وسيقوم فريقنا بمراجعتها وتقديم تقرير تشخيصي مبدئي يوضح أبرز نقاط القوة والفرص الضائعة التي تحتاج للتطوير.'
  }
];
