import { fetchGames } from "../api/games"
import { GamesResponse } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

export const useGames = (pageNumber: number) => {
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery<GamesResponse, Error>({
    queryKey: ["games", pageNumber],
    queryFn: () => fetchGames(pageNumber.toString()),
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


