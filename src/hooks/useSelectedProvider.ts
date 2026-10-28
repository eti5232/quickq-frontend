import { useEffect, useState } from "react";
import useProviderAppointment from "./useProviderAppointments";

const useSelectedProvider = () => {
    const [providerId, setProviderId] = useState<number | null>(null);

    const queryProviders = useProviderAppointment();
    const providers = queryProviders.data?.items;

    useEffect(() => {
        const firstActive = providers?.find(p => p.isActive);
        if (providerId === null && firstActive)
            setProviderId(firstActive.id);
    }, [providerId, providers])
    return { providerId, setProviderId, providers, queryProviders }
}
export default useSelectedProvider