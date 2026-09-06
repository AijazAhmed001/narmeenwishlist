import React from 'react';
import { CategoryCard } from './CategoryCard';

export function CategoryGrid({ categories = [] }) {
  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}
