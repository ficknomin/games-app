import "dotenv/config";
import ky from "ky";
import { createClient } from "@supabase/supabase-js";
import { Game } from "@/app/entities/models/game.model";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PAGE_SIZE = 10;
const MAX_PAGES = 20;

const fetchGames = async (page: number) => {
  return ky
    .get(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${page}&page_size=${PAGE_SIZE}`,
    )
    .json<{ results: Game[] }>();
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
