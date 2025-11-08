import { createContext, Dispatch, SetStateAction } from "react";

import { usersTable } from "@/config/schema";

type User = typeof usersTable.$inferSelect | null;

type UserDetailContextType = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
};



export const UserDetailContext = createContext<UserDetailContextType | null>(null);