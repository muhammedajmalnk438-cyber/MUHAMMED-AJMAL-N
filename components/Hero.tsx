import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useSeasonalTheme } from '../utils/seasonalTheme';

const Hero: React.FC = () => {
  const theme = useSeasonalTheme();
  
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-ocean/10 dark:bg-ocean/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald/10 dark:bg-emerald/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Seasonal Welcome Badge & Visual */}
        <div className="flex flex-col items-center mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
           <div className={`inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-charcoal/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-700`}>
             <span className={`font-medium text-sm flex items-center gap-2 ${theme.type === 'default' ? 'text-coral' : theme.colors.accent}`}>
               {theme.type !== 'default' && <theme.icon size={14} />}
               {theme.greeting}
             </span>
           </div>
           
           {/* Dynamic Visual Element (e.g., Lanterns, Snowflakes) */}
           <div className="mt-2 h-8 w-full flex justify-center items-center overflow-visible">
             <theme.VisualComponent />
           </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-futuristic font-bold text-ocean dark:text-white mb-6 leading-tight animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
          Education Beyond <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean to-emerald dark:from-emerald dark:to-teal-400">
            Textbooks
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 font-sans font-light animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
          English Teacher | Youth Facilitator | Mental Health Advocate
        </p>

        <div className="mt-10 flex justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
          <a 
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            className="group px-8 py-3 text-white rounded-full font-medium transition-all hover:shadow-lg hover:scale-105 flex items-center cursor-pointer bg-ocean hover:bg-[#062b45] dark:bg-emerald dark:hover:bg-emerald/90"
          >
            Explore My Journey
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="px-8 py-3 bg-transparent border border-ocean dark:border-emerald text-ocean dark:text-emerald rounded-full font-medium transition-all hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-ocean dark:text-emerald"
        onClick={(e) => handleScrollTo(e, 'about')}
      >
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;