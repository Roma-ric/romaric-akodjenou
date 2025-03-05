'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./hooks/theme-context";
import ThemeToggle from "./components/portfolio/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import { ArrowUp } from "lucide-react";

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

  const [currentAnchor, setCurrentAnchor] = useState<string>('#home')

  const menu = [
    {
      label: 'HOME',
      endpoint: '#home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'ABOUT',
      endpoint: '#about',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      label: 'SERVICES',
      endpoint: '#services',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} >
          <rect width={7} height={9} x={3} y={3} rx={0} />
          <rect width={7} height={5} x={14} y={3} rx={0} />
          <rect width={7} height={9} x={14} y={12} rx={0} />
          <rect width={7} height={5} x={3} y={16} rx={0} />
        </svg>
      )
    },
    {
      label: 'PROJECTS',
      endpoint: '#projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'CONTACT',
      endpoint: '#contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'BLOG',
      endpoint: '#blog',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const anchor = window.location.href.split(process.env.NEXT_PUBLIC_APP_LINK as string)[1]
    setCurrentAnchor(anchor)
  }, [])

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
          <div className="fixed scr_3:hidden scr_4_2:block right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 z-40">
            {menu.map((item, index) => (
              <Link key={index} href={item?.endpoint} onClick={() => setCurrentAnchor(item?.endpoint)}>
                <div className={`group w-max transform transition-transform duration-300 hover:-translate-y-1 ${currentAnchor === item?.endpoint ? 'bg-yellow-500 hover:bg-yellow-500' : 'bg-black dark:bg-zinc-700'} flex justify-end items-center hover:bg-yellow-500 dark:hover:bg-yellow-500 p-3.5 rounded-full cursor-pointer`}>
                  <span className="hidden group-hover:inline-block mr-4 text-white"> {item?.label} </span>
                  {item?.icon}
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="fixed right-0 bottom-0 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-40 m-5">
            <ArrowUp className="w-5 h-5 text-white dark:text-black" />
          </button>

        </ThemeProvider>
      </body >
    </html >
  );
}
