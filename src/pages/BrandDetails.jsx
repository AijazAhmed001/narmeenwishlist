import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { products } from '../data/products';
import { BrandHeader } from '../components/brand/BrandHeader';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { useWishlist } from '../context/WishlistContext';
import { ExternalLink, Sparkles, Tag, ArrowRight, Globe, ShoppingBag, Flame, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function BrandDetails() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug) || brands[0];
  const { fullWishlistProducts } = useWishlist();

  const [activeTab, setActiveTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const brandProducts = useMemo(() => {
    return products.filter((p) => p.brand_id === brand?.id);
  }, [brand]);

  const newArrivals = useMemo(() => {
    return brandProducts.filter((p) => p.is_new);
  }, [brandProducts]);

  const saleProducts = useMemo(() => {
    return brandProducts.filter((p) => p.is_sale);
  }, [brandProducts]);

  const brandWishlistItems = useMemo(() => {
    return fullWishlistProducts.filter((p) => p.brand_id === brand?.id);
  }, [fullWishlistProducts, brand]);

  const displayedProducts = useMemo(() => {
    switch (activeTab) {
      case 'new':
        return newArrivals;
      case 'sale':
        return saleProducts;
      case 'wishlist':
        return brandWishlistItems;
      default:
        return brandProducts;
    }
  }, [activeTab, brandProducts, newArrivals, saleProducts, brandWishlistItems]);

  if (!brand) return null;

  return (
    <div>
      {/* Brand Hero Header with Official Website button */}
      <BrandHeader brand={brand} productCount={brandProducts.length} />

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Official Brand Portals Navigation Strip */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-light)',
            border: '1px solid rgba(216, 197, 165, 0.4)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-muted-text)', fontWeight: 600 }}>
              Official Flagship Channels
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: '2px 0 0' }}>
              Direct Boutique Portals for {brand.name}
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {brand.officialWebsite && (
              <a
                href={brand.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--color-charcoal)',
                  color: 'var(--color-ivory)',
                  textDecoration: 'none'
                }}
              >
                <Globe size={13} /> Official Website <ExternalLink size={11} />
              </a>
            )}

            {brand.shopUrl && (
              <a
                href={brand.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid rgba(38, 35, 33, 0.15)',
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none'
                }}
              >
                <ShoppingBag size={13} /> Shop Store <ExternalLink size={11} />
              </a>
            )}

            {brand.newArrivalsUrl && (
              <a
                href={brand.newArrivalsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid rgba(38, 35, 33, 0.15)',
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none'
                }}
              >
                <Sparkles size={13} /> New In ↗
              </a>
            )}

            {brand.saleUrl && (
              <a
                href={brand.saleUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--color-sale-bg)',
                  border: '1px solid var(--color-sale-accent)',
                  color: 'var(--color-sale-accent)',
                  textDecoration: 'none'
                }}
              >
                <Tag size={13} /> Official Sale ↗
              </a>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 'var(--border-hairline)',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All Pieces (${brandProducts.length})` },
              { id: 'new', label: `New Arrivals (${newArrivals.length})` },
              { id: 'sale', label: `On Sale (${saleProducts.length})` },
              { id: 'wishlist', label: `Saved in My Wishlist (${brandWishlistItems.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.8125rem',
                  borderRadius: 'var(--radius-full)',
                  border: activeTab === tab.id ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                  backgroundColor: activeTab === tab.id ? 'var(--color-charcoal)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 600 : 400
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <ProductGrid
            products={displayedProducts}
            onQuickView={setQuickViewProduct}
            emptyTitle={activeTab === 'wishlist' ? `No saved ${brand.name} pieces yet.` : `No items in ${activeTab} category.`}
            emptySubtitle={activeTab === 'wishlist' ? 'Tap the heart icon on any piece to save it to your personal journal.' : 'Check back as collections update.'}
          />
        ) : (
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              border: 'var(--border-hairline)',
              borderRadius: 'var(--radius-xs)',
              padding: '3rem 2rem',
              textAlign: 'center'
            }}
          >
            <ShoppingBag size={36} color="var(--color-charcoal)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Explore the Official {brand.name} Flagship Store
            </h3>
            <p style={{ maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.9rem', color: 'var(--color-muted-text)' }}>
              Browse the complete live runway catalog and full ready-to-wear inventory directly on the verified official domain.
            </p>
            {brand.officialWebsite && (
              <a
                href={brand.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.65rem 1.25rem',
                  backgroundColor: 'var(--color-charcoal)',
                  color: 'var(--color-ivory)',
                  borderRadius: 'var(--radius-xs)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  textDecoration: 'none'
                }}
              >
                Launch {brand.name} Official Website <ExternalLink size={13} />
              </a>
            )}
          </div>
        )}
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
