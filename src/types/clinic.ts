
import type { Paginated } from "./api"

export type ClinicCategory =
    | "DENTAL"
    | "GENERAL_MEDICINE"
    | "PHYSIOTHERAPY"
    | "CONSULTING"
    | "OTHER";

export type ClinicSort = "name" | "nextAvailable";

export interface ClinicsQueryParams {
    q?: string;
    category?: ClinicCategory;
    city?: string;
    sort?: ClinicSort;
    openNow?: true;
    hasAvailabilityThisWeek?: true;
    page?: number;
    pageSize?: number;
}

// export interface Clinic {
//     id: number,
//     name: string,
//     category: string,
//     city: string,
//     address: string,
//     phone: string,
//     description: string | null,
//     providersCount: number,
//     isOpenNow: boolean
// }

export type Provider = {
    id: number;
    fullName: string;
    specialty: string;
    slotMinutes: number;
    todayQueueStatus: string;
};

export type Clinic = {
    id: number;
    name: string;
    category: string;
    city: string;
    address: string;
    phone: string;
    description: string;
    isActive: boolean;
    isOpenNow: boolean
    settings: {
        changeDeadlineHours: number;
        maxFutureAppointmentsPerProvider: number;
        bookingHorizonDays: number;
    };
    createdAt: string;
    providers: Provider[];
};

export interface ClinicsResponse extends Paginated<Clinic> {

}
