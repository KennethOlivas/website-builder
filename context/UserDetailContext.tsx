import { createContext, Dispatch, SetStateAction } from "react";

import { usersTable } from "@/config/schema";

type User = typeof usersTable.$inferSelect | null;

export type UserDetailContextType = {
  userDetail: User;
  setUserDetail: Dispatch<SetStateAction<User>>;
};

export const UserDetailContext = createContext<UserDetailContextType | null>(
  null,
);
export type UserDetailContext = typeof UserDetailContext;

UserDetailContext.displayName = "UserDetailContext";
