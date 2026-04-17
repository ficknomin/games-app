import { FavoritesList } from "@/app/modules/favorites-list";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.favorites",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
};

const FavoritesPage = () => {
  return <FavoritesList />;
};

export default FavoritesPage;
