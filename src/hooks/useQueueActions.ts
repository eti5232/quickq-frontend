import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAppointmentStatus, closeQueue, nextInQueue, openQueue, pauseQueue, resumeQueue } from "../api/manageQueueApi";
import type { ChangeStatusRequest } from "../types/manageQueue";

type changeStatusProps = {
    appointmentId: number,
    status: ChangeStatusRequest["status"]
}

const useQueueActions = (providerId: number | null) => {
    const queryClient = useQueryClient();
    const refresh = () => {
        queryClient.invalidateQueries({
            queryKey: ["managerQueue", providerId]
        })
    }

    const open = useMutation({
        mutationFn: () => openQueue(providerId),
        onSuccess: refresh
    });

    const pause = useMutation({
        mutationFn: () => pauseQueue(providerId),
        onSuccess: refresh
    });

    const resume = useMutation({
        mutationFn: () => resumeQueue(providerId),
        onSuccess: refresh
    });

    const close = useMutation({
        mutationFn: () => closeQueue(providerId),
        onSuccess: refresh
    });

    const next = useMutation({
        mutationFn: () => nextInQueue(providerId),
        onSuccess: refresh
    });

    const changeStatus = useMutation({
        mutationFn: ({ appointmentId, status }: changeStatusProps) => changeAppointmentStatus(appointmentId, { status }),
        onSuccess: refresh
    });

    return { open, pause, resume, close, next, changeStatus }
};

export default useQueueActions