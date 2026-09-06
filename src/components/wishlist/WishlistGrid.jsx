import React from 'react';
import { WishlistCard } from './WishlistCard';
import { EmptyState } from '../ui/EmptyState';
import { Heart } from 'lucide-react';

export function WishlistGrid({ items = [], onEditItem }) {
  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is waiting."
        subtitle="Save the pieces you adore. Follow what inspires you. Never miss what happens next."
        actionText="Discover Beautiful Pieces"
        actionLink="/discover"
        icon={Heart}
      />
    );
  }

  return (
    <div className="product-grid">
      {items.map((product) => (
        <WishlistCard
          key={product.wishlist_id || product.id}
          product={product}
          onEdit={onEditItem}
        />
      ))}
    </div>
  );
}
