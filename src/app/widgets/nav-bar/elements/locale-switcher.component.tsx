"use client";

import { Button } from "@/app/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { routing } from "@/pkg/locale";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const segments = pathname.split("/");
    if (routing.locales.includes(segments[1] as (typeof routing.locales)[number])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    const nextPath = segments.join("/") || "/";

    startTransition(() => {
      router.replace(nextPath);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:cursor-pointer rounded-sm uppercase"
          disabled={isPending}
        >
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 rounded-xs" align="end">
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className="hover:cursor-pointer uppercase"
            disabled={l === locale}
          >
            {l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
