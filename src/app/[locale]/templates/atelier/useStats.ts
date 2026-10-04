'use client'

import { useTranslations } from "next-intl";

const keys = ["yearsOfExperience", "completedProjects", "happyCustomers"] as const;

/** Chiffres clés (`AboutSection.stats`) : « +2 années d'expérience »… */
export function useStats() {
  const t = useTranslations("AboutSection.stats");
  return keys.map((key) => ({
    key,
    to: Number(t.raw(`${key}.value`)),
    prefix: t.has(`${key}.prefix`) ? t(`${key}.prefix`) : "",
    label: t(`${key}.label`),
  }));
}
