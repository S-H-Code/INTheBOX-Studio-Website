import React, { useEffect, useState } from 'react';

/**
 * Tiny History-API router (no dependency).
 * Works with the existing Vercel / Cloudflare SPA fallbacks, which already
 * serve index.html for every path.
 */
const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/';

export function useRoute() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener('popstate', sync);
    window.addEventListener('itb:navigate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('itb:navigate', sync);
    };
  }, []);
  return path;
}

export function navigate(to) {
  if (to !== currentPath()) {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('itb:navigate'));
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

export function Link({ to, onClick, children, ...rest }) {
  const handle = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
