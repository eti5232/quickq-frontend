import type { SaveWorkingHoursRequest, WorkingHoursResponse } from "../types/workingHours";
import axiosInstance from "./axiosInstance";

export const getWorkingHours = async (providerId: number | null) => {
    const response = await axiosInstance.get<WorkingHoursResponse>(
        `manage/providers/${providerId}/working-hours`,
    );
    return response.data;
};

export const putWorkingHours = async (providerId: number | null, hours: SaveWorkingHoursRequest) => {
    const response = await axiosInstance.put<WorkingHoursResponse>(
        `manage/providers/${providerId}/working-hours`,
        hours
    );
    return response.data;
};