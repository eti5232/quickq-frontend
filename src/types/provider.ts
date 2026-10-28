
export type ProviderDayAvailability = {
    date: string;
    status: "NOT_WORKING" | "ABSENT" | "FULL" | "AVAILABLE";
    freeSlots: number;
};

export type ProviderAvailabilityResponse = {
    providerId: number;
    month: string;
    slotMinutes: number;
    days: ProviderDayAvailability[];
};

export type Slots={
    time:string;
    startTime:string;
}

export type ProviderDayAvailabilityResponse = {
    providerId: number;
    date: string;
    slotMinutes: number;
    isAbsent:boolean;
    slots: Slots[];
};

