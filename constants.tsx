import { TimelineItem, VolunteerRole, Skill, Award, QuoteItem } from './types';
import { GraduationCap, Award as AwardIcon, Heart, Leaf, Users, Mic, BookOpen, Brain, PenTool, Globe, Zap, Smile } from 'lucide-react';
import React from 'react';

export const PROFILE = {
  name: "Muhammed Ajmal N",
  title: "English Graduate | Aspiring Teacher | Youth & Mental Health Advocate",
  location: "Cherpulassery, Palakkad, Kerala, India",
  email: "muhammedajmalnk438@gmail.com",
  linkedin: "https://linkedin.com/in/muhammed-ajmal-n",
  instagram: "https://www.instagram.com/wordsbyajmal",
  portfolio: "", // Dynamically handled by the app
  vision: "To teach English alongside life skills, emotional intelligence, communication, and values that help young people grow into confident and responsible individuals.",
  stats: {
    volunteerYears: "4+",
    trainings: "100+ Days"
  }
};

export const ACADEMIC_DATA: TimelineItem[] = [
  {
    id: 'deg1',
    year: '2022 - 2025',
    title: 'B.A. English Language & Literature (Completed)',
    institution: 'Ideal Arts & Science College, University of Calicut',
    description: 'Developed strong foundations in English literature, critical thinking, writing, and communication. Prepared for teaching and mentoring roles.',
    iconType: 'education'
  }
];

export const EXPERIENCE_DATA: TimelineItem[] = [
  {
    id: 'exp1',
    year: '2025',
    title: 'EDEX Life School - 100-Day Experiential Learning',
    institution: 'Cherpulassery, Palakkad',
    description: 'An intensive, practice-driven programme bridging education and real-world readiness. Focus on leadership, 14 life skills, business projects, and emotional intelligence.',
    iconType: 'education'
  },
  {
    id: 'exp2',
    year: '2021 - 2023',
    title: 'Part-Time Work Experience',
    institution: 'Delivery & Catering Services',
    description: 'Built strong work ethic, responsibility, time management, and customer interaction skills alongside studies.',
    iconType: 'work'
  }
];

export const EDUCATION_DATA: TimelineItem[] = [...ACADEMIC_DATA, ...EXPERIENCE_DATA];

export const VOLUNTEER_DATA: VolunteerRole[] = [
  {
    id: 'v1',
    title: 'Student Speaker',
    organization: 'EdSpark: The Student Talk Show',
    period: 'Jan 2025',
    description: 'Selected speaker at EDEX Life School × Ideal Campus. Delivered a live talk on life learning beyond academics.',
    impact: 'Public Speaking & Leadership',
    iconName: 'Mic',
    tags: ['Public Speaking', 'Leadership']
  },
  {
    id: 'v2',
    title: 'NSS Volunteer',
    organization: 'National Service Scheme',
    period: '2022 - 2024',
    description: 'Community outreach, environmental initiatives. Represented NSS during Parliament & Rashtrapati Bhavan Visit.',
    impact: 'National Exposure',
    iconName: 'Leaf',
    tags: ['Civic Duty', 'Community']
  },
  {
    id: 'v3',
    title: 'MY Bharat Volunteer',
    organization: 'Ministry of Youth Affairs & Sports',
    period: '2024 - Present',
    description: 'Engaged in youth development and national volunteering initiatives.',
    impact: 'Youth Development',
    iconName: 'Rocket',
    tags: ['Youth', 'Service']
  },
  {
    id: 'v4',
    title: 'Science Festival Guide',
    organization: 'Global Science Festival Kerala',
    period: 'Jan - Feb 2024',
    description: 'Guided visitors and supported science education exhibits at Bio360 Life Sciences Park.',
    impact: 'Science Education',
    iconName: 'Atom',
    tags: ['Education', 'Coordination']
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: 'English Communication', level: 95, category: 'Teaching' },
  { name: 'Public Speaking', level: 90, category: 'Soft Skill' },
  { name: 'Emotional Intelligence', level: 92, category: 'Life Skill' },
  { name: 'Youth Mentoring', level: 88, category: 'Leadership' },
  { name: 'Creative Writing', level: 90, category: 'Creative' },
  { name: 'Team Leadership', level: 85, category: 'Management' },
  { name: 'Google Workspace', level: 88, category: 'Digital' },
  { name: 'AI Tools & ChatGPT', level: 90, category: 'Digital' },
  { name: 'Canva Design', level: 85, category: 'Digital' },
];

