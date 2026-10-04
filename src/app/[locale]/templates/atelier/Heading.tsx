'use client'

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

/** En-tête de section : « 02 / À propos » puis le titre. `aside` se place à droite (bouton, compteur…). */
export default function Heading({
  num,
  section,
  title,
  aside,
}: {
  num: string;
  section: string;
  title: string;
  aside?: ReactNode;
}) {
  const t = useTranslations("Atelier.nav");
  return (
    <header className="atl-heading">
      <div>
        <p className="atl-kicker">
          {num} / {t(section)}
        </p>
        <h2>{title}</h2>
      </div>
      {aside}
    </header>
  );
}
