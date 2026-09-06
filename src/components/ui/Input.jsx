import React from 'react';

export function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-muted-text)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icon size={16} />
          </div>
        )}
        <input
          id={inputId}
          className="input-field"
          style={Icon ? { paddingLeft: '2.5rem' } : undefined}
          {...props}
        />
      </div>
      {error && <span style={{ color: 'var(--color-sale-accent)', fontSize: '0.75rem' }}>{error}</span>}
      {helperText && !error && (
        <span style={{ color: 'var(--color-muted-text)', fontSize: '0.75rem' }}>{helperText}</span>
      )}
    </div>
  );
}
