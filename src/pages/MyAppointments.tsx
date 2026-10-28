import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMyAppointments } from "../api/appointmentsApi";
import useCancelAppointment from "../hooks/useCancelAppointment";
import { useState } from "react";
import CancleConfirm from "../componnents/CancleConfirm";
import { appointmentStatusLabel, myAppointmentsFilterLabel } from "../utils/formatters";
import { Link } from "react-router";
import type { MyAppointmentsFilter } from "../types/appointment";


const MyAppointments = () => {
    const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
    const [filter, setFilter] = useState<MyAppointmentsFilter>("upcoming");

    const mutation = useCancelAppointment();
    const cancelAppointment = (id: number) => {
        setAppointmentToCancel(id);
    };

    const query = useQuery({
        queryKey: ["myAppointments", filter],
        queryFn: () => getMyAppointments({ status: filter }),
        placeholderData: keepPreviousData

    });

    if (query.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את התורים שלך...</p>
    if (query.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">התרחשה שגיאה בעת טעינת התורים</p>
    const myAppointments = query.data.items;

    const confirmCancellation = () => {
        if (appointmentToCancel === null)
            return;
        mutation.mutate(appointmentToCancel, {
            onSuccess: () => {
                setAppointmentToCancel(null);
            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-5 pb-10 pt-6 text-right">
            <h2 className="mb-1! mt-0! text-[20px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">התורים שקבעת</h2>
            <div className="mb-6 text-[15px] text-[#6B6880]">כל התורים שקבעת במקום אחד</div>

            <div className="mb-6 grid w-full grid-cols-4 gap-1 rounded-[16px] bg-[#F1F0F6] p-1 sm:inline-grid sm:w-auto sm:grid-cols-[repeat(4,minmax(104px,1fr))]">
                {Object.entries(myAppointmentsFilterLabel).map(([value, label]) => (
                    <button className="h-10 cursor-pointer rounded-[12px] px-4 text-[14px] font-semibold text-[#6B6880] transition hover:text-[#16141F] aria-pressed:bg-white aria-pressed:text-[#6C4CF4] aria-pressed:shadow-[0_4px_12px_rgba(30,20,80,.10)]" key={value} type="button" onClick={() => setFilter(value as MyAppointmentsFilter)} aria-pressed={filter === value}>{label}</button>
                ))}
            </div>

            {myAppointments.length === 0 && (
                <div className="rounded-[24px] border border-dashed border-[#D9D5EA] bg-white p-10 text-center">
                    <p className="text-lg font-semibold text-[#16141F]">אין תורים להצגה</p>
                    <p className="mt-1 text-[15px] text-[#6B6880]">אין תורים בקטגוריה הזו</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {myAppointments.map(appointment => {
                    const isLiveToday = appointment.date === new Date().toLocaleDateString("sv-SE") && (appointment.status === "BOOKED" || appointment.status === "ARRIVED" || appointment.status === "IN_PROGRESS");
                    return (
                        <div className="overflow-hidden rounded-[24px] border border-[#EEECF4] bg-white shadow-[0_6px_20px_rgba(30,20,80,.05)] transition hover:shadow-[0_12px_28px_rgba(108,76,244,.10)]" key={appointment.id}>
                            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                                <div className="shrink-0 rounded-[18px] bg-gradient-to-br from-[#F4F1FF] to-[#EAE3FF] px-6 py-4 text-center sm:min-w-[150px]">
                                    <p className="text-[12px] font-semibold text-[#6C4CF4]">{appointment.date}</p>
                                    <p className="mt-1 text-[30px] font-bold leading-none text-[#16141F]">{appointment.time}</p>
                                </div>

                                <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#F4F1FF] text-[#6C4CF4]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 21h18" />
                                                <path d="M9 12h6" />
                                                <path d="M12 9v6" />
                                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                            </svg>
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[12px] text-[#A3A0B5]">שם הקליניקה</p>
                                            <p className="text-[15px] font-semibold leading-snug text-[#16141F]">{appointment.clinic.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#FFF2F4] text-[#FF5D7A]">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
                                                <path d="M8 15a6 6 0 1 0 12 0v-3" />
                                                <circle cx="20" cy="10" r="2" />
                                            </svg>
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[12px] text-[#A3A0B5]">שם הרופאה</p>
                                            <p className="text-[15px] font-semibold leading-snug text-[#16141F]">{appointment.provider.fullName}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className={
                                    "inline-flex h-8 w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold " +
                                    (appointment.status === "BOOKED" ? "bg-[#EDF2FD] text-[#3A6FD8]"
                                        : appointment.status === "ARRIVED" ? "bg-[#FFF5E3] text-[#C27A0E]"
                                            : appointment.status === "IN_PROGRESS" ? "bg-[#F4F1FF] text-[#6C4CF4]"
                                                : appointment.status === "COMPLETED" ? "bg-[#EAF7EF] text-[#1E9E5A]"
                                                    : appointment.status === "NO_SHOW" ? "bg-[#F1F0F6] text-[#A3A0B5]"
                                                        : "bg-[#FDEDEF] text-[#D23B47]")
                                }>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                    {appointmentStatusLabel[appointment.status] ?? appointment.status}
                                </p>
                            </div>

                            {(appointment.canCancel || isLiveToday) && (
                                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#F1F0F6] bg-[#FAFAFC] px-5 py-3">
                                    {isLiveToday &&
                                        <Link className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[12px] border border-[#D9D5EA] bg-[#F4F1FF] px-5 text-sm font-semibold text-[#6C4CF4] transition hover:border-[#6C4CF4] hover:bg-[#EAE4FF]" to={`/alive-queue/${appointment.provider.id}`}>
                                            <span className="relative flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5D7A] opacity-60"></span>
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5D7A]"></span>
                                            </span>
                                            לצפייה בתור החי
                                        </Link>
                                    }
                                    {appointment.canCancel && <button className="h-10 shrink-0 cursor-pointer rounded-[12px] border border-[#F3C4C9] bg-white px-5 text-sm font-semibold text-[#D23B47] transition hover:border-[#D23B47] hover:bg-[#FDEDEF] disabled:cursor-not-allowed disabled:opacity-50" onClick={() => cancelAppointment(appointment.id)} disabled={mutation.isPending}>ביטול התור</button>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {appointmentToCancel !== null && (
                <CancleConfirm
                    onConfirm={confirmCancellation}
                    onClose={() => setAppointmentToCancel(null)}
                    isPending={mutation.isPending}
                    title="ביטול התור"
                    message="האם אתה בטוח שברצונך לבטל את התור?"
                    cancelText="לא, להשאיר"
                    confirmText="כן, לבטל תור"
                />
            )}
        </div>
    );
};

export default MyAppointments
