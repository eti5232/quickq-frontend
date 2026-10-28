import type { CreateAppointmentRequest, CreateAppointmentResponse, MyAppointmentsQueryParams, MyAppointmentsResponse } from "../types/appointment"
import axiosInstance from "./axiosInstance"

export const createAppointment = async (request: CreateAppointmentRequest) => {
    const response = await axiosInstance.post<CreateAppointmentResponse>(
        "appointments",
        request
    );
    return response.data;
};

export const getMyAppointments = async (params?: MyAppointmentsQueryParams) => {
    const response = await axiosInstance.get<MyAppointmentsResponse>(
        "appointments/my",
        { params }
    );
    return response.data;
};

export const cancelMyAppointment = async (id: number) => {
    const response = await axiosInstance.post(
        `appointments/${id}/cancel`,
        {}
    );
    return response.data;
};