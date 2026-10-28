import { useMutation } from "@tanstack/react-query";
import { updateMe } from "../api/authApi";
import type { UpdateMeRequest, User } from "../types/auth";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useUpdateMe = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("UpdateMe must be rendered inside UserProvider");
    }
    const { setUser } = context;

    const mutation = useMutation<User, AxiosError<ApiError>, UpdateMeRequest>({
        mutationFn: updateMe,
        onSuccess: (updatedUser) => setUser(updatedUser)
    })
    return mutation;
};

export default useUpdateMe