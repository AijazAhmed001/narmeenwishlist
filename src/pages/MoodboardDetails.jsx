import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { MoodboardEditor } from '../components/moodboard/MoodboardEditor';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ArrowLeft, Edit3, Trash2, Plus, Bookmark } from 'lucide-react';

export function MoodboardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { moodboards, deleteMoodboard, removeProductFromMoodboard } = useWishlist();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const moodboard = moodboards.find((mb) => mb.id === id) || moodboards[0];

  const boardProducts = useMemo(() => {
    if (!moodboard?.item_ids) return [];
    return moodboard.item_ids
      .map((pid) => products.find((p) => p.id === pid))
      .filter(Boolean);
  }, [moodboard]);

  if (!moodboard) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <h2>Moodboard not found</h2>
        <Link to="/moodboards">
          <Button variant="primary" style={{ marginTop: '1rem' }}>
            Return to Moodboards
          </Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Delete moodboard "${moodboard.name}"?`)) {
      deleteMoodboard(moodboard.id);
      navigate('/moodboards');
    }
  };

  return (
    <div>
      {/* Moodboard Header */}
      <div
        style={{
          position: 'relative',
          height: '320px',
          backgroundColor: 'var(--color-charcoal)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '3.5rem'
        }}
      >
        <img
          src={moodboard.cover_image}
          alt={moodboard.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, position: 'absolute', inset: 0 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'var(--color-ivory)' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-champagne)', fontWeight: 600 }}>
            {boardProducts.length} Collected Pieces
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-white)',
              fontWeight: 400,
              margin: '0.25rem 0 0.5rem'
            }}
          >
            {moodboard.name}
          </h1>
          <p style={{ maxWidth: '560px', margin: '0 auto 1.5rem', fontSize: '1rem', color: 'var(--color-cream)' }}>
            {moodboard.description}
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Button variant="soft" size="sm" onClick={() => setIsEditorOpen(true)}>
              <Edit3 size={14} /> Edit Moodboard
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete} style={{ color: 'var(--color-soft-pink)' }}>
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <Link to="/moodboards" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--color-muted-text)' }}>
            <ArrowLeft size={14} /> Back to All Moodboards
          </Link>
          <Link to="/discover">
            <Button variant="secondary" size="sm">
              <Plus size={14} /> Add Pieces from Discover
            </Button>
          </Link>
        </div>

        {boardProducts.length === 0 ? (
          <EmptyState
            title="This moodboard is empty."
            subtitle="Start collecting pieces from the discovery lounge or your wishlist into this capsule."
            actionText="Explore Pieces"
            actionLink="/discover"
            icon={Bookmark}
          />
        ) : (
          <div className="product-grid">
            {boardProducts.map((p) => (
              <div key={p.id} style={{ position: 'relative' }}>
                <ProductCard
                  product={p}
                  onQuickView={setQuickViewProduct}
                />
                <button
                  onClick={() => removeProductFromMoodboard(moodboard.id, p.id)}
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(38, 35, 33, 0.1)',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-sale-accent)'
                  }}
                  title="Remove from this moodboard"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <MoodboardEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        moodboard={moodboard}
      />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}


