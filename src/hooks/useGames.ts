import { GamesListFilters } from "@/components/GamesList"
import { fetchGames } from "../api/games"
import { Game, GamesResponse } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export const useGames = (filters: GamesListFilters) => {
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery<GamesResponse, Error>({
    queryKey: ["games", filters],
    queryFn: () => fetchGames(filters),
    placeholderData: (previousData) => previousData,
  })

  return {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    refetch,
  }
}


