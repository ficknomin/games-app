import { Game, GamesResponse } from "../lib/types";

const PAGE_SIZE = 10;

export const fetchGames = async (pageNumber: string): Promise<GamesResponse> => {
  const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${pageNumber}&page_size=${PAGE_SIZE}`
  );

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
