import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Mail, Bell, Sparkles, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotifications();
  const [savedNotice, setSavedNotice] = React.useState(false);

  const togglePref = (key) => {
    updatePreferences({ [key]: !preferences[key] });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const notificationOptions = [
    {
      key: 'price_drop_enabled',
      title: 'PRICE DROP',
      desc: '“Tell me when something I love becomes cheaper.”'
    },
    {
      key: 'restock_enabled',
      title: 'RESTOCK',
      desc: '“Tell me when my saved item comes back in inventory.”'
    },
    {
      key: 'new_product_enabled',
      title: 'NEW PRODUCT',
      desc: '“Tell me when my favorite brands release something new.”'
    },
    {
      key: 'new_collection_enabled',
      title: 'NEW COLLECTION',
      desc: '“Tell me when a favorite brand launches a seasonal runway collection.”'
    },
    {
      key: 'sale_enabled',
      title: 'SALE ALERTS',
      desc: '“Tell me when something on my wishlist goes on markdown.”'
    },
    {
      key: 'limited_edition_enabled',
      title: 'LIMITED EDITION',
      desc: '“Tell me when something rare and limited becomes available.”'
    },
    {
      key: 'weekly_digest_enabled',
      title: 'WEEKLY EDIT',
      desc: '“Send me a beautiful weekly summary of my wishlist movements.”'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)',
        borderRadius: 'var(--radius-xs)',
        padding: '2rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: 'var(--border-hairline)' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', margin: 0 }}>
            Luxury Alert Preferences
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', margin: '4px 0 0' }}>
            Choose how WISHÉ gracefully keeps you informed on your dream pieces.
          </p>
        </div>
        {savedNotice && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={14} /> Saved
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {notificationOptions.map((opt) => {
          const isEnabled = Boolean(preferences[opt.key]);
          return (
            <div
              key={opt.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: isEnabled ? 'var(--color-cream-light)' : 'transparent',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(38, 35, 33, 0.06)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: isEnabled ? 'var(--color-charcoal)' : 'var(--color-muted-text)',
                    display: 'block',
                    marginBottom: '2px'
                  }}
                >
                  {opt.title}
                </span>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', margin: 0, fontStyle: 'italic' }}>
                  {opt.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => togglePref(opt.key)}
                style={{
                  width: '46px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: isEnabled ? 'var(--color-charcoal)' : 'var(--color-cream)',
                  border: '1px solid rgba(38, 35, 33, 0.15)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  flexShrink: 0,
                  marginLeft: '1rem'
                }}
                aria-label={`Toggle ${opt.title}`}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-white)',
                    position: 'absolute',
                    top: '2px',
                    left: isEnabled ? '24px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Email Frequency Toggles */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: 'var(--border-hairline)' }}>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
          Delivery Frequency
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { key: 'instant_notifications', label: 'Instant Alerts', sub: 'Immediately as events occur' },
            { key: 'daily_digest', label: 'Daily Digest', sub: 'Evening compilation at 8 PM' },
            { key: 'weekly_digest', label: 'Weekly Edit', sub: 'Sunday morning luxury briefing' }
          ].map((freq) => (
            <div
              key={freq.key}
              onClick={() => togglePref(freq.key)}
              style={{
                padding: '1rem',
                border: preferences[freq.key] ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                backgroundColor: preferences[freq.key] ? 'var(--color-cream-light)' : 'var(--color-white)',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.875rem' }}>{freq.label}</strong>
                {preferences[freq.key] && <Check size={14} color="#262321" />}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', margin: 0 }}>
                {freq.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
