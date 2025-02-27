'use client'

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/theme-context';

export default function ThemeToggle(){
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed right-0 top-0 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-40 m-5"
      title={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-black" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </button>
  );
}
