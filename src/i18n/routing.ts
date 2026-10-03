import {defineRouting} from 'next-intl/routing';

// Pas de langue dans l'adresse (`/`, `/blog`) : le middleware choisit la langue d'après
// le cookie NEXT_LOCALE, sinon d'après le navigateur (Accept-Language), sinon l'anglais.
// Les anciennes adresses `/fr/...` redirigent vers `/...` en mémorisant la langue.
export const LOCALE_COOKIE = {name: 'NEXT_LOCALE', maxAge: 60 * 60 * 24 * 365};

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'never',
  localeCookie: LOCALE_COOKIE
});
