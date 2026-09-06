import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Sparkles, Heart, Bell, Settings, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

export function MobileMenu({ isOpen, onClose, navLinks }) {
  const { stats } = useWishlist();
  const { unreadCount } = useNotifications();
  const { user, profile } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(38, 35, 33, 0.6)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '85%',
              maxWidth: 360,
              backgroundColor: 'var(--color-ivory)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-floating)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}
                  >
                    NARMEEN WISHLIST
                  </span>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-cream)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      color: 'var(--color-charcoal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.25rem 0'
                    }}
                  >
                    <span>{link.name}</span>
                    {Boolean(link.badge) && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: 'var(--color-cream)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="editorial-divider" style={{ margin: '1.5rem 0' }} />

              {/* Quick links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <Link
                  to="/notifications"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    color: 'var(--color-charcoal)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bell size={16} /> Notification Center
                  </span>
                  {unreadCount > 0 && (
                    <span
                      style={{
                        backgroundColor: 'var(--color-sale-accent)',
                        color: '#fff',
                        fontSize: '0.6875rem',
                        padding: '1px 6px',
                        borderRadius: '10px'
                      }}
                    >
                      {unreadCount} new
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    color: 'var(--color-charcoal)'
                  }}
                >
                  <User size={16} /> My Taste Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    color: 'var(--color-charcoal)'
                  }}
                >
                  <Settings size={16} /> Preferences & Alerts
                </Link>
              </div>
            </div>

            {/* Bottom Style Interview CTA */}
            <div>
              <Link
                to="/onboarding"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-cream)',
                  border: '1px solid rgba(38, 35, 33, 0.1)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)'
                }}
              >
                <Sparkles size={16} color="var(--color-dusty-rose-dark)" /> Redo Style Interview
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
