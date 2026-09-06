import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ArrowDown, Sparkles, Heart, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

export function ToastContainer() {
  const { toasts, removeToast } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'PRICE_DROP':
        return <ArrowDown size={16} color="#9E3A3A" />;
      case 'BACK_IN_STOCK':
        return <Heart size={16} color="#3D6B52" />;
      case 'LIMITED_EDITION':
      case 'NEW_COLLECTION':
        return <Sparkles size={16} color="#D8C5A5" />;
      default:
        return <Bell size={16} color="#262321" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.toastId}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid rgba(38, 35, 33, 0.15)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-floating)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              pointerEvents: 'auto',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div
              style={{
                marginTop: '2px',
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {getIcon(toast.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--color-charcoal)',
                  marginBottom: '2px'
                }}
              >
                {toast.title}
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-muted-text)',
                  lineHeight: 1.4,
                  marginBottom: '6px'
                }}
              >
                {toast.message}
              </div>
              <Link
                to="/notifications"
                onClick={() => removeToast(toast.toastId)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-charcoal)',
                  textDecoration: 'underline',
                  letterSpacing: '0.04em'
                }}
              >
                View in Notification Center →
              </Link>
            </div>

            <button
              onClick={() => removeToast(toast.toastId)}
              style={{
                color: 'var(--color-muted-text)',
                cursor: 'pointer',
                padding: '2px',
                lineHeight: 1
              }}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
