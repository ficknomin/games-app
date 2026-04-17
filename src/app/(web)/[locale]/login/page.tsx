import { LoginForm } from "@/app/features/auth";
import { Card } from "@/app/shared/ui/card";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.login" });

  return {
    title: t("title"),
    description: t("description"),
  };
};

const LoginPage = async () => {
  const t = await getTranslations("login");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm rounded-sm bg-card p-8 shadow-lg">
        <h1 className="mb-6 text-xl font-semibold tracking-light">
          {t("heading")}
        </h1>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
