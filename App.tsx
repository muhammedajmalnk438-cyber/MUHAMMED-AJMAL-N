import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import SkillsAndAwards from './components/SkillsAndAwards';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';
import ScrollToTop from './components/ScrollToTop';
import WelcomeModal from './components/WelcomeModal';

function App() {
  // Theme logic is now handled in NavBar to allow toggling

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal text-charcoal dark:text-cream transition-colors duration-300 font-sans selection:bg-ocean selection:text-white dark:selection:bg-emerald">
      <WelcomeModal />
      <NavBar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <SkillsAndAwards />
      <Portfolio />
      <Contact />
      <ChatAssistant />
      <ScrollToTop />
    </div>
  );
}

export default App;