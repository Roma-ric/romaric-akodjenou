import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import { TEMPLATE_COOKIE, isReadyTemplate, type TemplateId } from "@/config/templates";

export const templateSwitcher = process.env.NEXT_PUBLIC_TEMPLATE_SWITCHER === "true";

/**
 * Modèle à afficher (côté serveur) : celui de `siteConfig`, ou le choix du propriétaire (cookie)
 * si NEXT_PUBLIC_TEMPLATE_SWITCHER=true. Sans ce drapeau, aucun cookie n'est lu et les pages restent statiques.
 */
export async function currentTemplate(): Promise<TemplateId> {
  if (!templateSwitcher) return siteConfig.template;
  const saved = (await cookies()).get(TEMPLATE_COOKIE)?.value;
  return isReadyTemplate(saved) ? saved : siteConfig.template;
}
