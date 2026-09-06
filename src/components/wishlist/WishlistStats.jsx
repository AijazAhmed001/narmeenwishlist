import React from 'react';
import { Sparkles, TrendingDown, RefreshCw, Bookmark, Award, Heart } from 'lucide-react';
import { formatPrice } from '../../lib/helpers';

export function WishlistStats({ stats }) {
  return (
    <div className="stats-container">
      <div className="stat-item">
        <span className="stat-value">{stats.totalSaved}</span>
        <span className="stat-label">Saved Pieces</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">{stats.favoriteBrandsCount}</span>
        <span className="stat-label">Favorite Maisons</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">{formatPrice(stats.totalValue)}</span>
        <span className="stat-label">Wishlist Value</span>
      </div>

      <div className="stat-item">
        <span className="stat-value" style={{ color: 'var(--color-sale-accent)' }}>
          {stats.priceDropsCount}
        </span>
        <span className="stat-label">Price Drops</span>
      </div>

      <div className="stat-item">
        <span className="stat-value" style={{ color: 'var(--color-success)' }}>
          {stats.restocksCount}
        </span>
        <span className="stat-label">Restocked & Live</span>
      </div>

      <div className="stat-item">
        <span className="stat-value" style={{ color: 'var(--color-champagne-dark)' }}>
          {stats.dreamItemsCount}
        </span>
        <span className="stat-label">Dream Grail Items</span>
      </div>
    </div>
  );
}
