import { useEffect } from 'react';

const SITE_URL = 'https://intheboxstudio.in';
const BRAND = 'INTheBOX Studio';

export const SEO_PAGES = {
  '/': {
    title: 'INTheBOX Studio | Website Development, SEO & Digital Services',
    description: 'INTheBOX Studio builds fast, custom websites and landing pages, with branding, SEO, software development and business automation for growing businesses in India.'
  },
  '/services': {
    title: 'Our Services | Website Development, Branding & SEO | INTheBOX Studio',
    description: 'Explore INTheBOX Studio services: business websites, landing pages, web applications, logo and branding, SEO, advertising, software and ongoing website support.'
  },
  '/packages': {
    title: 'Website Packages & Digital Service Plans | INTheBOX Studio',
    description: 'Explore INTheBOX Studio website and digital service packages. Find a practical starting point for your business website, online presence and growth.'
  },
  '/why-us': {
    title: 'Why Choose INTheBOX Studio | Thoughtful Digital Solutions',
    description: 'Learn how INTheBOX Studio combines thoughtful design, clean development, clear communication and performance-focused digital solutions for businesses.'
  },
  '/process': {
    title: 'Our Website Design & Development Process | INTheBOX Studio',
    description: 'See how INTheBOX Studio takes a project from discovery and design through development, launch and ongoing support with a clear, collaborative process.'
  },
  '/contact': {
    title: 'Contact INTheBOX Studio | Start a Website Project',
    description: 'Contact INTheBOX Studio to discuss a business website, landing page, branding, SEO, software development or automation project.'
  }
};

function setMeta(name, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SEO({ path }) {
  useEffect(() => {
    const page = SEO_PAGES[path] || SEO_PAGES['/'];
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
    document.title = page.title;
    setMeta('description', page.description);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', BRAND, 'property');
    setMeta('og:title', page.title, 'property');
    setMeta('og:description', page.description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:image', `${SITE_URL}/logo.png`, 'property');
    setMeta('twitter:card', 'summary', 'name');
    setMeta('twitter:title', page.title);
    setMeta('twitter:description', page.description);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: BRAND,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        email: 'teams@intheboxstudio.in'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: BRAND,
        url: `${SITE_URL}/`,
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title.split('|')[0].trim(), item: canonical }])
        ]
      }
    ];
    let schema = document.getElementById('itb-structured-data');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'itb-structured-data';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);
  }, [path]);

  return null;
}
