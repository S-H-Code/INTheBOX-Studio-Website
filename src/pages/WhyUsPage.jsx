import React from 'react';
import PageHead from '../components/PageHead';
import StudioStandards from '../components/StudioStandards';

export default function WhyUsPage() {
  return (
    <>
      <PageHead
        title="Why founders build with INTheBOX Studio."
        lede="Editorial design and serious engineering discipline, applied to every project we ship."
      />
      <StudioStandards />
    </>
  );
}
