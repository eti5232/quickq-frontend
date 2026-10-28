import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";

export interface userContextProps {
    user: User | null,
    setUser: (user: User | null) => void,
    saveToken: (token: string) => void,
    logout: () => void
}

export const UserContext = createContext<userContextProps | null>(null);

interface userProviderProps {
    children: ReactNode
}
const UserProvider = ({ children }: userProviderProps) => {

    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const saveToken = (token: string) => {
        localStorage.setItem("token", token);
    }

    return (<UserContext.Provider value={{
        user,
        setUser: setUser,
        // token,
        // isLoading,
        saveToken,
        // saveToken:()=>saveToken(token),
        logout: logout
    }}>
        {children}
    </UserContext.Provider>)

}

export default UserProvider


