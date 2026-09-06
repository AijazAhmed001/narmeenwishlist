import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { brands } from '../data/brands';
import { categories } from '../data/categories';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sparkles, ArrowRight, ArrowLeft, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const STYLES_LIST = [
  { id: 'quiet_luxury', label: 'Quiet Luxury' },
  { id: 'minimal', label: 'Minimalist' },
  { id: 'classic', label: 'Classic & Tailored' },
  { id: 'old_money', label: 'Old Money' },
  { id: 'romantic', label: 'Romantic' },
  { id: 'feminine', label: 'Feminine' },
  { id: 'elegant', label: 'Couture Elegance' },
  { id: 'traditional', label: 'Traditional Heritage' },
  { id: 'modest', label: 'Modest Luxury' },
  { id: 'bold', label: 'Bold & Avant-Garde' },
  { id: 'streetwear', label: 'Elevated Streetwear' },
  { id: 'experimental', label: 'Experimental' }
];

const COLORS_PALETTE = [
  { hex: '#F8F5F0', name: 'Ivory' },
  { hex: '#F2ECE4', name: 'Cream' },
  { hex: '#C9A6A0', name: 'Dusty Rose' },
  { hex: '#E8D4D1', name: 'Soft Pink' },
  { hex: '#D8C5A5', name: 'Champagne' },
  { hex: '#262321', name: 'Noir Charcoal' },
  { hex: '#8B5A2B', name: 'Caramel Leather' },
  { hex: '#3B4D3C', name: 'Sage Forest' },
  { hex: '#1C2833', name: 'Midnight Navy' }
];

