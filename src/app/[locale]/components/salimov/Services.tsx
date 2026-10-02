import { FileText, Globe, LayoutTemplate, PenTool, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const services = [
  { key: "dev", Icon: Globe },
  { key: "template", Icon: LayoutTemplate },
  { key: "doc", Icon: FileText },
  { key: "integration", Icon: PenTool },
  { key: "maintenance", Icon: Wrench },
] as const;

export default function Services() {
  const t = useTranslations("ServicesSection");

  return (
    <section className="sal-section sal-services" style={{ flexWrap: "wrap" }}>
      <div className="sal-title">
        <Reveal as="h3" from="left">{t("title")}</Reveal>
      </div>
      <ul className="sal-boxes">
        {services.map(({ key, Icon }, i) => (
          <Reveal as="li" className="sal-box" key={key} delay={0.1 * i}>
            <span className="icon"><Icon aria-hidden="true" /></span>
            <h4>{t(`services.${key}.title`)}</h4>
            <p className="desc">{t(`services.${key}.description`)}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
