'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authApi, setToken, removeToken, getToken, ApiError } from '@/lib/api';
import type { User, LoginRequest } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = getToken();
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return false;
    }

    try {
      const userData = await authApi.getMe();
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Auth check failed:', err);
      removeToken();
      setUser(null);
      setIsLoading(false);
      return false;
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(credentials);
      setToken(response.token);
      setUser(response.user);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}


