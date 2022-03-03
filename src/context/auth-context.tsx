import React, { ReactNode, useCallback } from "react";
import { User } from "types/user";
import * as auth from "auth-provider";
import { http } from "utils/http";

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", { token });
        user = data.user;
    }
    return user;
};

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
    return (
        <AuthContext.Provider
            children={children}
            value={{ user, login, register, logout }}
        />
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("xxx");
    }
    return context;
};
