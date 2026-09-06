import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { defaultMoodboards } from '../data/moodboards';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { HeartButton } from '../components/ui/HeartButton';
import { Badge } from '../components/ui/Badge';
import { formatPrice, calculateDiscount, formatDate } from '../lib/helpers';
import { useWishlist } from '../context/WishlistContext';
import {
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  Clock,
  Sparkles,
  Check,
  Bell,
  Bookmark,
  ArrowDown
} from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];

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
  const [selectedSize, setSelectedSize] = useState('');

  const inWishlist = isInWishlist(product?.id);
  const tracked = isTracked(product?.id);
  const discount = calculateDiscount(product?.original_price, product?.price);
  const images = product?.images?.length ? product.images : [product?.image_url];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImage(0);
      setSelectedSize(product.sizes?.[0] || '');
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
  }, [id, product]);

  if (!product) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/discover">
          <Button variant="primary" style={{ marginTop: '1rem' }}>
            Return to Discovery
          </Button>
        </Link>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      updateWishlistItem(product.id, { priority, notes, status });
    } else {
      addToWishlist(product.id, priority, notes, status);
    }
  };

  const handleAddToMoodboard = () => {
    if (selectedMoodboard) {
      addProductToMoodboard(selectedMoodboard, product.id);
      setBoardAdded(true);
      setTimeout(() => setBoardAdded(false), 2500);
    }
  };

  // Price history calculations
  const priceHistory = product.price_history || [{ price: product.price, date: '2026-09-01' }];
  const highestPrice = Math.max(...priceHistory.map((h) => h.price));
  const lowestPrice = Math.min(...priceHistory.map((h) => h.price));
  const priceDropAmount = product.original_price - product.price;

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category_id === product.category_id || p.brand_id === product.brand_id))
    .slice(0, 4);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--color-muted-text)', marginBottom: '2rem' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/discover">Discover</Link>
          <span>/</span>
          <Link to={`/categories/${product.category_id?.replace('cat-', '')}`}>{product.category_name}</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-charcoal)', fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* Top Product Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '4.5rem'
          }}
          className="product-details-grid"
        >
          {/* Left: Gallery */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-cream-light)',
                marginBottom: '1rem',
                border: 'var(--border-hairline)',
                position: 'relative'
              }}
            >
              <img
                src={images[activeImage] || product.image_url}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <HeartButton
                  active={inWishlist}
                  onClick={handleWishlistToggle}
                  celebrate={true}
                  size={24}
                />
              </div>
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: activeImage === idx ? '2px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Wishlist Tracking Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <Link
                to={`/brands/${product.brand_id?.replace('brand-', '')}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--color-muted-text)',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                {product.brand_name}
              </Link>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1.15,
                  fontWeight: 400,
                  color: 'var(--color-charcoal)'
                }}
              >
                {product.name}
              </h1>
            </div>

            {/* Price & Discounts */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: product.is_sale ? 'var(--color-sale-accent)' : 'var(--color-charcoal)' }}>
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.is_sale && product.original_price > product.price && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--color-muted-light)', textDecoration: 'line-through' }}>
                    {formatPrice(product.original_price, product.currency)}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {discount > 0 && <Badge variant="sale">-{discount}% Off</Badge>}
                {product.availability === 'in_stock' && <Badge variant="stock">In Stock</Badge>}
                {product.availability === 'limited' && <Badge variant="limited">Limited Edition</Badge>}
              </div>
            </div>

            {/* Product Meta: SKU, Color, Sizes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-xs)', border: 'var(--border-hairline)' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                  Color & Finish
                </span>
                <strong style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>{product.color || 'Signature Tone'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                  Reference SKU
                </span>
                <strong style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>{product.sku || 'WSH-LUX-00'}</strong>
              </div>
            </div>

            {/* Size Selector if available */}
            {product.sizes?.length > 0 && (
              <div>
                <label style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-charcoal)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Select Sizing / Volume
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.8125rem',
                        borderRadius: 'var(--radius-xs)',
                        border: selectedSize === sz ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.15)',
                        backgroundColor: selectedSize === sz ? 'var(--color-charcoal)' : 'var(--color-white)',
                        color: selectedSize === sz ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                        cursor: 'pointer',
                        fontWeight: selectedSize === sz ? 600 : 400
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p style={{ fontSize: '0.925rem', color: 'var(--color-muted-text)', lineHeight: 1.7 }}>
              {product.description}
            </p>

            {/* Wishlist Configuration Box */}
            <div
              style={{
                backgroundColor: 'var(--color-cream-light)',
                border: '1px solid rgba(38, 35, 33, 0.1)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>
                  Personal Wishlist Entry
                </span>
                <span style={{ fontSize: '0.75rem', color: inWishlist ? 'var(--color-success)' : 'var(--color-muted-text)', fontWeight: 600 }}>
                  {inWishlist ? '✓ Saved in Journal' : 'Not yet saved'}
                </span>
              </div>

              {/* Priority */}
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
                        padding: '0.5rem',
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
                      {p === 'dream' ? '✨ Dream' : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', display: 'block', marginBottom: '4px' }}>
                  Journal Note & Buying Goal
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dream bag for 30th birthday, waiting for restock..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--color-white)',
                    border: '1px solid rgba(38, 35, 33, 0.12)',
                    borderRadius: 'var(--radius-xs)'
                  }}
                />
              </div>

              {/* Actions Button */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant={inWishlist ? 'luxury' : 'primary'}
                  size="lg"
                  onClick={handleWishlistToggle}
                  style={{ flex: 1 }}
                >
                  {inWishlist ? 'Update Saved Entry' : 'Save to My Wishlist'}
                </Button>

                <Button
                  variant={tracked ? 'soft' : 'secondary'}
                  size="lg"
                  onClick={() => toggleTracking(product.id)}
                  title="Toggle autonomous tracking"
                >
                  <Bell size={16} color={tracked ? '#D8C5A5' : 'currentColor'} />
                  {tracked ? 'Tracking' : 'Track'}
                </Button>
              </div>
            </div>

            {/* Add to Moodboard & Maison Link */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                <select
                  value={selectedMoodboard}
                  onChange={(e) => setSelectedMoodboard(e.target.value)}
                  className="select-field"
                  style={{ fontSize: '0.8125rem' }}
                >
                  <option value="">Collect into Moodboard...</option>
                  {moodboards.map((mb) => (
                    <option key={mb.id} value={mb.id}>
                      {mb.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant="soft"
                  size="sm"
                  onClick={handleAddToMoodboard}
                  disabled={!selectedMoodboard}
                >
                  {boardAdded ? <Check size={14} color="#3D6B52" /> : <Bookmark size={14} />}
                  {boardAdded ? 'Collected' : 'Add'}
                </Button>
              </div>

              {product.product_url && (
                <a
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--color-charcoal)',
                    color: 'var(--color-ivory)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>SHOP ON OFFICIAL SITE</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 2. PRICE TRACKING & HISTORY SECTION */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '2.5rem',
            marginBottom: '4rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: 'var(--border-hairline)' }}>
            <div>
              <span className="editorial-tag">Autonomous Price Intelligence</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: '4px 0 0' }}>
                Recorded Price & Stock Timeline
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                  Lowest Recorded
                </span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-success)' }}>
                  {formatPrice(lowestPrice, product.currency)}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                  Original / Peak
                </span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-charcoal)' }}>
                  {formatPrice(highestPrice, product.currency)}
                </strong>
              </div>
              {priceDropAmount > 0 && (
                <div>
                  <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                    Total Savings
                  </span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-sale-accent)' }}>
                    -{formatPrice(priceDropAmount, product.currency)} ({discount}%)
                  </strong>
                </div>
              )}
            </div>
          </div>

          {/* Simple Visual Price Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {priceHistory.map((entry, index) => {
              const pctOfMax = Math.round((entry.price / highestPrice) * 100);
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <span style={{ width: '90px', fontSize: '0.8125rem', color: 'var(--color-muted-text)', flexShrink: 0 }}>
                    {formatDate(entry.date)}
                  </span>
                  <div style={{ flex: 1, backgroundColor: 'var(--color-cream-light)', height: '28px', borderRadius: 'var(--radius-xs)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: `${pctOfMax}%`,
                        height: '100%',
                        background: index === priceHistory.length - 1 ? 'linear-gradient(90deg, var(--color-dusty-rose) 0%, var(--color-champagne) 100%)' : 'var(--color-cream)',
                        borderRadius: 'var(--radius-xs)',
                        transition: 'width 0.6s ease'
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        left: '12px',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--color-charcoal)'
                      }}
                    >
                      {formatPrice(entry.price, product.currency)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. RELATED PIECES */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
              Complementary Pieces You May Love
            </h3>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-details-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}


