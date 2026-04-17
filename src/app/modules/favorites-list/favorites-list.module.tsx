"use client";

import { useFavoritesStore } from "@/app/shared/hooks/use-favorites-store.hook";
import { GameCard } from "@/app/widgets/game-card/index";
import { useTranslations } from "next-intl";

export const FavoritesList = () => {
  const t = useTranslations("favorites");
  const favorites = useFavoritesStore((state) => state.favorites);
  const games = Object.values(favorites);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold px-2 pb-5 md:ms-10 -mt-5">
          {t("pageTitle")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 py-3">
          {games.length === 0 && (
            <div className="col-span-full text-center text-lg text-muted-foreground pt-11 pb-8">
              {t("empty")}
            </div>
          )}
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
};
