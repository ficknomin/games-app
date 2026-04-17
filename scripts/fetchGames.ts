import "dotenv/config";
import { supabase } from "../src/config/db/env.server";
import { Game } from "@/app/entities/models/game.model";

const PAGE_SIZE = 10;
const MAX_PAGES = 20;

const fetchGames = async (page: number) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${page}&page_size=${PAGE_SIZE}`,
  );

  if (!res.ok) throw new Error("Failed to fetch RAWG");

  return res.json();
};

const transformGameData = (game: Game) => ({
  id: game.id,
  name: game.name,
  background_image: game.background_image,
  released: game.released || null,
  rating: game.rating,
  metacritic: game.metacritic || null,

  genres: game.genres?.map((g) => g) || [],
  platforms: game.platforms?.map((p) => p) || [],
});

const uploadGames = async () => {
  for (let page = 1; page <= MAX_PAGES; page++) {
    console.log(`Fetching page: ${page}`);

    const data = await fetchGames(page);
    const games = data.results.map(transformGameData);

    const { error } = await supabase
      .from("games")
      .upsert(games, { onConflict: "id" });

    if (error) {
      console.error("Error occured: ", error);
      return;
    }

    console.log(`Inserted page ${page}`);
  }

  console.log("Data insertion completed.");
};

uploadGames();
