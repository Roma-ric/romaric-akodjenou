import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./hooks/theme-context";
import ThemeToggle from "./components/portfolio/ThemeToggle";
import Head from "next/head";
import ScrollToTop from "./components/portfolio/ScrollToTop";
import type { Metadata } from "next";
import Menu from "./components/portfolio/Menu";
import CircularMenu from "./components/portfolio/CircularMenu";

export const metadata: Metadata = {
  title: "Romaric AKODJENOU",
  description: "le site officiel de Romaric AKODJENOU",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <Head>
        <title>Romaric AKODJENOU</title>
        <meta name="description" content="Portfolio - Romaric AKODJENOU" />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider>

          {children}

          <ThemeToggle />

          {/* Icône settings */}
          <div className="fixed top-4 left-4 z-40 hidden bg-black ring ring-white dark:bg-white p-2 rounded-full cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Menu navigation latéral */}
          <Menu />

          {/* Menu navigation horizontale */}
          <CircularMenu
            position='bottom'
            area={180}
            side='end'
            radius={100}
          />

          <ScrollToTop />

        </ThemeProvider>
      </body >
    </html >
  );
}
