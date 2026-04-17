"use server";

import { createClient } from "@/config/db/env.server";
import { FavoriteGame } from "@/app/entities/models/favorite.model";
import { getSessionUserId } from "@/app/features/auth/auth.service";

export const fetchFavoritesDB = async () => {
  const userId = await getSessionUserId();
  if (!userId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("game_id")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

export const addFavoriteDB = async (gameId: number) => {
  const userId = await getSessionUserId();
  if (!userId) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, game_id: gameId });

  if (error) throw error;
};

export const removeFavoriteDB = async (gameId: number) => {
  const userId = await getSessionUserId();
  if (!userId) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", gameId);

  if (error) throw error;
};

export const syncFavoritesOnLogin = async (localFavorites: FavoriteGame[]) => {
  const userId = await getSessionUserId();
  if (!userId) return [];

  const supabase = await createClient();
  const { data: dbFavorites, error } = await supabase
    .from("favorites")
    .select("game_id")
    .eq("user_id", userId);

  if (error) throw error;

  const dbIds = new Set(dbFavorites.map((f) => f.game_id));
  const localIds = new Set(localFavorites.map((l) => l.id));

  const toInsert = localFavorites
    .filter((f) => !dbIds.has(f.id))
    .map((f) => ({ user_id: userId, game_id: f.id }));

  if (toInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("favorites")
      .insert(toInsert);
    if (insertError) throw insertError;
  }

  return Array.from(new Set([...dbIds, ...localIds]));
};
