'use client'

import { useState, useTransition } from "react";
import { Settings, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ACCENT_STORAGE_KEY, accents, applyAccent } from "@/config/accents";
import { saveTemplateChoice, templates, type TemplateId } from "@/config/templates";

// Panneau de personnalisation réservé au propriétaire (voir page.tsx) :
// couleur d'accent (NEXT_PUBLIC_COLOR_SWITCHER) et modèle de mise en page
// (NEXT_PUBLIC_TEMPLATE_SWITCHER). Rien de tout cela n'est visible sur le site public.
export default function OwnerPanel({ colors, template }: { colors: boolean; template?: TemplateId }) {
  const t = useTranslations("OwnerPanel");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<string>(() => {
    try {
      return localStorage.getItem(ACCENT_STORAGE_KEY) ?? "yellow";
    } catch {
      return "yellow";
    }
  });

  const chooseAccent = (id: string) => {
    setAccent(id);
    applyAccent(id);
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, id);
    } catch {
      /* stockage indisponible : la couleur vaut pour la session */
    }
  };

  const chooseTemplate = (id: TemplateId) => {
    saveTemplateChoice(id);
    startTransition(() => router.refresh());
  };

  return (
    <div className={`owner-panel${open ? " open" : ""}`}>
      <div className="panel" role="group" aria-label={t("title")} inert={!open}>
        {colors && (
          <section>
            <h4>{t("accent")}</h4>
            <ul className="swatches">
              {accents.map(({ id, color }) => (
                <li key={id}>
                  <button
                    type="button"
                    aria-label={id}
                    aria-pressed={accent === id}
                    style={{ background: color }}
                    onClick={() => chooseAccent(id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
        {template && (
          <section>
            <h4>{t("template")}</h4>
            <ul className="templates" aria-busy={pending}>
              {templates.map(({ id, ready }) => (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={template === id}
                    disabled={!ready || pending}
                    onClick={() => chooseTemplate(id)}
                  >
                    {t(`templates.${id}`)}
                    {!ready && <small>{t("soon")}</small>}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
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
