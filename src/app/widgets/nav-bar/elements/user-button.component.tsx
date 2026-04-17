"use client";

import { useSessionStore } from "@/app/entities/session";
import { Button } from "@/app/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/shared/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/features/auth";
import { useTranslations } from "next-intl";

export const UserButton = () => {
  const t = useTranslations("userMenu");
  const user = useSessionStore((s) => s.user);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="hover:cursor-pointer rounded-sm">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 rounded-xs" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
          {user ? (
            <>
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                className="hover:cursor-pointer"
              >
                {t("signOut")}
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => router.push("/login")}
                className="hover:cursor-pointer"
              >
                {t("signIn")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/register")}
                className="hover:cursor-pointer"
              >
                {t("signUp")}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
