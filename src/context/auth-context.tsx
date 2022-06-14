import React, { ReactNode, useCallback } from "react";
import { User } from "types/user";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useAsync } from "utils/use-async";
import { useQueryClient } from "react-query";
import { useMount } from "utils";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        // const data = await http("me", { token });
        const data = {
            user: {
                id: 1,
                name: "linyuhan",
                token: token
            }
        };
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
    const {
        data: user,
        setData: setUser,
        run,
        error,
        isIdle,
        isLoading,
        isError
    } = useAsync<User | null>();
    const queryClient = useQueryClient();

    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.login(form).then(setUser);
    const logout = () =>
        auth.logout().then(() => {
            setUser(null);
            queryClient.clear();
        });

    useMount(
        useCallback(() => {
            run(bootstrapUser());
        }, [])
    );

    if (isLoading || isIdle) {
        return <FullPageLoading />;
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }

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
