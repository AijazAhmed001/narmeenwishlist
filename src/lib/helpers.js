// Reusable helper utilities for WISHÉ

export function formatPrice(amount, currency = 'PKR') {
  if (amount === undefined || amount === null || isNaN(amount)) return '';
  const num = Number(amount);
  
  if (currency === 'PKR') {
    return `PKR ${num.toLocaleString('en-PK')}`;
  } else if (currency === 'USD') {
    return `$${num.toLocaleString('en-US')}`;
  } else if (currency === 'GBP') {
    return `£${num.toLocaleString('en-GB')}`;
  } else if (currency === 'EUR') {
    return `€${num.toLocaleString('en-EU')}`;
  }
  return `${currency} ${num.toLocaleString()}`;
}

export function calculateDiscount(originalPrice, currentPrice) {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
  const diff = originalPrice - currentPrice;
  return Math.round((diff / originalPrice) * 100);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return formatDate(dateString);
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Local offline cache helpers
export const cacheHelper = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`wishe_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Cache read error', e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(`wishe_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Cache write error', e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(`wishe_${key}`);
    } catch (e) {
      console.warn('Cache remove error', e);
    }
  }
};
