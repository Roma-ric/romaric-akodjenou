import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const t = useTranslations("Language");

  const data = {
    title: t("title"),
    french: t("french"),
    english: t("english"),
  };
  return (
    <div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="ring ring-yellow-500">
              {data.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[100px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/" locale="fr">
                      <div className="font-medium">{data.french}</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/" locale="en">
                      <div className="font-medium">{data.english}</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
