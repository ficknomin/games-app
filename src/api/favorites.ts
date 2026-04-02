import { supabase } from "@/db/client"

export const fetchFavoritesDB = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("favorites")
    .select("game_id");

  if (error) throw error;

  return data;
}

export const addFavoriteDB = async (gameId: number) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

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

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("game_id", gameId);

  if (error) throw error;
}
