'use client'

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch, ThemeButton } from "./Header";

export default function BlogBar({ back }: { back: "home" | "blog" }) {
  const t = useTranslations("BlogSection");

  return (
    <div className="sal-blogbar">
      <Link href={back === "home" ? "/" : "/blog"} className="back">
        <ArrowLeft size={18} aria-hidden="true" /> {t(back === "home" ? "backHome" : "back")}
      </Link>
      <div className="tools">
        <LanguageSwitch />
        <ThemeButton />
      </div>
    </div>
  );
}
