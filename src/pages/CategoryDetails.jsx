import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function CategoryDetails() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug) || categories[0];
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categoryProducts = products.filter((p) => p.category_id === category?.id);

  if (!category) return null;

  return (
    <div>
      {/* Category Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          backgroundColor: 'var(--color-charcoal)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '3.5rem'
        }}
      >
        <img
          src={category.image_url}
          alt={category.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, position: 'absolute', inset: 0 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'var(--color-ivory)' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-champagne)', fontWeight: 600 }}>
            {categoryProducts.length} Curated Pieces
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-white)',
              fontWeight: 400,
              margin: '0.25rem 0 0.5rem'
            }}
          >
            {category.name}
          </h1>
          <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '1rem', color: 'var(--color-cream)' }}>
            {category.description}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/categories" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--color-muted-text)' }}>
            <ArrowLeft size={14} /> Back to All Categories
          </Link>
        </div>

        <ProductGrid
          products={categoryProducts}
          onQuickView={setQuickViewProduct}
        />
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}


