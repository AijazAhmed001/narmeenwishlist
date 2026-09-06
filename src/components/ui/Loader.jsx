import React from 'react';

export function Loader({ size = 'md', text = 'Curating beauty...' }) {
  const sizeMap = {
    sm: 20,
    md: 32,
    lg: 48
  };

  const dim = sizeMap[size] || 32;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        gap: '1rem'
      }}
    >
      <div
        style={{
          width: dim,
          height: dim,
          border: '2px solid rgba(38, 35, 33, 0.1)',
          borderTopColor: 'var(--color-charcoal)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      {text && (
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--color-muted-text)'
          }}
        >
          {text}
        </p>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-hairline)',
        borderRadius: 'var(--radius-xs)',
        padding: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '3/4',
          backgroundColor: 'var(--color-cream)',
          borderRadius: 'var(--radius-xs)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}
      />
      <div
        style={{
          height: '12px',
          width: '40%',
          backgroundColor: 'var(--color-cream)',
          borderRadius: '2px'
        }}
      />
      <div
        style={{
          height: '16px',
          width: '80%',
          backgroundColor: 'var(--color-cream-dark)',
          borderRadius: '2px'
        }}
      />
      <div
        style={{
          height: '14px',
          width: '50%',
          backgroundColor: 'var(--color-cream)',
          borderRadius: '2px'
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
