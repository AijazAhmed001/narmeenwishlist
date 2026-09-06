import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { SearchModal } from './components/search/SearchModal';
import { ToastContainer } from './components/ui/ToastContainer';

// Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Wishlist } from './pages/Wishlist';
import { ProductDetails } from './pages/ProductDetails';
import { Brands } from './pages/Brands';
import { BrandDetails } from './pages/BrandDetails';
import { Categories } from './pages/Categories';
import { CategoryDetails } from './pages/CategoryDetails';
import { Sale } from './pages/Sale';
import { NewIn } from './pages/NewIn';
import { Moodboards } from './pages/Moodboards';
import { MoodboardDetails } from './pages/MoodboardDetails';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Onboarding } from './pages/Onboarding';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global keybinding: Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/onboarding';

  return (
    <div className="app-container">
      {!hideNavAndFooter && <Navbar onOpenSearch={() => setSearchOpen(true)} />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:slug" element={<BrandDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryDetails />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/new-in" element={<NewIn />} />
          <Route path="/new-arrivals" element={<NewIn />} />
          <Route path="/moodboards" element={<Moodboards />} />
          <Route path="/moodboards/:id" element={<MoodboardDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideNavAndFooter && <Footer />}

      {/* Global Modals & Realtime Toasts */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ToastContainer />
    </div>
  );
}
