"use client";

import { useEffect, useState } from "react";

export type SessionUser = {
  id: string;
  email: string;
  username: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return { user };
};
