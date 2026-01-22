import React, { useState, useRef, useEffect } from 'react';
import { SOCIAL_CAUSES, PROFILE } from '../constants';
import { ScrollReveal } from './ScrollReveal';
import { Mail, Linkedin, Instagram, MapPin, Send, CheckCircle, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

// Confetti Component
const Confetti: React.FC = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  if (reduceMotion) return null;

  const colors = ['#0A3D62', '#E8704A', '#10A878', '#F59E0B'];
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    duration: Math.random() * 2 + 2, // 2-4 seconds
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-fall"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  
  // Refs for focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Manage focus when state changes
  useEffect(() => {
    if (formStatus === 'success') {
      // Focus the success message heading so screen readers read it immediately
      const timer = setTimeout(() => {
        successHeadingRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const validateForm = (formData: FormData) => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email || !email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!message || !message.trim()) {
      newErrors.message = "Message is required.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first field with an error
      if (validationErrors.name) nameInputRef.current?.focus();
      else if (validationErrors.email) emailInputRef.current?.focus();
      else if (validationErrors.message) messageInputRef.current?.focus();
      return;
    }

    setErrors({});
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const resetForm = () => {
    setFormStatus('idle');
    setErrors({});
    // Move focus back to the first input for seamless keyboard navigation
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  };

  // Helper to get input styles based on error state
  const getInputStyles = (hasError: boolean) => 
    `w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all dark:text-white ${
      hasError 
        ? 'bg-red-50 dark:bg-red-900/10 border-red-500 focus:ring-red-200 dark:focus:ring-red-900' 
        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-ocean dark:focus:ring-emerald'
    }`;

  return (
    <>
      <section id="contact" className="py-20 bg-ocean/5 dark:bg-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Social Causes */}
          <div className="mb-20">
             <ScrollReveal>
              <div className="text-center mb-10">
                <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-2">Advocating For</h3>
              </div>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {SOCIAL_CAUSES.map((cause, idx) => (
                <ScrollReveal key={idx} delay={`${idx * 0.1}s`} animation="scale-up">
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300" aria-hidden="true">{cause.icon}</div>
                    <span className="text-sm font-medium text-charcoal dark:text-gray-300 group-hover:text-ocean dark:group-hover:text-emerald transition-colors">
                      {cause.name}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
            {/* Contact Info */}
            <div className="w-full md:w-5/12 bg-ocean dark:bg-gray-900 p-10 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">Let's Connect</h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Whether you want to discuss education, collaboration opportunities, or mental health advocacy, I'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <a href={`mailto:${PROFILE.email}`} className="flex items-center text-blue-100 hover:text-white transition-colors" aria-label={`Email ${PROFILE.email}`}>
                    <Mail className="mr-4" size={20} aria-hidden="true" />
                    {PROFILE.email}
                  </a>
                  <a href={PROFILE.linkedin} className="flex items-center text-blue-100 hover:text-white transition-colors" aria-label="Visit LinkedIn Profile">
                    <Linkedin className="mr-4" size={20} aria-hidden="true" />
                    LinkedIn Profile
                  </a>
                  <a href={PROFILE.instagram} className="flex items-center text-blue-100 hover:text-white transition-colors" aria-label="Visit Instagram Profile">
                    <Instagram className="mr-4" size={20} aria-hidden="true" />
                    @wordsbyajmal
                  </a>
                  <div className="flex items-center text-blue-100">
                    <MapPin className="mr-4" size={20} aria-hidden="true" />
                    {PROFILE.location}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 md:mt-0 pt-8 border-t border-white/10">
                 <p className="text-sm text-blue-200">
                   "Education is the kindling of a flame, not the filling of a vessel."
                 </p>
              </div>
            </div>

            {/* Contact Form Container */}
            <div className="w-full md:w-7/12 bg-white dark:bg-gray-800 relative">
              
              {formStatus === 'success' ? (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-fade-in"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <Confetti />
                  <div className="w-24 h-24 bg-emerald/10 rounded-full flex items-center justify-center mb-6 animate-[pulse_2s_infinite]">
                    <CheckCircle className="w-12 h-12 text-emerald" aria-hidden="true" />
                  </div>
                  <h3 
                    ref={successHeadingRef}
                    tabIndex={-1}
                    className="text-3xl font-bold text-charcoal dark:text-white mb-2 outline-none"
                  >
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm">
                    Thank you for reaching out. I appreciate your message and will get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={resetForm}
                    className="flex items-center px-6 py-3 bg-ocean dark:bg-gray-700 text-white rounded-lg hover:bg-opacity-90 transition-all font-medium z-30 relative focus:ring-2 focus:ring-offset-2 focus:ring-ocean dark:focus:ring-emerald outline-none"
                    aria-label="Send another message"
                  >
                    <ArrowLeft size={18} className="mr-2" aria-hidden="true" /> Send Another Message
                  </button>
                </div>
              ) : (
                <div className={`p-10 transition-opacity duration-300 ${formStatus === 'submitting' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                  <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-2">
                          Name <span className="text-coral">*</span>
                        </label>
                        <input 
                          id="name"
                          ref={nameInputRef}
                          type="text" 
                          name="name"
                          autoComplete="name"
                          aria-label="Name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={getInputStyles(!!errors.name)}
                          placeholder="Your Name" 
                        />
                        {errors.name && (
                          <div id="name-error" role="alert" className="flex items-center mt-1 text-xs text-red-500 font-medium">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-2">
                          Email <span className="text-coral">*</span>
                        </label>
                        <input 
                          id="email"
                          ref={emailInputRef}
                          type="email" 
                          name="email"
                          autoComplete="email"
                          aria-label="Email Address"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={getInputStyles(!!errors.email)}
                          placeholder="john@example.com" 
                        />
                        {errors.email && (
                          <div id="email-error" role="alert" className="flex items-center mt-1 text-xs text-red-500 font-medium">
                            <AlertCircle size={12} className="mr-1" />
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-2">Subject</label>
                      <select 
                        id="subject"
                        name="subject"
                        aria-label="Subject"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-ocean dark:focus:ring-emerald focus:outline-none transition-all dark:text-white"
                      >
                        <option>General Inquiry</option>
                        <option>Collaboration</option>
                        <option>Speaking Opportunity</option>
                        <option>Mentorship</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-charcoal dark:text-gray-300 mb-2">
                        Message <span className="text-coral">*</span>
                      </label>
                      <textarea 
                        id="message"
                        ref={messageInputRef}
                        name="message"
                        rows={4} 
                        aria-label="Message"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={getInputStyles(!!errors.message)}
                        placeholder="Your message..."
                      ></textarea>
                      {errors.message && (
                        <div id="message-error" role="alert" className="flex items-center mt-1 text-xs text-red-500 font-medium">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.message}
                        </div>
                      )}
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      aria-label={formStatus === 'submitting' ? 'Sending message...' : 'Send Message'}
                      aria-busy={formStatus === 'submitting'}
                      className="w-full py-4 bg-ocean dark:bg-emerald text-white rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-[1.01] flex justify-center items-center shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-wait focus:ring-2 focus:ring-offset-2 focus:ring-ocean dark:focus:ring-emerald outline-none"
                    >
                      {formStatus === 'submitting' ? (
                        <>Sending <Loader2 size={18} className="ml-2 animate-spin" aria-hidden="true" /></>
                      ) : (
                        <>Send Message <Send size={18} className="ml-2" aria-hidden="true" /></>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
           <div className="mb-6 md:mb-0 text-center md:text-left">
             <span className="font-futuristic font-bold text-xl md:text-2xl">Muhammed Ajmal N</span>
             <p className="text-gray-400 text-sm mt-2">Nurturing Minds, Shaping Hearts</p>
           </div>
           
           <div className="flex space-x-6 mb-6 md:mb-0">
             <a href="#hero" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
             <a href="#about" className="text-gray-400 hover:text-white text-sm transition-colors">About</a>
             <a href="#experience" className="text-gray-400 hover:text-white text-sm transition-colors">Experience</a>
             <a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
           </div>

           <div className="text-gray-500 text-sm">
             &copy; {new Date().getFullYear()} Muhammed Ajmal N. All rights reserved.
           </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;