import { useQuery } from "@tanstack/react-query";
import { getWorkingHours } from "../api/workingHoursApi";

const useWorkingHours = (providerId: number | null) => {
    const query = useQuery({
        queryKey: ["workingHours", providerId],
        queryFn: () => getWorkingHours(providerId),
        enabled: providerId !== null
    })
    return query;
};

export default useWorkingHours