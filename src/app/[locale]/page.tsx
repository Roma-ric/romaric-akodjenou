import { setRequestLocale } from "next-intl/server";
import { getAge, siteConfig } from "@/config/site";
import About from "./components/salimov/About";
import ColorSwitcher from "./components/salimov/ColorSwitcher";
import Blog from "./components/salimov/Blog";
import Clients from "./components/salimov/Clients";
import Contact from "./components/salimov/Contact";
import Copyright from "./components/salimov/Copyright";
import DocumentMeta from "./components/salimov/DocumentMeta";
import Facts from "./components/salimov/Facts";
import Header from "./components/salimov/Header";
import HashScroll from "./components/salimov/HashScroll";
import Home from "./components/salimov/Home";
import HorizontalShell from "./components/salimov/HorizontalShell";
import Portfolio from "./components/salimov/Portfolio";
import Preloader from "./components/salimov/Preloader";
import Services from "./components/salimov/Services";
import Testimonials from "./components/salimov/Testimonials";

// Régénéré chaque jour pour garder l'âge à jour
export const revalidate = 86400;

type Panel = { id: string; kind: "dark" | "band"; node: React.ReactNode };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { sections } = siteConfig;
  const panels: (Panel | false)[] = [
    { id: "home", kind: "dark", node: <Home /> },
    { id: "about", kind: "dark", node: <About age={getAge(siteConfig.birthDate)} /> },
    sections.facts && { id: "facts", kind: "band", node: <Facts /> },
    sections.services && { id: "services", kind: "dark", node: <Services /> },
    { id: "projects", kind: "dark", node: <Portfolio /> },
    sections.testimonials && { id: "testimonials", kind: "band", node: <Testimonials /> },
    { id: "contact", kind: "dark", node: <Contact /> },
    sections.clients && { id: "clients", kind: "band", node: <Clients /> },
    sections.blog && { id: "blog", kind: "dark", node: <Blog /> },
    { id: "copyright", kind: "dark", node: <Copyright /> },
  ];
  const visible = panels.filter((p): p is Panel => Boolean(p));

  return (
    <div className="sal min-h-screen">
      <Preloader />
      <DocumentMeta />
      <Header sections={visible.filter((p) => p.kind === "dark" && p.id !== "copyright").map((p) => p.id)} />
      <HashScroll />
      {process.env.NEXT_PUBLIC_COLOR_SWITCHER === "true" && <ColorSwitcher />}
      <HorizontalShell panels={visible} />
    </div>
  );
}
