"use client";

import { FavoriteGame, Game } from "@/app/entities/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import Image from "next/image";
import { Button } from "@/app/shared/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToggleFavorites } from "@/app/features/toggle-favorite";
import { useFavoritesStore } from "@/app/shared/hooks";

export const GameCard = ({ game }: { game: Game | FavoriteGame }) => {
  const router = useRouter();
  const favorite = useFavoritesStore((s) => !!s.favorites[game.id]);
  const toggleFavorite = useToggleFavorites().toggleFavorite;

  return (
    <Card
      onClick={() => router.push(`/games/${game.id}`)}
      className="group p-0 rounded-sm overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative w-full aspect-video flex">
        <Image
          src={game.background_image}
          alt={game.name}
          sizes="auto"
          fill
          className="object-cover transition-transform duration-299 group-hover:scale-105"
        />
      </div>

      <CardHeader className="p-3">
        <CardTitle className="text-sm text-left line-clamp-2">
          {game.name}
        </CardTitle>
        <CardDescription className="text-xs text-left text-muted-foreground">
          {game.released ? game.released.split("-")[0] : "TBA"}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-3 pb-3 flex justify-between">
        <Button
          variant={"ghost"}
          className="opacity-100 hover:!bg-transparent group-hover:opacity-100 md:opacity-0 transition-opacity duration-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite({
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              released: game.released,
            });
          }}
        >
          {favorite ? (
            <Heart fill={"red"} className="w-5 h-5" />
          ) : (
            <Heart className="w-5 h-5 bg-transparent" />
          )}
        </Button>

        <Button
          variant={"ghost"}
          className="opacity-100 group-hover:opacity-100 hover:!bg-transparent md:opacity-0 transition-opacity duration-300 cursor-pointer"
          size="icon"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
