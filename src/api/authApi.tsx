import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UpdateMeRequest, User } from "../types/auth";
import axiosInstance from "./axiosInstance";

export const login = async (loginData: LoginRequest):
    Promise<LoginResponse> => {

    const response = await axiosInstance.post<LoginResponse>(
        "auth/login",
        loginData
    );
    return response.data;
}

export const registerApi = async (registerData: RegisterRequest):
    Promise<RegisterResponse> => {

    const response = await axiosInstance.post<RegisterResponse>(
        "auth/register",
        registerData
    );
    return response.data;
}

export const me = async ():
    Promise<User> => {

    const response = await axiosInstance.get<User>(
        "auth/me"
    );
    return response.data;
}

export const updateMe = async (me: UpdateMeRequest):
    Promise<User> => {
    const response = await axiosInstance.patch<User>(
        "auth/me",
        me
    );
    return response.data;
}

