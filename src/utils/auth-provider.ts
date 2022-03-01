import { User } from "types/user";

const apiUrl = "xxx";

const localStorageKey = "xxx";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserrResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "");
    return user;
};
