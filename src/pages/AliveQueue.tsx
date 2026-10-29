import { Link, Navigate, useParams } from "react-router";
import useAliveStatus from "../hooks/useAliveStatus";
import { dayStatusLabel, paceLabel } from "../utils/formatters";

const AliveQueue = () => {
    const { providerId } = useParams();
    const id = Number(providerId);
    const validId = Number.isInteger(id) && id > 0;
    const query = useAliveStatus(validId ? id : null);

    if (!validId || (query.isError && (query.error as { response?: { status?: number } }).response?.status === 404))
        return <Navigate to="/not-found" replace />
    if (query.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת התור החי</p>
    if (query.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את נתוני התור החי...</p>

    const aliveQueue = query.data;

    if (aliveQueue.dayStatus === "NO_SERVICE_TODAY")
        return <p className="mx-auto my-24 w-full max-w-md rounded-[20px] border border-[#EEECF4] bg-white px-6 py-10 text-center text-lg font-semibold text-[#16141F]">איש המקצוע אינו מקבל היום</p>
    return (<div className="relative overflow-hidden lg:h-[calc(100dvh-4rem)]">
        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-5 pt-5 text-right">
            <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-[#6C4CF4] to-[#8E73FF] text-white shadow-[0_10px_24px_rgba(108,76,244,.30)]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
                            <path d="M8 15a6 6 0 1 0 12 0v-3" />
                            <circle cx="20" cy="10" r="2" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="m-0! text-[28px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">{aliveQueue.provider.fullName}</h1>
                        <p className="mt-0.5 text-[14px] text-[#6B6880]">{aliveQueue.clinic.name} · {aliveQueue.clinic.city}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF2F4] px-3.5 py-2 text-[13px] font-semibold text-[#FF5D7A]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5D7A] opacity-60"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5D7A]"></span>
                        </span>
                        התור החי
                    </span>
                    <p className={
                        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold " +
                        (aliveQueue.dayStatus === "OPEN" ? "bg-[#E3F7EE] text-[#1F9D6B]"
                            : aliveQueue.dayStatus === "PAUSED" ? "bg-[#FFF5E3] text-[#C27A0E]"
                                : aliveQueue.dayStatus === "NOT_OPENED" ? "bg-[#EDF2FD] text-[#3A6FD8]"
                                    : "bg-[#F1F0F6] text-[#A3A0B5]")
                    }>
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        מצב היום: {dayStatusLabel[aliveQueue.dayStatus] ?? aliveQueue.dayStatus}
                    </p>
                    <p className="rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[#2B2937] ring-1 ring-[#EEECF4]">תאריך: {aliveQueue.date}</p>
                </div>
            </div>

            {aliveQueue.dayStatus === "NOT_OPENED" && <p className="mb-4 shrink-0 rounded-[18px] border border-[#CFE0FA] bg-[#EDF2FD] px-5 py-3 text-[15px] font-semibold text-[#3A6FD8]">הקליניקה עוד לא נפתחה. פתיחה מתוכננת בשעה {aliveQueue.plannedOpenTime ?? "לא ידועה"}</p>}
            {aliveQueue.dayStatus === "PAUSED" && <p className="mb-4 shrink-0 rounded-[18px] border border-[#F6E0B4] bg-[#FFF5E3] px-5 py-3 text-[15px] font-semibold text-[#C27A0E]">התור בהפסקה ויתחדש בקרוב</p>}
            {aliveQueue.dayStatus === "CLOSED" && <p className="mb-4 shrink-0 rounded-[18px] border border-[#E3E0EE] bg-[#F1F0F6] px-5 py-3 text-[15px] font-semibold text-[#6B6880]">התור של היום נסגר</p>}

            <div className="grid min-h-0 flex-1 items-stretch gap-5 lg:grid-cols-12">
                <div className="flex min-h-0 flex-col items-center justify-center gap-8 rounded-[28px] border border-[#EEECF4] bg-white p-6 shadow-[0_10px_30px_rgba(30,20,80,.06)] sm:flex-row lg:col-span-7">
                    <div className="relative h-[clamp(150px,30vh,230px)] w-[clamp(150px,30vh,230px)] shrink-0">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 124 124">
                            <defs>
                                <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#6C4CF4" />
                                    <stop offset="100%" stopColor="#FF5D7A" />
                                </linearGradient>
                            </defs>
                            <circle cx="62" cy="62" r="54" fill="none" stroke="#F1F0F6" strokeWidth="9" />
                            <circle cx="62" cy="62" r="54" fill="none" stroke="url(#ringGradient)" strokeWidth="9" strokeLinecap="round" strokeDasharray="339.292" strokeDashoffset={339.292 * (1 - aliveQueue.progressPercent / 100)} className="transition-all duration-700" />
                        </svg>
                        <div className="absolute inset-0 grid place-items-center text-center">
                            <div>
                                <p className="text-[clamp(30px,6vh,46px)] font-bold leading-none text-[#16141F]">{aliveQueue.progressPercent}%</p>
                                <p className="mt-1.5 text-[13px] text-[#6B6880]">התקדמות היום</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center sm:text-right">
                        <p className="text-[15px] text-[#6B6880]">המספר בטיפול עכשיו</p>
                        <p className="my-1 bg-gradient-to-l from-[#6C4CF4] to-[#FF5D7A] bg-clip-text text-[clamp(64px,13vh,120px)] font-bold leading-none text-transparent">{aliveQueue.currentQueueNumber ?? "אין"}</p>
                        <p className="mt-2 text-[14px] text-[#6B6880]">מתוך {aliveQueue.totalToday} תורים היום</p>
                    </div>
                </div>

                <div className="order-first flex min-h-0 flex-col lg:order-none lg:col-span-5">
                    {aliveQueue.myAppointment && (<div className={"relative flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-[28px] p-6 " + (aliveQueue.myAppointment.status === "IN_PROGRESS" ? "bg-gradient-to-br from-[#D3F5E5] to-[#A9E9CD] text-[#0F5C40] shadow-[0_18px_44px_rgba(61,190,139,.28)]" : aliveQueue.myAppointment.status === "ARRIVED" ? "bg-gradient-to-br from-[#6C4CF4] to-[#8E73FF] text-white shadow-[0_18px_44px_rgba(108,76,244,.30)]" : "bg-gradient-to-br from-[#FF5D7A] to-[#FF8FA3] text-white shadow-[0_18px_44px_rgba(255,93,122,.28)]")}>
                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20"></div>
                        <div className="relative flex items-end justify-between gap-4">
                            <div>
                                <p className="text-[14px] font-semibold opacity-90">המספר שלי</p>
                                <p className="text-[clamp(56px,11vh,88px)] font-bold leading-none">{aliveQueue.myAppointment.queueNumber ?? "טרם נקבע"}</p>
                            </div>
                            <div className="rounded-[18px] bg-white/25 px-5 py-3 text-center">
                                <p className="text-[clamp(26px,5vh,38px)] font-bold leading-none">{aliveQueue.myAppointment.peopleAhead}</p>
                                <p className="mt-1 text-[12px] opacity-90">אנשים לפניי</p>
                            </div>
                        </div>

                        <div className="relative my-4 border-t-2 border-dashed border-white/60">
                            <span className="absolute -right-9 -top-3 h-6 w-6 rounded-full bg-[#FAFAFC]"></span>
                            <span className="absolute -left-9 -top-3 h-6 w-6 rounded-full bg-[#FAFAFC]"></span>
                        </div>

                        <div className="relative grid grid-cols-2 gap-3">
                            <div className="rounded-[16px] bg-white/25 px-4 py-3">
                                <p className="text-[12px] opacity-90">דקות עד התור</p>
                                <p className="mt-0.5 text-[26px] font-bold leading-none">{aliveQueue.myAppointment.minutesUntilTurn}</p>
                            </div>
                            <div className="rounded-[16px] bg-white/25 px-4 py-3">
                                <p className="text-[12px] opacity-90">מתי לצאת מהבית</p>
                                <p className="mt-0.5 text-[26px] font-bold leading-none">{new Date(aliveQueue.myAppointment.leaveHomeAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
                            </div>
                        </div>
                        {aliveQueue.myAppointment.status === "ARRIVED" &&
                            <p className="relative mt-4 rounded-[16px] bg-white/25 px-4 py-3 text-center text-[15px] font-semibold">נרשמה הגעתך, נא להמתין לתורך</p>
                        }
                        {aliveQueue.myAppointment.status === "IN_PROGRESS" &&
                            <p className="relative mt-4 rounded-[16px] bg-white px-4 py-3 text-center text-[16px] font-bold text-[#1F9D6B]">התור שלך כעת</p>
                        }
                    </div>)}
                    {aliveQueue.myAppointment === null && <div className="flex h-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#D9D5EA] bg-white/80 p-7 text-center">
                        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="5" width="16" height="15" rx="2" />
                                <path d="M16 3v4M8 3v4M4 11h16" />
                            </svg>
                        </div>
                        <p className="text-[17px] font-semibold text-[#16141F]">אין לך תור היום אצל איש מקצוע זה</p>
                        <Link className="mt-4 inline-flex h-12 items-center rounded-[16px] bg-[#6C4CF4] px-8 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(108,76,244,.30)] transition hover:bg-[#5A3DDB]" to={`/clinics/${aliveQueue.clinic.id}/book-appointment/${providerId}`}>קביעת תור</Link>
                    </div>}
                </div>
            </div>

            <div className="mt-4 grid shrink-0 grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="flex items-center gap-3 rounded-[22px] border border-[#EEECF4] bg-white p-4 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#E3F7EE] text-[#1F9D6B]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                    </div>
                    <div>
                        <p className="text-[12px] text-[#6B6880]">טופלו</p>
                        <p className="text-[24px] font-bold leading-tight text-[#16141F]">{aliveQueue.completedCount}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-[22px] border border-[#EEECF4] bg-white p-4 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#FFF2F4] text-[#FF5D7A]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M17 11a3 3 0 1 0 0-6M21.5 20a5 5 0 0 0-4-4.9" /></svg>
                    </div>
                    <div>
                        <p className="text-[12px] text-[#6B6880]">ממתינים</p>
                        <p className="text-[24px] font-bold leading-tight text-[#16141F]">{aliveQueue.waitingCount}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-[22px] border border-[#EEECF4] bg-white p-4 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#F1F0F6] text-[#A3A0B5]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></svg>
                    </div>
                    <div>
                        <p className="text-[12px] text-[#6B6880]">לא הגיעו</p>
                        <p className="text-[24px] font-bold leading-tight text-[#16141F]">{aliveQueue.noShowCount}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-[22px] border border-[#EEECF4] bg-white p-4 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#FFF5E3] text-[#C27A0E]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                    </div>
                    <div>
                        <p className="text-[12px] text-[#6B6880]">קצב · עיכוב</p>
                        <p className="text-[15px] font-bold leading-tight text-[#16141F]">{paceLabel[aliveQueue.pace] ?? aliveQueue.pace}</p>
                        {aliveQueue.delayMinutes > 0 ? <p className="text-[13px] font-semibold text-[#C27A0E]">עיכוב {aliveQueue.delayMinutes} דקות</p> : <p className="text-[13px] font-semibold text-[#1F9D6B]">בזמן</p>}
                    </div>
                </div>
            </div>

            <p className="mt-3 shrink-0 text-center text-[12px] text-[#A3A0B5]">עודכן לאחרונה בשעה {new Date(aliveQueue.updatedAt).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
    </div>)
};

export default AliveQueue
