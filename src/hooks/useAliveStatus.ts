import { useQuery } from "@tanstack/react-query";
import { getAliveStatus } from "../api/aliveQueueApi";

const useAliveStatus = (providerId: number|null) => {
    const query = useQuery({
        queryKey: ["aliveQueue", providerId],
        queryFn: () => getAliveStatus(providerId),
        enabled: providerId !== null,
        refetchInterval: 20000
    });
    return query;
};

export default useAliveStatus