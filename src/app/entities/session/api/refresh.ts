import { SessionUser } from "../model/types";

type RefreshResult =
  | { success: true; accessToken: string; user: SessionUser }
  | { success: false };

export const refreshSession = async (): Promise<RefreshResult> => {
  const res = await fetch("/api/auth/refresh", { method: "POST" });

  if (!res.ok) return { success: false };

  return res.json();
};
