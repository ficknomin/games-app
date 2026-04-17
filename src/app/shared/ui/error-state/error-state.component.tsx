"use client";

import { Button } from "@/app/shared/ui/button";
import { useTranslations } from "next-intl";

type ErrorStateProps = {
  message: string | undefined;
  onRetry: () => void;
};

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const t = useTranslations("state");

  return (
    <div className="text-center py-10">
      <p className="text-destructive">
        {message === undefined
          ? t("errorGeneric")
          : t("errorWithMessage", { message })}
      </p>
      <Button className="rounded-sm" onClick={onRetry}>
        {t("retry")}
      </Button>
    </div>
  );
};
