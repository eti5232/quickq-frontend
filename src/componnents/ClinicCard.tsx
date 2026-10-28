import { Link } from "react-router"
import type { Clinic } from "../types/clinic"
import { categoryLabel } from "../utils/formatters"

type ClinicCardProps = {
    clinic: Clinic
}

const categoryStyle: Record<string, { tile: string; tag: string }> = {
    DENTAL: { tile: "from-[#F4F1FF] to-[#E1D8FF] text-[#6C4CF4]", tag: "bg-[#F4F1FF] text-[#6C4CF4]" },
    GENERAL_MEDICINE: { tile: "from-[#FFF2F4] to-[#FFD9E0] text-[#FF5D7A]", tag: "bg-[#FFF2F4] text-[#E8476A]" },
    PHYSIOTHERAPY: { tile: "from-[#E3F7EE] to-[#C4EEDB] text-[#1F9D6B]", tag: "bg-[#E3F7EE] text-[#1F9D6B]" },
    CONSULTING: { tile: "from-[#EDF2FD] to-[#D3E1FB] text-[#3A6FD8]", tag: "bg-[#EDF2FD] text-[#3A6FD8]" },
    OTHER: { tile: "from-[#F1F0F6] to-[#E3E0EE] text-[#6B6880]", tag: "bg-[#F1F0F6] text-[#6B6880]" },
};

const ClinicCard = ({ clinic }: ClinicCardProps) => {
    const style = categoryStyle[clinic.category] ?? categoryStyle.OTHER;

    return (<>
        <article className="clinic-card group relative flex flex-col gap-4 rounded-[24px] border border-[#EEECF4] bg-white p-5 text-right shadow-[0_6px_20px_rgba(30,20,80,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#D9D5EA] hover:shadow-[0_18px_40px_rgba(108,76,244,.14)]">
            <div className="flex items-start gap-4">
                <Link to={`/clinics/${clinic.id}`} className={"relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br transition group-hover:scale-105 " + style.tile}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6" />
                        <path d="M7 12h2.5l1.5-2.5 2 5 1.5-2.5H17" />
                    </svg>
                </Link>

                <div className="min-w-0 flex-1">
                    <h2 className="m-0! text-[19px]! font-bold! leading-snug! tracking-normal! text-[#16141F]!">
                        <Link to={`/clinics/${clinic.id}`}>{clinic.name}</Link>
                    </h2>
                    <p className={"mt-1.5 inline-flex rounded-full px-3 py-1 text-[12px] font-semibold " + style.tag}>{categoryLabel[clinic.category] ?? clinic.category}</p>
                </div>

                <p className={clinic.isOpenNow
                    ? "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-[#E3F7EE] px-3 text-[12px] font-semibold text-[#1F9D6B]"
                    : "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-[#F1F0F6] px-3 text-[12px] font-semibold text-[#A3A0B5]"}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                    {clinic.isOpenNow ? "פתוח" : "סגור"}
                </p>
            </div>

            <div className="flex flex-col gap-2 text-[14px] text-[#6B6880]">
                <p className="flex items-center gap-2.5">
                    <svg className="shrink-0 text-[#A3A0B5]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    <span>{clinic.address}, {clinic.city}</span>
                </p>
                <p className="flex items-center gap-2.5">
                    <svg className="shrink-0 text-[#A3A0B5]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
                    <span dir="ltr" className="text-right">{clinic.phone}</span>
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-[#F1F0F6] pt-4">
                <span className="text-[13px] text-[#A3A0B5]">לצפייה ברופאים ובקביעת תור</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6C4CF4]">
                    לכניסה
                    <svg className="transition group-hover:-translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 6-6 6 6 6" />
                    </svg>
                </span>
            </div>
            <Link to={`/clinics/${clinic.id}`} className="clinic-card__link absolute inset-0 rounded-[24px]" aria-label={clinic.name}></Link>
        </article>
    </>)
}

export default ClinicCard
