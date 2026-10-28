import { useQuery } from "@tanstack/react-query"
import { me } from "../api/authApi"
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

const useMe = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Me must be rendered inside UserProvider");
    }
    const { setUser } = context;

    const token = localStorage.getItem("token");
    const query = useQuery({
        queryKey: ["me"],
        queryFn: me,
        enabled: !!token
    })

    useEffect(() => {
        if (query.data) {
            setUser(query.data);
        }
    }, [query.data])

    return query;
}

export default useMe



