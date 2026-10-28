import { registerApi } from "../api/authApi";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";
import type { RegisterRequest, RegisterResponse } from "../types/auth";

const useRegister = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Register must be rendered inside UserProvider");
    }
    const { saveToken, setUser } = context;

    const mutation = useMutation<RegisterResponse, AxiosError<ApiError>, RegisterRequest>({
        mutationFn: registerApi,
        onSuccess: (response) => {
            saveToken(response.token);
            setUser(response.user);
        }
    })
    return mutation
}

export default useRegister