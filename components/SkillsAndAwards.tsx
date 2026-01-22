import React from 'react';
import { AWARDS_DATA, SKILLS_DATA, LANGUAGES, CORE_STRENGTHS } from '../constants';
import { ScrollReveal } from './ScrollReveal';
import { Award, Trophy, Hexagon } from 'lucide-react';

const SkillsAndAwards: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-cream dark:bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Awards */}
        <div className="mb-24">
          <ScrollReveal>
            <div className="flex items-center mb-10">
              <Trophy className="text-coral w-8 h-8 mr-4" />
              <h2 className="text-3xl font-display font-bold text-charcoal dark:text-cream">Awards & Recognition</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARDS_DATA.map((award, idx) => (
              <ScrollReveal key={award.id} delay={`${idx * 0.1}s`} animation="slide-up">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-ocean dark:border-emerald shadow-sm hover:shadow-lg transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-5xl font-futuristic text-gray-100 dark:text-gray-700 absolute -mt-4 -ml-4 -z-0 group-hover:text-ocean/10 transition-colors">
                        {award.year}
                      </span>
                      <h3 className="text-lg font-bold text-charcoal dark:text-white relative z-10">{award.title}</h3>
                      <p className="text-ocean dark:text-emerald text-sm font-medium mt-1 relative z-10">{award.event}</p>
                    </div>
                    <Award className="text-gray-300 dark:text-gray-600 group-hover:text-coral transition-colors" size={24} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Skills Matrix */}
          <div>
            <ScrollReveal>
              <h3 className="text-2xl font-display font-bold text-charcoal dark:text-cream mb-8">Expertise Matrix</h3>
            </ScrollReveal>
            <div className="space-y-6">
              {SKILLS_DATA.map((skill, idx) => (
                <ScrollReveal key={idx} delay={`${idx * 0.05}s`} animation="slide-up">
                  <div className="group cursor-default">
                    <div className="flex justify-between mb-1">
                      <div>
                        <span className="font-medium text-charcoal dark:text-gray-200 group-hover:text-ocean dark:group-hover:text-emerald transition-colors duration-300">{skill.name}</span>
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{skill.category}</span>
                      </div>
                      <span className="text-sm text-gray-500 group-hover:text-ocean dark:group-hover:text-emerald transition-colors duration-300">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-all duration-300 ease-out group-hover:h-3">
                      <div 
                        className="h-full bg-gradient-to-r from-ocean to-emerald rounded-full group-hover:shadow-[0_0_15px_rgba(16,168,120,0.8)] group-hover:brightness-110 relative"
                        style={{ 
                          width: `${skill.level}%`, 
                          transition: 'width 1.5s ease-out, box-shadow 0.3s ease, filter 0.3s ease' 
                        }}
                      >
                         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Languages */}
            <ScrollReveal className="mt-12">
               <h4 className="text-lg font-bold mb-4 text-charcoal dark:text-cream">Languages</h4>
               <div className="flex flex-wrap gap-3">
                 {LANGUAGES.map((lang) => (
                   <div key={lang.name} className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-ocean/30 dark:hover:border-emerald/30 transition-colors">
                     <div className={`w-3 h-3 rounded-full mr-2 ${lang.color === 'green' ? 'bg-emerald' : 'bg-yellow-400'}`}></div>
                     <span className="text-sm font-medium text-charcoal dark:text-gray-200">{lang.name}</span>
                     <span className="ml-2 text-xs text-gray-500">({lang.level})</span>
                   </div>
                 ))}
               </div>
            </ScrollReveal>
          </div>

          {/* Core Strengths */}
          <div>
             <ScrollReveal>
              <h3 className="text-2xl font-display font-bold text-charcoal dark:text-cream mb-8">Core Strengths</h3>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              {CORE_STRENGTHS.map((strength, idx) => (
                <ScrollReveal key={idx} delay={`${0.2 + idx * 0.1}s`} animation="scale-up">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all text-center group border border-transparent hover:border-ocean/20 dark:hover:border-emerald/20">
                    <div className="w-12 h-12 mx-auto bg-cream dark:bg-charcoal rounded-full flex items-center justify-center mb-3 group-hover:bg-ocean group-hover:text-white transition-colors">
                      <strength.icon size={20} className="text-ocean dark:text-emerald group-hover:text-white" />
                    </div>
                    <h4 className="font-bold text-charcoal dark:text-white">{strength.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{strength.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsAndAwards;