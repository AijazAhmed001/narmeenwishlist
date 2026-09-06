import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export function ProductSort({ sortBy, onSortChange, totalCount = 0 }) {
  const sortOptions = [
    { value: 'featured', label: 'Featured & Editorial Picks' },
    { value: 'newest', label: 'Recently Added' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'discount', label: 'Highest Discount' },
    { value: 'brand', label: 'Maison / Brand A–Z' }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: 'var(--border-hairline)'
      }}
    >
      <div style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)' }}>
        Showing <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{totalCount}</span> exquisite pieces
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
          Sort By:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="select-field"
          style={{ width: 'auto', padding: '0.45rem 2rem 0.45rem 0.75rem', fontSize: '0.8125rem' }}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
