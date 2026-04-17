"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/shared/ui/navigation-menu";
import { LocaleSwitcher, UserButton } from "./elements";
import { useTranslations } from "next-intl";

export const NavBar = () => {
  const t = useTranslations("nav");

  return (
    <div className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-start gap-4 p-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/" className="rounded-sm">
                  {t("home")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/games" className="rounded-sm">
                  {t("allGames")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link
                  data-testid="nav-favorites-link"
                  href="/games/favorites"
                  className="rounded-sm"
                >
                  {t("favorites")}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
};
