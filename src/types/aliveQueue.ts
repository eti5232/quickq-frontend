export type LiveStatus = {
    date: string;
    dayStatus: "NO_SERVICE_TODAY" | "NOT_OPENED" | "OPEN" | "PAUSED" | "CLOSED";
    plannedOpenTime: string | null;
    currentQueueNumber: number | null;
    delayMinutes: number;
    averageMinutesPerClient: number;
    pace: "FASTER" | "ON_TIME" | "SLOWER";
    completedCount: number;
    noShowCount: number;
    waitingCount: number;
    totalToday: number;
    progressPercent: number;
    updatedAt: string;
    provider: { id: number; fullName: string; specialty: string | null; slotMinutes: number };
    clinic: { id: number; name: string; address: string; city: string };
    myAppointment: {
        appointmentId: number;
        status: string;
        queueNumber: number | null;
        peopleAhead: number;
        scheduledTime: string;
        estimatedTime: string;
        minutesUntilTurn: number;
        travelMinutes: number;
        leaveHomeAt: string;
        reminderEnabled: boolean;
    } | null;
};