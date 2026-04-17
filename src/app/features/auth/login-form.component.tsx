"use client";

import { useMemo, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/app/shared/ui/button";
import { Checkbox } from "@/app/shared/ui/checkbox";
import { Input } from "@/app/shared/ui/input";
import { Label } from "@/app/shared/ui/label";
import { useForm } from "react-hook-form";
import { createLoginSchema, LoginFormData } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "./auth.service";
import { useSessionStore } from "@/app/entities/session";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/app/shared/interfaces/utils";

export const LoginForm = () => {
  const t = useTranslations("login");
  const tValidation = useTranslations("validation");
  const tAuthErrors = useTranslations("authErrors");

  const router = useRouter();
  const { setSession } = useSessionStore();
  const [isVisible, setIsVisible] = useState(false);

  const schema = useMemo(() => createLoginSchema(tValidation), [tValidation]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await signIn(data);

    if (response.success) {
      setSession(response.data.accessToken, response.data.user);
      router.push("/games");
      return;
    }

    toast.error(tAuthErrors(response.code));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="userEmail" className="leading-5">
          {t("emailLabel")}
        </Label>
        <Input
          type="email"
          id="userEmail"
          placeholder={t("emailPlaceholder")}
          className="rounded-sm"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5">
          {t("passwordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isVisible ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            className="pr-9 rounded-sm"
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isVisible ? t("hidePassword") : t("showPassword")}
            </span>
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between gap-y-2">
        <div className="flex items-center gap-3">
          <Checkbox id="rememberMe" className="size-6 rounded-sm" />
          <Label htmlFor="rememberMe" className="text-muted-foreground">
            {t("rememberMe")}
          </Label>
        </div>

        <a href="#" className="hover:underline">
          {t("forgotPassword")}
        </a>
      </div>

      <Button
        className={cn("w-full rounded-sm", isSubmitting && "opacity-50")}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
};
