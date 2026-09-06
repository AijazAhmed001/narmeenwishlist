import React, { useState, useMemo } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useWishlist } from '../context/WishlistContext';
import { brands } from '../data/brands';
import { NotificationCard } from '../components/notification/NotificationCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Bell, CheckCheck, Sparkles, Sliders, ArrowDown, Heart, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Notifications() {
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    addNotification
  } = useNotifications();

  const { followedBrands, toggleFollowBrand, isFollowingBrand } = useWishlist();

  const [activeTab, setActiveTab] = useState('all');
  const [followedOnly, setFollowedOnly] = useState(false);

  const filteredNotifications = useMemo(() => {
    let list = notifications;

    // Filter by followed brands if toggle enabled or if user selected followed tab
    if (followedOnly || activeTab === 'followed') {
      list = list.filter(n => !n.brand_id || followedBrands.includes(n.brand_id));
    }

    switch (activeTab) {
      case 'price':
        return list.filter((n) => n.type === 'PRICE_DROP' || n.type === 'PRICE_INCREASE');
      case 'restock':
        return list.filter((n) => n.type === 'BACK_IN_STOCK');
      case 'releases':
        return list.filter((n) => n.type === 'NEW_PRODUCT' || n.type === 'NEW_COLLECTION');
      case 'limited':
        return list.filter((n) => n.type === 'LIMITED_EDITION');
      default:
        return list;
    }
  }, [notifications, activeTab, followedOnly, followedBrands]);

  // Simulation helpers for testing
  const triggerFollowedBrandPriceDrop = (brand) => {
    addNotification({
      type: 'PRICE_DROP',
      title: `Price Drop: ${brand.name}`,
      message: `↓ A piece from your followed brand ${brand.name} just went on sale.`,
      brand_id: brand.id
    });
  };

  const triggerFollowedBrandNewIn = (brand) => {
    addNotification({
      type: 'NEW_PRODUCT',
      title: `New Drop from ${brand.name}`,
      message: `✦ ${brand.name} just added a new seasonal piece to their official collection.`,
      brand_id: brand.id
    });
  };

  const topSampleBrands = brands.filter(b => b.isTopBrand).slice(0, 8);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container-narrow">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span className="editorial-tag">Autonomous Luxury Intelligence</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              Notification Center
            </h1>
            <p style={{ color: 'var(--color-muted-text)', fontSize: '0.95rem', margin: 0 }}>
              “Your wishlist just got interesting.” Realtime alerts strictly tailored to your followed brands and saved items.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/settings">
              <Button variant="secondary" size="sm">
                <Sliders size={14} /> Alert & Email Settings
              </Button>
            </Link>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <CheckCheck size={14} /> Mark All as Read
              </Button>
            )}
          </div>
        </div>

        {/* Followed Brands Monitor Bar */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.25rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={16} color="var(--color-rose-deep)" fill={followedBrands.length > 0 ? 'var(--color-rose-deep)' : 'transparent'} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', margin: 0 }}>
                Active Brand Alert Subscriptions ({followedBrands.length})
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setFollowedOnly(!followedOnly)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '12px',
                border: followedOnly ? '1px solid var(--color-charcoal)' : '1px solid rgba(38,35,33,0.15)',
                backgroundColor: followedOnly ? 'var(--color-charcoal)' : 'var(--color-cream-light)',
                color: followedOnly ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                cursor: 'pointer'
              }}
            >
              {followedOnly ? '✓ Showing Followed Brands Only' : 'Filter by Followed Brands'}
            </button>
          </div>

          {followedBrands.length === 0 ? (
            <div style={{ padding: '1rem 0' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', marginBottom: '0.75rem' }}>
                You haven't followed any brands yet. Follow brands to only receive price drops, new arrivals, and sale emails for your favorite labels:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {topSampleBrands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => toggleFollowBrand(b.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.75rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(38,35,33,0.15)',
                      backgroundColor: 'var(--color-cream-light)',
                      color: 'var(--color-charcoal)',
                      cursor: 'pointer'
                    }}
                  >
                    + Follow {b.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {followedBrands.map((bId) => {
                const brand = brands.find(b => b.id === bId);
                if (!brand) return null;
                return (
                  <div
                    key={brand.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8125rem',
                      borderRadius: '16px',
                      backgroundColor: 'var(--color-cream)',
                      border: '1px solid rgba(216, 197, 165, 0.6)'
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{brand.name}</span>
                    <button
                      onClick={() => triggerFollowedBrandPriceDrop(brand)}
                      title="Test price drop alert"
                      style={{ fontSize: '0.6875rem', background: 'none', border: 'none', color: 'var(--color-sale-accent)', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Test Drop
                    </button>
                    <button
                      onClick={() => toggleFollowBrand(brand.id)}
                      title="Unfollow brand"
                      style={{ background: 'none', border: 'none', color: 'var(--color-muted-text)', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'followed', label: `Followed Brands (${followedBrands.length})` },
            { id: 'price', label: 'Price Drops' },
            { id: 'restock', label: 'Restocks' },
            { id: 'releases', label: 'New Drops' },
            { id: 'limited', label: 'Limited Edition' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                borderRadius: 'var(--radius-xs)',
                backgroundColor: activeTab === tab.id ? 'var(--color-charcoal)' : 'var(--color-white)',
                color: activeTab === tab.id ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                border: 'var(--border-hairline)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={activeTab === 'followed' ? 'No Alerts for Followed Brands' : 'No notifications in this filter'}
            description={
              activeTab === 'followed' && followedBrands.length === 0
                ? 'Follow brands from the list above or the Brands page to get personalized price and drop notifications.'
                : 'All caught up! You will be alerted the second a wishlisted product drops in price or your followed brands release new pieces.'
            }
            actionLabel="Discover Brands"
            actionLink="/brands"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredNotifications.map((notif) => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
