import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../ui/EmptyState';
import { SkeletonCard } from '../ui/Loader';

export function ProductGrid({
  products = [],
  loading = false,
  onQuickView,
  columns = 4,
  emptyTitle = 'No pieces match your selection.',
  emptySubtitle = 'Try clearing filters or exploring other curated edits.'
}) {
  if (loading) {
    return (
      <div className={`product-grid ${columns === 5 ? 'product-grid-5' : ''}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} subtitle={emptySubtitle} />;
  }

  return (
    <div className={`product-grid ${columns === 5 ? 'product-grid-5' : ''}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
