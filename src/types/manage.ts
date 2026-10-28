import type { Paginated } from "./api";
import type { Appointment, AppointmentSource, AppointmentStatus } from "./appointment";

// ---------- תורים של הקליניקה: GET /manage/appointments ----------
export type ManageAppointmentClient = {
    id: number;
    fullName: string;
    phone: string;
    email: string | null;
    nationalId: string | null;
    isRegistered: boolean;            // false = לקוחה שנוספה טלפונית
};

// Appointment כבר הוגדר אצלך; למנהל נוסף client
export type ManageAppointment = Appointment & {
    client: ManageAppointmentClient;
};

export type ManageAppointmentsQueryParams = {
    providerId?: number;
    date?: string;                    // "YYYY-MM-DD"
    from?: string;
    to?: string;
    status?: AppointmentStatus;
    q?: string;                       // חיפוש בשם / טלפון / ת"ז
    page?: number;
    pageSize?: number;
};

export type ManageAppointmentsResponse = Paginated<ManageAppointment>;

// ---------- רופאים: GET /manage/providers ----------
export type WorkingHoursRange = {
    dayOfWeek: number;                // 0=ראשון ... 6=שבת
    startTime: string;                // "HH:MM"
    endTime: string;
};

export type ManageProvider = {
    id: number;
    clinicId: number;
    fullName: string;
    specialty: string | null;
    slotMinutes: number;
    isActive: boolean;
    workingHours: WorkingHoursRange[];
};

export type ManageProvidersResponse = { items: ManageProvider[] };   // בלי עמודים

// ---------- התור של היום: GET /manage/providers/:id/queue ----------
export type QueueDayStatus = "NO_SERVICE_TODAY" | "NOT_OPENED" | "OPEN" | "PAUSED" | "CLOSED";

export type QueueAppointment = {
    id: number;
    queueNumber: number | null;
    status: AppointmentStatus;
    startTime: string;
    endTime: string;
    estimatedTime: string | null;
    arrivedAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    notes: string | null;
    source: AppointmentSource;
    client: { id: number; fullName: string; phone: string };
};

export type ManagerQueue = {
    provider: { id: number; fullName: string; slotMinutes: number };
    date: string;
    dayStatus: QueueDayStatus;
    openedAt: string | null;
    averageMinutesPerClient: number;
    currentAppointmentId: number | null;
    appointments: QueueAppointment[];
};

export type CreateProviderRequest = {
    fullName: string;
    specialty?: string | null;
    slotMinutes?: number;
};

export type CreatedProvider = Omit<ManageProvider, "workingHours">;

export type UpdateProviderRequest = {
    fullName?: string;
    specialty?: string | null;
    slotMinutes?: number;
    isActive?: boolean;
    cancelFutureAppointments?: boolean;
};

export type UpdatedProviderResponse = Omit<ManageProvider, "workingHours"> & {
    cancelledAppointments: number;
};

export type ProviderFormValues = {
    fullName: string;
    specialty: string;
    slotMinutes: number;
};

