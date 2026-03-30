"use client";

import { useGame } from "@/hooks/useGame";
import { Spinner } from "./ui/spinner";

type GameDetailsProps = {
  id: string;
}

const GameDetails = ({ id }: GameDetailsProps) => {
  const { isLoading, isError, data, error, refetch } = useGame(id);

  if (isLoading) {
    return <Spinner className="w-8 h-8 animate-spin" />;
  }

  if (isError) {
    return (
      <p className="text-destructive text-center text-xl">Failed to load the game data: {error?.message}</p>
    )
  }

  return (
    <div className="max-w-4xl w-[75%] bg-card rounded-none shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
    </div>
  )
}

export default GameDetails;
