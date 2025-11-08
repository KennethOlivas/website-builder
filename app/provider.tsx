"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useEffectEvent } from "react";
import { ThemeProvider } from "next-themes";

import { usersTable } from "@/config/schema";

type User = typeof usersTable.$inferSelect | null;

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<User>(null);

  // Wrap state updates in an Effect Event to avoid synchronous setState in effect warnings.
  const createOrSyncUser = useEffectEvent(async () => {
    try {
      const res = await fetch("/api/users", {
        cache: "no-store",
        method: "POST",
      });
      const data = await res.json();
      setUserDetail(data.user);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      void createOrSyncUser();
    }
  }, [user]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserDetailContext.Provider
        value={{
          userDetail,
          setUserDetail,
        }}
      >
        {children}
      </UserDetailContext.Provider>
    </ThemeProvider>
  );
};

export default Provider;
