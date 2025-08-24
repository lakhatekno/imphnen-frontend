import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

import { AuthState, loginBody, User } from '@/types/auth.type';

// Fetcher for login
const apiLogin = async (credentials: loginBody) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json() as Promise<{ token: string; user: User }>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (credentials: loginBody) => {
        const { token, user } = await apiLogin(credentials);
        
        Cookies.set('auth-token', token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove('auth-token');
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);
