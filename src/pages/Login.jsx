import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('muse@wishe.luxury');
  const [password, setPassword] = useState('luxury123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please verify your credentials.');
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
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
          alt="WISHÉ Muse"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            NARMEEN WISHLIST
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--color-champagne)', lineHeight: 1.3, marginBottom: '1rem' }}>
            “Things you love, beautifully remembered.”
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-cream)', maxWidth: '420px', lineHeight: 1.6 }}>
            Your personal digital sanctuary for couture fashion, fine jewelry, and sensory beauty.
          </p>
        </div>
      </div>

      {/* Right Login Form */}
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
          <span className="editorial-tag">Personal Journal Access</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', marginTop: '0.25rem', marginBottom: '0.5rem', fontWeight: 400 }}>
            Welcome back.
          </h2>
          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Enter your credentials to access your private saved pieces and tracked alerts.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--color-sale-bg)', color: 'var(--color-sale-accent)', borderRadius: 'var(--radius-xs)', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="primary" size="lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
              {loading ? 'Authenticating...' : 'Sign In to Narmeen Wishlist'}
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8125rem', color: 'var(--color-muted-text)' }}>
            Don’t have a personal wishlist yet?{' '}
            <Link to="/register" style={{ color: 'var(--color-charcoal)', fontWeight: 600, textDecoration: 'underline' }}>
              Create Account
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


