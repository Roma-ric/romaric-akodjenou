'use client'

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/theme-context';

export default function ThemeToggle(){
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
}
