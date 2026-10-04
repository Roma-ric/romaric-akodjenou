'use client'

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import ContactForm from "../../components/salimov/ContactForm";
import Reveal from "../../components/salimov/Reveal";
import { social } from "../../components/salimov/social";
import Heading from "./Heading";

export default function Contact({ num }: { num: string }) {
  const t = useTranslations("Atelier.contact");
  const c = useTranslations("ContactSection");
  const about = useTranslations("AboutSection.personalInfo");

  return (
    <section className="atl-section atl-contact">
      <Heading num={num} section="contact" title={t("title")} />

      <div className="atl-contact-grid">
        <div className="atl-contact-side">
          <p className="atl-lead">{t("lead")}</p>
          <Reveal as="div" className="atl-card">
            <span className="icon"><Mail aria-hidden="true" /></span>
            <span>
              <span className="small">{c("contactMethods.email.type")}</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </span>
          </Reveal>
          <Reveal as="div" className="atl-card" delay={0.05}>
            <span className="icon"><Phone aria-hidden="true" /></span>
            <span>
              <span className="small">{c("contactMethods.phone.type")}</span>
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            </span>
          </Reveal>
          <Reveal as="div" className="atl-card" delay={0.1}>
            <span className="icon"><MapPin aria-hidden="true" /></span>
            <span>
              <span className="small">{about("address.label")}</span>
              <span className="value">{about("address.value")}</span>
            </span>
          </Reveal>
          <div className="atl-networks">
            <p className="small">{t("networks")}</p>
            <ul>
              {social.map(({ title, svg, link }) => (
                <li key={title}>
                  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={title} title={title}>
                    {svg}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal as="div" className="atl-form" delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>

      <p className="atl-copy">© {new Date().getFullYear()} Romaric AKODJENOU</p>
    </section>
  );
}
