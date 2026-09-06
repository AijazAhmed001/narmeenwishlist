import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { defaultMoodboards } from '../data/moodboards';
import { cacheHelper } from '../lib/helpers';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

const DEFAULT_WISHLIST_ITEMS = [
  {
    id: 'wl-1',
    product_id: 'prod-coach-tabby',
    priority: 'high',
    notes: 'In love with the brass hardware and timeless shape.',
    status: 'watching',
    created_at: '2026-08-10T12:00:00Z'
  },
  {
    id: 'wl-2',
    product_id: 'prod-elan-ivory-saree',
    priority: 'dream',
    notes: 'For next wedding season. Organza drape is unreal.',
    status: 'wanted',
    created_at: '2026-08-15T15:30:00Z'
  },
  {
    id: 'wl-3',
    product_id: 'prod-dior-rosewood-perfume',
    priority: 'medium',
    notes: 'Signature evening scent trial.',
    status: 'wanted',
    created_at: '2026-08-20T10:15:00Z'
  },
  {
    id: 'wl-4',
    product_id: 'prod-chanel-classic-flap',
    priority: 'dream',
    notes: 'The ultimate luxury investment piece in caviar leather.',
    status: 'wanted',
    created_at: '2026-08-22T08:00:00Z'
  },
  {
    id: 'wl-5',
    product_id: 'prod-mejuri-gold-hoops',
    priority: 'high',
    notes: 'Everyday staple jewellery.',
    status: 'purchased',
    created_at: '2026-08-25T14:00:00Z'
  }
];

