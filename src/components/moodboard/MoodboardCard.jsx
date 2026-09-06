import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2, Edit3 } from 'lucide-react';
import { products } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';

export function MoodboardCard({ moodboard, onEdit }) {
  const { deleteMoodboard } = useWishlist();

  if (!moodboard) return null;

  // Retrieve products in this moodboard
  const boardProducts = (moodboard.item_ids || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const previewImages = boardProducts.slice(0, 3).map((p) => p.image_url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)'
      }}
    >
      {/* Cover / Collage Header */}
      <Link to={`/moodboards/${moodboard.id}`} style={{ display: 'block', position: 'relative' }}>
        <div
          style={{
            height: '200px',
            width: '100%',
            backgroundColor: 'var(--color-cream)',
            position: 'relative',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: previewImages.length > 1 ? '1.5fr 1fr' : '1fr',
            gap: 2
          }}
        >
          <img
            src={moodboard.cover_image || previewImages[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'}
            alt={moodboard.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {previewImages.length > 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              {previewImages.slice(1, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  style={{ width: '100%', height: '50%', objectFit: 'cover' }}
                />
              ))}
            </div>
          )}

          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: 'rgba(38, 35, 33, 0.75)',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.6875rem',
              backdropFilter: 'blur(4px)'
            }}
          >
            {moodboard.item_ids?.length || 0} Pieces
          </div>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
            <Link to={`/moodboards/${moodboard.id}`}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  color: 'var(--color-charcoal)',
                  fontWeight: 400
                }}
              >
                {moodboard.name}
              </h3>
            </Link>

            <div style={{ display: 'flex', gap: '4px' }}>
              {onEdit && (
                <button
                  onClick={() => onEdit(moodboard)}
                  style={{ color: 'var(--color-muted-text)', padding: '4px', cursor: 'pointer' }}
                  aria-label="Edit Moodboard"
                >
                  <Edit3 size={14} />
                </button>
              )}
              <button
                onClick={() => deleteMoodboard(moodboard.id)}
                style={{ color: 'var(--color-muted-text)', padding: '4px', cursor: 'pointer' }}
                aria-label="Delete Moodboard"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-muted-text)',
              lineHeight: 1.5,
              marginBottom: '1rem'
            }}
          >
            {moodboard.description || 'Personal moodboard collection.'}
          </p>
        </div>

        <Link
          to={`/moodboards/${moodboard.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-charcoal)'
          }}
        >
          View Full Curation <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}
