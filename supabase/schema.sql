-- ==============================================================================
-- WISHÉ DATABASE SCHEMA (PostgreSQL / Supabase)
-- "Things you love, beautifully remembered."
-- Upgraded with Official Brand Links, Live Experience & Event Architecture
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BRANDS TABLE (Enhanced with verified official websites and ranking)
CREATE TABLE IF NOT EXISTS public.brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    official_website TEXT,
    website_url TEXT,
    shop_url TEXT,
    new_arrivals_url TEXT,
    sale_url TEXT,
    collections_url TEXT,
    country TEXT,
    brand_type TEXT NOT NULL,
    followers_count INTEGER DEFAULT 0,
    is_top_brand BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    editorial_rank INTEGER DEFAULT 99,
    popularity_score INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    item_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    brand_id TEXT NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'PKR',
    image_url TEXT NOT NULL,
    secondary_image_url TEXT,
    product_url TEXT,
    official_product_url TEXT,
    sku TEXT,
    color TEXT,
    sizes JSONB DEFAULT '[]'::jsonb,
    availability TEXT NOT NULL DEFAULT 'in_stock' CHECK (availability IN ('in_stock', 'out_of_stock', 'limited', 'unknown')),
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_sale BOOLEAN DEFAULT false,
    last_checked_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. HERO CAMPAIGNS TABLE (Dynamic Homepage Hero system)
CREATE TABLE IF NOT EXISTS public.hero_campaigns (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    image_url TEXT NOT NULL,
    cta_text TEXT NOT NULL,
    cta_url TEXT NOT NULL,
    secondary_cta_text TEXT,
    secondary_cta_url TEXT,
    campaign_type TEXT NOT NULL CHECK (campaign_type IN ('SALE', 'NEW_ARRIVAL', 'NEW_COLLECTION', 'LIMITED_EDITION', 'RESTOCK', 'TRENDING', 'EDITORIAL')),
    brand_name TEXT,
    discount_text TEXT,
    start_at TIMESTAMPTZ DEFAULT NOW(),
    end_at TIMESTAMPTZ,
    priority INTEGER DEFAULT 99,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCT EVENTS TABLE (Autonomous Event Architecture)
CREATE TABLE IF NOT EXISTS public.product_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    brand_id TEXT REFERENCES public.brands(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN (
        'PRICE_DROP', 'PRICE_INCREASE', 'NEW_PRODUCT', 'NEW_COLLECTION',
        'RESTOCK', 'OUT_OF_STOCK', 'SALE_STARTED', 'SALE_ENDED',
        'LIMITED_EDITION', 'PRODUCT_UPDATED'
    )),
    old_value NUMERIC,
    new_value NUMERIC,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. WISHLIST ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'dream')),
    notes TEXT,
    status TEXT DEFAULT 'wanted' CHECK (status IN ('wanted', 'watching', 'purchased', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_product_wishlist UNIQUE (user_id, product_id)
);

-- 9. BRAND FOLLOWS TABLE
CREATE TABLE IF NOT EXISTS public.brand_follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_id TEXT NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
    notifications_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_brand_follow UNIQUE (user_id, brand_id)
);

-- 10. USER FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_product_favorite UNIQUE (user_id, product_id)
);

-- 11. MOODBOARDS TABLE
CREATE TABLE IF NOT EXISTS public.moodboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. MOODBOARD ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.moodboard_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    moodboard_id UUID NOT NULL REFERENCES public.moodboards(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    note TEXT,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_moodboard_product UNIQUE (moodboard_id, product_id)
);

-- 13. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
    brand_id TEXT REFERENCES public.brands(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN (
        'PRICE_DROP', 'PRICE_INCREASE', 'BACK_IN_STOCK', 'OUT_OF_STOCK',
        'NEW_PRODUCT', 'NEW_COLLECTION', 'SALE_STARTED', 'SALE_ENDED',
        'LIMITED_EDITION', 'BRAND_UPDATE', 'WISHLIST_REMINDER', 'WEEKLY_DIGEST'
    )),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. NOTIFICATION PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    price_drop_enabled BOOLEAN DEFAULT true,
    price_increase_enabled BOOLEAN DEFAULT false,
    restock_enabled BOOLEAN DEFAULT true,
    new_product_enabled BOOLEAN DEFAULT true,
    new_collection_enabled BOOLEAN DEFAULT true,
    sale_enabled BOOLEAN DEFAULT true,
    limited_edition_enabled BOOLEAN DEFAULT true,
    brand_update_enabled BOOLEAN DEFAULT true,
    wishlist_reminder_enabled BOOLEAN DEFAULT true,
    weekly_digest_enabled BOOLEAN DEFAULT true,
    instant_notifications BOOLEAN DEFAULT true,
    daily_digest BOOLEAN DEFAULT false,
    weekly_digest BOOLEAN DEFAULT true,
    email_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. PRICE HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'PKR',
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. AVAILABILITY HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.availability_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    availability TEXT NOT NULL CHECK (availability IN ('in_stock', 'out_of_stock', 'limited', 'unknown')),
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. PRODUCT TRACKING TABLE
CREATE TABLE IF NOT EXISTS public.product_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    track_price BOOLEAN DEFAULT true,
    track_stock BOOLEAN DEFAULT true,
    track_sale BOOLEAN DEFAULT true,
    track_new_versions BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_product_tracking UNIQUE (user_id, product_id)
);

-- 18. USER PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    preferred_style JSONB DEFAULT '[]'::jsonb,
    preferred_colors JSONB DEFAULT '[]'::jsonb,
    preferred_categories JSONB DEFAULT '[]'::jsonb,
    budget_min NUMERIC DEFAULT 0,
    budget_max NUMERIC DEFAULT 500000,
    currency TEXT DEFAULT 'PKR',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. EMAIL PREFERENCES TABLE
CREATE TABLE IF NOT EXISTS public.email_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    price_drops BOOLEAN DEFAULT true,
    restocks BOOLEAN DEFAULT true,
    limited_editions BOOLEAN DEFAULT true,
    wishlist_alerts BOOLEAN DEFAULT true,
    daily_digest BOOLEAN DEFAULT false,
    weekly_digest BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_brands_top ON public.brands(is_top_brand, editorial_rank);
CREATE INDEX IF NOT EXISTS idx_events_product ON public.product_events(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_price_history_product ON public.price_history(product_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Public Read Tables
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (true);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

ALTER TABLE public.hero_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero_campaigns" ON public.hero_campaigns FOR SELECT USING (true);

ALTER TABLE public.product_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_events" ON public.product_events FOR SELECT USING (true);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_images" ON public.product_images FOR SELECT USING (true);

ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read price_history" ON public.price_history FOR SELECT USING (true);

ALTER TABLE public.availability_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read availability_history" ON public.availability_history FOR SELECT USING (true);

-- User-Specific Private Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User read own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.brand_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own brand follows" ON public.brand_follows FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.moodboards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own moodboards" ON public.moodboards FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.moodboard_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own moodboard items" ON public.moodboard_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.moodboards WHERE moodboards.id = moodboard_items.moodboard_id AND moodboards.user_id = auth.uid())
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own notification preferences" ON public.notification_preferences FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.product_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own product tracking" ON public.product_tracking FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.email_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User CRUD own email preferences" ON public.email_preferences FOR ALL USING (auth.uid() = user_id);
