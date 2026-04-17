"use client";

import { useMemo, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/app/shared/ui/button";
import { Checkbox } from "@/app/shared/ui/checkbox";
import { Input } from "@/app/shared/ui/input";
import { Label } from "@/app/shared/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRegisterSchema, RegisterFormData } from "./auth.schema";
import { cn } from "@/app/shared/interfaces/utils";
import { signUp } from "@/app/features/auth";
import { useSessionStore } from "@/app/entities/session";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const RegisterForm = () => {
  const t = useTranslations("register");
  const tValidation = useTranslations("validation");
  const tAuthErrors = useTranslations("authErrors");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();
  const { setSession } = useSessionStore();

  const schema = useMemo(
    () => createRegisterSchema(tValidation),
    [tValidation],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const response = await signUp(data);

    if (response.success) {
      setSession(response.data.accessToken, response.data.user);
      router.push("/games");
      return;
    }

    toast.error(tAuthErrors(response.code));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <div className="space-y-1">
        <Label className="leading-5" htmlFor="username">
          {t("usernameLabel")}
        </Label>
        <Input
          type="text"
          id="username"
          placeholder={t("usernamePlaceholder")}
          className="rounded-sm"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label className="leading-5" htmlFor="userEmail">
          {t("emailLabel")}
        </Label>
        <Input
          type="email"
          id="userEmail"
          placeholder={t("emailPlaceholder")}
          {...register("email")}
          className="rounded-sm"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="w-full space-y-1">
        <Label className="leading-5" htmlFor="password">
          {t("passwordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            className="pr-9 rounded-sm"
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isPasswordVisible ? t("hidePassword") : t("showPassword")}
            </span>
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="w-full space-y-1">
        <Label className="leading-5" htmlFor="confirmPassword">
          {t("confirmPasswordLabel")}
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder={t("confirmPasswordPlaceholder")}
            className="pr-9 rounded-sm"
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() =>
              setIsConfirmPasswordVisible((prevState) => !prevState)
            }
            className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          >
            {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isConfirmPasswordVisible ? t("hidePassword") : t("showPassword")}
            </span>
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Privacy policy */}
      <div className="flex items-center gap-3">
        <Controller
          name="agreeToTerms"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="rounded-sm"
            />
          )}
        />
        <Label htmlFor="rememberMe">
          <span className="text-muted-foreground">{t("agreeToTerms")}</span>{" "}
          <a href="#">{t("privacyPolicy")}</a>
        </Label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-destructive">
          {errors.agreeToTerms.message}
        </p>
      )}

      <Button
        className={cn(
          "w-full rounded-sm",
          isSubmitting ? "opacity-50" : "opacity-100",
        )}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
};
