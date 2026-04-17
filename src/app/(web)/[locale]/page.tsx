import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomePage } from "@/app/modules/home";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.gamesHub" });

  return {
    title: t("title"),
    description: t("description"),
  };
};

const Home = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <HomePage />
    </div>
  );
};

export default Home;
