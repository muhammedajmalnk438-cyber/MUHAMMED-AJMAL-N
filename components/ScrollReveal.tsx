import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'scale-up';
  delay?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '', animation = 'slide-up', delay = '0s' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    switch(animation) {
      case 'fade-in': return 'animate-fade-in';
      case 'slide-up': return 'animate-slide-up';
      case 'scale-up': return 'animate-fade-in scale-95 transition-transform duration-700 ease-out ' + (isVisible ? 'scale-100' : '');
      default: return 'animate-slide-up';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${isVisible ? getAnimationClass() : 'opacity-0'}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};