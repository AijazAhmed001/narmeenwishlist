import React from 'react';
import { BrandCard } from './BrandCard';
import { EmptyState } from '../ui/EmptyState';

export function BrandGrid({ brands = [] }) {
  if (!brands || brands.length === 0) {
    return <EmptyState title="No maisons found" subtitle="Try searching for another luxury brand or Pakistani fashion house." />;
  }

  return (
    <div className="brand-grid">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
