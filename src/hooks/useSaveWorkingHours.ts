import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SaveWorkingHoursRequest, WorkingHoursResponse } from "../types/workingHours";
import { putWorkingHours } from "../api/workingHoursApi";
import type { ApiError } from "../types/api";
import type { AxiosError } from "axios";

const useSaveWorkingHours = (providerId: number | null) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<WorkingHoursResponse, AxiosError<ApiError>, SaveWorkingHoursRequest>({
        mutationFn: (hours: SaveWorkingHoursRequest) => putWorkingHours(providerId, hours),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workingHours", providerId]
            })
        }
    })
    return mutation;
};

export default useSaveWorkingHours