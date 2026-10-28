import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMyAppointment } from "../api/appointmentsApi";

const useCancelAppointment = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => cancelMyAppointment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["myAppointments"]
            });
        }
    });
    return mutation;
};

export default useCancelAppointment