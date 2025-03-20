'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatar: string;
} | null;

type AuthContextType = {
  user: UserProfile;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async (authToken: string) => {
    try {
      setIsLoading(true);

      const res = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
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
    await fetchProfile(newToken);
  };

  useEffect(() => {
    const checkToken = () => {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('token=')
      );

      if (tokenCookie) {
        const savedToken = tokenCookie.split('=')[1];
        setToken(savedToken);
        fetchProfile(savedToken);
      } else {
        setIsLoading(false);
        console.warn('No se encontró un token válido en las cookies.');
      }
    };

    checkToken();
  }, []);

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

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
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
