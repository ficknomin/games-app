import { fetchPlatforms } from "@/api/games"
import { useQuery } from "@tanstack/react-query"

type PlatformsResponse = {
  id: string;
  name: string;
  slug: string;
}

export const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: fetchPlatforms,

    select: (data) =>
      data.results.map((platform: PlatformsResponse) => ({
        label: platform.name,
        value: platform.id.toString(),
      }))
  })
}