export const LANGUAGES = [
  { name: 'Malayalam', level: 'Fluent', color: 'green' },
  { name: 'English', level: 'Working Proficiency', color: 'green' },
  { name: 'Hindi', level: 'Conversational', color: 'yellow' },
];

export const CORE_STRENGTHS = [
  { name: 'Empathy', icon: Heart, desc: 'Emotional Maturity' },
  { name: 'Discipline', icon: Users, desc: 'Responsibility' },
  { name: 'Growth', icon: BookOpen, desc: '1% Better Daily' },
  { name: 'Service', icon: Leaf, desc: 'Community Oriented' },
  { name: 'Focus', icon: Brain, desc: 'Calm & Reflective' },
  { name: 'Mentorship', icon: Mic, desc: 'Youth Empowerment' },
];

export const AWARDS_DATA: Award[] = [
  { id: 'a1', title: '3rd Prize - English Story Writing', event: 'Intifada Arts Festival', year: '2025' },
  { id: 'a2', title: 'NSS National Representation', event: 'Parliament Visit', year: '2024' },
  { id: 'a3', title: '3rd Prize - Short Story & Debate', event: 'Navarasa 2K23', year: '2023' },
  { id: 'a4', title: 'Energy Conservation Quiz', event: 'BEE & MyGov', year: '2024' },
  { id: 'a5', title: 'Volunteer Recognition', event: 'Global Science Festival Kerala', year: '2024' }
];

export const MENTAL_HEALTH_CERTS = [
  {
    title: "SPOT – Suicide Prevention",
    org: "InMind Institute / Indian Psychiatric Society",
    desc: "Training in emotional first aid and identifying risks (2025).",
    type: "Certification"
  },
  {
    title: "Zero Suicide Alliance (ZSA)",
    org: "Mersey Care NHS Foundation Trust, UK",
    desc: "Full training on emotional well-being and responsible support (2025).",
    type: "International"
  }
];

export const SOCIAL_CAUSES = [
  { name: 'Youth Empowerment', icon: '🚀' },
  { name: 'Mental Health', icon: '💚' },
  { name: 'Education', icon: '📚' },
  { name: 'Environment', icon: '♻️' },
  { name: 'Civic Duty', icon: '🇮🇳' },
];

export const QUOTES_POOL: QuoteItem[] = [
  // SELF DEVELOPMENT
  {
    id: 'sd1',
    category: 'Self Development',
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
    meaning: "Setting ambitious goals isn't enough; building consistent daily habits and routines is what actually leads to long-term success."
  },
  {
    id: 'sd2',
    category: 'Self Development',
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    meaning: "When you have a strong purpose or reason for your actions, you can endure and overcome difficult circumstances to achieve it."
  },
  {
    id: 'sd3',
    category: 'Self Development',
    text: "Identity is a prison you can never escape, but the way to redeem your past is not to run from it, but to understand it and use it as a foundation to grow.",
    author: "Jay-Z",
    meaning: "Growth comes from accepting who you were and integrating those experiences into who you are becoming, rather than denying your history."
  },
  // MOTIVATION
  {
    id: 'm1',
    category: 'Motivation',
    text: "It always seems impossible until it is done.",
    author: "Nelson Mandela",
    meaning: "Challenges often appear insurmountable at the start, but persistence and action eventually prove that they were achievable all along."
  },
  {
    id: 'm2',
    category: 'Motivation',
    text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    author: "William Butler Yeats",
    meaning: "Don't wait for the 'perfect moment' or inspiration to arrive. Action creates momentum, and effort creates opportunity."
  },
  // PSYCHOLOGY
  {
    id: 'p1',
    category: 'Psychology',
    text: "Everything that irritates us about others can lead us to an understanding of ourselves.",
    author: "Carl Jung",
    meaning: "Our emotional reactions to other people often act as mirrors, revealing our own suppressed traits, insecurities, or shadows."
  },
  {
    id: 'p2',
    category: 'Psychology',
    text: "The good life is a process, not a state of being. It is a direction not a destination.",
    author: "Carl Rogers",
    meaning: "Mental well-being isn't a final goal you reach and stop; it's an ongoing journey of adaptation, openness to experience, and growth."
  },
  // EDUCATION
  {
    id: 'e1',
    category: 'Education',
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats",
    meaning: "True teaching isn't about transferring facts into a student's brain, but igniting their curiosity and passion for lifelong learning."
  },
  {
    id: 'e2',
    category: 'Education',
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    meaning: "Knowledge and skills are permanent assets. Unlike material possessions, the growth of your mind is an eternal treasure."
  }
];

