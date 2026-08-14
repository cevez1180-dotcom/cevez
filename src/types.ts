export interface ServiceItem {
  id: string;
  rank?: string;
  badge?: string;
  title: string;
  englishTitle: string;
  description: string;
  features: string[];
  isHero?: boolean;
  tier: 'hero' | 'primary' | 'standard';
  iconName: string;
  targetAudience: string;
  highlightText?: string;
}

export interface ComparisonPoint {
  category: string;
  traditionalWay: string;
  careerProfileWay: string;
}

export interface BeforeAfterExample {
  role: string;
  field: string;
  before: {
    title: string;
    points: string[];
    weakness: string;
  };
  after: {
    title: string;
    points: string[];
    impact: string;
    atsTags: string[];
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
