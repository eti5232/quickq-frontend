import type { CreatedProvider, CreateProviderRequest, ManageAppointment, ManageAppointmentsQueryParams, ManageAppointmentsResponse, ManageProvidersResponse, UpdatedProviderResponse, UpdateProviderRequest } from "../types/manage";
import axiosInstance from "./axiosInstance";

export const getManageAppointment = async (params?: ManageAppointmentsQueryParams) => {
    const response = await axiosInstance.get<ManageAppointmentsResponse>(
        "manage/appointments",
        { params }
    );
    return response.data;
};

export const getProvidersAppointment = async () => {
    const response = await axiosInstance.get<ManageProvidersResponse>(
        "manage/providers",
    );
    return response.data;
};

export const createProvider = async (provider: CreateProviderRequest) => {
    const response = await axiosInstance.post<CreatedProvider>(
        "manage/providers",
        provider
    );
    return response.data;
};

export const updateProvider = async (id: number, data: UpdateProviderRequest) => {
    const response = await axiosInstance.patch<UpdatedProviderResponse>(
        `manage/providers/${id}`,
        data
    );
    return response.data;
};

export const cancleClientAppointment = async (id: number, reason?: string) => {
    const response = await axiosInstance.post<ManageAppointment>(
        `manage/appointments/${id}/cancel`,
        {reason}
    );
    return response.data;
};