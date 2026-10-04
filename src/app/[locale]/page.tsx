import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import type { TemplateId } from "@/config/templates";
import { currentTemplate, templateSwitcher } from "@/lib/template";
import OwnerPanel from "./components/OwnerPanel";

// Régénéré chaque jour pour garder l'âge à jour
export const revalidate = 86400;

const colorSwitcher = process.env.NEXT_PUBLIC_COLOR_SWITCHER === "true";

// Chargés à la demande : le HTML ne contient que le modèle affiché. (Next.js regroupe tout de même
// les feuilles de style des deux modèles ; elles sont scopées et les polices d'Atelier ne sont
// téléchargées que si ce modèle est affiché.)
const loaders: Record<TemplateId, () => Promise<{ default: (props: { tools?: ReactNode }) => ReactNode }>> = {
  classic: () => import("./templates/ClassicTemplate"),
  atelier: () => import("./templates/atelier/AtelierTemplate"),
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Sans choix du modèle activé, la page reste statique avec le modèle de siteConfig
  const template = await currentTemplate();
  const { default: Template } = await loaders[template]();

  const tools =
    colorSwitcher || templateSwitcher ? (
      <OwnerPanel colors={colorSwitcher} template={templateSwitcher ? template : undefined} />
    ) : undefined;

  return <Template tools={tools} />;
}
