import React, { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useRoute, navigate } from './router';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import WhyUsPage from './pages/WhyUsPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import SEO from './components/SEO';

const PAGES = {
  '/': { key: 'home' },
  '/services': { key: 'services' },
  '/packages': { key: 'packages' },
  '/why-us': { key: 'why-us' },
  '/process': { key: 'process' },
  '/contact': { key: 'contact' }
};

export default function App() {
  const path = useRoute();
  const route = PAGES[path] ? path : '/';
  const page = PAGES[route];
  const [selectedService, setSelectedService] = useState('Web Development');

  const goContact = (service) => {
    if (service) setSelectedService(service);
    navigate('/contact');
  };

  let content;
  switch (page.key) {
    case 'services':
      content = <ServicesPage onSelectService={goContact} />;
      break;
    case 'packages':
      content = <PackagesPage onSelectPackage={goContact} />;
      break;
    case 'why-us':
      content = <WhyUsPage />;
      break;
    case 'process':
      content = <ProcessPage />;
      break;
    case 'contact':
      content = <ContactPage preselectedData={selectedService} />;
      break;
    default:
      content = <Home onStartClick={() => goContact()} />;
  }

  return (
    <div className="studio-app" data-page={page.key}>
      <SEO path={route} />
      <IntroAnimation />
      <Navbar route={route} onCtaClick={() => goContact()} />
      <main key={page.key}>{content}</main>
      <Footer showCta={page.key !== 'contact'} />
    </div>
  );
}
