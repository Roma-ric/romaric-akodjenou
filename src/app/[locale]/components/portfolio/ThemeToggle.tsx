'use client'

import { Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../hooks/theme-context';

export default function ThemeToggle(){
  const { toggleTheme } = useTheme();
  const t = useTranslations('ThemeToggle');

  // Les icônes sont choisies en CSS (classe `dark` posée avant l'hydratation)
  // pour éviter tout décalage entre le rendu serveur et le rendu client.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('label')}
      title={t('label')}
      className="fixed right-0 top-0 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 z-50 m-5"
    >
      <Sun className="hidden dark:block h-5 w-5 text-black" aria-hidden="true" />
      <Moon className="block dark:hidden h-5 w-5 text-white" aria-hidden="true" />
    </button>
  );
}