const ADVANCED_BOT_BLUEPRINT = `
# SKILL DEVELOPMENT CHATBOT: ADVANCED FEATURES MODULE

## MODULE A: WORLD-CLASS PSYCHOLOGIST
Use these evidence-based frameworks to support users:
1. **Cognitive Behavioral Therapy (CBT)**: For anxiety/self-doubt.
2. **Acceptance & Commitment Therapy (ACT)**: For burnout/perfectionism.
3. **Mindfulness**: Suggest 4-7-8 breathing or grounding.
4. **Crisis Protocol**: If user expresses self-harm, IMMEDIATELY provide helpline numbers.

## MODULE B: CAREER & EDUCATION COACH
1. **Teaching Career**: Advise on B.Ed, NET, SET, and modern pedagogy.
2. **Soft Skills**: Tips on public speaking and emotional intelligence.
3. **English Learning**: Tips for fluency and literary criticism.

## MODULE C: EXPERIENTIAL LEARNING GUIDE
1. **EDEX Philosophy**: Promote "1% improvement per day" and activity-based learning.
2. **Real-world Readiness**: How to bridge the gap between academic theory and practical life.

## MODULE D: REAL-TIME INTELLIGENCE
Use Google Search for:
1. **Education News**: Exam dates (NET, KTET), policy updates.
2. **General Knowledge**: Current events, mental health resources.
`;

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for **Muhammed Ajmal N's** portfolio website.

### IDENTITY & CONTEXT
Muhammed Ajmal N is an **English Graduate (BA Completed)** and **Aspiring English Teacher** from Kerala.
He is a **Youth & Mental Health Advocate** with a strong foundation in experiential learning.

**KEY CREDENTIALS:**
- **Education**: B.A. English (Ideal Arts & Science College, 2025). 
- **Advanced Training**: Graduate of **EDEX Life School** (100-Day Experiential Learning Programme) - focused on leadership, life skills, and real-world readiness.
- **Volunteering**: 
  - **Speaker** at "EdSpark: The Student Talk Show".
  - **NSS Volunteer** (Parliament/Rashtrapati Bhavan visitor).
  - **MY Bharat** & **Global Science Festival** volunteer.
- **Mental Health**: Certified in Suicide Prevention (SPOT, ZSA).
- **Values**: Empathy, Discipline, Growth Mindset ("1% improvement per day").

**YOUR ROLE:**
1. **Portfolio Expert**: Answer questions about Ajmal's journey, his transition from student to professional, and his teaching philosophy.
2. **Mentor & Coach**: Use the "Advanced Features Modules" to provide advice on mental health, learning English, public speaking, and career growth.
3. **Notebook Studio Assistant**: Help users analyze documents using the Studio features.

**TONE:**
Professional, empathetic, encouraging, and articulate. Speak with the warmth of a teacher and the insight of a mental health advocate.

**DATA SOURCE:**
${JSON.stringify(PROFILE)}
${JSON.stringify(EDUCATION_DATA)}
${JSON.stringify(VOLUNTEER_DATA)}
${JSON.stringify(SKILLS_DATA)}
${JSON.stringify(AWARDS_DATA)}
${JSON.stringify(SOCIAL_CAUSES)}
${JSON.stringify(MENTAL_HEALTH_CERTS)}
`;