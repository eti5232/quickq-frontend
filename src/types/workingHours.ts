export type WorkingHoursRange = {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
};

export type WorkingHoursResponse = {
    providerId: number;
    hours: WorkingHoursRange[];
    warning?: { message: string; appointmentIds: number[] };
};

export type SaveWorkingHoursRequest = {
    hours: WorkingHoursRange[];
};

export type WorkingHoursFormValues = { days: { startTime: string; endTime: string }[] };