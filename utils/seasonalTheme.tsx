import React from 'react';
import { 
  Flame, Moon, Sparkles, 
  Snowflake, Flower2, Sun, PartyPopper, Calendar
} from 'lucide-react';

export type ThemeType = 
  | 'default' 
  | 'newYear' 
  | 'republicDay' 
  | 'holi' 
  | 'eid' 
  | 'independenceDay' 
  | 'onam' 
  | 'diwali' 
  | 'christmas';

export interface SeasonalTheme {
  type: ThemeType;
  name: string;
  greeting: string;
  icon: React.ElementType;
  colors: {
    accent: string;     // Text accent color
    glow: string;       // Glow/Shadow color
    gradient: string;   // Gradient class for text
  };
  VisualComponent: React.FC;
}

// Visual Components for each theme
const DefaultVisual: React.FC = () => null;

const DiwaliVisual: React.FC = () => (
  <div className="flex justify-center space-x-8 mt-2 opacity-80">
    {[0, 1, 2].map((i) => (
      <div key={i} className="relative animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
        <div className="w-4 h-6 bg-orange-500 rounded-t-full rounded-b-lg blur-[2px]"></div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-300 rounded-full blur-[1px] animate-pulse"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-orange-500/30 rounded-full blur-xl"></div>
      </div>
    ))}
  </div>
);

const HoliVisual: React.FC = () => (
  <div className="relative h-12 w-full max-w-[200px] mx-auto overflow-visible mt-2">
    <div className="absolute top-0 left-1/4 w-8 h-8 bg-pink-500 rounded-full filter blur-xl opacity-60 animate-pulse"></div>
    <div className="absolute top-2 right-1/4 w-10 h-10 bg-yellow-400 rounded-full filter blur-xl opacity-60 animate-pulse delay-700"></div>
    <div className="absolute -bottom-2 left-1/2 w-12 h-12 bg-blue-400 rounded-full filter blur-xl opacity-60 animate-pulse delay-300"></div>
  </div>
);

const ChristmasVisual: React.FC = () => (
  <div className="flex justify-center space-x-6 mt-2">
    {[0, 1, 2].map((i) => (
      <Snowflake 
        key={i} 
        size={20} 
        className="text-blue-200 animate-fall opacity-70" 
        style={{ animationDuration: `${3 + i}s`, animationDelay: `${i * 1.5}s` }} 
      />
    ))}
  </div>
);

const EidVisual: React.FC = () => (
  <div className="flex justify-center items-center mt-2 relative">
    <Moon className="text-emerald-400 fill-emerald-400/20 w-8 h-8 animate-float" />
    <div className="absolute top-0 right-1/2 translate-x-4">
      <Sparkles className="text-yellow-400 w-4 h-4 animate-pulse" />
    </div>
  </div>
);

const OnamVisual: React.FC = () => (
  <div className="flex justify-center items-center mt-2 space-x-2">
    <Flower2 className="text-yellow-500 animate-spin-slow w-6 h-6" style={{ animationDuration: '10s' }} />
    <Flower2 className="text-orange-500 animate-spin-slow w-8 h-8" style={{ animationDuration: '8s' }} />
    <Flower2 className="text-red-500 animate-spin-slow w-6 h-6" style={{ animationDuration: '10s' }} />
  </div>
);

const currentYear = new Date().getFullYear();

