import { setRequestLocale } from "next-intl/server";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Projects from "./components/portfolio/Projects";
import Contact from "./components/portfolio/Contact";
import Services from "./components/portfolio/Services";
import Footer from "./components/portfolio/Footer";
import HashScroll from "./components/portfolio/HashScroll";
import HorizontalShell from "./components/portfolio/HorizontalShell";
import Preloader from "./components/portfolio/Preloader";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-black/[0.025]">
      <Preloader />
      <HashScroll />
      <HorizontalShell
        panels={[
          { id: "home", node: <Hero /> },
          { id: "about", node: <About /> },
          { id: "services", node: <Services /> },
          { id: "projects", node: <Projects /> },
          { id: "contact", node: <Contact /> },
          {
            id: "footer",
            widthClass: "lg:w-screen",
            node: (
              <div className="flex min-h-screen flex-col justify-end">
                <Footer />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
