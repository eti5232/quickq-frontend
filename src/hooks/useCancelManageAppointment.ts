import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancleClientAppointment } from "../api/manageApi";
import type { ManageAppointment } from "../types/manage";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";

const useCancelManageAppointment = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ManageAppointment, AxiosError<ApiError>, number>({
        mutationFn: (id) => cancleClientAppointment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["manageAppointments"]
            });
        }
    })
    return mutation;
};

export default useCancelManageAppointment