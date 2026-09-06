import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-ivory)',
        padding: '5rem 0 3rem',
        marginTop: '6rem',
        borderTop: '1px solid rgba(216, 197, 165, 0.2)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Newsletter & Brand Philosophy Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(248, 245, 240, 0.1)'
          }}
          className="footer-top-grid"
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.15rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem',
                color: 'var(--color-ivory)'
              }}
            >
              NARMEEN WISHLIST
            </span>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.35rem',
                fontStyle: 'italic',
                color: 'var(--color-champagne)',
                maxWidth: '480px',
                lineHeight: 1.4,
                marginBottom: '1.5rem'
              }}
            >
              “Things you love, beautifully remembered.”
            </p>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-muted-light)',
                maxWidth: '520px',
                lineHeight: 1.6
              }}
            >
              A quiet digital sanctuary for luxury fashion, couture bridal, fine jewelry, and sensory beauty. Follow your favorite maisons and let Narmeen Wishlist gracefully watch prices and restocks on your behalf.
            </p>
          </div>

          <div>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-champagne)',
                display: 'block',
                marginBottom: '0.75rem'
              }}
            >
              The Editorial Gazette
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                color: 'var(--color-ivory)',
                marginBottom: '1rem',
                fontWeight: 400
              }}
            >
              Receive the private weekly edit.
            </h3>

            {subscribed ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(61, 107, 82, 0.25)',
                  border: '1px solid rgba(61, 107, 82, 0.5)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--color-champagne)'
                }}
              >
                <Check size={18} color="#D8C5A5" />
                <span style={{ fontSize: '0.875rem' }}>You are now subscribed to the Narmeen Wishlist private edit.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-ivory)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <Button type="submit" variant="luxury" size="sm">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem',
            padding: '3.5rem 0',
            borderBottom: '1px solid rgba(248, 245, 240, 0.08)'
          }}
          className="footer-links-grid"
        >
          <div>
            <h4 style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              Curated Edits
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/discover" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>New Arrivals</Link></li>
              <li><Link to="/categories/fashion" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Fashion & Tailoring</Link></li>
              <li><Link to="/categories/sarees" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Organza Sarees</Link></li>
              <li><Link to="/categories/bags" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Investment Bags</Link></li>
              <li><Link to="/categories/perfumes" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Bespoke Perfumery</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              Featured Maisons
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/brands/chanel" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>CHANEL</Link></li>
              <li><Link to="/brands/elan" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>ÉLAN</Link></li>
              <li><Link to="/brands/dior" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>DIOR</Link></li>
              <li><Link to="/brands/sapphire" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>SAPPHIRE</Link></li>
              <li><Link to="/brands/mejuri" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>MEJURI</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              Personal Journal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/wishlist" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>My Saved Pieces</Link></li>
              <li><Link to="/moodboards" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Inspiration Boards</Link></li>
              <li><Link to="/notifications" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Price & Stock Alerts</Link></li>
              <li><Link to="/onboarding" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Personal Style Quiz</Link></li>
              <li><Link to="/settings" style={{ color: 'var(--color-muted-light)', fontSize: '0.875rem' }}>Notification Preferences</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              Architecture & Trust
            </h4>
            <p style={{ color: 'var(--color-muted-light)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Built with client-first privacy and Supabase PostgreSQL. Automation-ready for scheduled luxury monitoring.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-champagne)', fontSize: '0.75rem' }}>
              <Sparkles size={13} />
              <span>Direct Managed Database Architecture</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            fontSize: '0.75rem',
            color: 'var(--color-muted-light)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} Narmeen Wishlist. Things you love, beautifully remembered. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Curation</span>
            <span>Security & RLS</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
