import React from 'react';

export function Badge({
  variant = 'new',
  children,
  className = '',
  icon: Icon
}) {
  const variantClass = {
    new: 'badge-new',
    sale: 'badge-sale',
    limited: 'badge-limited',
    stock: 'badge-stock',
    out: 'badge-out',
    luxury: 'badge-luxury',
    dream: 'badge-priority-dream',
    high: 'badge-priority-high',
    medium: 'badge-priority-medium',
    low: 'badge-priority-low'
  }[variant] || 'badge-new';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}
