"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useEffectEvent } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { usersTable } from "@/config/schema";

type User = typeof usersTable.$inferSelect | null;

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<User>(null);
  const [queryClient] = useState(() => new QueryClient());

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
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default Provider;
