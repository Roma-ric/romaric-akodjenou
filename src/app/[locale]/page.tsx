import { setRequestLocale } from "next-intl/server";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Projects from "./components/portfolio/Projects";
import Contact from "./components/portfolio/Contact";
import Services from "./components/portfolio/Services";
import Footer from "./components/portfolio/Footer";
import HashScroll from "./components/portfolio/HashScroll";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-black/[0.025]">
      <HashScroll />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
