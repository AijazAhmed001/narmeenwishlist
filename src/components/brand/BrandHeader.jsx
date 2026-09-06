import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Globe, Bell, Check, Plus, ShieldCheck, ExternalLink, Sparkles, Tag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export function BrandHeader({ brand, productCount = 0 }) {
  const { isFollowingBrand, toggleFollowBrand } = useWishlist();
  const [trackingActive, setTrackingActive] = useState(true);

  if (!brand) return null;
  const following = isFollowingBrand(brand.id);
  const website = brand.officialWebsite || brand.website_url;

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-white)',
        borderBottom: 'var(--border-hairline)',
        marginBottom: '3rem'
      }}
    >
      {/* Banner Cover */}
      <div
        style={{
          height: '360px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--color-cream)'
        }}
      >
        <img
          src={brand.cover_image_url || brand.coverImage}
          alt={brand.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(38, 35, 33, 0.85) 0%, rgba(38, 35, 33, 0.25) 60%, transparent 100%)'
          }}
        />

        <div
          className="container"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'var(--color-ivory)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--color-champagne)'
                }}
              >
                {brand.country} • {(brand.category || brand.brand_type)?.toUpperCase()}
              </span>
              <ShieldCheck size={16} color="#D8C5A5" />
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                color: 'var(--color-white)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                lineHeight: 1.1
              }}
            >
              {brand.name}
            </h1>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.75rem 1.4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--color-charcoal)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                <span>VISIT OFFICIAL WEBSITE</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-cream)' }}>
                Website unavailable
              </span>
            )}

            <Button
              variant={following ? 'luxury' : 'primary'}
              onClick={() => toggleFollowBrand(brand.id)}
            >
              {following ? <Check size={14} /> : <Plus size={14} />}
              {following ? 'Following Maison' : 'Follow Brand'}
            </Button>

            <button
              onClick={() => setTrackingActive(!trackingActive)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.75rem 1rem',
                backgroundColor: trackingActive ? 'rgba(216, 197, 165, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.8125rem',
                cursor: 'pointer'
              }}
              title="Track brand drops and alerts"
            >
              <Bell size={14} color={trackingActive ? '#D8C5A5' : '#fff'} />
              <span>{trackingActive ? 'Tracking Live' : 'Track Brand'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Links & Bio Strip */}
      <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <p style={{ maxWidth: '650px', fontSize: '0.925rem', color: 'var(--color-charcoal)', lineHeight: 1.6, margin: 0 }}>
            {brand.description}
          </p>

          {/* Quick Outbound Official Section Hubs */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {brand.newArrivalsUrl && (
              <a
                href={brand.newArrivalsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.8rem',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid rgba(38, 35, 33, 0.1)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--color-charcoal)'
                }}
              >
                <Sparkles size={12} color="var(--color-dusty-rose-dark)" />
                <span>New Arrivals ↗</span>
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
                  gap: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.8rem',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid rgba(38, 35, 33, 0.1)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--color-sale-accent)'
                }}
              >
                <Tag size={12} />
                <span>Official Sale ↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Active Promotion & Discount Alert Bar */}
      {(brand.activeDiscount || brand.discountPercent) && (
        <div
          style={{
            backgroundColor: 'var(--color-sale-bg)',
            borderTop: '1px solid rgba(197, 106, 90, 0.2)',
            padding: '0.9rem 0'
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  backgroundColor: 'var(--color-sale-accent)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                }}
              >
                {brand.activeDiscount || `UP TO ${brand.discountPercent}% OFF`}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                {brand.saleOfferDetails || `Active Seasonal Price Reductions on ${brand.name} Stitched RTW & Lawn Collections`}
              </span>
            </div>

            {brand.saleUrl && (
              <a
                href={brand.saleUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--color-sale-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                <span>Shop Official {brand.name} Sale</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
