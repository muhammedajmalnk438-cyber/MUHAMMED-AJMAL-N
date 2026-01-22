export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  description?: string;
  iconType: 'education' | 'work' | 'award';
}

export interface VolunteerRole {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  impact: string;
  iconName: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Award {
  id: string;
  title: string;
  event: string;
  year: string;
  rank?: string;
}

export interface QuoteItem {
  id: string;
  category: 'Self Development' | 'Motivation' | 'Psychology' | 'Education';
  text: string;
  author: string;
  meaning: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}