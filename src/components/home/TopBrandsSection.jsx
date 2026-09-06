import React from 'react';
import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';
import { BrandCard } from '../brand/BrandCard';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function TopBrandsSection() {
  // Sort brands prioritizing isTopBrand, editorialRank, popularityScore, followers
  const topBrands = [...brands]
    .sort((a, b) => {
      if (a.isTopBrand && !b.isTopBrand) return -1;
      if (!a.isTopBrand && b.isTopBrand) return 1;
      return (a.editorialRank || 99) - (b.editorialRank || 99);
    })
    .slice(0, 8);

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-white)', borderBottom: 'var(--border-hairline)' }}>
      <div className="container">
        <SectionTitle
          tag="THE LABELS TO KNOW"
          title="Iconic Maisons & Couture Houses"
          subtitle="“Discover the brands behind your wishlist.” Connect directly with official flagship websites and seasonal runway edits."
          action={
            <Link to="/brands">
              <Button variant="secondary" size="sm">
                Explore All {brands.length} Houses <ArrowRight size={14} />
              </Button>
            </Link>
          }
        />

        <div className="brand-grid">
          {topBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
