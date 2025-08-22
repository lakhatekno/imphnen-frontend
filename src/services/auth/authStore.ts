import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { loginBody } from '@/types/auth.type';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: loginBody) => Promise<void>;
  logout: () => void;
}

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
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (credentials: loginBody) => {
        const { token, user } = await apiLogin(credentials);
        // Optionally: attach token globally in fetch headers here
        set({ token, user, isAuthenticated: true });
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
