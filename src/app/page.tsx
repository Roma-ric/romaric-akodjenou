'use client'

import Head from 'next/head';
import { Home as HomeIcon, Settings, Bell, User, Menu } from 'lucide-react';
import { useTheme } from './hooks/theme-context';
import ThemeToggle from './components/ThemeToggle';

export default function Home(){
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Head>
        <title>Next.js Dark/Light Mode</title>
        <meta name="description" content="Exemple de mode sombre/clair avec CSS personnalisé" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="border-b border-gray py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-5 w-5" />
            <span className="font-semibold">MonSite</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Paramètres">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Profil">
              <User className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6 text-foreground">
          Bienvenue sur mon site
        </h1>
        
        <p className="mb-8">
          Ceci est un exemple de site utilisant vos variables CSS personnalisées pour gérer le thème.
          Le thème actuel est: <strong>{theme === 'dark' ? 'Sombre' : 'Clair'}</strong>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { title: 'Primaire', color: 'bg-primary' },
            { title: 'Secondaire', color: 'bg-secondary' },
            { title: 'Succès', color: 'bg-success' },
            { title: 'Info', color: 'bg-info' },
            { title: 'Avertissement', color: 'bg-warning text-gray-dark' },
            { title: 'Danger', color: 'bg-danger' },
          ].map((item) => (
            <div key={item.title} className={`${item.color} p-4 rounded-lg shadow text-white ${item.color.includes('warning') ? 'text-gray-dark' : ''}`}>
              <h2 className="text-xl font-semibold mb-2">
                {item.title}
              </h2>
              <p>
                Cette carte utilise la couleur {item.title.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg shadow border border-gray">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              Utilisation des variables CSS
            </h2>
            <p className="mb-4">
              Ce système utilise les variables CSS que vous avez définies pour adapter 
              automatiquement les couleurs en fonction du thème.
            </p>
            <button className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition-opacity">
              Bouton primaire
            </button>
          </div>
          
          <div className="p-6 rounded-lg shadow border border-gray">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              Transition fluide
            </h2>
            <p className="mb-4">
              Les changements de thème sont fluides grâce aux transitions CSS,
              et toutes les couleurs s'adaptent automatiquement.
            </p>
            <div className="flex space-x-2">
              <button className="bg-success text-white py-2 px-4 rounded hover:opacity-90 transition-opacity">
                Confirmer
              </button>
              <button className="bg-danger text-white py-2 px-4 rounded hover:opacity-90 transition-opacity">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}