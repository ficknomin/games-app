"use client";

import { ReactNode } from "react";
import { useSyncFavorites } from "@/hooks/useSyncFavorites";

export const SyncProvider = ({ children }: { children: ReactNode }) => {
  useSyncFavorites();

  return <>{children}</>;
};

