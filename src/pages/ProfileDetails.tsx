import { useForm } from "react-hook-form";
import type { UpdateMeRequest } from "../types/auth";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import useUpdateMe from "../hooks/useUpdateMe";

const inputClass = "h-[52px] w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10";
const labelClass = "mb-1.5 block text-sm font-medium text-[#2B2937]";

const ProfileDetails = () => {

    const context = useContext(UserContext);
    if (!context)
        throw new Error("ProfileDetails must be rendered inside UserProvider");
    const { user } = context;
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateMeRequest>({
        defaultValues: {
            fullName: user?.fullName ?? "",
            phone: user?.phone ?? "",
            defaultTravelMinutes: user?.defaultTravelMinutes ?? 0
        }
    });

    const onSubmit = (values: UpdateMeRequest) => {
        mutation.mutate(values);
    };

    const mutation = useUpdateMe();

    return (<div className="mx-auto w-full max-w-4xl px-5 pb-12 pt-6 text-right">
        <form className="overflow-hidden rounded-[28px] border border-[#EEECF4] bg-white shadow-[0_10px_30px_rgba(30,20,80,.06)]" onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b border-[#EEECF4] bg-[#FAFAFC] px-7 py-5">
                <h2 className="m-0! text-[18px]! font-bold! tracking-normal! text-[#16141F]!">הפרטים שלי</h2>
                <p className="mt-0.5 text-[14px] text-[#6B6880]">עדכון פרטי הקשר וזמן ההגעה לקליניקה</p>
            </div>

            <div className="grid gap-5 px-7 py-6 md:grid-cols-2">
                <div>
                    <label className={labelClass} htmlFor="fullName">שם מלא</label>
                    <input className={inputClass} id="fullName" {...register("fullName", {
                        required: "שם מלא הוא שדה חובה",
                        minLength: { value: 2, message: "השם חייב להכיל לפחות 2 תווים" }
                    })} />
                    {errors.fullName && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.fullName.message}</p>}
                </div>
                <div>
                    <label className={labelClass} htmlFor="phone">פלאפון</label>
                    <input className={inputClass} id="phone" {...register("phone", {
                        required: "פלאפון הוא שדה חובה"
                    })} />
                    {errors.phone && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.phone.message}</p>}
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass} htmlFor="defaultTravelMinutes">זמן הגעה (בדקות)</label>
                    <input className={inputClass + " md:max-w-xs"} id="defaultTravelMinutes" type="number" {...register("defaultTravelMinutes", {
                        valueAsNumber: true,
                        min: { value: 0, message: "הערך חייב להיות לפחות 0" },
                        max: { value: 300, message: "הערך חייב להיות עד 300" }
                    })} />
                    <p className="mt-1.5 text-[13px] text-[#A3A0B5]">משמש לחישוב מתי כדאי לצאת מהבית לתור</p>
                    {errors.defaultTravelMinutes && <p className="mt-1 text-sm text-[#D23B47]">{errors.defaultTravelMinutes.message}</p>}
                </div>

                <div className="grid gap-3 rounded-[20px] bg-[#FAFAFC] p-4 md:col-span-2 md:grid-cols-2">
                    <p className="flex items-center gap-3 text-[14px] text-[#6B6880]">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-white text-[#A3A0B5] ring-1 ring-[#EEECF4]">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                        </span>
                        <span>אימייל: <span className="font-semibold text-[#16141F]">{user?.email ?? "לא צוין"}</span></span>
                    </p>
                    <p className="flex items-center gap-3 text-[14px] text-[#6B6880]">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-white text-[#A3A0B5] ring-1 ring-[#EEECF4]">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M14 10h4M14 14h4M6 16c.5-1.5 1.5-2 3-2s2.5.5 3 2" /></svg>
                        </span>
                        <span>תעודת זהות: <span className="font-semibold text-[#16141F]">{user?.nationalId ?? "לא צוין"}</span></span>
                    </p>
                </div>
            </div>

            {mutation.isError && <p className="mx-7 mb-4 rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">{mutation.error.response?.data?.error?.message ?? "לא ניתן לשמור את הפרטים כרגע"}</p>}
            <div className="flex items-center justify-end border-t border-[#EEECF4] px-7 py-4">
                <button className="h-11 rounded-[12px] bg-[#6C4CF4] px-9 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.25)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={mutation.isPending}>{mutation.isPending ? "שומר..." : "שמירה"}</button>
            </div>

            {mutation.isSuccess && (<div className="animate-toast pointer-events-none fixed inset-x-0 top-6 z-[60] mx-auto flex w-fit items-center gap-3 rounded-[16px] border border-[#BFE5CD] bg-[#EAF7EF] py-3 pe-5 ps-4 shadow-[0_12px_30px_rgba(30,20,80,.18)]" role="status">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#34C98E] text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                </span>
                <p className="text-[15px] font-semibold text-[#1F9D6B]">הפרטים נשמרו בהצלחה</p>
            </div>)}
        </form>
    </div>)

};

export default ProfileDetails
