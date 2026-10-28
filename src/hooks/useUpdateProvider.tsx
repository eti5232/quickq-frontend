import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdatedProviderResponse, UpdateProviderRequest } from "../types/manage";
import { updateProvider } from "../api/manageApi";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";

type UpdateProviderVariables = {
    id: number;
    provider: UpdateProviderRequest;
};

const useUpdateProvider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<UpdatedProviderResponse, AxiosError<ApiError>, UpdateProviderVariables>({
        mutationFn: ({ id, provider }) => updateProvider(id, provider),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["manageProviders"]
            });
        }
    });
    
    const disableProvider = (id: number, cancelFutureAppointments = false) => {
        return mutation.mutateAsync({
            id,
            provider: {
                isActive: false,
                ...(cancelFutureAppointments && {
                    cancelFutureAppointments: true,
                }),
            },
        });
    };
    const enableProvider = (id: number) => {
        return mutation.mutateAsync({
            id,
            provider: { isActive: true },
        });
    };
    return { ...mutation, disableProvider, enableProvider };
};

export default useUpdateProvider