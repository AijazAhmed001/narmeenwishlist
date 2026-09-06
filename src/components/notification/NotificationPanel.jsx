import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationCard } from './NotificationCard';
import { Bell, CheckCheck } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export function NotificationPanel() {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  return (
    <div
      style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)',
        borderRadius: 'var(--radius-xs)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-subtle)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: 'var(--border-hairline)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'var(--color-sale-accent)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '10px'
              }}
            >
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: 'var(--color-muted-text)',
              cursor: 'pointer'
            }}
          >
            <CheckCheck size={14} /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title="You're all caught up."
          subtitle="When a saved product changes in price, comes back in stock, or launches a new collection, you'll see it here."
          actionText=""
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notifications.slice(0, 5).map((n) => (
            <NotificationCard key={n.id} notification={n} />
          ))}

          {notifications.length > 5 && (
            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
              <Link
                to="/notifications"
                style={{ fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'underline' }}
              >
                View all {notifications.length} notifications →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
