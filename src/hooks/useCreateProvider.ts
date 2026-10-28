import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreatedProvider, CreateProviderRequest } from "../types/manage";
import { createProvider } from "../api/manageApi";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";

const useCreateProvider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<CreatedProvider, AxiosError<ApiError>, CreateProviderRequest>({
        mutationFn: (provider: CreateProviderRequest) => createProvider(provider),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["manageProviders"]
            });
        }
    });
    return mutation;
};

export default useCreateProvider