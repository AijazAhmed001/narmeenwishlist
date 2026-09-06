import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { cacheHelper } from '../lib/helpers';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'PRICE_DROP',
    title: 'Price Drop Detected',
    message: 'Your saved Coach Tabby Bag dropped by 15% (PKR 49,000).',
    product_id: 'prod-coach-tabby',
    brand_id: 'brand-coach',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45m ago
  },
  {
    id: 'notif-2',
    type: 'BACK_IN_STOCK',
    title: 'Back in Stock',
    message: 'Your saved Mejuri Gold Sculpted Dôme Hoops are available again.',
    product_id: 'prod-mejuri-gold-hoops',
    brand_id: 'brand-mejuri',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString() // 3h ago
  },
  {
    id: 'notif-3',
    type: 'NEW_COLLECTION',
    title: 'New Collection Revealed',
    message: '✦ A new Sapphire Festive Luxury Lawn collection is now live.',
    product_id: 'prod-sapphire-embroidered-lawn',
    brand_id: 'brand-sapphire',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() // 12h ago
  },
  {
    id: 'notif-4',
    type: 'LIMITED_EDITION',
    title: 'Something rare just arrived',
    message: 'ÉLAN released a limited run of the Ivory Organza Handcrafted Saree.',
    product_id: 'prod-elan-ivory-saree',
    brand_id: 'brand-elan',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() // 1.5d ago
  },
  {
    id: 'notif-5',
    type: 'PRICE_DROP',
    title: 'Perfume Price Adjustment',
    message: '↓ Your Dior Rosewood Eau de Parfum dropped by 12%.',
    product_id: 'prod-dior-rosewood-perfume',
    brand_id: 'brand-dior',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2d ago
  }
];

const DEFAULT_NOTIFICATION_PREFERENCES = {
  price_drop_enabled: true,
  price_increase_enabled: false,
  restock_enabled: true,
  new_product_enabled: true,
  new_collection_enabled: true,
  sale_enabled: true,
  limited_edition_enabled: true,
  brand_update_enabled: true,
  wishlist_reminder_enabled: true,
  weekly_digest_enabled: true,
  instant_notifications: true,
  daily_digest: false,
  weekly_digest: true,
  email_enabled: true
};

export function NotificationProvider({ children }) {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState(() => {
    return cacheHelper.get('user_notifications', DEFAULT_NOTIFICATIONS);
  });

  const [preferences, setPreferences] = useState(() => {
    return cacheHelper.get('notification_preferences', DEFAULT_NOTIFICATION_PREFERENCES);
  });

  const [toasts, setToasts] = useState([]);

  // Save to local cache
  useEffect(() => {
    cacheHelper.set('user_notifications', notifications);
  }, [notifications]);

  useEffect(() => {
    cacheHelper.set('notification_preferences', preferences);
  }, [preferences]);

  // Realtime Supabase Subscription
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !user) return;

    // Fetch initial notifications from Supabase
    async function loadNotifications() {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (data && !error && data.length > 0) {
          setNotifications(data);
        }
      } catch (e) {
        console.error('Error fetching Supabase notifications', e);
      }
    }

    loadNotifications();

    // Setup Realtime Channel
    const channel = supabase
      .channel(`public:notifications:user_id=eq.${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        payload => {
          const newNotif = payload.new;
          setNotifications(prev => [newNotif, ...prev]);
          // Trigger live toast
          showToast(newNotif);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const showToast = (notification) => {
    const toastId = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...notification, toastId }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.toastId !== toastId));
    }, 6000);
  };

  const removeToast = (toastId) => {
    setToasts(prev => prev.filter(t => t.toastId !== toastId));
  };

  const markAsRead = async (notificationId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, is_read: true } : n))
    );

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', notificationId)
          .eq('user_id', user.id);
      } catch (e) {
        console.error('Error marking notification read in Supabase', e);
      }
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('user_id', user.id);
      } catch (e) {
        console.error('Error marking all notifications read in Supabase', e);
      }
    }
  };

  const deleteNotification = async (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('notifications')
          .delete()
          .eq('id', notificationId)
          .eq('user_id', user.id);
      } catch (e) {
        console.error('Error deleting notification in Supabase', e);
      }
    }
  };

  const addNotification = (newNotif) => {
    const formatted = {
      id: 'notif-' + Math.random().toString(36).substring(2, 9),
      is_read: false,
      created_at: new Date().toISOString(),
      ...newNotif
    };
    setNotifications(prev => [formatted, ...prev]);
    showToast(formatted);
  };

  const updatePreferences = async (newPrefs) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    cacheHelper.set('notification_preferences', updated);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase
          .from('notification_preferences')
          .upsert({ ...updated, user_id: user.id, updated_at: new Date().toISOString() });
      } catch (e) {
        console.error('Error updating notification preferences in Supabase', e);
      }
    }
  };

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.is_read).length;
  }, [notifications]);

  const value = {
    notifications,
    unreadCount,
    preferences,
    toasts,
    removeToast,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    updatePreferences
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
