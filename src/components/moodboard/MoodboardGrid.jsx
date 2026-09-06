import React from 'react';
import { MoodboardCard } from './MoodboardCard';
import { Plus } from 'lucide-react';

export function MoodboardGrid({ moodboards = [], onAddNew, onEdit }) {
  return (
    <div className="moodboard-grid">
      {/* Create New Card */}
      <div
        onClick={onAddNew}
        style={{
          border: '2px dashed rgba(38, 35, 33, 0.15)',
          borderRadius: 'var(--radius-xs)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '280px',
          padding: '2rem',
          cursor: 'pointer',
          backgroundColor: 'var(--color-cream-light)',
          transition: 'all var(--transition-fast)'
        }}
        className="card-base"
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'var(--color-cream)',
            border: '1px solid rgba(38, 35, 33, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            color: 'var(--color-charcoal)'
          }}
        >
          <Plus size={20} />
        </div>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-charcoal)', marginBottom: '4px' }}>
          New Moodboard
        </h4>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted-text)', textAlign: 'center' }}>
          Create a capsule or event vision
        </p>
      </div>

      {moodboards.map((mb) => (
        <MoodboardCard key={mb.id} moodboard={mb} onEdit={onEdit} />
      ))}
    </div>
  );
}
