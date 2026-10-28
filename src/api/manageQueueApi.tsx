import type { ManagerQueue } from "../types/manage";
import type { ChangeStatusRequest, ChangeStatusResponse, CloseQueueResponse, NextInQueueResponse } from "../types/manageQueue";
import axiosInstance from "./axiosInstance";

export const getManageQueue = async (providerId: number | null) => {
    const response = await axiosInstance.get<ManagerQueue>(
        `manage/providers/${providerId}/queue`,
    );
    return response.data;
};

export const openQueue = async (providerId: number| null) => {
    const response = await axiosInstance.post<ManagerQueue>(
        `manage/providers/${providerId}/queue/open`,
    );
    return response.data;
};

export const pauseQueue = async (providerId: number| null) => {
    const response = await axiosInstance.post<ManagerQueue>(
        `manage/providers/${providerId}/queue/pause`,
    );
    return response.data;
};

export const resumeQueue = async (providerId: number| null) => {
    const response = await axiosInstance.post<ManagerQueue>(
        `manage/providers/${providerId}/queue/resume`,
    );
    return response.data;
};

export const closeQueue = async (providerId: number| null) => {
    const response = await axiosInstance.post<CloseQueueResponse>(
        `manage/providers/${providerId}/queue/close`,
    );
    return response.data;
};

export const nextInQueue = async (providerId: number| null) => {
    const response = await axiosInstance.post<NextInQueueResponse>(
        `manage/providers/${providerId}/queue/next`,
    );
    return response.data;
};

export const changeAppointmentStatus = async (appointmentId: number, data: ChangeStatusRequest) => {
    const response = await axiosInstance.post<ChangeStatusResponse>(
        `manage/appointments/${appointmentId}/status`,
        data
    );
    return response.data;
};
