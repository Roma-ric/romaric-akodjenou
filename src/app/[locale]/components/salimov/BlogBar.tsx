'use client'

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageToggle, ThemeButton } from "./Header";

export default function BlogBar({ backLabel, backHref }: { backLabel: string; backHref: "/" | "/blog" }) {
  return (
    <div className="sal-blogbar">
      <Link href={backHref} className="back">
        <ArrowLeft size={18} aria-hidden="true" /> {backLabel}
      </Link>
      <div className="tools">
        <LanguageToggle />
        <ThemeButton />
      </div>
    </div>
  );
}
