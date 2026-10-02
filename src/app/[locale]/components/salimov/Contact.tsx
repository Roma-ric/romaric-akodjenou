import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import Reveal from "./Reveal";
import { social } from "./social";

export default function Contact() {
  const t = useTranslations("ContactSection");
  const about = useTranslations("AboutSection.personalInfo");

  return (
    <section className="sal-section sal-contact">
      <div className="sal-title">
        <Reveal as="h3" from="left">{t("subtitle")}</Reveal>
      </div>

      <ul className="sal-boxes cols-2">
        <Reveal as="li" className="sal-box">
          <span className="icon"><Phone aria-hidden="true" /></span>
          <span className="small">{t("contactMethods.phone.type")}</span>
          <a className="value" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
        </Reveal>
        <Reveal as="li" className="sal-box" delay={0.1}>
          <span className="icon"><MapPin aria-hidden="true" /></span>
          <span className="small">{about("address.label")}</span>
          <p>{about("address.value")}</p>
        </Reveal>
        <Reveal as="li" className="sal-box" delay={0.2}>
          <span className="icon"><Mail aria-hidden="true" /></span>
          <span className="small">{t("contactMethods.email.type")}</span>
          <a className="value" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </Reveal>
        <Reveal as="li" className="sal-box" delay={0.3}>
          <span className="icon"><Share2 aria-hidden="true" /></span>
          <span className="small">{t("followMe")}</span>
          <ul className="sal-social">
            {social.map(({ title, svg, link }) => (
              <li key={title}>
                <a href={link} target="_blank" rel="noopener noreferrer" aria-label={title} title={title}>
                  {svg}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </ul>
    </section>
  );
}
