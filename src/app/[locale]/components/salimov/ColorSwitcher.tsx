'use client'

import { useState } from "react";
import { Settings, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ACCENT_STORAGE_KEY, accents, applyAccent } from "@/config/accents";

// Sélecteur de couleur d'accent réservé au propriétaire :
// il n'est affiché que si NEXT_PUBLIC_COLOR_SWITCHER=true (voir page.tsx).
export default function ColorSwitcher() {
  const t = useTranslations("ColorSwitcher");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(() => {
    try {
      return localStorage.getItem(ACCENT_STORAGE_KEY) ?? "yellow";
    } catch {
      return "yellow";
    }
  });

  const choose = (id: string) => {
    setCurrent(id);
    applyAccent(id);
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, id);
    } catch {
      /* stockage indisponible : la couleur vaut pour la session */
    }
  };

  return (
    <div className={`sal-switcher${open ? " open" : ""}`}>
      <div className="panel" role="group" aria-label={t("title")} inert={!open}>
        <h4>{t("title")}</h4>
        <ul>
          {accents.map(({ id, color }) => (
            <li key={id}>
              <button
                type="button"
                aria-label={id}
                aria-pressed={current === id}
                style={{ background: color }}
                onClick={() => choose(id)}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="toggle"
        aria-expanded={open}
        aria-label={t("title")}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden="true" /> : <Settings aria-hidden="true" />}
      </button>
    </div>
  );
}
