import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Plus, Sparkles, ArrowDown, ExternalLink } from 'lucide-react';
import { HeartButton } from '../ui/HeartButton';
import { Badge } from '../ui/Badge';
import { formatPrice, calculateDiscount } from '../../lib/helpers';
import { useWishlist } from '../../context/WishlistContext';

export function ProductCard({
  product,
  onQuickView,
  priorityBadge = null,
  showNotes = false
}) {
  const [hovered, setHovered] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.original_price, product.price);
  const outboundUrl = product.product_url || product.officialProductUrl;

  const handleHeartToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, 'medium');
    }
  };

  return (
    <motion.div
      className="card-base"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-white)'
      }}
    >
      {/* Image Container with Hover Zoom and Secondary Image Swap */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: 'var(--color-cream-light)'
        }}
      >
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={hovered && product.secondary_image_url ? product.secondary_image_url : product.image_url}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </Link>

        {/* Badges Stack (Top Left) */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            zIndex: 2
          }}
        >
          {priorityBadge && (
            <Badge variant={priorityBadge}>
              {priorityBadge.toUpperCase()}
            </Badge>
          )}
          {product.is_new && <Badge variant="new">NEW</Badge>}
          {product.is_sale && discount > 0 && (
            <Badge variant="sale" icon={ArrowDown}>
              -{discount}%
            </Badge>
          )}
          {product.availability === 'limited' && (
            <Badge variant="limited">LIMITED</Badge>
          )}
        </div>

        {/* Heart Wishlist Button (Top Right) */}
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 3 }}>
          <HeartButton
            active={inWishlist}
            onClick={handleHeartToggle}
            celebrate={true}
            ariaLabel={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          />
        </div>

        {/* Quick View & Outbound Action Overlay (Slide Up on Hover) */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            display: 'flex',
            gap: 6,
            transform: hovered ? 'translateY(0)' : 'translateY(50px)',
            opacity: hovered ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 3
          }}
        >
          {onQuickView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                flex: 1,
                padding: '0.55rem 0.65rem',
                backgroundColor: 'rgba(248, 245, 240, 0.95)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(38, 35, 33, 0.1)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <Eye size={13} /> Quick View
            </button>
          )}

          {outboundUrl && (
            <a
              href={outboundUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '0.55rem 0.75rem',
                backgroundColor: 'var(--color-charcoal)',
                border: '1px solid var(--color-charcoal)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ivory)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                cursor: 'pointer',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-subtle)'
              }}
              title="Open piece directly on official brand website"
            >
              <span>Buy ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Brand */}
          <Link
            to={`/brands/${product.brand_id?.replace('brand-', '') || ''}`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: 'var(--color-muted-text)',
              marginBottom: '4px',
              display: 'block'
            }}
          >
            {product.brand_name || 'LUXURY MAISON'}
          </Link>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.975rem',
                fontWeight: 400,
                color: 'var(--color-charcoal)',
                lineHeight: 1.35,
                marginBottom: '8px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {product.name}
            </h4>
          </Link>
        </div>

        {/* Pricing & Direct Outbound Button */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: product.is_sale ? 'var(--color-sale-accent)' : 'var(--color-charcoal)'
                }}
              >
                {formatPrice(product.price, product.currency)}
              </span>
              {product.is_sale && product.original_price > product.price && (
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted-light)',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatPrice(product.original_price, product.currency)}
                </span>
              )}
            </div>

            {outboundUrl && (
              <a
                href={outboundUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.6875rem',
                  color: 'var(--color-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
                title="View on official store"
              >
                Official ↗
              </a>
            )}
          </div>

          {showNotes && product.notes && (
            <div
              style={{
                marginTop: '8px',
                padding: '6px 8px',
                backgroundColor: 'var(--color-cream-light)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontStyle: 'italic',
                color: 'var(--color-muted-text)',
                borderLeft: '2px solid var(--color-dusty-rose)'
              }}
            >
              “{product.notes}”
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
