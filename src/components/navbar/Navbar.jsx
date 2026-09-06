import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Bell,
  Search,
  Menu,
  X,
  User,
  Settings,
  Sparkles,
  LogOut,
  Sliders,
  Bookmark,
  Home,
  Compass
} from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { MobileMenu } from './MobileMenu';

export function Navbar({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { stats } = useWishlist();
  const { unreadCount } = useNotifications();
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'NEW', path: '/discover?filter=new' },
    { name: 'FASHION', path: '/categories/fashion' },
    { name: 'BEAUTY', path: '/categories/beauty' },
    { name: 'SAREES', path: '/categories/sarees' },
    { name: 'SHOES', path: '/categories/shoes' },
    { name: 'BAGS', path: '/categories/bags' },
    { name: 'JEWELRY', path: '/categories/jewelry' },
    { name: 'PERFUME', path: '/categories/perfumes' },
    { name: 'BRANDS', path: '/brands' }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: scrolled ? 'rgba(248, 246, 241, 0.94)' : 'var(--color-ivory)',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: '1px solid rgba(43, 41, 40, 0.07)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '0.75rem 0' : '1.1rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* LEFT: WISHÉ Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{
                display: 'none',
                color: 'var(--color-charcoal)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0
              }}
            >
              <Menu size={22} />
            </button>

            <Link to="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.45rem',
                  letterSpacing: '0.12em',
                  fontWeight: 400,
                  color: 'var(--color-charcoal)',
                  textTransform: 'uppercase',
                  display: 'block',
                  lineHeight: 1
                }}
              >
                NARMEEN WISHLIST
              </span>
              <span
                className="logo-subtext"
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-muted-text)',
                  fontStyle: 'italic',
                  display: 'block',
                  marginTop: '2px'
                }}
              >
                Things you love, beautifully remembered
              </span>
            </Link>
          </div>

          {/* CENTER: Editorial Category Links */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              overflowX: 'auto',
              padding: '0 0.5rem'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    fontWeight: isActive ? 600 : 500,
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-charcoal)' : 'var(--color-muted-text)',
                    position: 'relative',
                    padding: '0.35rem 0',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 1.5,
                        backgroundColor: 'var(--color-charcoal)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions (Search, Wishlist, Notifications, Profile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search brands and collections"
              style={{
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: '4px'
              }}
            >
              <Search size={18} />
              <span className="search-hint" style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Search</span>
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              to="/wishlist"
              aria-label="View Saved Wishlist"
              style={{
                position: 'relative',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              <Heart size={19} />
              {stats.totalSaved > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -6,
                    backgroundColor: 'var(--color-charcoal)',
                    color: 'var(--color-ivory)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {stats.totalSaved}
                </span>
              )}
            </Link>

            {/* Notifications with Live Indicator */}
            <Link
              to="/notifications"
              aria-label="Notification Center"
              style={{
                position: 'relative',
                color: 'var(--color-charcoal)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -2,
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-sale-accent)'
                  }}
                />
              )}
            </Link>

            {/* User Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-label="User Account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-charcoal)',
                  cursor: 'pointer',
                  padding: '2px',
                  borderRadius: '50%',
                  background: 'none',
                  border: 'none'
                }}
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid rgba(43,41,40,0.15)'
                    }}
                  />
                ) : (
                  <User size={19} />
                )}
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 10px)',
                      width: 220,
                      backgroundColor: 'var(--color-white)',
                      border: 'var(--border-hairline)',
                      borderRadius: 'var(--radius-xs)',
                      boxShadow: 'var(--shadow-floating)',
                      padding: '0.75rem 0',
                      zIndex: 1000
                    }}
                  >
                    <div style={{ padding: '0.5rem 1.25rem', borderBottom: 'var(--border-hairline)' }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>
                        {profile?.display_name || 'Member'}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                        @{profile?.username || 'member'}
                      </p>
                    </div>

                    <div style={{ padding: '0.5rem 0' }}>
                      <Link
                        to="/profile"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.8125rem',
                          color: 'var(--color-charcoal)',
                          textDecoration: 'none'
                        }}
                      >
                        <User size={14} /> My Profile
                      </Link>
                      <Link
                        to="/wishlist"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.8125rem',
                          color: 'var(--color-charcoal)',
                          textDecoration: 'none'
                        }}
                      >
                        <Heart size={14} /> Saved Pieces ({stats.totalSaved})
                      </Link>
                      <Link
                        to="/moodboards"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.8125rem',
                          color: 'var(--color-charcoal)',
                          textDecoration: 'none'
                        }}
                      >
                        <Bookmark size={14} /> Moodboards
                      </Link>
                      <Link
                        to="/settings"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.5rem 1.25rem',
                          fontSize: '0.8125rem',
                          color: 'var(--color-charcoal)',
                          textDecoration: 'none'
                        }}
                      >
                        <Settings size={14} /> Settings & Alerts
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 890,
          backgroundColor: 'rgba(248, 246, 241, 0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(43, 41, 40, 0.1)',
          display: 'none',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0.5rem 0.25rem'
        }}
      >
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: location.pathname === '/' ? 'var(--color-charcoal)' : 'var(--color-muted-text)', textDecoration: 'none', fontSize: '0.625rem', fontWeight: 600 }}>
          <Home size={18} />
          <span>HOME</span>
        </Link>
        <Link to="/discover" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: location.pathname === '/discover' ? 'var(--color-charcoal)' : 'var(--color-muted-text)', textDecoration: 'none', fontSize: '0.625rem', fontWeight: 600 }}>
          <Compass size={18} />
          <span>DISCOVER</span>
        </Link>
        <Link to="/wishlist" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: location.pathname === '/wishlist' ? 'var(--color-charcoal)' : 'var(--color-muted-text)', textDecoration: 'none', fontSize: '0.625rem', fontWeight: 600, position: 'relative' }}>
          <Heart size={18} />
          <span>WISHLIST</span>
          {stats.totalSaved > 0 && (
            <span style={{ position: 'absolute', top: -2, right: 6, width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-ivory)', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stats.totalSaved}
            </span>
          )}
        </Link>
        <Link to="/notifications" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: location.pathname === '/notifications' ? 'var(--color-charcoal)' : 'var(--color-muted-text)', textDecoration: 'none', fontSize: '0.625rem', fontWeight: 600 }}>
          <Bell size={18} />
          <span>ALERTS</span>
        </Link>
        <Link to="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: location.pathname === '/profile' ? 'var(--color-charcoal)' : 'var(--color-muted-text)', textDecoration: 'none', fontSize: '0.625rem', fontWeight: 600 }}>
          <User size={18} />
          <span>PROFILE</span>
        </Link>
      </nav>

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
          .search-hint {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
          body {
            padding-bottom: 60px;
          }
        }
      `}</style>
    </>
  );
}
