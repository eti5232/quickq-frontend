
import type { ProviderAvailabilityResponse, ProviderDayAvailabilityResponse } from "../types/provider";
import axiosInstance from "./axiosInstance"

export const getProviderDates = async (providerId: number, month: string) => {
    const response = await axiosInstance.get<ProviderAvailabilityResponse>(
        `/providers/${providerId}/availability?month=${month}`
    );
    return response.data;
};

export const getProviderDayAvailability = async (providerId: number, date: string) => {
    const response = await axiosInstance.get<ProviderDayAvailabilityResponse>(
        `/providers/${providerId}/slots?date=${date}`
    );
    return response.data;
};
