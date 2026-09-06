import React, { useState, useMemo } from 'react';
import { brands } from '../data/brands';
import { BrandGrid } from '../components/brand/BrandGrid';
import { Input } from '../components/ui/Input';
import { Search, Heart, Sparkles, X, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '../components/ui/Button';

export function Brands() {
  const { followedBrands, unfollowAllBrands } = useWishlist();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [followedOnly, setFollowedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rank'); // 'rank' | 'followers' | 'alpha'

  const filteredBrands = useMemo(() => {
    return brands
      .filter((b) => {
        // Followed filter
        if (followedOnly && !followedBrands.includes(b.id)) {
          return false;
        }

        // Search match
        const matchSearch =
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          (b.country && b.country.toLowerCase().includes(search.toLowerCase())) ||
          (b.category && b.category.toLowerCase().includes(search.toLowerCase())) ||
          (b.description && b.description.toLowerCase().includes(search.toLowerCase()));

        if (!matchSearch) return false;

        // Category filter
        if (selectedType === 'all') return true;
        if (selectedType === 'sales') return Boolean(b.activeDiscount || b.discountPercent >= 20);
        if (selectedType === 'pakistani' && (b.brand_type?.includes('pakistani') || b.category?.includes('Pakistani'))) return true;
        if (selectedType === 'luxury' && (b.brand_type === 'luxury' || b.category?.includes('Luxury Fashion'))) return true;
        if (selectedType === 'international' && (b.brand_type === 'contemporary' || b.brand_type === 'western_fashion' || b.category?.includes('International'))) return true;
        if (selectedType === 'bags' && (b.brand_type === 'bags' || b.category?.includes('Bags'))) return true;
        if (selectedType === 'shoes' && (b.brand_type === 'shoes' || b.category?.includes('Shoes'))) return true;
        if (selectedType === 'jewelry' && (b.brand_type === 'jewelry' || b.category?.includes('Jewelry'))) return true;
        if (selectedType === 'beauty' && (b.brand_type === 'beauty' || b.brand_type === 'skincare' || b.category?.includes('Beauty') || b.category?.includes('Skincare'))) return true;
        if (selectedType === 'perfume' && (b.brand_type === 'perfume' || b.category?.includes('Perfume'))) return true;
        if (selectedType === 'sarees' && (b.brand_type === 'traditional' || b.category?.includes('Traditional') || b.category?.includes('Saree'))) return true;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
        if (sortBy === 'followers') return b.followers_count - a.followers_count;
        if (sortBy === 'alpha') return a.name.localeCompare(b.name);
        // Default editorial ranking
        return (a.editorialRank || 99) - (b.editorialRank || 99);
      });
  }, [search, selectedType, followedOnly, followedBrands, sortBy]);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="editorial-tag">The Official Brand Directory</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
            Maisons & Designer Houses
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--color-muted-text)' }}>
            Directly connected to verified official brand websites. Follow your favorite labels to receive exclusive price drops, new arrivals, and email alerts.
          </p>
        </div>

        {/* Global Follow Management Bar */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={18} color="var(--color-rose-deep)" fill={followedBrands.length > 0 ? 'var(--color-rose-deep)' : 'transparent'} />
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                {followedBrands.length} Brands Followed
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', marginLeft: '8px' }}>
                (You only receive alerts for followed brands)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setFollowedOnly(!followedOnly)}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-xs)',
                border: followedOnly ? '1px solid var(--color-charcoal)' : '1px solid rgba(38,35,33,0.15)',
                backgroundColor: followedOnly ? 'var(--color-charcoal)' : 'var(--color-cream-light)',
                color: followedOnly ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {followedOnly ? '✓ Showing Followed Only' : 'View Followed Brands Only'}
            </button>

            {followedBrands.length > 0 && (
              <button
                type="button"
                onClick={unfollowAllBrands}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-rose-deep)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-rose-deep)',
                  cursor: 'pointer'
                }}
              >
                <X size={12} /> Unfollow All
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
            backgroundColor: 'var(--color-white)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-xs)',
            border: 'var(--border-hairline)'
          }}
        >
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
            {[
              { id: 'all', label: 'All Maisons' },
              { id: 'sales', label: '🔥 Brands on Sale' },
              { id: 'pakistani', label: 'Pakistani Fashion & Lawn' },
              { id: 'luxury', label: 'High Luxury Couture' },
              { id: 'international', label: 'International Prêt' },
              { id: 'bags', label: 'Bags & Leather' },
              { id: 'shoes', label: 'Shoes' },
              { id: 'jewelry', label: 'Fine Jewelry' },
              { id: 'beauty', label: 'Beauty & Skincare' },
              { id: 'perfume', label: 'Niche Perfumes' },
              { id: 'sarees', label: 'Traditional & Sarees' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: selectedType === tab.id ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                  backgroundColor: selectedType === tab.id ? 'var(--color-charcoal)' : tab.id === 'sales' ? 'var(--color-sale-bg)' : 'transparent',
                  color: selectedType === tab.id ? 'var(--color-ivory)' : tab.id === 'sales' ? 'var(--color-sale-accent)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  fontWeight: selectedType === tab.id || tab.id === 'sales' ? 600 : 400,
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '220px' }}>
              <Input
                placeholder="Search brand, country..."
                icon={Search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.55rem 0.75rem',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(38, 35, 33, 0.15)',
                backgroundColor: 'var(--color-cream-light)',
                color: 'var(--color-charcoal)',
                cursor: 'pointer'
              }}
            >
              <option value="rank">Sort by Top Editorial Rank</option>
              <option value="discount">Sort by Highest Discount (%)</option>
              <option value="followers">Sort by Most Followers</option>
              <option value="alpha">Sort A to Z</option>
            </select>
          </div>
        </div>

        {/* Brand Grid or Empty Followed State */}
        {followedOnly && followedBrands.length === 0 ? (
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              border: '1px dashed var(--color-rose-deep)',
              borderRadius: 'var(--radius-xs)',
              padding: '3.5rem 2rem',
              textAlign: 'center'
            }}
          >
            <Heart size={36} color="var(--color-rose-deep)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              You Are Not Following Any Brands Yet
            </h3>
            <p style={{ maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.9rem', color: 'var(--color-muted-text)' }}>
              Explore the directory above and click "Follow" on any brand (e.g. Sapphire, Khaadi, Zara, Chanel, ÉLAN) to only see their updates.
            </p>
            <Button onClick={() => setFollowedOnly(false)}>View All Brands to Follow</Button>
          </div>
        ) : (
          <BrandGrid brands={filteredBrands} />
        )}
      </div>
    </div>
  );
}
