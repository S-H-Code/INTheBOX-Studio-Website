import React from 'react';
import PageHead from '../components/PageHead';
import PackageGrid from '../components/PackageGrid';

export default function PackagesPage({ onSelectPackage }) {
  return (
    <>
      <PageHead
        title="Simple packages. Priced in the open."
        lede="Three boxes, from your first website to ongoing growth. Pick the one that fits where your business is today."
      />
      <PackageGrid onSelectPackage={onSelectPackage} />
    </>
  );
}
