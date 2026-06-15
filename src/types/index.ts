export interface Vessel {
  id: string;
  name: string;
  type: string;
  specs: {
    lengthOverall: string;
    breadth: string;
    draft: string;
    mainEngines: string;
    bhp: string;
    bollardPull: string;
    deckSpace: string;
    flag: string;
  };
  capacity: {
    fuelOil: string;
    freshWater: string;
    deckCargo: string;
  };
  safetyCertifications: string[];
  status: 'Available' | 'On Charter' | 'Maintenance';
  image: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  overview: string;
  benefits: string[];
  process: string[];
  keyFeatures: string[];
}

export interface CaseStudy {
  id: string;
  industryId: string;
  title: string;
  project: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  image: string;
  keyPoints: string[];
  caseStudies: CaseStudy[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'executive' | 'management' | 'supervisory';
  bio: string;
  experience: string;
  responsibilities: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  feedback: string;
  rating: number;
  logoType: 'logo1' | 'logo2' | 'logo3' | 'logo4';
}

export interface Equipment {
  id: string;
  name: string;
  type: 'Fenders' | 'Hoses' | 'Anchors' | 'Spill Response' | 'Other';
  specs: string;
  quantity: number;
  status: 'Available' | 'Leased' | 'Maintenance';
  image: string;
  description: string;
  createdAt?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceNeeded: string;
  message: string;
  messageType: 'Contact' | 'Quote';
  status: 'Unread' | 'Read' | 'Replied';
  quoteDetails?: string | null;
  createdAt: string;
  updatedAt?: string;
}
