import React from 'react';
import PageHead from '../components/PageHead';
import ContactSection from '../components/ContactSection';

export default function ContactPage({ preselectedData }) {
  return (
    <>
      <PageHead
        title="Tell us what you want to build."
        lede="Share your goals and timeline. We reply within 24 hours with a clear breakdown and a fixed quote."
      />
      <ContactSection preselectedData={preselectedData} />
    </>
  );
}
