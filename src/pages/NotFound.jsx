import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1rem'
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <span className="editorial-tag">404 • Lost in the Archive</span>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            margin: '0.5rem 0 1rem',
            fontWeight: 400
          }}
        >
          Page Not Found
        </h1>
        <p style={{ color: 'var(--color-muted-text)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The editorial page or luxury piece you are looking for has moved or does not exist in the current collection.
        </p>
        <Link to="/">
          <Button variant="primary">
            <ArrowLeft size={16} /> Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}


