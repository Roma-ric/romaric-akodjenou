import { useTranslations } from "next-intl";
import { social } from "./social";

export default function Copyright() {
  const t = useTranslations("Copyright");

  return (
    <footer className="sal-copyright">
      <span>© {new Date().getFullYear()} Romaric AKODJENOU</span>
      <span>
        {t("design")}{" "}
        <a href="https://themeforest.net/user/celtano/portfolio" target="_blank" rel="noopener noreferrer">
          Salimov · Celtano
        </a>
      </span>
      <ul className="sal-social">
        {social.map(({ title, svg, link }) => (
          <li key={title}>
            <a href={link} target="_blank" rel="noopener noreferrer" aria-label={title} title={title}>
              {svg}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
