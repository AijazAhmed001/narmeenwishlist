import React, { useState, useMemo } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { WishlistStats } from '../components/wishlist/WishlistStats';
import { WishlistFilters } from '../components/wishlist/WishlistFilters';
import { WishlistGrid } from '../components/wishlist/WishlistGrid';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, Plus, Download } from 'lucide-react';

export function Wishlist() {
  const { fullWishlistProducts, stats } = useWishlist();

  const [activeFilter, setActiveFilter] = useState('all');
  const [activePriority, setActivePriority] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [editingProduct, setEditingProduct] = useState(null);

  // Filter and Sort Wishlist Products
  const filteredItems = useMemo(() => {
    return fullWishlistProducts
      .filter((item) => {
        if (activeFilter === 'sale' && !item.is_sale) return false;
        if (activeFilter === 'drops') {
          const hasDrop = item.price_history && item.price_history.length > 1 && item.price < item.price_history[0].price;
          if (!hasDrop) return false;
        }
        if (activeFilter !== 'all' && activeFilter !== 'sale' && activeFilter !== 'drops' && item.category_id !== activeFilter) {
          return false;
        }
        if (activePriority !== 'all' && item.priority !== activePriority) {
          return false;
        }
        if (activeStatus !== 'all' && item.status !== activeStatus) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'priority':
            const prioWeight = { dream: 4, high: 3, medium: 2, low: 1 };
            return (prioWeight[b.priority] || 0) - (prioWeight[a.priority] || 0);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'brand':
            return a.brand_name.localeCompare(b.brand_name);
          default:
            return new Date(b.added_at || 0) - new Date(a.added_at || 0);
        }
      });
  }, [fullWishlistProducts, activeFilter, activePriority, activeStatus, sortBy]);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Wishlist Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="editorial-tag">Personal Shopping Journal</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              My Saved Pieces
            </h1>
            <p style={{ color: 'var(--color-muted-text)', fontSize: '0.95rem', margin: 0 }}>
              Things you love, beautifully remembered. Narmeen Wishlist watches prices, restocks, and sales for you.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/discover">
              <Button variant="luxury" size="sm">
                <Plus size={14} /> Add New Piece
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Metrics Stats */}
        <WishlistStats stats={stats} />

        {/* Filters and Ordering Bar */}
        <WishlistFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activePriority={activePriority}
          onPriorityChange={setActivePriority}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Grid */}
        <WishlistGrid
          items={filteredItems}
          onEditItem={(p) => setEditingProduct(p)}
        />
      </div>

      {/* Edit / QuickView Modal */}
      <ProductQuickView
        product={editingProduct}
        isOpen={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
      />
    </div>
  );
}


