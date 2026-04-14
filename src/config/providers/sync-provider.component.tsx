"use client";

import { ReactNode } from "react";
import { useSyncFavorites } from "@/app/entities/api/favorites";

export const SyncProvider = ({ children }: { children: ReactNode }) => {
  useSyncFavorites();

  return <>{children}</>;
};
