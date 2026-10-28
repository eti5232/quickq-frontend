import { useQuery } from "@tanstack/react-query";
import { getManageQueue } from "../api/manageQueueApi";

const useManagerQueue = (providerId: number | null) => {
    const query = useQuery({
        queryKey: ["managerQueue", providerId],
        queryFn: () => getManageQueue(providerId),
        enabled: providerId !== null
    })
    return query;
};

export default useManagerQueue