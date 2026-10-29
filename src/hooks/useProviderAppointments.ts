import { useQuery } from "@tanstack/react-query";
import { getProvidersAppointment } from "../api/manageApi";

const useProviderAppointment = () => {
    const query = useQuery({
        queryKey: ["manageProviders"],
        queryFn: getProvidersAppointment,
        staleTime: 30_000
    });

    return query;
};

export default useProviderAppointment
