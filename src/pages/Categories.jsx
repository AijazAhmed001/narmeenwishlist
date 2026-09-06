import React from 'react';
import { categories } from '../data/categories';
import { CategoryGrid } from '../components/category/CategoryGrid';

export function Categories() {
  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="editorial-tag">The Curated Archive</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
            Shopping Categories
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--color-muted-text)' }}>
            Discover craftsmanship across prêt-à-porter, organza sarees, investment leathergoods, fine jewelry, and sensory perfumery.
          </p>
        </div>

        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}


