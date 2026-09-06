import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUp,
  Heart,
  Sparkles,
  Tag,
  Clock,
  Trash2,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { formatRelativeTime } from '../../lib/helpers';
import { useNotifications } from '../../context/NotificationContext';

export function NotificationCard({ notification }) {
  const { markAsRead, deleteNotification } = useNotifications();

  if (!notification) return null;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'PRICE_DROP':
        return <ArrowDown size={16} color="#9E3A3A" />;
      case 'PRICE_INCREASE':
        return <ArrowUp size={16} color="#77716C" />;
      case 'BACK_IN_STOCK':
        return <Heart size={16} color="#3D6B52" fill="#3D6B52" />;
      case 'LIMITED_EDITION':
      case 'NEW_COLLECTION':
        return <Sparkles size={16} color="#D8C5A5" />;
      case 'SALE_STARTED':
        return <Tag size={16} color="#9E3A3A" />;
      default:
        return <Clock size={16} color="#262321" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1.25rem',
        backgroundColor: notification.is_read ? 'var(--color-white)' : 'var(--color-cream-light)',
        border: notification.is_read ? 'var(--border-hairline)' : '1px solid rgba(201, 166, 160, 0.4)',
        borderRadius: 'var(--radius-xs)',
        position: 'relative',
        transition: 'all var(--transition-fast)'
      }}
    >
      {/* Type Icon */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid rgba(38, 35, 33, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}
      >
        {getNotificationIcon(notification.type)}
      </div>

      {/* Message Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              color: 'var(--color-charcoal)',
              fontWeight: notification.is_read ? 400 : 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {notification.title}
            {!notification.is_read && (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-sale-accent)'
                }}
              />
            )}
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-light)' }}>
            {formatRelativeTime(notification.created_at)}
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', lineHeight: 1.5, marginBottom: '8px' }}>
          {notification.message}
        </p>

        {/* Action Link & Mark Read */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '4px' }}>
          {notification.product_id && (
            <Link
              to={`/product/${notification.product_id}`}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-charcoal)',
                textDecoration: 'underline',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View Saved Piece <ExternalLink size={11} />
            </Link>
          )}

          {!notification.is_read && (
            <button
              onClick={() => markAsRead(notification.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                color: 'var(--color-muted-text)',
                cursor: 'pointer'
              }}
            >
              <CheckCircle size={12} /> Mark as read
            </button>
          )}

          <button
            onClick={() => deleteNotification(notification.id)}
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-muted-light)',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
            aria-label="Delete notification"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
