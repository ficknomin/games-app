"use client";

import { useEffect } from "react";
import { useSessionStore } from "../model/store";
import { refreshSession } from "../api/refresh";

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { setSession, setInitialised } = useSessionStore();

  useEffect(() => {
    refreshSession().then((result) => {
      if (result.success) {
        setSession(result.accessToken, result.user);
      }
      setInitialised();
    });
  }, [setSession, setInitialised]);

  return <>{children}</>;
};
