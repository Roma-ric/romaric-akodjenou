'use client'

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { NextIntlClientProvider, hasLocale, type AbstractIntlMessages } from "next-intl";
import { NAVIGATE_EVENT, captureScrollAnchor, restoreScrollAnchor } from "@/lib/scroll";
import { LOCALE_COOKIE, routing } from "./routing";

export type AppLocale = (typeof routing.locales)[number];

// Textes de chaque langue, chargés à la demande (un fichier séparé par langue)
const loaders: Record<AppLocale, () => Promise<{ default: unknown }>> = {
  en: () => import("../../messages/en.json"),
  fr: () => import("../../messages/fr.json"),
};
const loaded = new Map<AppLocale, Promise<AbstractIntlMessages>>();

function loadMessages(locale: AppLocale) {
  let messages = loaded.get(locale);
  if (!messages) {
    messages = loaders[locale]().then((m) => m.default as AbstractIntlMessages);
    // Échec réseau : on pourra réessayer au prochain clic
    messages.catch(() => loaded.delete(locale));
    loaded.set(locale, messages);
  }
  return messages;
}

/** Mémorise la langue (cookie lu par le middleware) et l'annonce au document. */
function syncDocument(locale: AppLocale) {
  document.documentElement.lang = locale;
  document.cookie = `${LOCALE_COOKIE.name}=${locale}; path=/; max-age=${LOCALE_COOKIE.maxAge}; SameSite=Lax`;
}

function cookieLocale(): AppLocale | null {
  const value = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE.name}=([^;]*)`))?.[1];
  return hasLocale(routing.locales, value) ? value : null;
}

type LocaleSwitch = {
  switchLocale: (locale: AppLocale) => Promise<void>;
  preloadLocale: (locale: AppLocale) => void;
};

const LocaleSwitchContext = createContext<LocaleSwitch | null>(null);

/**
 * Change la langue sur place : les textes sont remplacés dans la page affichée, sans
 * navigation ni rechargement. Rien n'est recréé (formulaire, carrousel, animations
 * déjà jouées) et l'élément regardé reste à sa place à l'écran.
 */
export function LocaleProvider({
  locale,
  messages,
  timeZone,
  children,
}: {
  locale: AppLocale;
  messages: AbstractIntlMessages;
  timeZone?: string;
  children: ReactNode;
}) {
  const [current, setCurrent] = useState({ locale, messages });
  const currentLocale = useRef(locale);

  const switchLocale = useCallback(async (next: AppLocale) => {
    if (next === currentLocale.current) return;
    const nextMessages = await loadMessages(next);
    currentLocale.current = next;

    window.dispatchEvent(new Event(NAVIGATE_EVENT)); // arrête un défilement fluide en cours
    const anchor = captureScrollAnchor();
    flushSync(() => setCurrent({ locale: next, messages: nextMessages }));
    restoreScrollAnchor(anchor);
    // La mise en page peut encore bouger d'un pixel à l'image suivante : on recale
    requestAnimationFrame(() => restoreScrollAnchor(anchor));
    syncDocument(next);
  }, []);

  const preloadLocale = useCallback((l: AppLocale) => void loadMessages(l).catch(() => {}), []);
  const value = useMemo(() => ({ switchLocale, preloadLocale }), [switchLocale, preloadLocale]);

  // Avant l'affichage : pas de passage furtif par l'autre langue
  useLayoutEffect(() => {
    loaded.set(locale, Promise.resolve(messages));
    // Le routeur de Next.js peut réafficher une page gardée en cache dans l'ancienne langue
    // (retour arrière, page préchargée avant le changement) : c'est le cookie qui fait foi.
    const chosen = cookieLocale();
    if (chosen && chosen !== locale) void switchLocale(chosen);
  }, [locale, messages, switchLocale]);

  return (
    <LocaleSwitchContext.Provider value={value}>
      <NextIntlClientProvider locale={current.locale} messages={current.messages} timeZone={timeZone}>
        {children}
      </NextIntlClientProvider>
    </LocaleSwitchContext.Provider>
  );
}

export function useLocaleSwitch(): LocaleSwitch {
  const context = useContext(LocaleSwitchContext);
  if (!context) throw new Error("useLocaleSwitch must be used within a LocaleProvider");
  return context;
}
