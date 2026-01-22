import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useSeasonalTheme } from '../utils/seasonalTheme';
import ShareButton from './ShareButton';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const theme = useSeasonalTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark if no preference is saved, or if explicit 'dark'
    const shouldBeDark = !savedTheme || savedTheme === 'dark';
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Height of the navbar + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, '', href);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-cream/90 dark:bg-charcoal/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-2 group">
             <a 
               href="#hero" 
               onClick={(e) => handleLinkClick(e, '#hero')} 
               className="font-futuristic font-bold text-xl md:text-2xl cursor-pointer transition-colors duration-500 flex items-center gap-2 text-ocean dark:text-emerald"
             >
               Muhammed Ajmal N
             </a>
             {theme.type !== 'default' && (
                <div className={`transition-opacity duration-300 transform translate-y-0.5 ${theme.colors.accent}`}>
                   <theme.icon size={20} className="animate-pulse" />
                </div>
             )}
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-charcoal dark:text-cream hover:text-ocean dark:hover:text-emerald px-3 py-2 rounded-md text-sm font-medium transition-colors font-sans cursor-pointer relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-ocean dark:bg-emerald"></span>
              </a>
            ))}
            <div className="pl-4 border-l border-gray-300 dark:border-gray-700 flex items-center gap-2">
               <button
                 onClick={toggleTheme}
                 className="p-2 rounded-md text-charcoal dark:text-cream hover:bg-gray-100 dark:hover:bg-white/10 hover:text-ocean dark:hover:text-emerald transition-colors"
                 aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
               >
                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               <ShareButton />
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
               onClick={toggleTheme}
               className="p-2 rounded-md text-charcoal dark:text-cream hover:bg-gray-100 dark:hover:bg-white/10"
             >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <ShareButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-charcoal dark:text-cream hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-panel absolute w-full animate-fade-in shadow-xl border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-charcoal dark:text-cream hover:text-ocean dark:hover:text-emerald block px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;