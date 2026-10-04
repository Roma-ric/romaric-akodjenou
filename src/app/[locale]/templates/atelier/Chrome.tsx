'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/scroll";
import { useActiveSection } from "../../hooks/useActiveSection";
import { LanguageSwitch, ThemeButton } from "../../components/salimov/Header";

const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Cadre du modèle Atelier : rail vertical (ordinateur), barre et menu plein écran (mobile),
 * outils langue / thème rendus une seule fois (placés en bas du rail ou dans la barre).
 */
export default function Chrome({ sections }: { sections: string[] }) {
  const t = useTranslations("Atelier.nav");
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sections.map((id) => ({ endpoint: `#${id}` })));

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <a href="#home" className="atl-monogram" aria-label={t("home")} onClick={go("home")}>
        RA
      </a>

      <nav className="atl-rail" aria-label={t("label")}>
        <ol>
          {sections.map((id, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === `#${id}` ? "true" : undefined}
                title={t(id)}
                onClick={go(id)}
              >
                <span aria-hidden="true">{pad(i)}</span>
                <span className="sr-only">{t(id)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="atl-tools">
        <LanguageSwitch />
        <ThemeButton />
        <button
          type="button"
          className="sal-tool atl-menu-toggle"
          aria-expanded={open}
          aria-controls="atl-menu"
          aria-label={t("menu")}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile / tablette : menu plein écran */}
      <nav id="atl-menu" className={`atl-menu${open ? " open" : ""}`} aria-label={t("label")} inert={!open}>
        <ol>
          {sections.map((id, i) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === `#${id}` ? "true" : undefined} onClick={go(id)}>
                <span className="num">{pad(i)}</span> {t(id)}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
