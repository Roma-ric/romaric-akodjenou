'use client'

import Head from 'next/head';
import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Projects from './components/portfolio/Projects';
import Contact from './components/portfolio/Contact';
import Blog from './components/portfolio/Blog';
import Services from './components/portfolio/Services';

export default function Home() {

  const sections = [
    { id: "portfolio", title: "Portfolio", content: "Contenu du portfolio" },
    { id: "about", title: "À Propos", content: "Contenu à propos" },
    { id: "contact", title: "Contact", content: "Contenu contact" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSection = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };


  return (
    <div className="min-h-screen transition-colors duration-300">
      <Head>
        <title>Romaric AKODJENOU</title>
        <meta name="description" content="Portfolio - Romaric AKODJENOU" />
      </Head>

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Services */}
      <Services />

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <Contact />

      {/* Blog */}
      <Blog />

      {/* <div className="relative w-screen h-screen overflow-hidden flex flex-col z-50">
        <div className="fixed top-0 left-0 right-0 flex justify-center gap-4 bg-black text-white p-4">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => goToSection(index)}
              className={`p-2 rounded ${index === currentIndex ? "bg-yellow-500" : "bg-gray-700"}`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="flex-grow flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={sections[currentIndex].id}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-full flex items-center justify-center bg-gray-100 p-10 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-bold">{sections[currentIndex].title}</h2>
              <p className="mt-4">{sections[currentIndex].content}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div> */}

    </div>
  );
}