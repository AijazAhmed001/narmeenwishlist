import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { brands } from '../data/brands';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Edit3, Settings, Sparkles, Heart, Bookmark, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../lib/helpers';

export function Profile() {
  const { profile, preferences } = useAuth();
  const { stats, moodboards, followedBrands } = useWishlist();

  const followedBrandObjects = brands.filter((b) => followedBrands.includes(b.id));

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container-narrow">
        {/* Profile Card Header */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '2.5rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-subtle)',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: 'var(--border-hairline)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img
                src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={profile?.display_name}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--color-ivory)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              />
              <div>
                <span className="editorial-tag">Narmeen Wishlist Muse</span>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', margin: '2px 0 4px', fontWeight: 400 }}>
                  {profile?.display_name || 'Narmeen'}
                </h1>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted-text)' }}>
                  @{profile?.username || 'narmeen'} • Member since 2026
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/settings">
                <Button variant="secondary" size="sm">
                  <Settings size={14} /> Settings
                </Button>
              </Link>
              <Link to="/onboarding">
                <Button variant="luxury" size="sm">
                  <Sparkles size={14} /> Redo Style Interview
                </Button>
              </Link>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal)', lineHeight: 1.6, maxWidth: '600px', margin: '0 0 2rem' }}>
            {profile?.bio || 'Curator of modern tailoring, architectural gold, and quiet silhouettes.'}
          </p>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              backgroundColor: 'var(--color-cream-light)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(38, 35, 33, 0.06)'
            }}
            className="profile-metrics-grid"
          >
            <div>
              <span style={{ fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                Saved Pieces
              </span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>{stats.totalSaved}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                Wishlist Value
              </span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>{formatPrice(stats.totalValue)}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                Moodboards
              </span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>{moodboards.length}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-text)', display: 'block' }}>
                Followed Maisons
              </span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>{followedBrands.length}</strong>
            </div>
          </div>
        </div>

        {/* Style Taste Profile Preferences */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '2rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: 'var(--border-hairline)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', margin: 0 }}>
              Taste Profile & Aesthetics
            </h3>
            <Link to="/onboarding" style={{ fontSize: '0.75rem', textDecoration: 'underline', color: 'var(--color-charcoal)' }}>
              Edit Aesthetics →
            </Link>
          </div>

          {/* Style Personality */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              Style Personality
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(preferences?.preferred_style || ['quiet_luxury', 'minimal', 'classic']).map((st) => (
                <span
                  key={st}
                  style={{
                    padding: '0.4rem 0.85rem',
                    backgroundColor: 'var(--color-cream)',
                    border: '1px solid rgba(38, 35, 33, 0.1)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8125rem',
                    textTransform: 'capitalize'
                  }}
                >
                  {st.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Followed Maisons */}
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              Followed Maisons & Brands
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {followedBrandObjects.map((b) => (
                <Link
                  key={b.id}
                  to={`/brands/${b.slug}`}
                  style={{
                    padding: '0.4rem 0.85rem',
                    backgroundColor: 'var(--color-ivory)',
                    border: '1px solid rgba(38, 35, 33, 0.12)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-charcoal)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ShieldCheck size={13} color="#D8C5A5" />
                  <strong>{b.name}</strong>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .profile-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}


