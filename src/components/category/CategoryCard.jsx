import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      style={{ position: 'relative', height: '100%' }}
    >
      <Link
        to={`/categories/${category.slug}`}
        style={{
          display: 'block',
          position: 'relative',
          borderRadius: 'var(--radius-xs)',
          overflow: 'hidden',
          aspectRatio: '4/5',
          backgroundColor: 'var(--color-cream)'
        }}
      >
        <img
          src={category.image_url}
          alt={category.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="cat-img"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(38, 35, 33, 0.85) 0%, rgba(38, 35, 33, 0.2) 60%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.25rem',
            color: 'var(--color-ivory)'
          }}
        >
          <span
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '2px'
            }}
          >
            {category.item_count} Pieces
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              color: 'var(--color-white)',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>{category.name}</span>
            <ArrowRight size={16} color="var(--color-champagne)" />
          </h3>
        </div>
      </Link>

      <style>{`
        .cat-img:hover {
          transform: scale(1.06);
        }
      `}</style>
    </motion.div>
  );
}
