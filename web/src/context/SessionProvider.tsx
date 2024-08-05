"use client";

import Loader from "@/components/Common/Loader";
import { useUserStore } from "@/data/userStore";
import React, { useEffect } from "react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const { user, fetchUser, refreshToken } = useUserStore();
  useEffect(() => {
    const doAction = async () => {
      await refreshToken();
      await fetchUser();
    };

    doAction();
  }, [fetchUser, refreshToken]);

  return <>{!user ? <Loader /> : <>{children}</>}</>;
};

export default SessionProvider;
