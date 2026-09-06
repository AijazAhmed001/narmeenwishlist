import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductSort } from '../components/product/ProductSort';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { SectionTitle } from '../components/ui/SectionTitle';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Sparkles, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Discover() {
  const { followedBrands, toggleFollowBrand } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceBracket, setPriceBracket] = useState('all');
  const [followedOnly, setFollowedOnly] = useState(false);
  const [availability, setAvailability] = useState('all');
  const [saleOnly, setSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleToggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceBracket('all');
    setFollowedOnly(false);
    setAvailability('all');
    setSaleOnly(false);
    setNewOnly(false);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Followed Brands Filter
        if (followedOnly) {
          if (!followedBrands.includes(product.brand_id)) {
            return false;
          }
        }
        if (selectedCategory !== 'all' && product.category_id !== selectedCategory) {
          return false;
        }
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand_id)) {
          return false;
        }
        // Price Bracket Filter (PKR)
        if (priceBracket === 'under-5k' && product.price >= 5000) {
          return false;
        }
        if (priceBracket === '5k-10k' && (product.price < 5000 || product.price > 10000)) {
          return false;
        }
        if (priceBracket === '10k-30k' && (product.price < 10000 || product.price > 30000)) {
          return false;
        }
        if (priceBracket === 'above-30k' && product.price <= 30000) {
          return false;
        }
        if (availability !== 'all' && product.availability !== availability) {
          return false;
        }
        if (saleOnly && !product.is_sale) {
          return false;
        }
        if (newOnly && !product.is_new) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'discount':
            const discA = a.original_price ? (a.original_price - a.price) / a.original_price : 0;
            const discB = b.original_price ? (b.original_price - b.price) / b.original_price : 0;
            return discB - discA;
          case 'brand':
            return a.brand_name.localeCompare(b.brand_name);
          default:
            return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        }
      });
  }, [selectedCategory, selectedBrands, priceBracket, followedOnly, followedBrands, availability, saleOnly, newOnly, sortBy]);

  // Recommended popular brands to quick-follow if user has none
  const suggestedBrands = brands.filter(b => b.isTopBrand).slice(0, 6);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Editorial Discover Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <span className="editorial-tag">The Discovery Lounge</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
            Curated Fashion & Beauty
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--color-muted-text)' }}>
            Explore verified Pakistani prêt, kurtas under PKR 5k–10k, and high luxury maisons. Follow specific brands to receive custom alerts and tailored feeds.
          </p>
        </div>

        {/* Layout Grid: Sidebar Filters + Main Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="discover-layout"
        >
          {/* Left Filters Sidebar */}
          <div>
            <ProductFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedBrands={selectedBrands}
              onToggleBrand={handleToggleBrand}
              priceBracket={priceBracket}
              onPriceBracketChange={setPriceBracket}
              followedOnly={followedOnly}
              onToggleFollowedOnly={() => setFollowedOnly(!followedOnly)}
              availability={availability}
              onAvailabilityChange={setAvailability}
              saleOnly={saleOnly}
              onToggleSale={() => setSaleOnly(!saleOnly)}
              newOnly={newOnly}
              onToggleNew={() => setNewOnly(!newOnly)}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Right Product Grid */}
          <div>
            {/* If Followed Only is active and user follows 0 brands */}
            {followedOnly && followedBrands.length === 0 ? (
              <div
                style={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px dashed var(--color-rose-deep)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '3rem 2rem',
                  textAlign: 'center'
                }}
              >
                <Heart size={36} color="var(--color-rose-deep)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  You Haven't Followed Any Brands Yet
                </h3>
                <p style={{ maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.9rem', color: 'var(--color-muted-text)' }}>
                  Follow your favorite Pakistani & international designers below. You will only receive product drops, price drops, and email updates for brands you follow.
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '520px', margin: '0 auto' }}>
                  {suggestedBrands.map((sb) => (
                    <button
                      key={sb.id}
                      onClick={() => toggleFollowBrand(sb.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8125rem',
                        borderRadius: '20px',
                        border: '1px solid var(--color-charcoal)',
                        backgroundColor: 'var(--color-cream-light)',
                        color: 'var(--color-charcoal)',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={12} />
                      + Follow {sb.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <ProductSort
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalCount={filteredProducts.length}
                />

                <ProductGrid
                  products={filteredProducts}
                  onQuickView={setQuickViewProduct}
                  columns={3}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

      <style>{`
        @media (max-width: 900px) {
          .discover-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
