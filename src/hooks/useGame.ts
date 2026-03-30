import { fetchGame } from "@/api/games";
import { Game } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useGame = (id: string) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Game, Error>({
    queryKey: ["game", id],
    queryFn: () => fetchGame(id),
  });

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  }
}
