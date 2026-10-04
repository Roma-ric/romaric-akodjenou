import type { ReactNode } from "react";
import { getAge, siteConfig } from "@/config/site";
import DocumentMeta from "../../components/salimov/DocumentMeta";
import HashScroll from "../../components/salimov/HashScroll";
import About from "./About";
import Blog from "./Blog";
import Chrome from "./Chrome";
import Clients from "./Clients";
import Contact from "./Contact";
import Experience from "./Experience";
import Home from "./Home";
import Projects from "./Projects";
import Services from "./Services";
import Shell from "./Shell";
import Testimonials from "./Testimonials";
import { atelierFonts } from "./fonts";
import "./atelier.css";


type Panel = { id: string; node: (num: string) => ReactNode };

// Modèle « Atelier » : rail de navigation à gauche, sections côte à côte sur ordinateur
// (défilement horizontal), règle de progression en bas ; empilement vertical sur mobile.
// `tools` reçoit le panneau de personnalisation du propriétaire, s'il est activé.
export default function AtelierTemplate({ tools }: { tools?: ReactNode }) {
  const { sections } = siteConfig;
  const panels: (Panel | false)[] = [
    { id: "home", node: () => <Home /> },
    { id: "about", node: (num) => <About num={num} age={getAge(siteConfig.birthDate)} /> },
    { id: "experience", node: (num) => <Experience num={num} /> },
    { id: "projects", node: (num) => <Projects num={num} /> },
    sections.services && { id: "services", node: (num) => <Services num={num} /> },
    sections.testimonials && { id: "testimonials", node: (num) => <Testimonials num={num} /> },
    sections.clients && { id: "clients", node: (num) => <Clients num={num} /> },
    sections.blog && { id: "blog", node: (num) => <Blog num={num} /> },
    { id: "contact", node: (num) => <Contact num={num} /> },
  ];
  // Numéro de section (« 02 ») calculé après masquage, pour rester continu
  const visible = panels
    .filter((p): p is Panel => Boolean(p))
    .map(({ id, node }, i) => ({ id, node: node(String(i + 1).padStart(2, "0")) }));

  return (
    <div className={`atl ${atelierFonts}`}>
      <DocumentMeta />
      <Chrome sections={visible.map((p) => p.id)} />
      <HashScroll />
      {tools}
      <Shell panels={visible} />
    </div>
  );
}
