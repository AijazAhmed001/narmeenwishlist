import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Heart,
  TrendingDown,
  ShieldCheck,
  Bell,
  Eye,
  Bookmark
} from 'lucide-react';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { categories } from '../data/categories';
import { defaultMoodboards } from '../data/moodboards';
import { DynamicHero } from '../components/home/DynamicHero';
import { TopBrandsSection } from '../components/home/TopBrandsSection';
import { LiveNowSection } from '../components/home/LiveNowSection';
import { ProductCard } from '../components/product/ProductCard';
import { ProductQuickView } from '../components/product/ProductQuickView';
import { CategoryCard } from '../components/category/CategoryCard';
import { MoodboardCard } from '../components/moodboard/MoodboardCard';
import { Button } from '../components/ui/Button';
import { SectionTitle } from '../components/ui/SectionTitle';

export function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const trendingProducts = products.filter((p) => p.is_featured).slice(0, 8);
  const fashionEdits = products.filter((p) => p.category_id === 'cat-fashion').slice(0, 4);
  const beautyEdits = products.filter((p) => p.category_id === 'cat-makeup' || p.category_id === 'cat-skincare').slice(0, 4);
  const sareeEdits = products.filter((p) => p.category_id === 'cat-sarees' || p.category_id === 'cat-occasion').slice(0, 4);
  const shoeEdits = products.filter((p) => p.category_id === 'cat-shoes').slice(0, 4);
  const bagEdits = products.filter((p) => p.category_id === 'cat-bags').slice(0, 4);
  const jewelryEdits = products.filter((p) => p.category_id === 'cat-jewelry').slice(0, 4);
  const perfumeEdits = products.filter((p) => p.category_id === 'cat-perfumes').slice(0, 4);
  const newArrivalEdits = products.filter((p) => p.is_new).slice(0, 4);

  return (
    <div>
      {/* 1. DYNAMIC SALE / NEW ARRIVAL HERO */}
      <DynamicHero />

      {/* 2. TOP BRANDS ("THE LABELS TO KNOW") */}
      <TopBrandsSection />

      {/* 3. LIVE NOW (Interactive Filter Tabs: Sale, New, Restocked, Limited, Trending) */}
      <LiveNowSection />

      {/* 4. CATEGORIES (Discover Your Next Obsession) */}
      <section className="section">
        <div className="container">
          <SectionTitle
            tag="DISCOVER YOUR NEXT OBSESSION"
            title="Explore by Discipline"
            subtitle="From hand-embroidered organza sarees to sculpted vermeil gold and niche perfumery."
          />
          <div className="category-grid">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRENDING WISHLIST (The Master Edit) */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream-light)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}>
        <div className="container">
          <SectionTitle
            tag="THE MASTER EDIT"
            title="Trending Wishlist Pieces"
            subtitle="The most tracked, dreamed-about luxury fashion statements and beauty rituals."
            action={
              <Link to="/discover">
                <Button variant="secondary" size="sm">
                  View Full Discovery <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {trendingProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FASHION */}
      <section className="section">
        <div className="container">
          <SectionTitle
            tag="Prêt-à-Porter"
            title="The Fashion & Tailoring Edit"
            subtitle="Fluid asymmetric silhouettes, Mediterranean linen, and daily Pakistani stitched kurtas under PKR 5k–10k."
            action={
              <Link to="/categories/fashion">
                <Button variant="secondary" size="sm">
                  Explore Fashion <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {fashionEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. BEAUTY */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream-light)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}>
        <div className="container">
          <SectionTitle
            tag="Sensory Rituals"
            title="The Beauty & Complexion Edit"
            subtitle="Luminous skin tints, velvety lip pigments, and Hanbang K-beauty restorative elixirs."
            action={
              <Link to="/categories/beauty">
                <Button variant="secondary" size="sm">
                  Explore Beauty <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {beautyEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. SAREES */}
      <section className="section">
        <div className="container">
          <SectionTitle
            tag="Heritage Drapes"
            title="The Saree & Bridal Edit"
            subtitle="Pure diaphanous organza, resham needlework, and heirloom festive pishwas."
            action={
              <Link to="/categories/sarees">
                <Button variant="secondary" size="sm">
                  Explore Sarees <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {sareeEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. SHOES */}
      {shoeEdits.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--color-cream-light)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}>
          <div className="container">
            <SectionTitle
              tag="Footwear Vault"
              title="The Statement Footwear Edit"
              subtitle="From iconic heritage sneakers to sculpted slingbacks and red carpet heels."
              action={
                <Link to="/categories/shoes">
                  <Button variant="secondary" size="sm">
                    Explore Shoes <ArrowRight size={14} />
                  </Button>
                </Link>
              }
            />
            <div className="product-grid">
              {shoeEdits.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. BAGS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            tag="Fine Leather Goods"
            title="The Handbag Vault"
            subtitle="Pebbled calfskin Tabby shoulder bags, sculptural half-moons, and iconic flap silhouettes."
            action={
              <Link to="/categories/bags">
                <Button variant="secondary" size="sm">
                  Explore Bags <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {bagEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. JEWELRY */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream-light)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}>
        <div className="container">
          <SectionTitle
            tag="Fine Jewelry"
            title="The Architectural Gold & Diamond Edit"
            subtitle="Solid 14k recycled gold, vermeil dôme hoops, and heirloom fine jewelry staples."
            action={
              <Link to="/categories/jewelry">
                <Button variant="secondary" size="sm">
                  Explore Jewelry <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {jewelryEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 12. PERFUME */}
      <section className="section">
        <div className="container">
          <SectionTitle
            tag="Niche Fragrances"
            title="The Haute Perfumery Vanity"
            subtitle="Sensory nocturnal rosewoods, velvet amber, and bespoke Parisian colognes."
            action={
              <Link to="/categories/perfumes">
                <Button variant="secondary" size="sm">
                  Explore Perfumes <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {perfumeEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 13. NEW ARRIVALS */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream-light)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}>
        <div className="container">
          <SectionTitle
            tag="JUST IN"
            title="Fresh Arrivals Worth Adding"
            subtitle="The newest season drops from verified official brand flagships."
            action={
              <Link to="/discover?filter=new">
                <Button variant="secondary" size="sm">
                  View All New In <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="product-grid">
            {newArrivalEdits.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 14. EDITORIAL / MOODBOARDS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            tag="VISUAL INSPIRATION"
            title="Curated Moodboards"
            subtitle="Gather your dream pieces into themed capsules for vacations, weddings, and signature aesthetic moods."
            action={
              <Link to="/moodboards">
                <Button variant="secondary" size="sm">
                  View All Moodboards <ArrowRight size={14} />
                </Button>
              </Link>
            }
          />
          <div className="moodboard-grid">
            {defaultMoodboards.slice(0, 3).map((mb) => (
              <MoodboardCard key={mb.id} moodboard={mb} />
            ))}
          </div>
        </div>
      </section>

      {/* 15. NOTIFICATION CTA BANNER */}
      <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-charcoal)', color: 'var(--color-ivory)' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-champagne)', fontWeight: 600 }}>
            NEVER MISS A THING
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              color: 'var(--color-ivory)',
              margin: '0.75rem 0 1.25rem',
              fontWeight: 400
            }}
          >
            “Your wishlist deserves to be watched.”
          </h2>
          <p style={{ color: 'var(--color-muted-light)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 2rem' }}>
            Never miss a price reduction or limited restock. Follow your favorite labels and let Narmeen Wishlist notify you instantly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/onboarding">
              <Button variant="luxury" size="lg">
                Personalize My Alerts
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" size="lg" style={{ color: 'var(--color-ivory)', border: '1px solid rgba(248, 245, 240, 0.2)' }}>
                View Notification Center
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
