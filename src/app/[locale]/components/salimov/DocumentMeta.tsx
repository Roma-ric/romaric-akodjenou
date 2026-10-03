'use client'

import { useEffect } from "react";
import { useTranslations } from "next-intl";

/** Titre et description de l'onglet, mis à jour quand la langue change sur place. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}

// Page d'accueil : mêmes textes que les métadonnées du layout
export default function DocumentMeta() {
  const t = useTranslations("Metadata");
  useDocumentMeta(t("title"), t("description"));
  return null;
}
