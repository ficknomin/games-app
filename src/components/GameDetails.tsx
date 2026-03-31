"use client";

import { useGame } from "@/hooks/useGame";
import { Spinner } from "./ui/spinner";
import Image from "next/image";
import { Genre, Platform } from "@/lib/types";
import { Badge } from "./ui/badge";

type GameDetailsProps = {
  id: string;
}

const GameDetails = ({ id }: GameDetailsProps) => {
  const { isLoading, isError, data, error, refetch } = useGame(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-28">
        <Spinner className="animate-spin" />
      </div>
    );

  }

  if (isError) {
    return (
      <p className="text-destructive text-center text-xl">Failed to load the game data: {error?.message}</p>
    )
  }

  if (!data) return null;


  return (
    <div className="max-w-4xl w-full space-y-4">
      <div className="bg-card rounded-sm shadow-md overflow-hidden">
        <div className="relative w-full h-96 flex">
          <Image
            src={data.background_image}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-card via-card/31 to-transparent" />

          {data.metacritic && (
            <div className="absolute top-4 right-4 flex flex-col items-center border bg-card border-green-500/50 rounded-sm px-3 py-1.5">
              <span className="text-lg font-bold text-green-400 leading-none">{data.metacritic}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Metacritic</span>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 -mt-8 relative">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-sm text-muted-foreground">{data.released.split("-")[0]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {data.genres.map((g: Genre) => (
              <Badge key={g.id} variant="secondary" className="rounded-sm text-xs text-foreground">{g.name}</Badge>
            ))}
            {data.parent_platforms.map(({ platform }: { platform: Platform }) => (
              <span key={platform.id} className="text-xs text-muted-foreground">{platform.name} ·</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
