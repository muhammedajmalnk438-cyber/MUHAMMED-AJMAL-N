import React from 'react';
import { PROFILE } from '../constants';
import { ScrollReveal } from './ScrollReveal';
import { Quote, Clock, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-charcoal/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Professional Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal animation="slide-up">
            <div className="relative max-w-md mx-auto lg:max-w-full">
              <div className="aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-gray-200 dark:bg-gray-700 group">
                {/* Profile Image */}
                 <div className="absolute inset-0 bg-ocean/20 dark:bg-ocean/40 group-hover:bg-transparent transition-all duration-500"></div>
                 <img 
                   src="https://drive.google.com/uc?export=view&id=1LTmtjD0TAJ2qoZBu8rF5KQMg1crZoHGf" 
                   alt={PROFILE.name}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coral/10 rounded-full blur-2xl z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-ocean/10 rounded-full blur-2xl z-0"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay="0.2s">
            <div>
              <div className="flex items-center space-x-2 mb-4 text-ocean dark:text-emerald font-futuristic">
                <span className="w-8 h-[2px] bg-current"></span>
                <span className="uppercase tracking-widest text-sm font-semibold">Who I Am</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal dark:text-cream mb-6">
                Nurturing Minds, <span className="text-ocean dark:text-emerald">Shaping Hearts</span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-sans">
                As a B.A. English graduate and aspiring educator, I believe that true education extends far beyond the classroom walls. 
                My journey is defined by a commitment to youth empowerment, social service, and mental health advocacy.
              </p>

              <div className="p-6 bg-cream dark:bg-gray-800 rounded-xl border-l-4 border-coral mb-8 relative group hover:shadow-lg transition-all">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-coral/20 group-hover:text-coral/40 transition-colors" />
                <p className="text-xl font-serif italic text-charcoal dark:text-gray-200 pl-6 relative z-10">
                  "{PROFILE.vision}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                  <div className="flex justify-center mb-2 text-ocean dark:text-emerald"><Clock size={24} /></div>
                  <div className="text-2xl font-bold text-charcoal dark:text-white mb-1">{PROFILE.stats.volunteerYears}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Years Service</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform">
                  <div className="flex justify-center mb-2 text-ocean dark:text-emerald"><Award size={24} /></div>
                  <div className="text-2xl font-bold text-charcoal dark:text-white mb-1">{PROFILE.stats.trainings}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Training Days</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;