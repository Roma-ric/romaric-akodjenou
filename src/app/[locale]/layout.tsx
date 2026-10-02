import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./hooks/theme-context";
import ThemeToggle from "./components/portfolio/ThemeToggle";
import ScrollToTop from "./components/portfolio/ScrollToTop";
import type { Metadata } from "next";
import Menu from "./components/portfolio/Menu";
import CircularMenu from "./components/portfolio/CircularMenu";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import LanguageSwitcher from "./components/language-switcher";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Script exécuté avant l'hydratation pour appliquer le thème sans flash
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})();`;

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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <NextIntlClientProvider>
          <ThemeProvider>
            {children}

            <ThemeToggle />

            <div className="fixed left-5 top-5 z-50">
              <LanguageSwitcher />
            </div>

            {/* Menu navigation latéral */}
            <Menu />

            {/* Menu navigation horizontale */}
            <CircularMenu
              position="bottom"
              area={180}
              side="end"
              radius={100}
            />

            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
