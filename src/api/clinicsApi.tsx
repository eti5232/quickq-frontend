import type { Clinic, ClinicsQueryParams, ClinicsResponse } from "../types/clinic";
import axiosInstance from "./axiosInstance";

export const getClinics = async (params: ClinicsQueryParams):
    Promise<ClinicsResponse> => {
    const response = await axiosInstance.get<ClinicsResponse>(
        "clinics",
        { params }
    );
    return response.data;
}

export const getClinic = async (id: number) => {
    const response = await axiosInstance.get<Clinic>(
        `clinics/${id}`
    );
    return response.data;
}
