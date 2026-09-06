import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function HeartButton({
  active = false,
  onClick,
  size = 20,
  className = '',
  celebrate = false,
  ariaLabel = 'Save to Wishlist'
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!active && celebrate) {
      // Trigger delicate rose gold confetti burst
      try {
        confetti({
          particleCount: 24,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#C9A6A0', '#E8D4D1', '#D8C5A5', '#262321'],
          ticks: 120,
          shapes: ['circle'],
          scalar: 0.8
        });
      } catch (err) {
        // Fallback gracefully
      }
    }

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 16,
        height: size + 16,
        borderRadius: '50%',
        backgroundColor: active ? 'rgba(201, 166, 160, 0.2)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(6px)',
        border: active ? '1px solid #C9A6A0' : '1px solid rgba(38, 35, 33, 0.08)',
        color: active ? '#9E3A3A' : '#262321',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
        boxShadow: '0 2px 8px rgba(38, 35, 33, 0.06)'
      }}
      className={className}
    >
      <motion.div
        animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Heart
          size={size}
          fill={active ? '#9E3A3A' : 'transparent'}
          stroke={active ? '#9E3A3A' : 'currentColor'}
          strokeWidth={1.75}
        />
      </motion.div>
    </motion.button>
  );
}
