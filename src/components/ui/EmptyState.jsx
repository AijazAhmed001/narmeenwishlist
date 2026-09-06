import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

export function EmptyState({
  title = 'Nothing here yet.',
  subtitle = 'Your next obsession is waiting to be discovered.',
  actionText = 'Discover pieces',
  actionLink = '/discover',
  icon: Icon = Sparkles,
  onAction
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '480px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'var(--color-cream)',
          border: '1px solid rgba(38, 35, 33, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-dusty-rose-dark)',
          marginBottom: '1.5rem'
        }}
      >
        <Icon size={24} strokeWidth={1.5} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.65rem',
          fontWeight: 400,
          marginBottom: '0.65rem',
          color: 'var(--color-charcoal)'
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: 'var(--color-muted-text)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}
      >
        {subtitle}
      </p>

      {actionText && (
        actionLink ? (
          <Link to={actionLink}>
            <Button variant="primary">{actionText}</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={onAction}>{actionText}</Button>
        )
      )}
    </motion.div>
  );
}
