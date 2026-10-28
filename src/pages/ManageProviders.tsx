import { Link } from "react-router";
import EditProviderModal from "../componnents/EditProviderModal";
import { useEffect, useState } from "react";
import type { ManageProvider } from "../types/manage";
import useUpdateProvider from "../hooks/useUpdateProvider";
import CancleConfirm from "../componnents/CancleConfirm";
import { getFutureAppointmentsCount } from "../utils/apiErrors";
import useProviderAppointment from "../hooks/useProviderAppointments";

const ManageProviders = () => {
    const mutation = useUpdateProvider();
    const [futureAppointments, setFutureAppointments] = useState<number | null>(null);
    const [providerToUpdate, setProviderToUpdate] = useState<ManageProvider | null>(null);
    const [providerToDisable, setProviderToDisable] = useState<ManageProvider | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!errorMessage)
            return;
        const timer = setTimeout(() => setErrorMessage(null), 4000);
        return () => clearTimeout(timer);
    }, [errorMessage]);

    const handleDisable = async (provider: ManageProvider, cancelFutureAppointments = false) => {
        setErrorMessage(null);
        try {
            await mutation.disableProvider(provider.id, cancelFutureAppointments);
            setProviderToDisable(null);
            setFutureAppointments(null);
        }
        catch (error) {
            const count = getFutureAppointmentsCount(error);
            if (count !== null && !cancelFutureAppointments) {
                setProviderToDisable(provider);
                setFutureAppointments(count);
            }
            else {
                setErrorMessage("לא ניתן להשבית את איש המקצוע כרגע");
            }
        }
    };

    const handleEnable = async (provider: ManageProvider) => {
        setErrorMessage(null);
        try {
            await mutation.enableProvider(provider.id);
        }
        catch {
            setErrorMessage("לא ניתן להפעיל מחדש את איש המקצוע כרגע");
        }
    };

    const query = useProviderAppointment();

    if (query.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את אנשי המקצוע שלנו...</p>

    if (query.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת אנשי המקצוע</p>

    const providers = query.data.items;

    return (<div className="mx-auto w-full max-w-5xl px-5 pb-10 pt-8 text-right">
        <div className="relative mb-6 overflow-hidden rounded-[24px] bg-gradient-to-l from-[#6C4CF4] to-[#8E73FF] px-7 py-6 text-white shadow-[0_14px_34px_rgba(108,76,244,.25)]">
            <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-white/10"></div>
            <div className="pointer-events-none absolute -bottom-14 left-28 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="relative flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="mb-1! mt-0! text-[26px]! font-bold! leading-tight! tracking-normal! text-white!">ניהול רופאים</h1>
                    <div className="text-[15px] text-white/80">אנשי המקצוע שמקבלים תורים בקליניקה</div>
                </div>
                <Link className="group inline-flex h-12 items-center gap-3 rounded-full bg-white py-0 pe-2 ps-6 text-[15px] font-semibold text-[#6C4CF4] shadow-[0_8px_20px_rgba(30,20,80,.18)] transition hover:shadow-[0_12px_26px_rgba(30,20,80,.28)]" to="/manage/providers/create">
                    להוספת איש מקצוע
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#6C4CF4] text-white transition group-hover:rotate-90">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </span>
                </Link>
            </div>
        </div>

        {providers.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-[#D9D5EA] bg-white px-6 py-14 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
                        <path d="M8 15a6 6 0 1 0 12 0v-3" />
                        <circle cx="20" cy="10" r="2" />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-[#16141F]">לא נמצאו רופאים במרפאה.</p>
            </div>
        ) :
            (<div className="overflow-hidden rounded-[24px] border border-[#EEECF4] bg-white shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                <div className="hidden grid-cols-[2.2fr_1.6fr_1.1fr_1fr_auto] gap-4 border-b border-[#EEECF4] bg-[#FAFAFC] px-7 py-3.5 text-[12px] font-semibold tracking-wide text-[#A3A0B5] md:grid">
                    <div>איש מקצוע</div>
                    <div>התמחות</div>
                    <div>משך תור</div>
                    <div>סטטוס</div>
                    <div className="w-[176px]"></div>
                </div>
                {providers.map((provider) => (
                    <article className={"grid grid-cols-1 items-center gap-2 border-b border-[#EEECF4] px-7 py-4 transition last:border-b-0 md:grid-cols-[2.2fr_1.6fr_1.1fr_1fr_auto] md:gap-4 " + (provider.isActive ? "hover:bg-[#FAFAFC]" : "bg-[#F7F7FA] [&>*:not(:last-child)]:opacity-50")} key={provider.id}>
                        <div className="flex items-center gap-3.5">
                            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-[#F4F1FF] to-[#E6DEFF] text-[#6C4CF4]">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
                                    <path d="M8 15a6 6 0 1 0 12 0v-3" />
                                    <circle cx="20" cy="10" r="2" />
                                </svg>
                            </div>
                            <h2 className="m-0! text-base! font-semibold! leading-tight! tracking-normal! text-[#16141F]!">{provider.fullName}</h2>
                        </div>
                        <p className="w-fit rounded-full bg-[#F4F1FF] px-3 py-1 text-[13px] font-medium text-[#6C4CF4]">התמחות: {provider.specialty ?? "לא צוינה"}</p>
                        <p className="flex items-center gap-1.5 text-[14px] text-[#2B2937]">
                            <svg className="text-[#A3A0B5]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </svg>
                            משך תור: {provider.slotMinutes} דקות
                        </p>
                        <p className={provider.isActive
                            ? "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full bg-[#EAF7EF] px-3 py-1 text-[12px] font-semibold text-[#1E9E5A]"
                            : "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F1F0F6] px-3 py-1 text-[12px] font-semibold text-[#A3A0B5]"}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                            סטטוס: {provider.isActive ? "פעיל" : "לא פעיל"}
                        </p>
                        <div className="flex items-center gap-2 md:justify-end">
                            <button className="inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#E3E0EE] bg-white px-3.5 text-[13px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:bg-[#F4F1FF] hover:text-[#6C4CF4]" type="button" onClick={() => setProviderToUpdate(provider)}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" /><path d="m13.5 6.5 4 4" /></svg>
                                עריכה
                            </button>
                            {provider.isActive ? (
                                <button className="inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#F3C4C9] bg-white px-3.5 text-[13px] font-semibold text-[#D23B47] transition hover:border-[#D23B47] hover:bg-[#FDEDEF] disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={mutation.isPending} onClick={() => void handleDisable(provider)}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v8" /><path d="M7.5 6.5a7 7 0 1 0 9 0" /></svg>
                                    השבתה
                                </button>
                            ) : (
                                <button className="inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#BFE5CD] bg-white px-3.5 text-[13px] font-semibold text-[#1E9E5A] transition hover:border-[#1E9E5A] hover:bg-[#EAF7EF] disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={mutation.isPending} onClick={() => void handleEnable(provider)}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" /><path d="M20 20v-4h-4" /></svg>
                                    הפעלה מחדש
                                </button>
                            )}
                        </div>
                    </article>
                ))}
                {providerToUpdate && <EditProviderModal provider={providerToUpdate} onClose={() => { setProviderToUpdate(null) }} />}
                {providerToDisable && futureAppointments !== null && (
                    <CancleConfirm
                        title="השבתת איש המקצוע"
                        message={`ל${providerToDisable.fullName} יש ${futureAppointments} תורים עתידיים. האם לבטל אותם ולהמשיך?`}
                        cancelText="ביטול"
                        confirmText="השבתה וביטול התורים"
                        isPending={mutation.isPending}
                        onClose={() => {
                            setProviderToDisable(null);
                            setFutureAppointments(null);
                        }}
                        onConfirm={() => void handleDisable(providerToDisable, true)}
                    />
                )}
                {errorMessage && <div className="fixed left-1/2 top-6 z-[60] -translate-x-1/2 rounded-[14px] border border-[#F3C4C9] bg-[#FDEDEF] px-5 py-3 text-[15px] font-semibold text-[#D23B47] shadow-[0_12px_30px_rgba(30,20,80,.18)]" role="alert">{errorMessage}</div>}
            </div>
            )}
    </div>)
};

export default ManageProviders
