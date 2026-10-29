import { useQuery } from "@tanstack/react-query";
import { getAliveStatus } from "../api/aliveQueueApi";

const useAliveStatus = (providerId: number|null) => {
    const query = useQuery({
        queryKey: ["aliveQueue", providerId],
        queryFn: () => getAliveStatus(providerId),
        enabled: providerId !== null,
        refetchInterval: 20000,
        retry: (count, error) => (error as { response?: { status?: number } }).response?.status !== 404 && count < 2
    });
    return query;
};

export default useAliveStatus