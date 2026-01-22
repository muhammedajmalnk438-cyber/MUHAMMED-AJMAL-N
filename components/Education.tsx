import React from 'react';
import { ACADEMIC_DATA, EXPERIENCE_DATA } from '../constants';
import { TimelineItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { GraduationCap, Briefcase, Zap } from 'lucide-react';

const TimelineSection: React.FC<{ data: TimelineItem[], title: string, icon: React.ReactNode }> = ({ data, title, icon }) => (
  <div className="mb-20 last:mb-0">
    <ScrollReveal>
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
           {icon}
           <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal dark:text-cream">
             {title}
           </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-ocean to-emerald mx-auto rounded-full"></div>
      </div>
    </ScrollReveal>

    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform md:-translate-x-1/2"></div>

      <div className="space-y-12">
        {data.map((item, index) => (
          <ScrollReveal key={item.id} delay={`${index * 0.2}s`} className="relative flex flex-col md:flex-row items-center md:justify-between">
            
            {/* Left Content (or Right on alternating) */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:order-1 text-left md:text-right md:pr-8' : 'md:order-3 text-left md:pl-8'}`}>
               <div className="pl-12 md:pl-0">
                 <span className="inline-block px-3 py-1 rounded-full bg-ocean/10 dark:bg-emerald/10 text-ocean dark:text-emerald text-sm font-semibold mb-2">
                   {item.year}
                 </span>
                 <h3 className="text-xl font-bold text-charcoal dark:text-white mb-1">{item.title}</h3>
                 <p className="text-ocean dark:text-emerald font-medium mb-2">{item.institution}</p>
                 {item.description && (
                   <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                 )}
               </div>
            </div>

            {/* Center Icon */}
            <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-charcoal border-4 border-ocean dark:border-emerald z-10 transform md:-translate-x-1/2 flex items-center justify-center shadow-lg">
              {item.iconType === 'work' ? (
                <Briefcase size={12} className="text-ocean dark:text-emerald" />
              ) : (
                <GraduationCap size={12} className="text-ocean dark:text-emerald" />
              )}
            </div>

            {/* Empty Space for alignment */}
            <div className="w-full md:w-5/12 md:order-2"></div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
);

const Education: React.FC = () => {
  return (
    <section className="py-20 bg-cream dark:bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Academic Journey */}
        <TimelineSection 
          data={ACADEMIC_DATA} 
          title="Academic Journey" 
          icon={<GraduationCap className="w-8 h-8 text-ocean dark:text-emerald" />}
        />

        {/* Section 2: Experiential & Work */}
        <TimelineSection 
          data={EXPERIENCE_DATA} 
          title="Experiential & Work" 
          icon={<Zap className="w-8 h-8 text-coral" />}
        />

      </div>
    </section>
  );
};

export default Education;