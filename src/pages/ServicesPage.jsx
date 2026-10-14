import React from 'react';
import { ArrowRight } from 'lucide-react';
import PageHead from '../components/PageHead';
import ServiceGrid from '../components/ServiceGrid';
import { Link } from '../router';

export default function ServicesPage({ onSelectService }) {
  return (
    <>
      <PageHead
        title="Everything your business needs online."
        lede="Web, brand, search, advertising, software and support from one studio. Pick a service, or start with a package."
      />
      <ServiceGrid onSelectService={onSelectService} />
      <div className="wrap services-strip-wrap">
        <div className="services-strip">
          <p>Not sure where to start? Our packages bundle the essentials at a fixed price.</p>
          <Link to="/packages" className="text-link">
            <span>See packages</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
