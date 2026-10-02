import { Geist, Geist_Mono, Livvic } from "next/font/google";
import "./globals.css";
import "./salimov.css";
import { ThemeProvider } from "./hooks/theme-context";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ACCENT_STORAGE_KEY, accents, foregroundFor } from "@/config/accents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const livvic = Livvic({
  variable: "--font-livvic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Script exécuté avant l'hydratation pour appliquer le thème sans flash
const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

// Couleur d'accent choisie par le propriétaire (sélecteur), appliquée avant le premier affichage
const accentMap = Object.fromEntries(accents.map((a) => [a.id, [a.color, a.text, foregroundFor(a.color)]]));
const accentScript = `(function(){try{var m=${JSON.stringify(accentMap)};var v=m[localStorage.getItem('${ACCENT_STORAGE_KEY}')];if(v){var s=document.documentElement.style;s.setProperty('--sal-user-accent',v[0]);s.setProperty('--sal-user-accent-text',v[1]);s.setProperty('--sal-user-accent-fg',v[2])}}catch(e){}})();`;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl = process.env.NEXT_PUBLIC_APP_LINK;

  return {
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
      images: ["/files/profile-bg.png"],
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + accentScript }} />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${livvic.variable} antialiased relative`}
      >
        <NextIntlClientProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
