import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authApi } from '../lib/authApi';
import { userApi } from '../lib/userApi';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  isOnboarded: boolean;
  isDiscoverOnboarded?: boolean;
  magnetCoins?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, token: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>, skipBackendSync?: boolean) => void;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasAuthToken, setHasAuthToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLocalUser();
  }, []);

  const loadLocalUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');

      if (!storedUser || !token) {
        setIsLoading(false);
        return;
      }

      // Immediately restore user from localStorage so the app doesn't flash login screen
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setHasAuthToken(true);
      setIsLoading(false); // unblock UI immediately

      // Validate session in background — only logout on explicit 401
      try {
        const validation = await authApi.validateSession(token);
        if (!validation.valid) {
          // Token is explicitly invalid — log out
          logout();
        } else if (validation.user) {
          const updatedUser = { ...parsedUser, ...validation.user };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch {
        // Network error on validation — keep the user logged in
        // They will be shown an error if they try to make API calls
        console.warn('Session validation failed due to network error — keeping user logged in');
      }
    } catch (error) {
      console.error('Error loading local user', error);
      setIsLoading(false);
    }
  };

  const login = useCallback(async (userData: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    setUser(userData);
    setHasAuthToken(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    setHasAuthToken(false);
  }, []);

  const updateUser = useCallback((userData: Partial<User>, skipBackendSync = false) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      if (!skipBackendSync) {
        userApi.updateProfile(userData).catch(err => {
          console.error("Failed to sync profile with backend", err);
        });
      }
      
      return updatedUser;
    });
  }, []);

  const completeOnboarding = useCallback(async () => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, isOnboarded: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      userApi.updateProfile({ isOnboarded: true }).catch(err => {
        console.error("Failed to sync onboarding status", err);
      });
      
      return updatedUser;
    });
  }, []);

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user && hasAuthToken,
    isLoading,
    login,
    logout,
    updateUser,
    completeOnboarding,
  }), [user, hasAuthToken, isLoading, login, logout, updateUser, completeOnboarding]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
