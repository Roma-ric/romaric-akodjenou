'use client'

import { createContext, useCallback, useContext, useLayoutEffect, useSyncExternalStore, ReactNode } from 'react';
import { ACCENT_STORAGE_KEY, applyAccent } from '@/config/accents';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Source de vérité : la classe `dark` de <html>, posée avant l'hydratation
// par le script du layout. Le contexte ne fait que la refléter.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = (e: MediaQueryListEvent) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {
      /* stockage indisponible */
    }
    if (!stored) {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  };
  mediaQuery.addEventListener('change', handleSystemChange);

  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener('change', handleSystemChange);
  };
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const getServerSnapshot = (): Theme => 'light';

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Un changement de langue recrée la balise <html> : elle perd alors les classes et
  // variables posées par le script d'initialisation. On les réapplique avant l'affichage
  // (sans effet au premier chargement, où elles sont déjà en place).
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const stored = readStored('theme');
    const dark =
      stored === 'dark' ||
      (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', dark);

    const accent = readStored(ACCENT_STORAGE_KEY);
    if (accent) applyAccent(accent);
  }, []);

  const toggleTheme = useCallback((): void => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* stockage indisponible : le thème reste valable pour la session */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
