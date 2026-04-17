import { GamesList } from "@/app/modules/games-list";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

const GamesPage = async () => {
  const t = await getTranslations("games");

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold px-2 pb-5 md:ms-10 -mt-5">
          {t("pageTitle")}
        </h1>
        <GamesList />
      </main>
    </div>
  );
};

export default GamesPage;
