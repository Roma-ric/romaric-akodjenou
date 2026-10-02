'use client'

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/theme-context";

type Item = { id: string; label: string };

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Language");

  return (
    <div role="group" aria-label={t("title")} className="tools">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          className="sal-tool"
          aria-current={l === locale}
          lang={l}
          onClick={() => router.replace(`${pathname}${window.location.hash}`, { locale: l })}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function ThemeButton() {
  const { toggleTheme } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <button type="button" className="sal-tool" onClick={toggleTheme} aria-label={t("label")} title={t("label")}>
      <Moon className="dark:hidden" aria-hidden="true" />
      <Sun className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}

export default function Header({ sections }: { sections: string[] }) {
  const t = useTranslations("MenuSection");
  const [open, setOpen] = useState(false);

  const labels: Record<string, string> = {
    home: t("home"),
    about: t("about"),
    services: t("services"),
    projects: t("projects"),
    contact: t("contact"),
    blog: t("blog"),
  };
  const items: Item[] = sections.filter((id) => id in labels).map((id) => ({ id, label: labels[id] }));
  const active = useActiveSection(items.map(({ id }) => ({ endpoint: `#${id}` })));

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  const links = (
    <ul>
      {items.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-current={active === `#${id}`}
            onClick={(e) => {
              e.preventDefault();
              go(id);
            }}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sal-header">
      {/* Ordinateur */}
      <div className="bar">
        <nav aria-label={t("label")}>{links}</nav>
        <div className="right">
          <p className="mail">Email : <span>{siteConfig.email}</span></p>
          <div className="tools">
            <LanguageToggle />
            <ThemeButton />
          </div>
        </div>
      </div>

      {/* Mobile / tablette */}
      <button
        type="button"
        className="sal-toggle"
        aria-expanded={open}
        aria-controls="sal-overlay"
        aria-label={t("label")}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav id="sal-overlay" className={`sal-overlay${open ? " open" : ""}`} aria-label={t("label")} inert={!open}>
        {links}
        <div className="tools">
          <LanguageToggle />
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}
