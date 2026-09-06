import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Edit3, ArrowDown, ExternalLink, Check, Bell, BellOff } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatPrice, calculateDiscount } from '../../lib/helpers';
import { useWishlist } from '../../context/WishlistContext';

export function WishlistCard({ product, onEdit }) {
  const { removeFromWishlist, updateWishlistItem, toggleTracking, isTracked } = useWishlist();
  const [editingNote, setEditingNote] = useState(false);
  const [noteValue, setNoteValue] = useState(product.notes || '');

  const discount = calculateDiscount(product.original_price, product.price);
  const tracked = isTracked(product.id);

  const handleSaveNote = () => {
    updateWishlistItem(product.id, { notes: noteValue });
    setEditingNote(false);
  };

  const handleStatusChange = (newStatus) => {
    updateWishlistItem(product.id, { status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    updateWishlistItem(product.id, { priority: newPriority });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Image Preview & Quick Actions */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', backgroundColor: 'var(--color-cream-light)' }}>
        <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Link>

        {/* Priority & Status Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Badge variant={product.priority}>
            {product.priority?.toUpperCase()}
          </Badge>
          {product.status === 'purchased' && <Badge variant="stock">PURCHASED</Badge>}
          {product.status === 'watching' && <Badge variant="limited">WATCHING</Badge>}
        </div>

        {/* Delete Button */}
        <button
          onClick={() => removeFromWishlist(product.id)}
          aria-label="Remove from wishlist"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-muted-text)',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)'
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Main Info */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-muted-text)' }}>
              {product.brand_name}
            </span>
            <button
              onClick={() => toggleTracking(product.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.6875rem',
                color: tracked ? 'var(--color-charcoal)' : 'var(--color-muted-light)',
                cursor: 'pointer'
              }}
              title={tracked ? 'Auto tracking active' : 'Click to track price/stock'}
            >
              {tracked ? <Bell size={12} color="#D8C5A5" /> : <BellOff size={12} />}
              <span>{tracked ? 'Tracking' : 'Not tracked'}</span>
            </button>
          </div>

          <Link to={`/product/${product.id}`}>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                color: 'var(--color-charcoal)',
                fontWeight: 400,
                lineHeight: 1.3,
                marginBottom: '8px'
              }}
            >
              {product.name}
            </h4>
          </Link>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontWeight: 600, fontSize: '1rem', color: product.is_sale ? 'var(--color-sale-accent)' : 'var(--color-charcoal)' }}>
              {formatPrice(product.price, product.currency)}
            </span>
            {product.is_sale && product.original_price > product.price && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted-light)', textDecoration: 'line-through' }}>
                {formatPrice(product.original_price, product.currency)}
              </span>
            )}
            {discount > 0 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-sale-accent)', fontWeight: 600 }}>
                (-{discount}%)
              </span>
            )}
          </div>

          {/* Personal Note Box */}
          <div
            style={{
              padding: '8px 10px',
              backgroundColor: 'var(--color-cream-light)',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(38, 35, 33, 0.06)',
              marginBottom: '12px',
              fontSize: '0.8125rem'
            }}
          >
            {editingNote ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  value={noteValue}
                  onChange={(e) => setNoteValue(e.target.value)}
                  placeholder="Add personal note..."
                  style={{
                    flex: 1,
                    padding: '2px 6px',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(38, 35, 33, 0.2)',
                    borderRadius: '2px'
                  }}
                  autoFocus
                />
                <button onClick={handleSaveNote} style={{ cursor: 'pointer', color: 'var(--color-success)' }}>
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEditingNote(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  color: product.notes ? 'var(--color-charcoal)' : 'var(--color-muted-light)',
                  fontStyle: product.notes ? 'italic' : 'normal'
                }}
              >
                <span>{product.notes ? `“${product.notes}”` : '+ Add personal note...'}</span>
                <Edit3 size={11} color="var(--color-muted-light)" />
              </div>
            )}
          </div>
        </div>

        {/* Status & Priority dropdowns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '8px', borderTop: 'var(--border-hairline)' }}>
          <div>
            <label style={{ fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block', marginBottom: '2px' }}>
              Priority
            </label>
            <select
              value={product.priority || 'medium'}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="select-field"
              style={{ fontSize: '0.75rem', padding: '0.35rem 1.5rem 0.35rem 0.5rem' }}
            >
              <option value="dream">✨ Dream</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block', marginBottom: '2px' }}>
              Status
            </label>
            <select
              value={product.status || 'wanted'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="select-field"
              style={{ fontSize: '0.75rem', padding: '0.35rem 1.5rem 0.35rem 0.5rem' }}
            >
              <option value="wanted">Wanted</option>
              <option value="watching">Watching</option>
              <option value="purchased">Purchased</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
