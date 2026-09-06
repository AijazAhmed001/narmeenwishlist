import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { HeartButton } from '../ui/HeartButton';
import { Badge } from '../ui/Badge';
import { formatPrice, calculateDiscount } from '../../lib/helpers';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, Check, Bell, Bookmark } from 'lucide-react';

export function ProductQuickView({ product, isOpen, onClose }) {
  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    getWishlistItem,
    updateWishlistItem,
    moodboards,
    addProductToMoodboard,
    toggleTracking,
    isTracked
  } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('wanted');
  const [selectedMoodboard, setSelectedMoodboard] = useState('');
  const [boardAdded, setBoardAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      const existing = getWishlistItem(product.id);
      if (existing) {
        setPriority(existing.priority || 'medium');
        setNotes(existing.notes || '');
        setStatus(existing.status || 'wanted');
      } else {
        setPriority('medium');
        setNotes('');
        setStatus('wanted');
      }
    }
  }, [product, isOpen]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.original_price, product.price);
  const images = product.images?.length ? product.images : [product.image_url];
  const isCurrentlyTracked = isTracked(product.id);

  const handleSaveWishlist = () => {
    if (inWishlist) {
      updateWishlistItem(product.id, { priority, notes, status });
    } else {
      addToWishlist(product.id, priority, notes, status);
    }
  };

  const handleAddToBoard = () => {
    if (selectedMoodboard) {
      addProductToMoodboard(selectedMoodboard, product.id);
      setBoardAdded(true);
      setTimeout(() => setBoardAdded(false), 2500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="820px">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}
        className="quickview-grid"
      >
        {/* Left: Image Gallery */}
        <div>
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-cream-light)',
              marginBottom: '0.75rem',
              border: 'var(--border-hairline)'
            }}
          >
            <img
              src={images[activeImage] || product.image_url}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    border: activeImage === idx ? '2px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Wishlist Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-muted-text)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '4px'
              }}
            >
              {product.brand_name}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 400,
                lineHeight: 1.25,
                color: 'var(--color-charcoal)'
              }}
            >
              {product.name}
            </h2>
          </div>

          {/* Pricing & Stock */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 600, color: product.is_sale ? 'var(--color-sale-accent)' : 'var(--color-charcoal)' }}>
                {formatPrice(product.price, product.currency)}
              </span>
              {product.is_sale && (
                <span style={{ fontSize: '0.9rem', color: 'var(--color-muted-light)', textDecoration: 'line-through' }}>
                  {formatPrice(product.original_price, product.currency)}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {product.availability === 'in_stock' && <Badge variant="stock">In Stock</Badge>}
              {product.availability === 'limited' && <Badge variant="limited">Limited Edition</Badge>}
              {discount > 0 && <Badge variant="sale">-{discount}% Off</Badge>}
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <div className="editorial-divider" style={{ margin: '0.25rem 0' }} />

          {/* Wishlist Configuration Box */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-light)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(38, 35, 33, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Wishlist Settings
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                {inWishlist ? 'Saved in Journal' : 'Not yet saved'}
              </span>
            </div>

            {/* Priority Selector */}
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', display: 'block', marginBottom: '6px' }}>
                Priority Level
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['low', 'medium', 'high', 'dream'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    style={{
                      flex: 1,
                      padding: '0.45rem',
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      borderRadius: 'var(--radius-xs)',
                      border: priority === p ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.12)',
                      backgroundColor: priority === p ? 'var(--color-charcoal)' : 'var(--color-white)',
                      color: priority === p ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                      cursor: 'pointer',
                      fontWeight: priority === p ? 600 : 400
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', display: 'block', marginBottom: '4px' }}>
                Personal Journal Note
              </label>
              <input
                type="text"
                placeholder="e.g. For Paris trip, waiting for 20% drop..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.8125rem',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid rgba(38, 35, 33, 0.12)',
                  borderRadius: 'var(--radius-xs)'
                }}
              />
            </div>

            {/* Save / Update Button */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant={inWishlist ? 'luxury' : 'primary'}
                onClick={handleSaveWishlist}
                className="btn-sm"
                style={{ flex: 1 }}
              >
                {inWishlist ? 'Update Wishlist Entry' : 'Save to My Wishlist'}
              </Button>
              {inWishlist && (
                <Button
                  variant="ghost"
                  onClick={() => removeFromWishlist(product.id)}
                  className="btn-sm"
                  style={{ color: 'var(--color-sale-accent)' }}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          {/* Add to Moodboard */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              value={selectedMoodboard}
              onChange={(e) => setSelectedMoodboard(e.target.value)}
              className="select-field"
              style={{ fontSize: '0.8125rem', padding: '0.5rem 2rem 0.5rem 0.75rem' }}
            >
              <option value="">Add to Moodboard...</option>
              {moodboards.map((mb) => (
                <option key={mb.id} value={mb.id}>
                  {mb.name}
                </option>
              ))}
            </select>
            <Button
              variant="soft"
              size="sm"
              onClick={handleAddToBoard}
              disabled={!selectedMoodboard}
            >
              {boardAdded ? <Check size={14} color="#3D6B52" /> : <Bookmark size={14} />}
              {boardAdded ? 'Added' : 'Add'}
            </Button>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              style={{ fontSize: '0.8125rem', textDecoration: 'underline', color: 'var(--color-charcoal)', fontWeight: 500 }}
            >
              View Full History & Specs →
            </Link>

            {product.product_url && (
              <a
                href={product.product_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-charcoal)'
                }}
              >
                <span>SHOP ON OFFICIAL SITE</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .quickview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Modal>
  );
}