const DEFAULT_FAVORITES = ['prod-coach-tabby', 'prod-elan-ivory-saree', 'prod-dior-rosewood-perfume'];
const DEFAULT_FOLLOWED_BRANDS = [];
const DEFAULT_TRACKING = {
  'prod-coach-tabby': { track_price: true, track_stock: true, track_sale: true },
  'prod-elan-ivory-saree': { track_price: true, track_stock: true, track_sale: true },
  'prod-dior-rosewood-perfume': { track_price: true, track_stock: true, track_sale: true }
};

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  const [wishlistItems, setWishlistItems] = useState(() => {
    return cacheHelper.get('wishlist_items', DEFAULT_WISHLIST_ITEMS);
  });

  const [favorites, setFavorites] = useState(() => {
    return cacheHelper.get('user_favorites', DEFAULT_FAVORITES);
  });

  const [followedBrands, setFollowedBrands] = useState(() => {
    return cacheHelper.get('followed_brands', DEFAULT_FOLLOWED_BRANDS);
  });

  const [moodboards, setMoodboards] = useState(() => {
    return cacheHelper.get('user_moodboards', defaultMoodboards);
  });

  const [trackedProducts, setTrackedProducts] = useState(() => {
    return cacheHelper.get('tracked_products', DEFAULT_TRACKING);
  });

  // Sync with local storage
  useEffect(() => {
    cacheHelper.set('wishlist_items', wishlistItems);
  }, [wishlistItems]);

  useEffect(() => {
    cacheHelper.set('user_favorites', favorites);
  }, [favorites]);

  useEffect(() => {
    cacheHelper.set('followed_brands', followedBrands);
  }, [followedBrands]);

  useEffect(() => {
    cacheHelper.set('user_moodboards', moodboards);
  }, [moodboards]);

  useEffect(() => {
    cacheHelper.set('tracked_products', trackedProducts);
  }, [trackedProducts]);

  // Supabase sync if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !user) return;

    async function loadSupabaseData() {
      try {
        const { data: wlData } = await supabase
          .from('wishlist_items')
          .select('*')
          .eq('user_id', user.id);
        if (wlData && wlData.length > 0) setWishlistItems(wlData);

        const { data: favData } = await supabase
          .from('favorites')
          .select('product_id')
          .eq('user_id', user.id);
        if (favData) setFavorites(favData.map(f => f.product_id));

        const { data: followData } = await supabase
          .from('brand_follows')
          .select('brand_id')
          .eq('user_id', user.id);
        if (followData) setFollowedBrands(followData.map(f => f.brand_id));
      } catch (e) {
        console.error('Error fetching Supabase wishlist data', e);
      }
    }

    loadSupabaseData();
  }, [user]);

  // Wishlist Actions
  const addToWishlist = async (productId, priority = 'medium', notes = '', status = 'wanted') => {
    if (wishlistItems.some(item => item.product_id === productId)) {
      return; // Unique constraint: user cannot add the same product twice
    }

    const newItem = {
      id: 'wl-' + Math.random().toString(36).substring(2, 9),
      user_id: user?.id,
      product_id: productId,
      priority,
      notes,
      status,
      created_at: new Date().toISOString()
    };

    setWishlistItems(prev => [newItem, ...prev]);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('wishlist_items').insert({
          user_id: user.id,
          product_id: productId,
          priority,
          notes,
          status
        });
      } catch (e) {
        console.error('Error inserting to Supabase wishlist', e);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistItems(prev => prev.filter(item => item.product_id !== productId));

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
      } catch (e) {
        console.error('Error deleting from Supabase wishlist', e);
      }
    }
  };

  const updateWishlistItem = async (productId, updates) => {
    setWishlistItems(prev =>
      prev.map(item => (item.product_id === productId ? { ...item, ...updates, updated_at: new Date().toISOString() } : item))
    );

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('wishlist_items')
          .update(updates)
          .eq('user_id', user.id)
          .eq('product_id', productId);
      } catch (e) {
        console.error('Error updating wishlist item in Supabase', e);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  const getWishlistItem = (productId) => {
    return wishlistItems.find(item => item.product_id === productId);
  };

  // Favorites Actions
  const toggleFavorite = async (productId) => {
    const isFav = favorites.includes(productId);
    const newFavs = isFav ? favorites.filter(id => id !== productId) : [...favorites, productId];
    setFavorites(newFavs);

    if (isSupabaseConfigured && supabase && user) {
      try {
        if (isFav) {
          await supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', productId);
        } else {
          await supabase.from('favorites').insert({ user_id: user.id, product_id: productId });
        }
      } catch (e) {
        console.error('Error toggling favorite in Supabase', e);
      }
    }
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Brand Following Actions
  const toggleFollowBrand = async (brandId) => {
    const isFollowing = followedBrands.includes(brandId);
    const newFollows = isFollowing ? followedBrands.filter(id => id !== brandId) : [...followedBrands, brandId];
    setFollowedBrands(newFollows);

    if (isSupabaseConfigured && supabase && user) {
      try {
        if (isFollowing) {
          await supabase.from('brand_follows').delete().eq('user_id', user.id).eq('brand_id', brandId);
        } else {
          await supabase.from('brand_follows').insert({ user_id: user.id, brand_id: brandId });
        }
      } catch (e) {
        console.error('Error toggling brand follow in Supabase', e);
      }
    }
  };

  const unfollowAllBrands = async () => {
    setFollowedBrands([]);
    cacheHelper.set('followed_brands', []);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('brand_follows').delete().eq('user_id', user.id);
      } catch (e) {
        console.error('Error unfollowing all brands in Supabase', e);
      }
    }
  };

  const isFollowingBrand = (brandId) => followedBrands.includes(brandId);

  // Moodboard Actions
  const createMoodboard = (name, description = '', cover_image = null) => {
    const newBoard = {
      id: 'mb-' + Math.random().toString(36).substring(2, 9),
      name,
      description,
      cover_image: cover_image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      item_ids: [],
      created_at: new Date().toISOString()
    };
    setMoodboards(prev => [newBoard, ...prev]);
    return newBoard;
  };

  const updateMoodboard = (boardId, updates) => {
    setMoodboards(prev =>
      prev.map(mb => (mb.id === boardId ? { ...mb, ...updates, updated_at: new Date().toISOString() } : mb))
    );
  };

  const deleteMoodboard = (boardId) => {
    setMoodboards(prev => prev.filter(mb => mb.id !== boardId));
  };

  const addProductToMoodboard = (boardId, productId) => {
    setMoodboards(prev =>
      prev.map(mb => {
        if (mb.id === boardId) {
          const item_ids = mb.item_ids.includes(productId) ? mb.item_ids : [...mb.item_ids, productId];
          return { ...mb, item_ids };
        }
        return mb;
      })
    );
  };

  const removeProductFromMoodboard = (boardId, productId) => {
    setMoodboards(prev =>
      prev.map(mb => {
        if (mb.id === boardId) {
          return { ...mb, item_ids: mb.item_ids.filter(id => id !== productId) };
        }
        return mb;
      })
    );
  };

  // Product Tracking Actions
  const toggleTracking = (productId, options = { track_price: true, track_stock: true, track_sale: true }) => {
    setTrackedProducts(prev => {
      if (prev[productId]) {
        const next = { ...prev };
        delete next[productId];
        return next;
      } else {
        return { ...prev, [productId]: options };
      }
    });
  };

  const isTracked = (productId) => Boolean(trackedProducts[productId]);

  // Wishlist Full Detailed Products
  const fullWishlistProducts = useMemo(() => {
    return wishlistItems
      .map(item => {
        const prod = products.find(p => p.id === item.product_id);
        if (!prod) return null;
        return {
          ...prod,
          wishlist_id: item.id,
          priority: item.priority,
          notes: item.notes,
          status: item.status,
          added_at: item.created_at
        };
      })
      .filter(Boolean);
  }, [wishlistItems]);

  // Computed Wishlist Statistics
  const stats = useMemo(() => {
    const totalSaved = fullWishlistProducts.length;
    const favoriteBrandsCount = followedBrands.length;
    const totalValue = fullWishlistProducts.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const priceDropsCount = fullWishlistProducts.filter(item => item.price_history && item.price_history.length > 1 && item.price < item.price_history[0].price).length;
    const restocksCount = fullWishlistProducts.filter(item => item.availability === 'in_stock').length;
    const saleItemsCount = fullWishlistProducts.filter(item => item.is_sale).length;
    const dreamItemsCount = fullWishlistProducts.filter(item => item.priority === 'dream').length;

    return {
      totalSaved,
      favoriteBrandsCount,
      totalValue,
      priceDropsCount,
      restocksCount,
      saleItemsCount,
      dreamItemsCount
    };
  }, [fullWishlistProducts, followedBrands]);

  // Followed Brands detailed objects list
  const followedBrandsList = useMemo(() => {
    return brands.filter(b => followedBrands.includes(b.id));
  }, [followedBrands]);

  const value = {
    wishlistItems,
    fullWishlistProducts,
    favorites,
    followedBrands,
    followedBrandsList,
    moodboards,
    trackedProducts,
    stats,
    addToWishlist,
    removeFromWishlist,
    updateWishlistItem,
    isInWishlist,
    getWishlistItem,
    toggleFavorite,
    isFavorite,
    toggleFollowBrand,
    unfollowAllBrands,
    isFollowingBrand,
    createMoodboard,
    updateMoodboard,
    deleteMoodboard,
    addProductToMoodboard,
    removeProductFromMoodboard,
    toggleTracking,
    isTracked
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
