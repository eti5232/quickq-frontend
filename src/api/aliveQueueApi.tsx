import type { LiveStatus } from "../types/aliveQueue";
import axiosInstance from "./axiosInstance";

export const getAliveStatus = async (providerId: number|null) => {
    const response = await axiosInstance.get<LiveStatus>(
        `providers/${providerId}/live`,
    );
    return response.data;
};