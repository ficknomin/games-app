import { FilterTypes, GamesListFilters } from "@/components/GamesList";
import { Game, GamesResponse } from "../lib/types";
import { supabase } from "@/db/client";

export const fetchGames = async (filters: GamesListFilters): Promise<GamesResponse> => {
  const PAGE_SIZE = 10;
  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("games")
    .select("*", { count: "exact" })
    .range(from, to);

  if (filters.search?.trim()) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters.genre) {
    query = query.contains("genres", [filters.genre]);
  }

  if (filters.platform) {
    query = query.contains("platforms", [filters.platform]);
  }

  if (filters.filter !== '') {
    switch (filters.filter) {
      case FilterTypes.RATINGASC:
        query = query.order('rating', { ascending: true });
        break;
      case FilterTypes.RATINGDESC:
        query = query.order('rating', { ascending: false });
        break;
      case FilterTypes.YEARASC:
        query = query.order('released', { ascending: true });
        break;
      case FilterTypes.YEARDESC:
        query = query.order('released', { ascending: false });
        break;
    }
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch games: ${error.message}`);
  }


  return {
    results: data || [],
    count: count ?? 0,
    next: count !== null ? to + 1 < count : false,
    previous: filters.page > 1,
  }
}

export const fetchGame = async (id: string): Promise<Game> => {
  const query = supabase
    .from("games")
    .select("*")
    .eq("id", id)

  const { data, error } = await query;


  if (error) {
    throw new Error(`Failed to fetch games: ${error}`);
  }

  return data[0];
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
