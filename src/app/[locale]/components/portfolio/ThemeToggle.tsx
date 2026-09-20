'use client'

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/theme-context';

export default function ThemeToggle(){
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed right-0 top-0 p-2 bg-foreground text-background brutal-border brutal-shadow-sm brutal-interactive rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent z-50 m-5"
      title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
