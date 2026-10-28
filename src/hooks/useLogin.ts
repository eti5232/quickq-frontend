import { login } from "../api/authApi";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "../types/auth";
import type { ApiError } from "../types/api";
import type { AxiosError } from "axios";

const useLogin = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Login must be rendered inside UserProvider");
    }
    const { saveToken, setUser } = context;

    const mutation = useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
        mutationFn: login,
        onSuccess: (response) => {
            saveToken(response.token);
            setUser(response.user);
        }
    })
    return mutation
}

export default useLogin