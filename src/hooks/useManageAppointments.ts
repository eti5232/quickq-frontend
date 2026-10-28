import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getManageAppointment } from "../api/manageApi";
import type { ManageAppointmentsQueryParams } from "../types/manage";

const useManageAppointments = (params: ManageAppointmentsQueryParams) => {

    const query = useQuery({
        queryKey: ["manageAppointments", params],
        queryFn: () => getManageAppointment(params),
        enabled: params.providerId !== undefined,
        placeholderData: keepPreviousData
    });
    return query;
}
export default useManageAppointments