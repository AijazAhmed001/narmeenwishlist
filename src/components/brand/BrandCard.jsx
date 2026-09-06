import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWishlist } from '../../context/WishlistContext';

export function BrandCard({ brand }) {
  const { isFollowingBrand, toggleFollowBrand } = useWishlist();

  if (!brand) return null;
  const following = isFollowingBrand(brand.id);
  const website = brand.officialWebsite || brand.website_url;

  return (
    <motion.div
      className="card-base"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)',
        height: '100%'
      }}
    >
      {/* Cover image & Logo badge */}
      <div style={{ height: '140px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-cream)' }}>
        <img
          src={brand.cover_image_url || brand.coverImage}
          alt={brand.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(38,35,33,0.6) 0%, transparent 60%)' }} />

        {/* Top Maison or Sale Badges */}
        {brand.isTopBrand && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: 'rgba(248, 245, 240, 0.92)',
              color: 'var(--color-charcoal)',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              backdropFilter: 'blur(4px)',
              zIndex: 2
            }}
          >
            TOP MAISON
          </span>
        )}

        {(brand.activeDiscount || brand.discountPercent) && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'var(--color-sale-accent)',
              color: '#ffffff',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
              zIndex: 2
            }}
          >
            🔥 {brand.activeDiscount || `UP TO ${brand.discountPercent}% OFF`}
          </span>
        )}

        {/* Brand Logo Avatar badge */}
        {(brand.logo_url || brand.logo) && (
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 12,
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'var(--color-white)',
              padding: 2,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              overflow: 'hidden'
            }}
          >
            <img
              src={brand.logo_url || brand.logo}
              alt={brand.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
              {brand.category || brand.brand_type} • {brand.country}
            </span>
          </div>

          <Link to={`/brands/${brand.slug}`}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                color: 'var(--color-charcoal)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}
            >
              {brand.name}
            </h3>
          </Link>

          {(brand.activeDiscount || brand.discountPercent) && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                backgroundColor: 'var(--color-sale-bg)',
                border: '1px solid rgba(197, 106, 90, 0.2)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-sale-accent)',
                marginBottom: '8px'
              }}
            >
              <span>🏷️ {brand.activeDiscount || `Up to ${brand.discountPercent}% OFF`} on Collection</span>
            </div>
          )}

          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-muted-text)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '1.25rem'
            }}
          >
            {brand.description}
          </p>
        </div>

        {/* Buttons Strip: Visit Official Website & Follow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '0.75rem', borderTop: 'var(--border-hairline)' }}>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0.55rem 0.85rem',
                backgroundColor: 'var(--color-cream-light)',
                border: '1px solid rgba(38, 35, 33, 0.12)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-soft"
            >
              <span>Visit Official Website</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-light)', fontStyle: 'italic', textAlign: 'center' }}>
              Website unavailable
            </span>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
              {(brand.followers_count + (following ? 1 : 0)).toLocaleString()} followers
            </span>

            <Button
              variant={following ? 'soft' : 'secondary'}
              size="sm"
              onClick={() => toggleFollowBrand(brand.id)}
            >
              {following ? <Check size={12} color="#3D6B52" /> : <Plus size={12} />}
              {following ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
