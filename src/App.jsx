import React, { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import StudioStandards from './components/StudioStandards';
import Methodology from './components/Methodology';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [selectedPlanData, setSelectedPlanData] = useState('Full Business Website');

  const scrollToContact = (customData) => {
    if (customData) {
      setSelectedPlanData(customData);
    }
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <IntroAnimation />
      <div className="studio-app">
        <Navbar onCtaClick={() => scrollToContact()} />
        <main>
          <Hero onStartClick={() => scrollToContact()} />
          <ServiceGrid onSelectService={(serviceTitle) => scrollToContact(serviceTitle)} />
          <StudioStandards onCtaClick={() => scrollToContact()} />
          <Methodology onStartClick={() => scrollToContact()} />
          <ContactSection preselectedData={selectedPlanData} />
        </main>
        <Footer />
      </div>
    </>
  );
}
