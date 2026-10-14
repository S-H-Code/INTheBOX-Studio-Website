import React from 'react';
import PageHead from '../components/PageHead';
import Methodology from '../components/Methodology';

export default function ProcessPage() {
  return (
    <>
      <PageHead
        title="From first call to launch in four steps."
        lede="How we turn an ambitious idea into a finished product in weeks, not months."
      />
      <Methodology />
    </>
  );
}
