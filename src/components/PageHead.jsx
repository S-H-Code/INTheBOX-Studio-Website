import React from 'react';
import LogoMark from './LogoMark';

/** Coloured page header. The colour comes from the page theme (data-page on the app root). */
export default function PageHead({ title, lede }) {
  return (
    <header className="page-head">
      <LogoMark className="page-mark" />
      <div className="wrap">
        <h1 className="page-title">{title}</h1>
        <p className="page-lede">{lede}</p>
      </div>
    </header>
  );
}
