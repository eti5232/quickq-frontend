import { Link, Navigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query";
import { getClinic } from "../api/clinicsApi";
import type { AxiosError } from "axios";

const ClinicPage = () => {
    const { clinicId } = useParams();
    const id = Number(clinicId);

    const query = useQuery({
        queryKey: ["clinic", id],
        queryFn: () => getClinic(id),
        enabled: Number.isInteger(id) && id > 0,
        retry: (failureCount, error) => (error as AxiosError).response?.status !== 404 && failureCount < 3
    });
    if (!Number.isInteger(id) || id <= 0)
        return <Navigate to="/not-found" replace />
    if (query.isError && (query.error as AxiosError).response?.status === 404)
        return <Navigate to="/not-found" replace />
    if (query.isPending)
        return <p className="py-24 text-center text-[#6B6880]">...טוען קליניקה</p>
    if (query.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">שגיאה בהצגת הקליניקה המבוקשת</p>
    const clinic = query.data;
    return (
        <div className="clinic-page relative overflow-hidden">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#6C4CF4]/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -left-20 top-60 h-72 w-72 rounded-full bg-[#FF5D7A]/10 blur-3xl"></div>

            <div className="relative mx-auto w-full max-w-5xl px-5 pb-14 pt-6 text-right">
                <Link className="group mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B6880] transition hover:text-[#6C4CF4]" to="/clinics">
                    <svg className="transition group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
                    חזרה לחיפוש קליניקות
                </Link>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-[22px] bg-gradient-to-br from-[#6C4CF4] to-[#8E73FF] text-white shadow-[0_12px_28px_rgba(108,76,244,.32)]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18" />
                            <path d="M9 12h6" />
                            <path d="M12 9v6" />
                            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="m-0! text-[34px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">{clinic.name}</h1>
                            <p className={clinic.isOpenNow
                                ? "inline-flex h-8 items-center gap-1.5 rounded-full bg-[#E3F7EE] px-3.5 text-[13px] font-semibold text-[#1F9D6B]"
                                : "inline-flex h-8 items-center gap-1.5 rounded-full bg-[#F1F0F6] px-3.5 text-[13px] font-semibold text-[#A3A0B5]"}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                {clinic.isOpenNow ? "פתוח עכשיו" : "סגור כעת"}
                            </p>
                        </div>
                        <p className="mt-1 text-[15px] text-[#6B6880]">{clinic.address}, {clinic.city}</p>
                    </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-5">
                    <section className="rounded-[24px] border border-[#EEECF4] bg-white p-6 shadow-[0_10px_30px_rgba(30,20,80,.06)] md:col-span-3">
                        <h2 className="mb-3! mt-0! text-[18px]! font-bold! tracking-normal! text-[#16141F]!">על הקליניקה</h2>
                        <p className="text-[15px] leading-7 text-[#6B6880]">{clinic.description}</p>
                    </section>

                    <section className="rounded-[24px] border border-[#EEECF4] bg-white p-6 shadow-[0_10px_30px_rgba(30,20,80,.06)] md:col-span-2">
                        <h2 className="mb-4! mt-0! text-[18px]! font-bold! tracking-normal! text-[#16141F]!">פרטי התקשרות</h2>
                        <div className="flex flex-col gap-3.5">
                            <div className="flex items-center gap-3.5">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#F4F1FF] text-[#6C4CF4]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21h18" />
                                        <path d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
                                        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-[12px] text-[#A3A0B5]">עיר</p>
                                    <p className="text-[15px] font-semibold text-[#16141F]">{clinic.city}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3.5">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#FFF2F4] text-[#FF5D7A]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="10" r="3" />
                                        <path d="M17.7 15.7 13.4 20a2 2 0 0 1-2.8 0l-4.3-4.3a8 8 0 1 1 11.4 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-[12px] text-[#A3A0B5]">כתובת</p>
                                    <p className="text-[15px] font-semibold text-[#16141F]">{clinic.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3.5">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#E3F7EE] text-[#1F9D6B]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-[12px] text-[#A3A0B5]">טלפון</p>
                                    <p className="text-[15px] font-semibold text-[#16141F]" dir="ltr">{clinic.phone}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="mt-9">
                    <div className="mb-4 flex items-end justify-between">
                        <h2 className="m-0! text-[22px]! font-bold! tracking-normal! text-[#16141F]!">אנשי המקצוע שלנו</h2>
                        <p className="text-sm text-[#6B6880]">{clinic.providers.length} אנשי מקצוע</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {clinic.providers.map(provider => (
                            <article className="group flex flex-col gap-4 rounded-[24px] border border-[#EEECF4] bg-white p-5 shadow-[0_6px_20px_rgba(30,20,80,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#D9D5EA] hover:shadow-[0_18px_40px_rgba(108,76,244,.14)]" key={provider.id}>
                                <div className="flex items-center gap-4">
                                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-[#F4F1FF] to-[#E1D8FF] text-[#6C4CF4] transition group-hover:scale-105">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
                                            <path d="M8 15a6 6 0 1 0 12 0v-3" />
                                            <path d="M11 3v2M6 3v2" />
                                            <circle cx="20" cy="10" r="2" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="m-0 text-[17px] font-bold text-[#16141F]">{provider.fullName}</h3>
                                        <p className="mt-0.5 text-sm text-[#6B6880]">{provider.specialty}</p>
                                    </div>
                                </div>
                                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#FAFAFC] px-3.5 py-1.5 text-[13px] font-medium text-[#6B6880]">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 7v5l3 2" />
                                    </svg>
                                    משך התור: {provider.slotMinutes} דקות
                                </p>
                                <div className="mt-auto flex flex-col gap-2.5">
                                    <Link className="flex h-12 w-full items-center justify-center rounded-[14px] bg-[#6C4CF4] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB]"
                                        to={`/clinics/${clinic.id}/book-appointment/${provider.id}`} state={{ clinicName: clinic.name, providerName: provider.fullName }}>
                                        קביעת תור
                                    </Link>
                                    <Link className="flex h-11 w-full items-center justify-center gap-2 rounded-[14px] border border-[#D9D5EA] bg-[#F4F1FF] text-[14px] font-semibold text-[#6C4CF4] transition hover:border-[#6C4CF4] hover:bg-[#EAE4FF]" to={`/alive-queue/${provider.id}`}>
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5D7A] opacity-60"></span>
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5D7A]"></span>
                                        </span>
                                        לצפייה בתור החי
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
export default ClinicPage
