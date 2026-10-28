import type { AppointmentStatus } from "./appointment";
import type { ManagerQueue } from "./manage";

export type ChangeStatusRequest = {
    status: "BOOKED" | "ARRIVED" | "IN_PROGRESS" | "COMPLETED" | "NO_SHOW";
};

export type ChangeStatusResponse = {
    id: number;
    status: AppointmentStatus;
    queueNumber: number | null;
    arrivedAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
};

export type NextInQueueResponse = {
    completedAppointmentId: number | null;
    startedAppointmentId: number | null;
    startedQueueNumber: number | null;
    message: string;
    queue: ManagerQueue;
};

export type CloseQueueResponse = {
    markedCompleted: number;
    markedNoShow: number;
    queue: ManagerQueue;
};