import ProviderChips from "../componnents/ProviderChips";
import useManagerQueue from "../hooks/useManagerQueue";
import useQueueActions from "../hooks/useQueueActions";
import useSelectedProvider from "../hooks/useSelectedProvider";
import { appointmentStatusLabel, dayStatusLabel } from "../utils/formatters";

const ManageAliveQueue = () => {
    const { providerId, setProviderId, providers, queryProviders } = useSelectedProvider();
    const queryQueue = useManagerQueue(providerId);
    const queue = queryQueue.data;
    const actions = useQueueActions(providerId);
    const { open, pause, resume, close, next, changeStatus } = actions;

    if (queryProviders.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת אנשי המקצוע...</p>
    if (queryProviders.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את רשימת אנשי המקצוע...</p>

    return (<div className="mx-auto w-full max-w-5xl px-5 pb-10 pt-8 text-right">
        <div className="mb-1 text-[28px] font-bold leading-tight text-[#16141F]">תור היום</div>
        <div className="mb-5 text-[15px] text-[#6B6880]">ניהול התור של היום, לפי איש מקצוע</div>
        <ProviderChips providers={providers} selectedId={providerId} onSelect={setProviderId} />
        {queryQueue.isError && <p className="mb-4 rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת התור...</p>}
        {queryQueue.isLoading && <p className="py-10 text-center text-[#6B6880]">טוען את התור...</p>}

        {queue && (<>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[#EEECF4] bg-white p-5 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                <div className="flex flex-wrap items-center gap-3">
                    <p className="rounded-[14px] bg-[#F4F1FF] px-4 py-2 text-[15px] font-bold text-[#16141F]">תאריך: {queue.date}</p>
                    <p className={
                        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold " +
                        (queue.dayStatus === "OPEN" ? "bg-[#EAF7EF] text-[#1E9E5A]"
                            : queue.dayStatus === "PAUSED" ? "bg-[#FFF5E3] text-[#C27A0E]"
                                : queue.dayStatus === "NOT_OPENED" ? "bg-[#EDF2FD] text-[#3A6FD8]"
                                    : "bg-[#F1F0F6] text-[#A3A0B5]")
                    }>
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        מצב היום: {dayStatusLabel[queue.dayStatus] ?? queue.dayStatus}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {queue.appointments.length > 0 && <>
                        {
                            queue.dayStatus === "NOT_OPENED" && (
                                <button className="inline-flex h-11 cursor-pointer items-center rounded-[14px] bg-[#6C4CF4] px-6 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={() => open.mutate()} disabled={open.isPending}>פתיחת יום</button>
                            )
                        }
                        {queue.dayStatus === "OPEN" && (<>
                            <button className="inline-flex h-11 cursor-pointer items-center rounded-[14px] bg-[#6C4CF4] px-6 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={() => next.mutate()} disabled={next.isPending}>הבא בתור</button>
                            <button className="inline-flex h-11 cursor-pointer items-center rounded-[14px] border border-[#E3E0EE] bg-white px-5 text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:bg-[#F4F1FF] hover:text-[#6C4CF4] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => pause.mutate()} disabled={pause.isPending}>השהייה</button>
                            <button className="inline-flex h-11 cursor-pointer items-center rounded-[14px] border border-[#F3C4C9] bg-white px-5 text-[15px] font-semibold text-[#D23B47] transition hover:border-[#D23B47] hover:bg-[#FDEDEF] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => close.mutate()} disabled={close.isPending}>סגירת יום</button>
                        </>
                        )}
                        {queue.dayStatus === "PAUSED" && (
                            <button className="inline-flex h-11 cursor-pointer items-center rounded-[14px] bg-[#6C4CF4] px-6 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={() => resume.mutate()} disabled={resume.isPending}>המשך</button>
                        )}
                        {queue.dayStatus === "CLOSED" && <>
                            <p className="text-[15px] font-semibold text-[#A3A0B5]">היום נסגר</p>
                            <button className="inline-flex h-11 cursor-pointer items-center rounded-[14px] border border-[#E3E0EE] bg-white px-5 text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:bg-[#F4F1FF] hover:text-[#6C4CF4] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => open.mutate()} disabled={open.isPending}>פתיחה מחדש</button>
                        </>}
                        {queue.dayStatus === "NO_SERVICE_TODAY" && <p className="text-[15px] font-semibold text-[#A3A0B5]">הקליניקה אינה מספקת שירות היום</p>}
                    </>}
                </div>
            </div>
            {(open.isError || next.isError || changeStatus.isError || pause.isError || resume.isError || close.isError) && <p className="mb-4 rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]" role="alert">הפעולה נכשלה, נסה שוב</p>}

            {queue.appointments.length === 0 && (
                <div className="rounded-[20px] border border-dashed border-[#D9D5EA] bg-white px-6 py-14 text-center">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M16 3v4M8 3v4M4 11h16" />
                        </svg>
                    </div>
                    <p className="text-lg font-semibold text-[#16141F]">אין תורים היום</p>
                    <p className="mt-1 text-[15px] text-[#6B6880]">כשייקבעו תורים להיום הם יופיעו כאן</p>
                </div>
            )}

            <div className="grid gap-3">
                {queue.appointments.map(appointment => (
                    <article className={"flex flex-wrap items-center gap-4 rounded-[20px] border bg-white p-4 shadow-[0_6px_20px_rgba(30,20,80,.05)] transition " + (appointment.status === "IN_PROGRESS" ? "border-[#6C4CF4] ring-4 ring-[#6C4CF4]/10"
                        : appointment.status === "COMPLETED" || appointment.status === "NO_SHOW" ? "border-[#EEECF4] bg-[#F7F7FA]! [&>*:not(:last-child)]:opacity-60"
                            : "border-[#EEECF4]")} key={appointment.id}>
                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-gradient-to-br from-[#F4F1FF] to-[#E6DEFF]">
                            <p className="text-[20px] font-bold leading-none text-[#6C4CF4]">{appointment.queueNumber ?? "-"}</p>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[15px] text-[#6B6880]">שם: <span className="font-semibold text-[#16141F]">{appointment.client.fullName}</span></p>
                            <p className="mt-0.5 text-[14px] text-[#6B6880]">טלפון: <span className="font-semibold text-[#16141F]">{appointment.client.phone}</span></p>
                        </div>

                        <p className={
                            "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold " +
                            (appointment.status === "BOOKED" ? "bg-[#EDF2FD] text-[#3A6FD8]"
                                : appointment.status === "ARRIVED" ? "bg-[#FFF5E3] text-[#C27A0E]"
                                    : appointment.status === "IN_PROGRESS" ? "bg-[#F4F1FF] text-[#6C4CF4]"
                                        : appointment.status === "COMPLETED" ? "bg-[#EAF7EF] text-[#1E9E5A]"
                                            : appointment.status === "NO_SHOW" ? "bg-[#F1F0F6] text-[#A3A0B5]"
                                                : "bg-[#FDEDEF] text-[#D23B47]")
                        }>
                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                            סטטוס: {appointmentStatusLabel[appointment.status] ?? appointment.status}

                        </p>

                        {appointment.status === "BOOKED" &&
                            <div className="flex items-center gap-2">
                                <button className="inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-[#BFE5CD] bg-white px-4 text-[13px] font-semibold text-[#1E9E5A] transition hover:border-[#1E9E5A] hover:bg-[#EAF7EF] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => changeStatus.mutate({ appointmentId: appointment.id, status: "ARRIVED" })}>הגיע</button>
                                <button className="inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-[#E3E0EE] bg-white px-4 text-[13px] font-semibold text-[#6B6880] transition hover:border-[#D23B47] hover:bg-[#FDEDEF] hover:text-[#D23B47] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => changeStatus.mutate({ appointmentId: appointment.id, status: "NO_SHOW" })}>לא הגיע</button>
                            </div>}
                        {appointment.status === "ARRIVED" &&
                            <button className="inline-flex h-9 cursor-pointer items-center rounded-[10px] bg-[#6C4CF4] px-4 text-[13px] font-semibold text-white transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => changeStatus.mutate({ appointmentId: appointment.id, status: "IN_PROGRESS" })} disabled={changeStatus.isPending}>
                                התחל טיפול
                            </button>}
                        {appointment.status === "IN_PROGRESS" &&
                            <button className="inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-[#BFE5CD] bg-white px-4 text-[13px] font-semibold text-[#1E9E5A] transition hover:border-[#1E9E5A] hover:bg-[#EAF7EF] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => changeStatus.mutate({ appointmentId: appointment.id, status: "COMPLETED" })} disabled={changeStatus.isPending}>
                                סיים טיפול
                            </button>}
                        {appointment.status === "NO_SHOW" &&
                            <button className="inline-flex h-9 cursor-pointer items-center rounded-[10px] border border-[#E3E0EE] bg-white px-4 text-[13px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:bg-[#F4F1FF] hover:text-[#6C4CF4] disabled:cursor-not-allowed disabled:opacity-50" type="button" onClick={() => changeStatus.mutate({ appointmentId: appointment.id, status: "ARRIVED" })} disabled={changeStatus.isPending}>
                                הגיע בכל זאת
                            </button>
                        }
                    </article>
                ))}
            </div>
        </>)}
    </div>)
};

export default ManageAliveQueue
