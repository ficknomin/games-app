import { supabase } from "@/db/client"
import { FavoriteGame } from "@/lib/types";



export const fetchFavoritesDB = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("favorites")
    .select("game_id");

  if (error) throw error;

  return data;
}

export const addFavoriteDB = async (gameId: number) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return; // if I throw an error instead of returning, the component re-renders and breaks UI logic

  const { error } = await supabase
    .from("favorites")
    .insert({
      user_id: user.id,
      game_id: gameId,
    });

  if (error) throw error;
}

export const removeFavoriteDB = async (gameId: number) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("game_id", gameId);

  if (error) throw error;
}

export const syncFavoritesOnLogin = async (localFavorites: FavoriteGame[]) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: dbFavorites, error } = await supabase
    .from("favorites")
    .select("game_id");

  if (error) throw error;

  const dbIds = new Set(dbFavorites.map((f) => f.game_id));
  const localIds = new Set(localFavorites.map((l) => l.id));

  const toInsert = localFavorites
    .filter((f) => !dbIds.has(f.id))
    .map((f) => ({
      user_id: user.id,
      game_id: f.id,
    }));

  if (toInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("favorites")
      .insert(toInsert);

    if (insertError) {
      throw insertError;
    }
  }

  const mergedIds = new Set([
    ...dbIds,
    ...localIds,
  ]);

  return Array.from(mergedIds);
}
