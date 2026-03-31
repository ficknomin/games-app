import { GamesListFilters } from "@/components/GamesList";
import { Game, GamesResponse } from "../lib/types";

const PAGE_SIZE = 10;

export const fetchGames = async (filters: GamesListFilters): Promise<GamesResponse> => {
  const params = new URLSearchParams();

  params.append("key", process.env.NEXT_PUBLIC_RAWG_API_KEY!);
  params.append("page", filters.page.toString());
  params.append("page_size", PAGE_SIZE.toString());

  if (filters.search?.trim()) {
    params.append("search", filters.search.trim());
  }

  if (filters.genre) {
    params.append("genres", filters.genre);
  }

  if (filters.platform) {
    params.append("platforms", filters.platform);
  }

  console.log(`https://api.rawg.io/api/games?${params.toString()}`);

  const response = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);


  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  return response.json();
}

export const fetchGame = async (id: string): Promise<Game> => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  return response.json();
}

export const fetchGenres = async () => {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  return response.json();
}

export const fetchPlatforms = async () => {
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch platforms: ${response.statusText}`);
  }

  return response.json();
}
