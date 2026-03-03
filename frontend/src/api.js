// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth endpoints
export const authAPI = {
  signUp: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Sign up failed');
    return response.json();
  },

  signIn: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Sign in failed');
    return response.json();
  },

  signOut: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Sign out failed');
    return response.json();
  },
};

// User endpoints
export const userAPI = {
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  getUser: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
};

// Subscription endpoints
export const subscriptionAPI = {
  subscribe: async (email) => {
    const response = await fetch(`${API_BASE_URL}/subscription/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Subscription failed');
    return response.json();
  },

  verifySubscriber: async (token) => {
    const response = await fetch(`${API_BASE_URL}/subscription/verify/${token}`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Verification failed');
    return response.json();
  },

  unsubscribe: async (email) => {
    const response = await fetch(`${API_BASE_URL}/subscription/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Unsubscribe failed');
    return response.json();
  },

  getAllSubscribers: async (token) => {
    const response = await fetch(`${API_BASE_URL}/subscription`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch subscribers');
    return response.json();
  },

  sendNewsletter: async (token, newsletterData) => {
    const response = await fetch(`${API_BASE_URL}/subscription/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newsletterData),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to send newsletter');
    return response.json();
  },
};