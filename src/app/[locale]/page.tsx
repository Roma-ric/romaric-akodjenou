import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { TEMPLATE_COOKIE, isReadyTemplate, type TemplateId } from "@/config/templates";
import OwnerPanel from "./components/OwnerPanel";
import ClassicTemplate from "./templates/ClassicTemplate";

// Régénéré chaque jour pour garder l'âge à jour
export const revalidate = 86400;

const colorSwitcher = process.env.NEXT_PUBLIC_COLOR_SWITCHER === "true";
const templateSwitcher = process.env.NEXT_PUBLIC_TEMPLATE_SWITCHER === "true";

// Un modèle par identifiant ; les modèles en préparation (`ready: false`) n'en ont pas encore.
const renderers: Partial<Record<TemplateId, typeof ClassicTemplate>> = {
  classic: ClassicTemplate,
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Le cookie n'est lu que si le choix du modèle est activé :
  // sinon la page reste statique avec le modèle de siteConfig.
  let template: TemplateId = siteConfig.template;
  if (templateSwitcher) {
    const saved = (await cookies()).get(TEMPLATE_COOKIE)?.value;
    if (isReadyTemplate(saved)) template = saved;
  }
  const Template = renderers[template] ?? ClassicTemplate;

  const tools =
    colorSwitcher || templateSwitcher ? (
      <OwnerPanel colors={colorSwitcher} template={templateSwitcher ? template : undefined} />
    ) : undefined;

  return <Template tools={tools} />;
}
