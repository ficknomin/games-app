import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/app/shared/ui/button";
import { CompassIcon } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notFound.generic");

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <CompassIcon className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-mono tracking-widest text-muted-foreground">
          {t("code")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <Button asChild className="rounded-sm">
        <Link href="/">{t("backHome")}</Link>
      </Button>
    </div>
  );
}
