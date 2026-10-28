import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getClinics } from "../api/clinicsApi"
import type { Clinic, ClinicsQueryParams, ClinicCategory, ClinicSort } from "../types/clinic"
import ClinicCard from "../componnents/ClinicCard"
import { useSearchParams } from "react-router"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { categoryLabel, sortLabel } from "../utils/formatters"

const SearchClinics = () => {
    const updateFilter = (key: string, value: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value)
                next.set(key, value);
            else
                next.delete(key);
            return next;
        });
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q") ?? "";
    const [search, setSearch] = useState(q);
    const [debouncedSearch] = useDebounce(search, 300);

    const categories: ClinicCategory[] = [
        "DENTAL",
        "GENERAL_MEDICINE",
        "PHYSIOTHERAPY",
        "CONSULTING",
        "OTHER"
    ];

    const categoryValue = searchParams.get("category");
    const category = categories.find((item) => item === categoryValue);

    const params: ClinicsQueryParams = {
        q: debouncedSearch || undefined,
        category,
        city: searchParams.get("city") ?? undefined,
        sort: (searchParams.get("sort") as ClinicSort | null) ?? undefined,
        pageSize: 100,
        openNow: searchParams.get("openNow") === "true" ? true : undefined,
    };

    const query = useQuery({
        queryKey: ["clinics", params],
        queryFn: () => getClinics(params),
        placeholderData: keepPreviousData
    })

    if (query.isPending) {
        return <p className="py-24 text-center text-[#6B6880]">טוען קליניקות זמינות...</p>
    }
    if (query.isError) {
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת הקליניקות!</p>
    }

    return (<>
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#6C4CF4]/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#FF5D7A]/10 blur-3xl"></div>

            <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-12 text-right">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-[#6C4CF4] shadow-[0_6px_20px_rgba(30,20,80,.06)] ring-1 ring-[#EEECF4]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5D7A]"></span>
                    קליניקות לפי תחום, עיר ושעות פתיחה
                </p>
                <h1 className="m-0! text-[40px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">איפה תרצה לקבוע תור?</h1>
                <p className="mt-2 text-[17px] text-[#6B6880]">חפש קליניקה או רופא, ובחר תחום</p>

                <div className="mt-8 flex flex-col gap-3 rounded-[28px] border border-[#EEECF4] bg-white/90 p-3 shadow-[0_18px_44px_rgba(30,20,80,.08)] backdrop-blur lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A3A0B5]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                        <input
                            className="h-14 w-full rounded-[18px] border border-transparent bg-[#FAFAFC] pr-12 pl-4 text-right text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                            type="text" placeholder="...חפש שם קליניקה או שם רופא" value={search} onChange={(e) => {
                                const val = e.target.value
                                setSearch(val)
                                updateFilter("q", val);
                            }} />
                    </div>
                    <select
                        className="h-14 cursor-pointer rounded-[18px] border border-transparent bg-[#FAFAFC] px-5 text-right text-base font-medium text-[#2B2937] outline-none transition hover:bg-[#F4F1FF] focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10 lg:w-52"
                        value={category ?? ""}
                        onChange={(e) => (updateFilter("category", e.target.value))}
                    >
                        <option value="">כל הקטגוריות</option>
                        {categories.map(item => (<option key={item} value={item}>{categoryLabel[item]}</option>))}
                    </select>
                    <select
                        className="h-14 cursor-pointer rounded-[18px] border border-transparent bg-[#FAFAFC] px-5 text-right text-base font-medium text-[#2B2937] outline-none transition hover:bg-[#F4F1FF] focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10 lg:w-52"
                        value={searchParams.get("sort") ?? ""}
                        onChange={(e) => updateFilter("sort", e.target.value)}
                    >
                        <option value="">מיון</option>
                        {Object.entries(sortLabel).map(([value, label]) => (<option key={value} value={value}>{label}</option>))}
                    </select>
                    <label className="flex h-14 select-none items-center gap-3 rounded-[18px] bg-[#FAFAFC] px-5 text-base font-medium text-[#2B2937] transition hover:bg-[#F4F1FF]">
                        <input type="checkbox" className="peer sr-only" checked={searchParams.get("openNow") === "true"} onChange={(e) => updateFilter("openNow", e.target.checked ? "true" : "")} />
                        <span className="relative h-7 w-12 shrink-0 rounded-full bg-[#D9D5EA] transition-colors after:absolute after:right-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-[0_2px_6px_rgba(30,20,80,.25)] after:transition-all peer-checked:bg-[#6C4CF4] peer-checked:after:right-6 peer-focus-visible:ring-4 peer-focus-visible:ring-[#6C4CF4]/25"></span>
                        פתוח עכשיו
                    </label>
                </div>

                <p className="mb-4 mt-8 text-[15px] text-[#6B6880]">נמצאו <span className="font-bold text-[#16141F]">{query.data.total}</span> קליניקות</p>

                {query.data.items.length === 0 && (
                    <div className="rounded-[24px] border border-dashed border-[#D9D5EA] bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                        </div>
                        <p className="text-lg font-semibold text-[#16141F]">לא נמצאו קליניקות</p>
                        <p className="mt-1 text-[15px] text-[#6B6880]">נסה לשנות את החיפוש או את הסינון</p>
                    </div>
                )}

                <div className={query.isPlaceholderData ? "grid gap-5 opacity-60 transition md:grid-cols-2" : "grid gap-5 transition md:grid-cols-2"}>
                    {query.data.items.map((clinic: Clinic) => (
                        <ClinicCard key={clinic.id} clinic={clinic} />
                    ))}
                </div>
            </div>
        </div>
    </>)
}

export default SearchClinics
