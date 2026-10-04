'use client'

import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { CV_PATH, PHOTO_PATH } from "@/content/portfolio";
import { scrollToSection } from "@/lib/scroll";
import { useStats } from "./useStats";

export default function Home() {
  const t = useTranslations("Atelier.home");
  const about = useTranslations("AboutSection");
  const stats = useStats();
  const first = about("personalInfo.firstName.value");
  const lastRaw = about("personalInfo.lastName.value");
  const last = lastRaw.charAt(0) + lastRaw.slice(1).toLowerCase();

  return (
    <section className="atl-home">
      <div className="atl-home-text">
        <h1>
          {first}
          <br />
          {last}
          <span className="dot" aria-hidden="true">.</span>
        </h1>
        <p className="atl-role">{t("role")}</p>
        <p className="atl-lead">{t("lead")}</p>
        <div className="atl-actions">
          <button type="button" className="atl-btn primary" onClick={() => scrollToSection("projects")}>
            {t("projects")} <ArrowRight aria-hidden="true" />
          </button>
          <a className="atl-btn" href={CV_PATH} download>
            <Download aria-hidden="true" /> {t("cv")}
          </a>
        </div>
        <dl className="atl-mini-stats">
          {stats.map(({ key, prefix, to, label }) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>
                {prefix}
                {to}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="atl-portrait">
        <span className="back" aria-hidden="true" />
        <Image src={PHOTO_PATH} alt={about("photoAlt")} fill priority sizes="(min-width: 1025px) 24rem, 90vw" />
        <span className="atl-badge">
          <MapPin aria-hidden="true" /> {t("location")}
        </span>
      </div>
    </section>
  );
}
