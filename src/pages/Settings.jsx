import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { brands } from '../data/brands';
import { NotificationPreferences } from '../components/notification/NotificationPreferences';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { isSupabaseConfigured } from '../lib/supabase';
import { ShieldCheck, Database, Check, Sparkles, Heart, Mail, ExternalLink, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Settings() {
  const { profile, updateProfile } = useAuth();
  const { followedBrands, toggleFollowBrand } = useWishlist();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [digestPreviewOpen, setDigestPreviewOpen] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      display_name: displayName,
      username,
      avatar_url: avatarUrl,
      bio
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const followedBrandsList = brands.filter(b => followedBrands.includes(b.id));

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container-narrow">
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="editorial-tag">Account & Intelligence</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Settings & Preferences
          </h1>
          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.95rem' }}>
            Manage your personal profile, brand email notifications, and database connections.
          </p>
        </div>

        {/* 1. Profile Information */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: 'var(--border-hairline)' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', margin: 0 }}>
                Profile Details
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', margin: '4px 0 0' }}>
                Your public persona across the Narmeen Wishlist luxury platform.
              </p>
            </div>
            {savedSuccess && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> Profile Saved
              </span>
            )}
          </div>

          <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="settings-split">
              <Input
                label="Display Name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Input
                label="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <Input
              label="Avatar Image URL"
              placeholder="https://images.unsplash.com/..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />

            <div className="input-group">
              <label className="input-label">Bio & Aesthetic Focus</label>
              <textarea
                rows={3}
                className="input-field"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button type="submit" variant="primary">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </div>

        {/* 2. Brand Follow Subscriptions & Email Alerts Manager */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            border: 'var(--border-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: 'var(--border-hairline)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} color="var(--color-charcoal)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', margin: 0 }}>
                  Brand Email Subscriptions
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', margin: '4px 0 0' }}>
                You strictly only receive email alerts, sales, and weekly digests for brands you follow ({followedBrands.length} active).
              </p>
            </div>

            {followedBrands.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDigestPreviewOpen(!digestPreviewOpen)}
              >
                <Sparkles size={14} /> {digestPreviewOpen ? 'Hide Email Preview' : 'Preview Followed Brands Email'}
              </Button>
            )}
          </div>

          {followedBrandsList.length === 0 ? (
            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-xs)', textAlign: 'center' }}>
              <Heart size={28} color="var(--color-muted-light)" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', fontWeight: 600, margin: '0 0 0.25rem' }}>
                No active brand email subscriptions
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted-text)', margin: '0 0 1rem' }}>
                Follow brands on the Brands directory or discovery lounge to receive personalized price drop and new arrival emails.
              </p>
              <Link to="/brands">
                <Button size="sm">Browse Brands Directory</Button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {followedBrandsList.map((brand) => (
                <div
                  key={brand.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--color-cream-light)',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid rgba(216, 197, 165, 0.4)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{brand.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                        {brand.category} · {brand.country}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <a
                      href={brand.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none' }}
                    >
                      Website <ExternalLink size={10} />
                    </a>
                    <button
                      onClick={() => toggleFollowBrand(brand.id)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        fontSize: '0.75rem',
                        border: '1px solid var(--color-rose-deep)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-rose-deep)',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer'
                      }}
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Email Digest Simulation Preview */}
          {digestPreviewOpen && followedBrandsList.length > 0 && (
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-charcoal)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-ivory)', padding: '2px 8px', borderRadius: '4px' }}>
                  Live Email Newsletter Preview
                </span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Subject: Your Week in Narmeen Wishlist — Updates for {followedBrandsList.map(b => b.name).join(', ')}
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', lineHeight: 1.6, margin: 0 }}>
                Hello {displayName || 'Narmeen'}, here are the verified updates for your followed labels this week:
              </p>
              <ul style={{ fontSize: '0.8125rem', paddingLeft: '1.25rem', margin: '0.75rem 0', lineHeight: 1.8 }}>
                {followedBrandsList.map((b) => (
                  <li key={b.id}>
                    <strong>{b.name}:</strong> 1 active price drop detected & new collection live on {b.officialWebsite}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-light)', margin: 0 }}>
                Sent securely via Narmeen Wishlist intelligence to your verified account address.
              </p>
            </div>
          )}
        </div>

        {/* 3. General Notification Preferences */}
        <div style={{ marginBottom: '2.5rem' }}>
          <NotificationPreferences />
        </div>

        {/* 4. Supabase & Database Architecture Trust Card */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-light)',
            border: '1px solid rgba(38, 35, 33, 0.1)',
            borderRadius: 'var(--radius-xs)',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Database size={20} color="var(--color-charcoal)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>
              Architecture & Database Connectivity
            </h3>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted-text)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Narmeen Wishlist operates on a direct frontend + managed Supabase PostgreSQL architecture with Row Level Security (RLS). When automation or scheduled monitoring is deployed in future phases, it seamlessly inserts into the existing database schema without refactoring the frontend.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-xs)', border: 'var(--border-hairline)' }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: isSupabaseConfigured ? 'var(--color-success)' : 'var(--color-champagne-dark)'
              }}
            />
            <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
              {isSupabaseConfigured
                ? 'Connected directly to live Supabase PostgreSQL & Realtime'
                : 'Running in Client-Mode with Local Storage sync (Add VITE_SUPABASE_URL in .env to connect)'}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .settings-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
