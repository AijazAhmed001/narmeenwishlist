import React, { useState } from 'react';
import { categories } from '../../data/categories';
import { brands } from '../../data/brands';
import { RotateCcw, Filter, Check, Heart, Search, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export function ProductFilters({
  selectedCategory,
  onSelectCategory,
  selectedBrands = [],
  onToggleBrand,
  priceBracket = 'all',
  onPriceBracketChange,
  followedOnly = false,
  onToggleFollowedOnly,
  availability,
  onAvailabilityChange,
  saleOnly,
  onToggleSale,
  newOnly,
  onToggleNew,
  onResetFilters
}) {
  const { followedBrands, toggleFollowBrand, isFollowingBrand } = useWishlist();
  const [brandSearch, setBrandSearch] = useState('');

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
    b.category.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside
      style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)',
        borderRadius: 'var(--radius-xs)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            color: 'var(--color-muted-text)',
            cursor: 'pointer',
            background: 'none',
            border: 'none'
          }}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* Followed Brands Only Toggle */}
      <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(216, 197, 165, 0.4)' }}>
        <button
          type="button"
          onClick={onToggleFollowedOnly}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 0.75rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            borderRadius: 'var(--radius-xs)',
            border: followedOnly ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.15)',
            backgroundColor: followedOnly ? 'var(--color-charcoal)' : 'var(--color-white)',
            color: followedOnly ? 'var(--color-ivory)' : 'var(--color-charcoal)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={14} fill={followedOnly ? 'var(--color-ivory)' : 'transparent'} />
            Followed Brands Only
          </span>
          <span style={{ fontSize: '0.6875rem', padding: '2px 6px', borderRadius: '10px', backgroundColor: followedOnly ? 'rgba(255,255,255,0.2)' : 'var(--color-cream)' }}>
            {followedBrands.length}
          </span>
        </button>
      </div>

      {/* Quick Toggles: Sale & New */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={onToggleSale}
          style={{
            flex: 1,
            padding: '0.55rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            borderRadius: 'var(--radius-xs)',
            border: saleOnly ? '1px solid var(--color-sale-accent)' : '1px solid rgba(38, 35, 33, 0.12)',
            backgroundColor: saleOnly ? 'var(--color-sale-bg)' : 'var(--color-cream-light)',
            color: saleOnly ? 'var(--color-sale-accent)' : 'var(--color-charcoal)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          On Sale {saleOnly && '✓'}
        </button>
        <button
          type="button"
          onClick={onToggleNew}
          style={{
            flex: 1,
            padding: '0.55rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            borderRadius: 'var(--radius-xs)',
            border: newOnly ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.12)',
            backgroundColor: newOnly ? 'var(--color-charcoal)' : 'var(--color-cream-light)',
            color: newOnly ? 'var(--color-ivory)' : 'var(--color-charcoal)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          New In {newOnly && '✓'}
        </button>
      </div>

      {/* Price Brackets (PKR) */}
      <div>
        <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', marginBottom: '0.6rem', fontWeight: 600 }}>
          Price Range (PKR)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under-5k', label: 'Under PKR 5,000', badge: 'Daily Wear' },
            { id: '5k-10k', label: 'PKR 5,000 – 10,000', badge: 'Prêt' },
            { id: '10k-30k', label: 'PKR 10,000 – 30,000', badge: 'Semi-Formal' },
            { id: 'above-30k', label: 'PKR 30,000+', badge: 'Luxury Couture' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onPriceBracketChange && onPriceBracketChange(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.45rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.8125rem',
                backgroundColor: priceBracket === item.id ? 'var(--color-cream)' : 'transparent',
                fontWeight: priceBracket === item.id ? 600 : 400,
                color: 'var(--color-charcoal)',
                cursor: 'pointer',
                border: 'none',
                textAlign: 'left'
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize: '0.6875rem', color: priceBracket === item.id ? 'var(--color-charcoal)' : 'var(--color-muted-light)' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', marginBottom: '0.6rem', fontWeight: 600 }}>
          Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <button
            onClick={() => onSelectCategory('all')}
            style={{
              textAlign: 'left',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.8125rem',
              backgroundColor: selectedCategory === 'all' ? 'var(--color-cream)' : 'transparent',
              fontWeight: selectedCategory === 'all' ? 600 : 400,
              color: 'var(--color-charcoal)',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            All Curations
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.8125rem',
                backgroundColor: selectedCategory === cat.id ? 'var(--color-cream)' : 'transparent',
                fontWeight: selectedCategory === cat.id ? 600 : 400,
                color: 'var(--color-charcoal)',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <span>{cat.name}</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted-light)' }}>{cat.item_count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands Selection & Follow Management */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', margin: 0, fontWeight: 600 }}>
            Maisons & Brands
          </h4>
          <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted-text)' }}>
            {followedBrands.length} followed
          </span>
        </div>

        {/* Search Brand Input */}
        <div style={{ position: 'relative', marginBottom: '0.6rem' }}>
          <Search size={12} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-text)' }} />
          <input
            type="text"
            placeholder="Search brand to follow..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.5rem 0.35rem 1.6rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(38, 35, 33, 0.15)',
              backgroundColor: 'var(--color-cream-light)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredBrands.map((brand) => {
            const isChecked = selectedBrands.includes(brand.id);
            const isFollowed = isFollowingBrand(brand.id);

            return (
              <div
                key={brand.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8125rem'
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    color: isChecked ? 'var(--color-charcoal)' : 'var(--color-muted-text)',
                    fontWeight: isChecked ? 600 : 400,
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleBrand(brand.id)}
                    style={{ accentColor: 'var(--color-charcoal)' }}
                  />
                  <span>{brand.name}</span>
                </label>

                <button
                  type="button"
                  onClick={() => toggleFollowBrand(brand.id)}
                  title={isFollowed ? 'Unfollow brand' : 'Follow brand'}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    padding: '2px 4px',
                    fontSize: '0.6875rem',
                    color: isFollowed ? 'var(--color-rose-deep)' : 'var(--color-muted-light)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <Heart size={12} fill={isFollowed ? 'var(--color-rose-deep)' : 'transparent'} />
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', marginBottom: '0.6rem', fontWeight: 600 }}>
          Availability
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'in_stock', label: 'In Stock' },
            { id: 'limited', label: 'Limited Edition' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onAvailabilityChange(item.id)}
              style={{
                textAlign: 'left',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.8125rem',
                backgroundColor: availability === item.id ? 'var(--color-cream)' : 'transparent',
                fontWeight: availability === item.id ? 600 : 400,
                color: 'var(--color-charcoal)',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
