'use client'

import Head from 'next/head';
import Hero from './components/portfolio/Hero';

export default function Home() {

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Head>
        <title>Romaric AKODJENOU</title>
        <meta name="description" content="Portfolio - Romaric AKODJENOU" />
      </Head>

      {/* Hero */}
      <Hero />

      
    </div>
  );
}