const ThemeConfig: Record<ThemeType, SeasonalTheme> = {
  default: {
    type: 'default',
    name: 'Default',
    greeting: 'Welcome to my portfolio',
    icon: Sparkles,
    colors: { accent: 'text-ocean', glow: 'shadow-ocean/20', gradient: 'from-ocean to-emerald' },
    VisualComponent: DefaultVisual
  },
  newYear: {
    type: 'newYear',
    name: 'New Year',
    greeting: `Happy New Year ${currentYear}!`,
    icon: PartyPopper,
    colors: { accent: 'text-purple-500', glow: 'shadow-purple-500/20', gradient: 'from-purple-500 to-pink-500' },
    VisualComponent: () => <Sparkles className="text-yellow-400 w-8 h-8 animate-spin-slow" />
  },
  republicDay: {
    type: 'republicDay',
    name: 'Republic Day',
    greeting: 'Celebrating The Spirit of India',
    icon: Sun,
    colors: { accent: 'text-orange-500', glow: 'shadow-orange-500/20', gradient: 'from-orange-500 via-white to-green-500' },
    VisualComponent: DefaultVisual
  },
  holi: {
    type: 'holi',
    name: 'Holi',
    greeting: 'Wishing You a Colorful Holi',
    icon: Sun,
    colors: { accent: 'text-pink-500', glow: 'shadow-pink-500/20', gradient: 'from-pink-500 via-yellow-500 to-blue-500' },
    VisualComponent: HoliVisual
  },
  eid: {
    type: 'eid',
    name: 'Eid',
    greeting: 'Eid Mubarak',
    icon: Moon,
    colors: { accent: 'text-emerald-500', glow: 'shadow-emerald-500/20', gradient: 'from-emerald-600 to-yellow-400' },
    VisualComponent: EidVisual
  },
  onam: {
    type: 'onam',
    name: 'Onam',
    greeting: 'Happy Onam',
    icon: Flower2,
    colors: { accent: 'text-yellow-600', glow: 'shadow-yellow-600/20', gradient: 'from-yellow-500 to-orange-500' },
    VisualComponent: OnamVisual
  },
  diwali: {
    type: 'diwali',
    name: 'Diwali',
    greeting: 'Wishing You a Radiant Diwali',
    icon: Flame,
    colors: { accent: 'text-orange-500', glow: 'shadow-orange-500/30', gradient: 'from-orange-500 to-yellow-500' },
    VisualComponent: DiwaliVisual
  },
  christmas: {
    type: 'christmas',
    name: 'Christmas',
    greeting: 'Merry Christmas & Happy Holidays',
    icon: Snowflake,
    colors: { accent: 'text-red-500', glow: 'shadow-red-500/20', gradient: 'from-red-600 to-green-600' },
    VisualComponent: ChristmasVisual
  },
  independenceDay: {
    type: 'independenceDay',
    name: 'Independence Day',
    greeting: 'Jai Hind',
    icon: Calendar,
    colors: { accent: 'text-blue-600', glow: 'shadow-blue-600/20', gradient: 'from-orange-500 via-white to-green-500' },
    VisualComponent: DefaultVisual
  }
};

const getSeasonalTheme = (): SeasonalTheme => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const date = now.getDate();

  // --- Fixed Dates ---
  // New Year (Jan 1-7)
  if (month === 0 && date <= 7) return ThemeConfig.newYear;
  // Republic Day (Jan 26)
  if (month === 0 && date === 26) return ThemeConfig.republicDay;
  // Independence Day (Aug 15)
  if (month === 7 && date === 15) return ThemeConfig.independenceDay;
  // Christmas (Dec 20-31)
  if (month === 11 && date >= 20) return ThemeConfig.christmas;

  // --- Variable Dates (Accurate for 2025-2026) ---
  
  // Holi (2025: March 14 | 2026: March 4)
  if ((year === 2025 && month === 2 && date >= 12 && date <= 16) || 
      (year === 2026 && month === 2 && date >= 2 && date <= 6)) {
    return ThemeConfig.holi;
  }

  // Eid al-Fitr (2025: Mar 30-31 | 2026: Mar 20) 
  // Eid al-Adha (2025: June 6-7 | 2026: May 27)
  if ((year === 2025 && ((month === 2 && date >= 29) || (month === 3 && date <= 2))) ||
      (year === 2025 && month === 5 && date >= 5 && date <= 8) ||
      (year === 2026 && month === 2 && date >= 18 && date <= 22) ||
      (year === 2026 && month === 4 && date >= 25 && date <= 29)) {
    return ThemeConfig.eid;
  }

  // Onam (2025: Sept 5 | 2026: Aug 26)
  if ((year === 2025 && month === 8 && date <= 7) ||
      (year === 2026 && month === 7 && date >= 24 && date <= 28)) {
    return ThemeConfig.onam;
  }

  // Diwali (2025: Oct 20 | 2026: Nov 8)
  if ((year === 2025 && month === 9 && date >= 18 && date <= 22) ||
      (year === 2026 && month === 10 && date >= 6 && date <= 10)) {
    return ThemeConfig.diwali;
  }

  return ThemeConfig.default;
};

export const useSeasonalTheme = () => {
  const [theme, setTheme] = React.useState<SeasonalTheme>(ThemeConfig.default);

  React.useEffect(() => {
    setTheme(getSeasonalTheme());
  }, []);

  return theme;
};