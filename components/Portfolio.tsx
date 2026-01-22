import React, { useState, useEffect } from 'react';
import { QUOTES_POOL, PROFILE } from '../constants';
import { QuoteItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { Instagram, Quote, Lightbulb, Brain, BookOpen, User } from 'lucide-react';

const categoryConfig = {
  'Self Development': { 
    color: 'text-blue-600 dark:text-blue-400', 
    bg: 'bg-blue-50 dark:bg-blue-900/10', 
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
  },
  'Motivation': { 
    color: 'text-amber-600 dark:text-amber-400', 
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
  },
  'Psychology': { 
    color: 'text-purple-600 dark:text-purple-400', 
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
  },
  'Education': { 
    color: 'text-emerald-600 dark:text-emerald-400', 
    bg: 'bg-emerald-50 dark:bg-emerald-900/10',
    badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
  },
};

const Portfolio: React.FC = () => {
  const [displayedQuotes, setDisplayedQuotes] = useState<QuoteItem[]>([]);

  useEffect(() => {
    // Logic to select one random quote from each category every time the component mounts (refresh)
    const categories: Array<QuoteItem['category']> = ['Self Development', 'Motivation', 'Psychology', 'Education'];
    
    const randomSelection = categories.map(cat => {
      const categoryQuotes = QUOTES_POOL.filter(q => q.category === cat);
      if (categoryQuotes.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
      return categoryQuotes[randomIndex];
    }).filter((item): item is QuoteItem => item !== null);

    setDisplayedQuotes(randomSelection);
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal dark:text-cream mb-2">
              Quotes of the Day
            </h2>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
              Daily Inspiration for Growth
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedQuotes.map((quote, idx) => {
            const config = categoryConfig[quote.category];
            return (
              <ScrollReveal key={`${quote.id}-${idx}`} delay={`${idx * 0.1}s`} animation="slide-up">
                <div className="h-full flex flex-col bg-white dark:bg-charcoal rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                  
                  {/* Subtle Background Decoration */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${config.bg} rounded-bl-full opacity-50 -mr-6 -mt-6 transition-transform group-hover:scale-110`}></div>
                  
                  {/* Category Badge */}
                  <div className="relative mb-3">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${config.badge}`}>
                      {quote.category}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="relative flex-1 mb-4">
                    <Quote size={16} className={`${config.color} opacity-30 absolute -top-1 -left-2 transform -scale-x-100`} />
                    <p className="font-serif text-base text-charcoal dark:text-gray-100 leading-relaxed italic pl-3 z-10 relative">
                      {quote.text}
                    </p>
                  </blockquote>

                  {/* Author & Meaning */}
                  <div className="relative mt-auto">
                     <div className="flex justify-end mb-3">
                        <cite className={`text-xs font-bold ${config.color} not-italic`}>
                          — {quote.author}
                        </cite>
                     </div>
                     
                     <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                          <span className="font-semibold text-gray-700 dark:text-gray-300 mr-1">Insight:</span>
                          {quote.meaning}
                        </p>
                     </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay="0.4s">
          <div className="mt-8 text-center">
            <a 
              href={PROFILE.instagram}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-ocean dark:hover:text-emerald transition-colors"
            >
              <Instagram size={14} className="mr-1.5" />
              <span>Follow @wordsbyajmal</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Portfolio;