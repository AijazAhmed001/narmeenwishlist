import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroCampaigns } from '../../data/campaigns';
import { Button } from '../ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Sparkles, TrendingDown } from 'lucide-react';

export function DynamicHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 38, minutes: 14, seconds: 38 });

  // Filter active campaigns (and prune expired sales)
  const activeCampaigns = useMemo(() => {
    const now = new Date().getTime();
    return heroCampaigns
      .filter((camp) => {
        if (!camp.is_active) return false;
        if (camp.end_at && new Date(camp.end_at).getTime() < now) return false;
        return true;
      })
      .sort((a, b) => (a.priority || 99) - (b.priority || 99));
  }, []);

  const currentCampaign = activeCampaigns[currentIndex] || activeCampaigns[0];

  // Auto rotate every 6 seconds unless paused on hover
  useEffect(() => {
    if (isPaused || activeCampaigns.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeCampaigns.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, activeCampaigns.length]);

  // Live countdown timer for active sales
  useEffect(() => {
    if (!currentCampaign?.end_at) return;

    const interval = setInterval(() => {
      const distance = new Date(currentCampaign.end_at).getTime() - new Date().getTime();
      if (distance <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentCampaign]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeCampaigns.length) % activeCampaigns.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeCampaigns.length);
  };

  if (!currentCampaign) return null;

  return (
    <section
      className="hero-editorial"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 0 4rem' }}
    >
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCampaign.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div className="hero-content">
              {/* Campaign Badge & Countdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.35rem 0.85rem',
                    backgroundColor: currentCampaign.campaign_type === 'SALE' ? 'var(--color-sale-bg)' : 'var(--color-cream)',
                    color: currentCampaign.campaign_type === 'SALE' ? 'var(--color-sale-accent)' : 'var(--color-charcoal)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    border: currentCampaign.campaign_type === 'SALE' ? '1px solid rgba(158, 58, 58, 0.25)' : 'var(--border-hairline)'
                  }}
                >
                  {currentCampaign.campaign_type === 'SALE' && <TrendingDown size={13} />}
                  {currentCampaign.campaign_type === 'LIMITED_EDITION' && <Sparkles size={13} />}
                  {currentCampaign.badge}
                </span>

                {currentCampaign.end_at && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      color: 'var(--color-sale-accent)',
                      fontWeight: 600,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(158, 58, 58, 0.2)'
                    }}
                  >
                    <Clock size={13} />
                    <span>
                      SALE ENDS IN {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="hero-title" style={{ marginTop: '0.5rem' }}>
                {currentCampaign.title}
              </h1>

              <p className="hero-desc">
                {currentCampaign.subtitle}
              </p>

              <div className="hero-actions">
                <Link to={currentCampaign.cta_url}>
                  <Button variant={currentCampaign.campaign_type === 'SALE' ? 'luxury' : 'primary'} size="lg">
                    {currentCampaign.cta_text} <ArrowRight size={16} />
                  </Button>
                </Link>
                {currentCampaign.secondary_cta_text && (
                  <Link to={currentCampaign.secondary_cta_url}>
                    <Button variant="secondary" size="lg">
                      {currentCampaign.secondary_cta_text}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="hero-image-cluster">
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
                <img
                  src={currentCampaign.image_url}
                  alt={currentCampaign.title}
                  className="hero-main-img"
                />

                <div className="hero-badge-float">
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
                    {currentCampaign.brand_name}
                  </span>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-charcoal)' }}>
                    {currentCampaign.discount_text}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                    Live on Narmeen Wishlist
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Navigation Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: 'var(--border-hairline)'
          }}
        >
          {/* Pagination Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {activeCampaigns.map((camp, idx) => (
              <button
                key={camp.id}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: currentIndex === idx ? 28 : 8,
                  height: 6,
                  borderRadius: '3px',
                  backgroundColor: currentIndex === idx ? 'var(--color-charcoal)' : 'rgba(38, 35, 33, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0
                }}
                aria-label={`Go to campaign ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrev}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'var(--color-white)',
                border: 'var(--border-hairline)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Previous campaign"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: 'var(--color-white)',
                border: 'var(--border-hairline)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Next campaign"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
