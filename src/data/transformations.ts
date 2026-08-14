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

export const CATEGORIES: { id: CandidateCategory; label: string }[] = [
  { id: 'all', label: 'جميع المجالات (8 قصص)' },
  { id: 'tech', label: 'هندسة وبرمجة (Tech)' },
  { id: 'growth', label: 'تسويق ونمو (Marketing)' },
  { id: 'finance', label: 'مالية واستثمار (Finance)' },
  { id: 'design', label: 'تصميم وبورتفوليو (Design)' },
  { id: 'operations', label: 'إدارة وموارد بشرية (HR)' },
];
