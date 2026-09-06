import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { cacheHelper } from '../lib/helpers';

const AuthContext = createContext(null);

const DEFAULT_GUEST_USER = {
  id: 'usr-narmeen',
  email: 'narmeen@wishlist.luxury',
  user_metadata: {
    display_name: 'Narmeen',
    username: 'narmeen'
  }
};

const DEFAULT_PROFILE = {
  id: 'prof-narmeen',
  user_id: 'usr-narmeen',
  display_name: 'Narmeen',
  username: 'narmeen',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Curator of timeless Pakistani couture, modern tailoring, and luxury aesthetic wishlists.',
  isOnboarded: true
};

const DEFAULT_PREFERENCES = {
  preferred_style: ['quiet_luxury', 'minimal', 'classic'],
  preferred_colors: ['#F8F5F0', '#C9A6A0', '#262321', '#D8C5A5'],
  preferred_categories: ['cat-fashion', 'cat-bags', 'cat-jewelry'],
  budget_min: 15000,
  budget_max: 350000,
  currency: 'PKR'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (isSupabaseConfigured) return null;
    return cacheHelper.get('auth_user', DEFAULT_GUEST_USER);
  });
  
  const [profile, setProfile] = useState(() => {
    return cacheHelper.get('user_profile', DEFAULT_PROFILE);
  });

  const [preferences, setPreferences] = useState(() => {
    return cacheHelper.get('user_preferences', DEFAULT_PREFERENCES);
  });

  const [loading, setLoading] = useState(true);

  // Supabase Auth Listener
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (data && !error) {
        setProfile(data);
        cacheHelper.set('user_profile', data);
      }
    } catch (e) {
      console.error('Error fetching profile', e);
    }
  }

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      // Mock login for offline/client mode
      const mockUser = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          display_name: email.split('@')[0],
          username: email.split('@')[0].toLowerCase()
        }
      };
      const mockProfile = {
        ...DEFAULT_PROFILE,
        user_id: mockUser.id,
        display_name: mockUser.user_metadata.display_name,
        username: mockUser.user_metadata.username
      };
      setUser(mockUser);
      setProfile(mockProfile);
      cacheHelper.set('auth_user', mockUser);
      cacheHelper.set('user_profile', mockProfile);
      return { user: mockUser };
    }
  };

  const register = async (email, password, displayName) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName, username: displayName.toLowerCase().replace(/\s+/g, '') }
        }
      });
      if (error) throw error;
      return data;
    } else {
      const mockUser = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          display_name: displayName,
          username: displayName.toLowerCase().replace(/\s+/g, '')
        }
      };
      const mockProfile = {
        ...DEFAULT_PROFILE,
        user_id: mockUser.id,
        display_name: displayName,
        username: mockUser.user_metadata.username,
        isOnboarded: false
      };
      setUser(mockUser);
      setProfile(mockProfile);
      cacheHelper.set('auth_user', mockUser);
      cacheHelper.set('user_profile', mockProfile);
      return { user: mockUser };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    cacheHelper.remove('auth_user');
  };

  const updateProfile = async (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    cacheHelper.set('user_profile', updated);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('profiles')
          .upsert({ ...updated, user_id: user.id, updated_at: new Date().toISOString() });
      } catch (e) {
        console.error('Error updating profile in Supabase', e);
      }
    }
  };

  const updatePreferences = async (newPrefs) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    cacheHelper.set('user_preferences', updated);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('user_preferences')
          .upsert({ ...updated, user_id: user.id, updated_at: new Date().toISOString() });
      } catch (e) {
        console.error('Error updating user preferences', e);
      }
    }
  };

  const value = {
    user,
    profile,
    preferences,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
    updatePreferences
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
