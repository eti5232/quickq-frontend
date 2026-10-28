import type { Paginated } from "./api";

export type AppointmentProvider = {
    id: number;
    fullName: string;
    specialty: string | null;
    slotMinutes: number;
};

export type AppointmentClinic = {
    id: number;
    name: string;
    city: string;
    address: string;
    phone: string;
};

export type CreateAppointmentResponse = {
    id: number;
    status: "BOOKED";
    startTime: string;
    endTime: string;
    date: string;
    time: string;
    queueNumber: number | null;
    source: "ONLINE";
    notes: string | null;
    reminderEnabled: boolean;
    travelMinutes: number | null;
    effectiveTravelMinutes: number;
    reminderSentAt: string | null;
    isLateCancellation: boolean;
    arrivedAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    cancelledAt: string | null;
    changeDeadline: string;
    canReschedule: boolean;
    canCancel: boolean;
    cancellationWouldBeLate: boolean;
    provider: AppointmentProvider;
    clinic: AppointmentClinic;
    createdAt: string;
    updatedAt: string;
};

export type CreateAppointmentRequest = {
    providerId: number;
    startTime: string;
    reminderEnabled?: boolean
    travelMinutes?: number | null
    notes?: string | null
};

///////////התורים שלי/////////
export type AppointmentStatus =
    | "BOOKED"
    | "ARRIVED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "NO_SHOW"
    | "CANCELLED_BY_CLIENT"
    | "CANCELLED_BY_CLINIC";

export type AppointmentSource = "ONLINE" | "CLINIC" | "IMPORT";

export type Appointment = {
    id: number;
    status: AppointmentStatus;
    startTime: string;
    endTime: string;
    date: string;                       
    time: string;                    
    queueNumber: number | null;         
    source: AppointmentSource;
    notes: string | null;
    reminderEnabled: boolean;
    travelMinutes: number | null;       
    effectiveTravelMinutes: number;
    reminderSentAt: string | null;
    isLateCancellation: boolean;
    arrivedAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    cancelledAt: string | null;
    changeDeadline: string;
    canReschedule: boolean;             
    canCancel: boolean;                 
    cancellationWouldBeLate: boolean;   
    provider: AppointmentProvider;      
    clinic: AppointmentClinic;          
    createdAt: string;
    updatedAt: string;
};

export type MyAppointmentsFilter = "upcoming" | "past" | "cancelled" | "all";

export type MyAppointmentsQueryParams = {
    status?: MyAppointmentsFilter;      
    from?: string;                      
    to?: string;                        
    page?: number;
    pageSize?: number;
};


export type MyAppointmentsResponse = Paginated<Appointment>;