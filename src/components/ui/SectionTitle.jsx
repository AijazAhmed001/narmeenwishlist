import React from 'react';

export function SectionTitle({
  tag,
  title,
  subtitle,
  align = 'center',
  className = '',
  action
}) {
  return (
    <div
      className={`section-header ${align === 'left' ? 'text-left' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'left' ? 'flex-start' : 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ width: '100%' }}>
        {tag && <span className="editorial-tag">{tag}</span>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div style={{ marginTop: '1rem' }}>{action}</div>}
    </div>
  );
}
