import { useState } from "react";
import { useForm } from "react-hook-form";
import ProviderChips from "../componnents/ProviderChips";
import useSaveWorkingHours from "../hooks/useSaveWorkingHours";
import useSelectedProvider from "../hooks/useSelectedProvider";
import useWorkingHours from "../hooks/useWorkingHours";
import type { WorkingHoursFormValues } from "../types/workingHours";
import { getErrorMessages } from "../utils/apiErrors";

const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const WorkingHours = () => {
    const { providerId, setProviderId, providers, queryProviders } = useSelectedProvider();
    const query = useWorkingHours(providerId);
    const save = useSaveWorkingHours(providerId);
    const { register, handleSubmit } = useForm<WorkingHoursFormValues>({
        values: {
            days: dayNames.map((_, index) => {
                const range = query.data?.hours.find(item => item.dayOfWeek === index);
                return { startTime: range?.startTime ?? "", endTime: range?.endTime ?? "" };
            })
        }
    });

    const [incomplete, setIncomplete] = useState<string[]>([]);

    const onSubmit = (values: WorkingHoursFormValues) => {
        const missing = values.days.flatMap((day, index) => (!!day.startTime !== !!day.endTime) ? [dayNames[index]] : []);
        setIncomplete(missing);
        if (missing.length > 0) return;
        const hours =values.days.flatMap((day, index) => day.startTime && day.endTime ? [{ dayOfWeek: index, ...day }] : []);
        save.mutate({ hours });
    }

    if (queryProviders.isError)
        return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בעת טעינת אנשי המקצוע...</p>
    if (queryProviders.isPending)
        return <p className="py-24 text-center text-[#6B6880]">טוען את רשימת אנשי המקצוע...</p>

    return (<div className="mx-auto w-full max-w-4xl px-5 pb-8 pt-6 text-right">
        <div className="mb-1 text-[28px] font-bold leading-tight text-[#16141F]">שעות פעילות</div>
        <div className="mb-5 text-[15px] text-[#6B6880]">הגדרת הימים והשעות שבהם איש המקצוע מקבל</div>
        <ProviderChips providers={providers?.filter(p => p.isActive)} selectedId={providerId} onSelect={(id) => (setProviderId(id), save.reset())} />

        {query.isError && <p className="mb-4 rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">שגיאה בטעינת שעות העבודה</p>}
        {query.isPending && <p className="py-10 text-center text-[#6B6880]">טוען שעות עבודה...</p>}

        {query.data && (
            <form className="overflow-hidden rounded-[20px] border border-[#EEECF4] bg-white" onSubmit={handleSubmit(onSubmit)}>
                <p className="flex items-center gap-2.5 border-b border-[#EEECF4] bg-[#FAFAFC] px-6 py-3.5 text-[13px] text-[#6B6880]">
                    <svg className="shrink-0 text-[#6C4CF4]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>
                    עבור יום לא פעיל יש להשאיר ריק את שעת ההתחלה ושעת הסיום
                </p>
                <div className="grid gap-3 p-5 md:grid-cols-2">
                    {dayNames.map((dayName, index) => (
                        <div className="flex items-center gap-4 rounded-[16px] border border-[#EEECF4] bg-[#FAFAFC] px-4 py-3 transition focus-within:border-[#6C4CF4] focus-within:bg-white hover:border-[#D9D5EA]" key={index}>
                            <span className="w-14 shrink-0 text-[15px] font-semibold text-[#16141F]">{dayName}</span>
                            <div className="flex flex-1 items-center justify-end gap-2">
                                <input className="h-10 w-[7.5rem] rounded-[10px] border border-[#E3E0EE] bg-white px-2 text-center text-[15px] text-[#2B2937] outline-none transition focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10" type="time" aria-label={`שעת התחלה ביום ${dayName}`} {...register(`days.${index}.startTime`)} />
                                <span className="text-[13px] text-[#A3A0B5]">עד</span>
                                <input className="h-10 w-[7.5rem] rounded-[10px] border border-[#E3E0EE] bg-white px-2 text-center text-[15px] text-[#2B2937] outline-none transition focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10" type="time" aria-label={`שעת סיום ביום ${dayName}`} {...register(`days.${index}.endTime`)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EEECF4] px-6 py-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        {incomplete.length > 0 && <p className="rounded-[12px] bg-[#FDEDEF] px-4 py-2.5 text-[13px] text-[#D23B47]" role="alert">יש למלא גם שעת התחלה וגם שעת סיום ב: {incomplete.join(", ")}</p>}
                        {save.data?.warning && <p className="rounded-[12px] bg-[#FFF5E3] px-4 py-2.5 text-[13px] text-[#C27A0E]">{save.data.warning.message}</p>}
                        {save.isError && <p className="rounded-[12px] bg-[#FDEDEF] px-4 py-2.5 text-[13px] text-[#D23B47]">{getErrorMessages(save.error, "לא ניתן לשמור את השעות כרגע").join(" • ")}</p>}
                    </div>
                    <button className="h-11 cursor-pointer rounded-[12px] bg-[#6C4CF4] px-9 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.25)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={save.isPending}>שמירה</button>
                </div>
                {save.isSuccess && (<div className="animate-toast pointer-events-none fixed inset-x-0 top-6 z-[60] mx-auto flex w-fit items-center gap-3 rounded-[16px] border border-[#BFE5CD] bg-[#EAF7EF] py-3 pe-5 ps-4 shadow-[0_12px_30px_rgba(30,20,80,.18)]" role="status">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#34C98E] text-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                    </span>
                    <p className="text-[15px] font-semibold text-[#1F9D6B]">השעות נשמרו בהצלחה</p>
                </div>)}
            </form>
        )}
    </div>)
};

export default WorkingHours
