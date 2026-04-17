import z from "zod";

type Translator = (key: string) => string;

export const createRegisterSchema = (t: Translator) =>
  z
    .object({
      username: z
        .string()
        .min(3, t("usernameMin"))
        .max(20, t("usernameMax"))
        .regex(/^[a-zA-Z0-9_]+$/, t("usernameChars")),

      email: z
        .string()
        .min(1, t("emailRequired"))
        .pipe(z.email(t("emailInvalid"))),

      password: z
        .string()
        .min(8, t("passwordMin"))
        .regex(/[A-Z]/, t("passwordUppercase"))
        .regex(/[0-9]/, t("passwordNumber")),

      confirmPassword: z.string().min(1, t("confirmRequired")),

      agreeToTerms: z.boolean().refine((value) => value === true, {
        message: t("termsRequired"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsMismatch"),
      path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

export const createLoginSchema = (t: Translator) =>
  z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .pipe(z.email(t("emailInvalid"))),
    password: z.string().min(8, t("passwordMin")),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
