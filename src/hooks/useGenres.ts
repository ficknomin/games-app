import { fetchGenres } from "@/api/games"
import { useQuery } from "@tanstack/react-query"

type GenresResponse = {
  id: string;
  name: string;
  slug: string;
}

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,

    select: (data) =>
      data.results.map((genre: GenresResponse) => ({
        id: genre.id,
        label: genre.name,
        value: genre.slug,
      }))
  })
}
