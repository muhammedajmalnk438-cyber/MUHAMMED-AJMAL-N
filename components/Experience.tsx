import React from 'react';
import { VOLUNTEER_DATA, MENTAL_HEALTH_CERTS } from '../constants';
import { ScrollReveal } from './ScrollReveal';
import { Leaf, Atom, Recycle, Rocket, Heart, CheckCircle, Mic } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf />,
  Atom: <Atom />,
  Recycle: <Recycle />,
  Rocket: <Rocket />,
  Mic: <Mic />,
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Volunteer Section */}
        <div className="mb-24">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal dark:text-cream mb-4">
                Volunteer Impact
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                Dedicated to community service and youth empowerment through active participation in various initiatives.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VOLUNTEER_DATA.map((role, idx) => (
              <ScrollReveal key={role.id} delay={`${idx * 0.1}s`} animation="scale-up">
                <div className="h-full bg-cream dark:bg-charcoal p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all hover:-translate-y-2 group flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean to-emerald flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[role.iconName] || <Leaf />}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal dark:text-white mb-1 line-clamp-1">{role.title}</h3>
                  <p className="text-sm text-ocean dark:text-emerald font-medium mb-3">{role.organization}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                     {role.tags.map(tag => (
                       <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 bg-white dark:bg-gray-800 inline-block px-2 py-1 rounded w-fit">
                    {role.period}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                    {role.description}
                  </p>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-bold text-coral flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      {role.impact}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mental Health Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ocean/90 to-ocean p-8 md:p-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
                  <Heart size={16} className="mr-2 text-pink-300" />
                  Mental Health Advocacy
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Empowering Emotional Well-being</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Certified in suicide prevention (SPOT, ZSA) and actively working to break the stigma surrounding mental health in educational spaces.
                </p>
                <a href="#contact" className="inline-block px-6 py-2 bg-white text-ocean font-semibold rounded-full hover:bg-emerald hover:text-white transition-colors">
                  Get in Touch
                </a>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {MENTAL_HEALTH_CERTS.map((cert, idx) => (
                <ScrollReveal key={idx} delay={`${0.2 + idx * 0.1}s`} animation="slide-up">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-emerald/80 text-white text-xs px-2 py-1 rounded">{cert.type}</span>
                      <CheckCircle className="text-emerald-300" size={20} />
                    </div>
                    <h4 className="text-lg font-bold mb-2">{cert.title}</h4>
                    <p className="text-sm text-blue-100 mb-3">{cert.org}</p>
                    <p className="text-sm text-white/80">{cert.desc}</p>
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

export default Experience;