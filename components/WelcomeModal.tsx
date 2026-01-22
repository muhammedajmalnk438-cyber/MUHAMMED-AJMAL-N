import React, { useState, useEffect } from 'react';
import { X, Sparkles, BookOpen, Heart } from 'lucide-react';
import { PROFILE } from '../constants';

const WELCOME_QUOTES = [
  "Education is not just about textbooks; it is about igniting curiosity.",
  "True empowerment comes from understanding oneself and serving others.",
  "Together, let us build a future grounded in empathy and resilience."
];

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Set a random quote
    setQuote(WELCOME_QUOTES[Math.floor(Math.random() * WELCOME_QUOTES.length)]);

    // Check localStorage and URL params
    const hasSeenModal = localStorage.getItem('welcomeModalShown');
    const urlParams = new URLSearchParams(window.location.search);
    const forceShow = urlParams.get('showWelcome') === 'true';

    // Show if not seen or forced
    if (!hasSeenModal || forceShow) {
      // Small delay to allow initial render before showing
      const timer = setTimeout(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    document.body.style.overflow = 'auto';
    localStorage.setItem('welcomeModalShown', 'true');

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleExplore = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop ${isClosing ? 'closing' : 'active'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-[600px] bg-white/90 dark:bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/20 dark:border-white/5 modal-content ${isClosing ? 'closing' : 'active'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-ocean dark:hover:text-emerald hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Unique Icon Composition */}
        <div className="flex justify-center mb-8 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-ocean to-emerald opacity-20 blur-xl rounded-full"></div>
            <div className="relative p-5 bg-gradient-to-br from-white to-gray-50 dark:from-charcoal dark:to-gray-900 rounded-2xl shadow-lg border border-white/50 dark:border-white/10 modal-icon transform rotate-3">
              <Sparkles size={40} className="text-ocean dark:text-emerald" />
            </div>
            {/* Floating sub-icons */}
            <div className="absolute -right-3 -top-3 p-2 bg-white dark:bg-charcoal rounded-full shadow-md animate-bounce delay-100">
              <BookOpen size={16} className="text-coral" />
            </div>
            <div className="absolute -left-3 -bottom-3 p-2 bg-white dark:bg-charcoal rounded-full shadow-md animate-bounce delay-300">
              <Heart size={16} className="text-pink-500" />
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal dark:text-cream mb-2 modal-heading font-display tracking-tight">
          Welcome to My Journey
        </h2>

        {/* Name */}
        <p className="text-lg font-medium text-ocean dark:text-emerald mb-8 modal-subheading font-futuristic tracking-wide uppercase text-sm">
          {PROFILE.name}
        </p>

        {/* Single Meaningful Sentence */}
        <div className="mb-10 max-w-lg mx-auto">
          <p className="text-xl font-serif text-gray-600 dark:text-gray-300 leading-relaxed modal-sentence italic">
            "{quote}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 modal-buttons">
          <button 
            onClick={handleExplore}
            className="group relative px-8 py-3.5 bg-ocean dark:bg-emerald text-white font-semibold rounded-full shadow-lg shadow-ocean/20 dark:shadow-emerald/20 hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
          <button 
            onClick={handleClose}
            className="px-6 py-3 text-gray-500 hover:text-ocean dark:text-gray-400 dark:hover:text-emerald font-medium transition-colors w-full sm:w-auto"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;