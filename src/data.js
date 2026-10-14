/** Single source of truth for services and packages (used by Home, Services, Packages, Contact, Footer). */

export const SERVICES = [
  {
    id: 'web', no: '01', tone: 'blue',
    title: 'Web Development',
    summary: 'Business websites, landing pages, e-commerce, custom web applications and website redesigns.',
    items: ['Business websites', 'Landing pages', 'E-commerce', 'Custom web applications', 'Website redesigns']
  },
  {
    id: 'branding', no: '02', tone: 'orange',
    title: 'Branding & Graphic Design',
    summary: 'Logo design, brand identity, business stationery, brochures and company profiles.',
    items: ['Logo design', 'Brand identity', 'Business stationery', 'Brochures', 'Company profiles']
  },
  {
    id: 'seo', no: '03', tone: 'yellow',
    title: 'SEO & Online Visibility',
    summary: 'Local SEO, Google Business Profile, technical SEO, keyword research and search performance reporting.',
    items: ['Local SEO', 'Google Business Profile', 'Technical SEO', 'Keyword research', 'Search performance reporting']
  },
  {
    id: 'ads', no: '04', tone: 'pink',
    title: 'Digital Advertising & Lead Generation',
    summary: 'Google Ads, Meta Ads, YouTube campaigns, landing pages and lead tracking.',
    items: ['Google Ads', 'Meta Ads', 'YouTube campaigns', 'Landing pages', 'Lead tracking']
  },
  {
    id: 'software', no: '05', tone: 'lilac',
    title: 'Software & Automation',
    summary: 'Custom CRM systems, business dashboards, WhatsApp workflows, booking systems and integrations.',
    items: ['Custom CRM systems', 'Business dashboards', 'WhatsApp workflows', 'Booking systems', 'Integrations']
  },
  {
    id: 'support', no: '06', tone: 'green',
    title: 'Website Maintenance & Technical Support',
    summary: 'Hosting management, domain setup, business email, backups, security checks and performance optimization.',
    items: ['Hosting management', 'Domain setup', 'Business email', 'Backups', 'Security checks', 'Performance optimization']
  }
];

export const PACKAGES = [
  {
    id: 'launch', tone: 'blue', name: 'Launch Box', goal: 'Get online',
    price: '₹14,999', per: 'one-time',
    includes: ['Website up to 5 pages', 'Basic SEO', 'Branding', 'Enquiry integration']
  },
  {
    id: 'growth', tone: 'yellow', name: 'Growth Box', goal: 'Get found',
    price: '₹9,999', per: '/month',
    includes: ['SEO', 'Google Business Profile support', 'Website maintenance', 'Reporting']
  },
  {
    id: 'scale', tone: 'green', name: 'Scale Box', goal: 'Get leads',
    price: '₹24,999', per: '/month',
    includes: ['SEO', 'Advertising management', 'Conversion optimization', 'Lead tracking']
  }
];
