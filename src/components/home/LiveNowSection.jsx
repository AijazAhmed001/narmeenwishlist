import React, { useState, useMemo } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { ProductQuickView } from '../product/ProductQuickView';
import { SectionTitle } from '../ui/SectionTitle';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Flame, Sparkles, TrendingDown, RefreshCw, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export function LiveNowSection() {
  const { followedBrands } = useWishlist();
  const [activeTab, setActiveTab] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (activeTab === 'followed') {
        if (!followedBrands.includes(p.brand_id)) return false;
      } else if (activeTab === 'sale' && !p.is_sale) {
        return false;
      } else if (activeTab === 'new' && !p.is_new) {
        return false;
      } else if (activeTab === 'restocked' && p.availability !== 'in_stock') {
        return false;
      } else if (activeTab === 'limited' && p.availability !== 'limited') {
        return false;
      } else if (activeTab === 'trending' && !p.is_featured) {
        return false;
      }

      // Price filter (PKR)
      if (priceFilter === 'under-5k' && p.price >= 5000) return false;
      if (priceFilter === 'under-10k' && p.price > 10000) return false;
      if (priceFilter === 'luxury' && p.price < 30000) return false;

      return true;
    });
  }, [activeTab, priceFilter, followedBrands]);

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-cream-light)', borderBottom: 'var(--border-hairline)' }}>
      <div className="container">
        <SectionTitle
          tag="LIVE NOW"
          title="Active Sales, Drops & Restocks"
          subtitle="Realtime movements across verified Pakistani prêt, kurtas under PKR 5k–10k, and high luxury maisons."
          action={
            <Link to="/discover">
              <Button variant="secondary" size="sm">
                View All Discovery <ArrowRight size={14} />
              </Button>
            </Link>
          }
        />

        {/* Live Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Main Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { id: 'all', label: 'ALL PIECES' },
              { id: 'followed', label: `FOLLOWED BRANDS (${followedBrands.length})`, icon: Heart },
              { id: 'sale', label: 'ON SALE', icon: TrendingDown },
              { id: 'new', label: 'NEW ARRIVALS', icon: Sparkles },
              { id: 'restocked', label: 'RESTOCKED', icon: RefreshCw },
              { id: 'limited', label: 'LIMITED EDITION', icon: Flame },
              { id: 'trending', label: 'TRENDING' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--radius-full)',
                    border: isActive ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.12)',
                    backgroundColor: isActive ? 'var(--color-charcoal)' : 'var(--color-white)',
                    color: isActive ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {Icon && <Icon size={12} fill={tab.id === 'followed' && isActive ? 'var(--color-ivory)' : 'transparent'} />}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Price Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { id: 'all', label: 'All Budgets' },
              { id: 'under-5k', label: 'Under PKR 5,000' },
              { id: 'under-10k', label: 'Under PKR 10,000' },
              { id: 'luxury', label: 'Luxury (PKR 30k+)' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceFilter(p.id)}
                style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.6875rem',
                  borderRadius: '12px',
                  border: priceFilter === p.id ? '1px solid var(--color-charcoal)' : '1px solid rgba(38,35,33,0.1)',
                  backgroundColor: priceFilter === p.id ? 'var(--color-cream)' : 'transparent',
                  color: 'var(--color-charcoal)',
                  fontWeight: priceFilter === p.id ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid or Empty Followed State */}
        {activeTab === 'followed' && followedBrands.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xs)',
              padding: '2.5rem',
              textAlign: 'center',
              border: '1px dashed var(--color-rose-deep)'
            }}
          >
            <Heart size={32} color="var(--color-rose-deep)" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              No Brands Followed Yet
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', maxWidth: '440px', margin: '0 auto 1.25rem' }}>
              Follow brands to see their exclusive drops and sales here.
            </p>
            <Link to="/brands">
              <Button size="sm">Browse & Follow Brands</Button>
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
