'use client'

import Hero from './components/portfolio/Hero';
import About from './components/portfolio/About';

import { useEffect } from "react";
import Projects from './components/portfolio/Projects';
import Contact from './components/portfolio/Contact';
import Services from './components/portfolio/Services';
import { useRouter } from 'next/navigation';
import Footer from './components/portfolio/Footer';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-black/[0.025]">
      
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
      {/* <Blog /> */}

      {/* Footer */}
      <Footer />

    </div>
  );
}

{/*
  <div className="relative w-screen h-screen overflow-hidden flex flex-col z-50">
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
  </div> 
*/}