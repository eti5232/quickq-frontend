import { isAxiosError } from "axios"

export const getFutureAppointmentsCount = (error: unknown): number | null => {
    if (!isAxiosError(error) || error.response?.status !== 409 || error.response.data?.error?.code !== "HAS_FUTURE_APPOINTMENTS")
        return null;
    const details = error.response.data.error.details;
    if (
        typeof details === "object" &&
        details !== null &&
        "futureAppointments" in details &&
        typeof details.futureAppointments === "number"
    ) {
        return details.futureAppointments;
    }

    return null;
};
type ApiErrorLike = {
    response?: { data?: { error?: { message?: string; details?: unknown } } };
};

export const getErrorMessages = (e: ApiErrorLike, fallback = "משהו השתבש") => {
    const details = e.response?.data?.error?.details;
    if (Array.isArray(details) && details.length > 0)
        return details.map((d: { message: string }) => d.message);
    return [e.response?.data?.error?.message ?? fallback];
};