export function Onboarding() {
  const navigate = useNavigate();
  const { profile, updateProfile, updatePreferences } = useAuth();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile?.display_name || '');
  const [selectedStyles, setSelectedStyles] = useState(['quiet_luxury', 'minimal', 'classic']);
  const [selectedColors, setSelectedColors] = useState(['#F8F5F0', '#C9A6A0', '#D8C5A5']);
  const [selectedCategories, setSelectedCategories] = useState(['cat-fashion', 'cat-bags', 'cat-jewelry']);
  const [selectedBrands, setSelectedBrands] = useState(['brand-chanel', 'brand-elan', 'brand-coach']);
  const [budget, setBudget] = useState(250000);
  const [dreamPiece, setDreamPiece] = useState('Coach Tabby Bag in Ivory / Handcrafted Organza Saree');
  const [notifPriceDrop, setNotifPriceDrop] = useState(true);
  const [notifRestock, setNotifRestock] = useState(true);
  const [notifCollections, setNotifCollections] = useState(true);

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (step < 9) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    // Save all to user profile and preferences
    updateProfile({
      display_name: name || 'Narmeen',
      isOnboarded: true
    });

    updatePreferences({
      preferred_style: selectedStyles,
      preferred_colors: selectedColors,
      preferred_categories: selectedCategories,
      budget_max: budget
    });

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A6A0', '#D8C5A5', '#E8D4D1', '#262321']
      });
    } catch (e) {}

    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: 'var(--color-white)',
          border: 'var(--border-hairline)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-floating)',
          padding: '3rem 2.5rem',
          position: 'relative'
        }}
      >
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <span className="editorial-tag">Personal Taste Interview • Step {step} of 9</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
            {Math.round((step / 9) * 100)}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--color-cream)', marginBottom: '2.5rem', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${(step / 9) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--color-charcoal)',
              transition: 'width 0.4s ease'
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Name */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                “Tell me everything you love.”
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '2rem' }}>
                First, how should Narmeen Wishlist address your personal journal?
              </p>
              <Input
                label="Your Name or Alias"
                placeholder="e.g. Genevieve, Sophia, Ayla"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </motion.div>
          )}

          {/* STEP 2: Style */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                What is your style essence?
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '1.5rem' }}>
                Select all silhouettes that resonate with your personal wardrobe aesthetic.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
                {STYLES_LIST.map((st) => {
                  const active = selectedStyles.includes(st.id);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => toggleItem(selectedStyles, setSelectedStyles, st.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.8125rem',
                        borderRadius: 'var(--radius-xs)',
                        border: active ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.12)',
                        backgroundColor: active ? 'var(--color-charcoal)' : 'var(--color-cream-light)',
                        color: active ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: active ? 600 : 400
                      }}
                    >
                      {st.label} {active && '✓'}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Colors */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                Which colors inspire you?
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '1.5rem' }}>
                Curate the palette that best reflects your favorite seasonal tones.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {COLORS_PALETTE.map((col) => {
                  const active = selectedColors.includes(col.hex);
                  return (
                    <div
                      key={col.hex}
                      onClick={() => toggleItem(selectedColors, setSelectedColors, col.hex)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: active ? '2px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: 'var(--color-cream-light)'
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: col.hex,
                          border: '1px solid rgba(38, 35, 33, 0.15)'
                        }}
                      />
                      <span style={{ fontSize: '0.8125rem', fontWeight: active ? 600 : 400 }}>{col.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Categories */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                What categories do you shop?
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '2rem' }}>
                Select all disciplines you want Narmeen Wishlist to feature on your discovery edits.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {categories.map((cat) => {
                  const active = selectedCategories.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleItem(selectedCategories, setSelectedCategories, cat.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: active ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                        backgroundColor: active ? 'var(--color-charcoal)' : 'var(--color-cream-light)',
                        color: active ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontWeight: active ? 600 : 400, fontSize: '0.875rem' }}>{cat.name}</span>
                      {active && <Check size={16} />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Brands */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                Which houses & brands do you love?
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '1.5rem' }}>
                Select favorite international luxury and Pakistani designers to auto-follow.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {brands.map((b) => {
                  const active = selectedBrands.includes(b.id);
                  return (
                    <div
                      key={b.id}
                      onClick={() => toggleItem(selectedBrands, setSelectedBrands, b.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: active ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                        backgroundColor: active ? 'var(--color-cream)' : 'var(--color-white)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.875rem' }}>{b.name}</strong>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted-text)' }}>{b.country}</div>
                      </div>
                      {active && <Check size={16} color="#3D6B52" />}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6: Budget */}
          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                What is your luxury budget range?
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '2rem' }}>
                This helps curate realistic luxury recommendations and high-ticket dream grail items.
              </p>
              <div style={{ padding: '2rem', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-xs)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted-text)' }}>
                  Target Investment Cap
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-charcoal)', margin: '0.5rem 0 1.5rem' }}>
                  PKR {Number(budget).toLocaleString()}
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1500000"
                  step="10000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-charcoal)' }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 7: Dream Piece */}
          {step === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                What are you currently dreaming about?
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '1.5rem' }}>
                A specific piece, a dream bridal saree, or an investment handbag.
              </p>
              <Input
                label="Your Current Obsession"
                placeholder="e.g. Dior Rosewood Perfume, Chanel Classic Flap, Ivory Organza Saree"
                value={dreamPiece}
                onChange={(e) => setDreamPiece(e.target.value)}
              />
            </motion.div>
          )}

          {/* STEP 8: Notifications */}
          {step === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                Notification Preferences
              </h2>
              <p style={{ color: 'var(--color-muted-text)', marginBottom: '2rem' }}>
                How should Narmeen Wishlist alert you when events occur on your wishlist?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { state: notifPriceDrop, set: setNotifPriceDrop, label: 'Price drop alerts (Tell me when items become cheaper)' },
                  { state: notifRestock, set: setNotifRestock, label: 'Restock notices (Tell me when saved items return)' },
                  { state: notifCollections, set: setNotifCollections, label: 'New seasonal runway launches from followed brands' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => item.set(!item.state)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: item.state ? '1px solid var(--color-charcoal)' : '1px solid rgba(38, 35, 33, 0.1)',
                      backgroundColor: item.state ? 'var(--color-cream-light)' : 'var(--color-white)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', fontWeight: item.state ? 600 : 400 }}>{item.label}</span>
                    {item.state && <Check size={16} color="#3D6B52" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 9: Final Reveal */}
          {step === 9 && (
            <motion.div
              key="step-9"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '1rem 0' }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--color-dusty-rose-dark)'
                }}
              >
                <Sparkles size={28} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: 400 }}>
                Your Narmeen Wishlist is ready.
              </h2>
              <p style={{ color: 'var(--color-muted-text)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                We have tailored your personal journal, followed {selectedBrands.length} iconic houses, and primed price drop intelligence for you.
              </p>

              <Button variant="luxury" size="lg" onClick={handleFinish}>
                Enter Narmeen Wishlist
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons (Step 1-8) */}
        {step < 9 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: 'var(--border-hairline)' }}>
            <Button
              variant="ghost"
              disabled={step === 1}
              onClick={handleBack}
            >
              <ArrowLeft size={14} /> Back
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Next Step <ArrowRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


