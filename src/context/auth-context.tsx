import React, { ReactNode, useCallback } from "react";
import { User } from "types/user";

interface AuthForm {
    username: string;
    password: string;
}

const AuthContext = React.createContext<
    | {
          user: User | null;
          register: (form: AuthForm) => Promise<void>;
          login: (form: AuthForm) => Promise<void>;
          logout: () => Promise<void>;
      }
    | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    return <AuthContext.Provider />;
};
