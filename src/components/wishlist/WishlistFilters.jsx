import React from 'react';

export function WishlistFilters({
  activeFilter,
  onFilterChange,
  activePriority,
  onPriorityChange,
  activeStatus,
  onStatusChange,
  sortBy,
  onSortChange
}) {
  const categoryFilters = [
    { id: 'all', label: 'All Items' },
    { id: 'cat-fashion', label: 'Fashion' },
    { id: 'cat-beauty', label: 'Beauty' },
    { id: 'cat-shoes', label: 'Shoes' },
    { id: 'cat-bags', label: 'Bags' },
    { id: 'cat-jewelry', label: 'Jewelry' },
    { id: 'cat-perfumes', label: 'Perfumes' },
    { id: 'cat-sarees', label: 'Sarees' },
    { id: 'sale', label: 'On Sale' },
    { id: 'drops', label: 'Price Drops' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'dream', label: '✨ Dream Items' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'wanted', label: 'Wanted' },
    { value: 'watching', label: 'Watching Closely' },
    { value: 'purchased', label: 'Purchased' },
    { value: 'archived', label: 'Archived' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
      {/* Category Pills Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px',
          scrollbarWidth: 'none'
        }}
      >
        {categoryFilters.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.8125rem',
                letterSpacing: '0.04em',
                borderRadius: 'var(--radius-full)',
                border: isActive ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.12)',
                backgroundColor: isActive ? 'var(--color-charcoal)' : 'var(--color-white)',
                color: isActive ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls (Priority, Status, Sort) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          paddingTop: '0.5rem',
          borderTop: 'var(--border-hairline)'
        }}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={activePriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="select-field"
            style={{ width: 'auto', padding: '0.4rem 1.8rem 0.4rem 0.75rem', fontSize: '0.8125rem' }}
          >
            {priorityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={activeStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="select-field"
            style={{ width: 'auto', padding: '0.4rem 1.8rem 0.4rem 0.75rem', fontSize: '0.8125rem' }}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted-text)', fontWeight: 600 }}>
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="select-field"
            style={{ width: 'auto', padding: '0.4rem 1.8rem 0.4rem 0.75rem', fontSize: '0.8125rem' }}
          >
            <option value="recent">Recently Added</option>
            <option value="priority">Priority: Dream First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="brand">Brand A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
