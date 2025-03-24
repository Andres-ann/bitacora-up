'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchToken = async () => {
    try {
      const res = await fetch('/api/token', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
      setToken(null);
    }
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        console.error('Error al obtener el perfil:', res.statusText);
        setUser(null);
      }
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newToken: string) => {
    setToken(newToken);
    await fetchProfile();
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });

      setUser(null);
      setToken(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const updateUser = (updatedUser: UserProfile | null) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchToken().then(() => {
      if (token) {
        fetchProfile();
      }
    });
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
