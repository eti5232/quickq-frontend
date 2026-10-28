import { useState } from "react";
import ProviderChips from "../componnents/ProviderChips";
import useManageAppointments from "../hooks/useManageAppointments";
import useSelectedProvider from "../hooks/useSelectedProvider";
import { appointmentStatusLabel } from "../utils/formatters";
import type { AppointmentStatus } from "../types/appointment";
import { useDebounce } from "use-debounce";
import useCancelManageAppointment from "../hooks/useCancelManageAppointment";
import CancleConfirm from "../componnents/CancleConfirm";

const ManageAppointments = () => {
    const { providerId, setProviderId, providers, queryProviders } = useSelectedProvider();
    const [date, setDate] = useState("");
    const [status, setStatus] = useState<AppointmentStatus | "">("");
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 300);
    const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
    const cancelMutation = useCancelManageAppointment();

    const queryAppointments = useManageAppointments({
        providerId: providerId ?? undefined,
        date: date || undefined,
        status: status || undefined,
        q: debouncedSearch || undefined
    });
    const appointments = queryAppointments.data?.items;

    if (queryProviders.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת אנשי המקצוע...</p>
    if (queryProviders.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את רשימת אנשי המקצוע...</p>


    if (queryAppointments.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת התורים...</p>
    if (queryAppointments.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את רשימת התורים...</p>

    return (<>
        <div className="mx-auto w-full max-w-5xl px-5 pb-12 pt-8 text-right">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="m-0! text-[32px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">יומן תורים</h1>
                    <p className="mt-1 text-[15px] text-[#6B6880]">בחר איש מקצוע כדי לראות את התורים שלו</p>
                </div>
                <p className="rounded-full border border-[#EEECF4] bg-white px-4 py-2 text-[14px] text-[#6B6880]">
                    <span className="font-bold text-[#16141F]">{queryAppointments.data?.total ?? 0}</span> תורים
                </p>
            </div>

            <ProviderChips providers={providers} selectedId={providerId} onSelect={setProviderId} />

            <div className="mb-6 rounded-[20px] border border-[#EEECF4] bg-white p-4">
                <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                        <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A0B5]" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                        <input className="h-12 w-full rounded-[12px] border border-transparent bg-[#FAFAFC] pr-12 pl-4 text-[15px] text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10" type="text" aria-label="חיפוש תורים לפי שם, טלפון או תעודת זהות" placeholder="חיפוש לפי שם, טלפון או ת״ז" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="h-12 cursor-pointer rounded-[12px] border border-transparent bg-[#FAFAFC] px-4 text-[15px] font-medium text-[#2B2937] outline-none transition hover:bg-[#F4F1FF] focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10 md:w-48" aria-label="סטטוס" value={status} onChange={e => setStatus(e.target.value as AppointmentStatus | "")}>
                        <option value="">כל הסטטוסים</option>
                        {Object.entries(appointmentStatusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                    <label className="flex h-12 items-center gap-3 rounded-[12px] border border-transparent bg-[#FAFAFC] px-4 text-[14px] font-medium text-[#6B6880] transition focus-within:border-[#6C4CF4] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#6C4CF4]/10">
                        <svg className="shrink-0 text-[#A3A0B5]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>
                        תאריך
                        <input className="bg-transparent text-[15px] text-[#2B2937] outline-none" type="date" aria-label="תאריך" value={date} onChange={e => setDate(e.target.value)} />
                    </label>
                </div>
            </div>

            <div className={queryAppointments.isPlaceholderData ? "grid gap-4 opacity-60 transition" : "grid gap-4 transition"}>
                {appointments?.map(appointment => (
                    <article className="overflow-hidden rounded-[20px] border border-[#EEECF4] bg-white transition hover:border-[#D9D5EA]" key={appointment.id}>
                        <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
                            <div className="shrink-0 rounded-[14px] bg-[#F4F1FF] px-6 py-4 text-center md:min-w-[150px]">
                                <p className="text-[12px] font-semibold text-[#6C4CF4]">{appointment.date}</p>
                                <p className="mt-1 text-[30px] font-bold leading-none text-[#16141F]">{appointment.time}</p>
                                <p className="mt-1.5 text-[11px] text-[#A3A0B5]">תור מספר {appointment.id}</p>
                            </div>

                            <div className="flex min-w-0 flex-1 items-start gap-4">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#FFF2F4] text-[15px] font-bold text-[#E8476A]">
                                    {appointment.client.fullName.split(" ").map(word => word[0]).slice(0, 2).join("")}
                                </span>
                                <div className="min-w-0">
                                    <h3 className="m-0 text-[17px] font-bold text-[#16141F]">{appointment.client.fullName}</h3>
                                    <p className="text-[12px] text-[#A3A0B5]">פרטי המטופלת</p>
                                    <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-[#6B6880]">
                                        <p className="flex items-center gap-2">
                                            <svg className="shrink-0 text-[#A3A0B5]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                                            <span dir="ltr">{appointment.client.phone}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <svg className="shrink-0 text-[#A3A0B5]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                                            <span dir="ltr">{appointment.client.email ?? "לא צוין"}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <svg className="shrink-0 text-[#A3A0B5]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M14 10h4M14 14h4" /></svg>
                                            <span>{appointment.client.nationalId ?? "לא צוין"}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className={
                                "inline-flex h-8 w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[13px] font-semibold " +
                                (appointment.status === "BOOKED" ? "bg-[#EDF2FD] text-[#3A6FD8]"
                                    : appointment.status === "ARRIVED" ? "bg-[#FFF5E3] text-[#C27A0E]"
                                        : appointment.status === "IN_PROGRESS" ? "bg-[#F4F1FF] text-[#6C4CF4]"
                                            : appointment.status === "COMPLETED" ? "bg-[#E3F7EE] text-[#1F9D6B]"
                                                : appointment.status === "NO_SHOW" ? "bg-[#F1F0F6] text-[#A3A0B5]"
                                                    : "bg-[#FDEDEF] text-[#D23B47]")
                            }>
                                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                {appointmentStatusLabel[appointment.status] ?? appointment.status}
                            </p>
                        </div>
                        {(appointment.status === "BOOKED" || appointment.status === "ARRIVED") && (
                            <div className="flex justify-end border-t border-[#F1F0F6] bg-[#FAFAFC] px-5 py-3">
                                <button className="h-10 cursor-pointer rounded-[12px] border border-[#F3C4C9] bg-white px-5 text-sm font-semibold text-[#D23B47] transition hover:border-[#D23B47] hover:bg-[#FDEDEF]" type="button" onClick={() => setAppointmentToCancel(appointment.id)}>ביטול תור</button>
                            </div>
                        )}
                    </article>
                ))}
            </div>
            {appointments?.length === 0 && (
                <div className="rounded-[20px] border border-dashed border-[#D9D5EA] bg-white px-6 py-14 text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>
                    </div>
                    <p className="text-lg font-semibold text-[#16141F]">לא נמצאו תורים</p>
                    <p className="mt-1 text-[15px] text-[#6B6880]">נסה לשנות את הסינון או לבחור איש מקצוע אחר</p>
                </div>
            )}
            {appointmentToCancel !== null && (
                <CancleConfirm
                    title="ביטול התור"
                    message="התור יבוטל והלקוחה תקבל על כך מייל. להמשיך?"
                    cancelText="לא, להשאיר"
                    confirmText="כן, לבטל תור"
                    isPending={cancelMutation.isPending}
                    onClose={() => setAppointmentToCancel(null)}
                    onConfirm={() => cancelMutation.mutate(appointmentToCancel, { onSuccess: () => setAppointmentToCancel(null) })}
                />
            )}
        </div>
    </>)
};

export default ManageAppointments
