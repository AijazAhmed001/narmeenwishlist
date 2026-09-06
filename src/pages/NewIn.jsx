import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { Sparkles, ArrowRight } from 'lucide-react';

export function NewIn() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'trending' | 'brand' | 'price-asc' | 'price-desc'
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const newProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.is_new) return false;
        if (selectedCategory !== 'all' && p.category_id !== selectedCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        if (sortBy === 'brand') return a.brand_name.localeCompare(b.brand_name);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // Default newest
        return new Date(b.last_checked_at || 0) - new Date(a.last_checked_at || 0);
      });
  }, [selectedCategory, sortBy]);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Editorial New In Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
            Just In
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.75rem)', marginTop: '0.25rem', marginBottom: '0.75rem', fontWeight: 400 }}>
            Fresh Arrivals Worth Adding.
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--color-muted-text)' }}>
            Discover the latest runway drops, festive embroidered collections, and newly launched clean beauty staples.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
            backgroundColor: 'var(--color-white)',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-xs)',
            border: 'var(--border-hairline)'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'all', label: 'All New In' },
              { id: 'cat-fashion', label: 'Fashion' },
              { id: 'cat-makeup', label: 'Beauty' },
              { id: 'cat-sarees', label: 'Sarees & Occasion' },
              { id: 'cat-bags', label: 'Bags' },
              { id: 'cat-jewelry', label: 'Jewelry' },
              { id: 'cat-perfumes', label: 'Perfumes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                style={{
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  borderRadius: 'var(--radius-full)',
                  border: selectedCategory === tab.id ? '1px solid var(--color-charcoal)' : '1px solid rgba(43, 41, 40, 0.1)',
                  backgroundColor: selectedCategory === tab.id ? 'var(--color-charcoal)' : 'transparent',
                  color: selectedCategory === tab.id ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  fontWeight: selectedCategory === tab.id ? 600 : 400,
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(43, 41, 40, 0.15)',
                backgroundColor: 'var(--color-cream-light)',
                color: 'var(--color-charcoal)',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Latest Arrivals</option>
              <option value="trending">Trending Most</option>
              <option value="brand">Brand A → Z</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={newProducts}
          onQuickView={setQuickViewProduct}
          emptyTitle="No new arrivals in this category right now."
          emptySubtitle="Check back soon for new season drops."
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
