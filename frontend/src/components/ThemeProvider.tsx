'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: (newTheme?: 'light' | 'dark') => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = (newTheme?: 'light' | 'dark') => {
    const selectedTheme = newTheme || (theme === 'light' ? 'dark' : 'light');
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
