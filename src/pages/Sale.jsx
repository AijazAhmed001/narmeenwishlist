import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { SectionTitle } from '../components/ui/SectionTitle';
import { categories } from '../data/categories';
import { Tag, TrendingDown, ArrowRight } from 'lucide-react';
import { calculateDiscount } from '../lib/helpers';

export function Sale() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount'); // 'discount' | 'newest' | 'price-asc' | 'price-desc'
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const saleProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.is_sale) return false;
        if (selectedCategory !== 'all' && p.category_id !== selectedCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        // Default: biggest discount
        const discA = calculateDiscount(a.original_price, a.price);
        const discB = calculateDiscount(b.original_price, b.price);
        return discB - discA;
      });
  }, [selectedCategory, sortBy]);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Editorial Sale Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-tag" style={{ color: 'var(--color-sale-accent)' }}>
            <TrendingDown size={12} style={{ display: 'inline', marginRight: 4 }} />
            The Sale Edit
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.75rem)', marginTop: '0.25rem', marginBottom: '0.75rem', fontWeight: 400 }}>
            Exceptional Pieces. Better Prices.
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--color-muted-text)' }}>
            Curated price reductions across verified designer houses, ready-to-wear stitched lawn, and luxury vanity staples.
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
              { id: 'all', label: 'All Sales' },
              { id: 'cat-fashion', label: 'Fashion' },
              { id: 'cat-makeup', label: 'Beauty' },
              { id: 'cat-sarees', label: 'Sarees & Occasion' },
              { id: 'cat-shoes', label: 'Shoes' },
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
              <option value="discount">Biggest Discount (%)</option>
              <option value="newest">Newest Reductions</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={saleProducts}
          onQuickView={setQuickViewProduct}
          emptyTitle="No discounted pieces found in this category."
          emptySubtitle="Check back soon or save items to your wishlist to be alerted when prices drop."
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
