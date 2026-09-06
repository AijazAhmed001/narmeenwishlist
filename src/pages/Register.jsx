import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, displayName || 'Genevieve Vance');
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Unable to register account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        backgroundColor: 'var(--color-white)'
      }}
      className="auth-split-grid"
    >
      {/* Left editorial visual */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-charcoal)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '4rem',
          color: 'var(--color-ivory)'
        }}
        className="auth-visual-pane"
      >
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
          alt="WISHÉ Haute Couture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            NARMEEN WISHLIST
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--color-champagne)', lineHeight: 1.3, marginBottom: '1rem' }}>
            “Save what you love. Follow what inspires you.”
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-cream)', maxWidth: '420px', lineHeight: 1.6 }}>
            Join a quiet digital realm designed specifically for luxury pieces, organza sarees, and bespoke fragrances.
          </p>
        </div>
      </div>

      {/* Right Register Form */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 3.5rem',
          backgroundColor: 'var(--color-ivory)'
        }}
        className="auth-form-pane"
      >
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <span className="editorial-tag">New Member Journal</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', marginTop: '0.25rem', marginBottom: '0.5rem', fontWeight: 400 }}>
            Create your Narmeen Wishlist.
          </h2>
          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Begin your personal fashion journal and discover pieces tailored to your style.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--color-sale-bg)', color: 'var(--color-sale-accent)', borderRadius: 'var(--radius-xs)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Genevieve Vance"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <Input
              label="Email Address"
              type="email"
              required
              placeholder="muse@wishe.luxury"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password (min 6 characters)"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="luxury" size="lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
              {loading ? 'Creating Journal...' : 'Begin Style Interview →'}
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8125rem', color: 'var(--color-muted-text)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-charcoal)', fontWeight: 600, textDecoration: 'underline' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-split-grid {
            grid-template-columns: 1fr !important;
          }
          .auth-visual-pane {
            display: none !important;
          }
          .auth-form-pane {
            padding: 3rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}


