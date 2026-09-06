import React, { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Search, ArrowRight, Tag, Bookmark, ShieldCheck, X } from 'lucide-react';
import { products } from '../../data/products';
import { brands } from '../../data/brands';
import { categories } from '../../data/categories';
import { formatPrice } from '../../lib/helpers';
import { Link } from 'react-router-dom';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], brands: [], categories: [] };

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand_name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q)
    );

    const matchedBrands = brands.filter(
      (b) => b.name.toLowerCase().includes(q) || b.country.toLowerCase().includes(q)
    );

    const matchedCategories = categories.filter((c) => c.name.toLowerCase().includes(q));

    return {
      products: matchedProducts.slice(0, 6),
      brands: matchedBrands.slice(0, 4),
      categories: matchedCategories.slice(0, 4)
    };
  }, [query]);

  const hasResults =
    filtered.products.length > 0 || filtered.brands.length > 0 || filtered.categories.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="680px" showClose={false}>
      {/* Search Input Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(38, 35, 33, 0.15)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <Search size={22} color="var(--color-charcoal)" />
        <input
          type="text"
          placeholder="Search luxury pieces, iconic houses, organza sarees..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1.15rem',
            fontFamily: 'var(--font-heading)',
            backgroundColor: 'transparent',
            color: 'var(--color-charcoal)'
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ color: 'var(--color-muted-text)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Suggested Quick Searches */}
      {!query && (
        <div>
          <span style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            Trending Curations
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Coach Tabby', 'ÉLAN Saree', 'Dior Rosewood', 'Mejuri Hoops', 'Prada Slingback', 'Silk Midi Dress'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                style={{
                  padding: '0.4rem 0.85rem',
                  backgroundColor: 'var(--color-cream-light)',
                  border: '1px solid rgba(38, 35, 33, 0.08)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-charcoal)',
                  cursor: 'pointer'
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Container */}
      {query && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '420px', overflowY: 'auto' }}>
          {!hasResults ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-muted-text)' }}>
              No pieces or houses found matching “{query}”.
            </div>
          ) : (
            <>
              {/* Brands */}
              {filtered.brands.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                    Maisons & Brands
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {filtered.brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/brands/${brand.slug}`}
                        onClick={onClose}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.8rem',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--color-cream-light)',
                          color: 'var(--color-charcoal)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <ShieldCheck size={16} color="var(--color-dusty-rose-dark)" />
                          <strong style={{ fontSize: '0.875rem' }}>{brand.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>• {brand.country}</span>
                        </div>
                        <ArrowRight size={14} color="var(--color-muted-light)" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {filtered.products.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                    Curated Pieces
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filtered.products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid rgba(38, 35, 33, 0.06)',
                          backgroundColor: 'var(--color-white)'
                        }}
                      >
                        <img
                          src={product.image_url}
                          alt={product.name}
                          style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: '2px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
                            {product.brand_name}
                          </div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>
                            {product.name}
                          </div>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                          {formatPrice(product.price, product.currency)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {filtered.categories.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                    Categories
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {filtered.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/categories/${cat.slug}`}
                        onClick={onClose}
                        style={{
                          padding: '0.4rem 0.85rem',
                          backgroundColor: 'var(--color-cream)',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.8125rem',
                          color: 'var(--color-charcoal)'
                        }}
                      >
                        {cat.name} ({cat.item_count})
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
