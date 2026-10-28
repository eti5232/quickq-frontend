import { useForm } from "react-hook-form";
import type { CreateProviderRequest, ProviderFormValues } from "../types/manage";
import useCreateProvider from "../hooks/useCreateProvider";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import FormProviderFields from "../componnents/FormProviderFields";

const CreateNewProvider = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ProviderFormValues>({
        defaultValues: { slotMinutes: 10 }
    });

    const mutation = useCreateProvider();

    useEffect(() => {
        if (!showSuccess)
            return;
        const timer = setTimeout(() => {
            navigate("/manage/providers")
        }, 3000)
        return () => clearTimeout(timer);
    }, [showSuccess, navigate])

    const onSubmit = (provider: CreateProviderRequest) => {
        mutation.mutate(provider,
            {
                onSuccess: () => {
                    setShowSuccess(true);
                },
                onError: (e) => {
                    setError("root", {
                        type: "server",
                        message: e.response?.data?.error?.message ?? "משהו השתבש"
                    });
                }
            }
        );
    };

    return (<>
        <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-8 text-right">
            <Link className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#6B6880] transition hover:text-[#6C4CF4]" to="/manage/providers">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 6 6 6-6 6" />
                </svg>
                חזרה לרשימת אנשי המקצוע
            </Link>

            {showSuccess && (<div className="fixed inset-0 z-50 grid place-items-center bg-[#16141F]/45 p-4 backdrop-blur-sm" dir="rtl">
                <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[#EEECF4] bg-white text-center shadow-[0_24px_60px_rgba(30,20,80,.25)]">
                    <div className="bg-gradient-to-b from-[#EAF7EF] to-white px-6 pb-4 pt-9">
                        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1E9E5A] text-white shadow-[0_10px_24px_rgba(30,158,90,.35)]">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                        </span>
                    </div>
                    <div className="px-6 pb-7">
                        <p className="text-xl font-bold text-[#16141F]">נוסף בהצלחה לרשימת אנשי המקצוע!</p>
                        <p className="mt-2 text-sm text-[#6B6880]">הינך מועבר לרשימה...</p>
                    </div>
                    <button className="absolute left-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/80 text-sm font-semibold text-[#6B6880] transition hover:bg-white hover:text-[#16141F]" onClick={() => setShowSuccess(false)}>X</button>
                </div>
            </div>
            )}

            <div className="overflow-hidden rounded-[20px] border border-[#EEECF4] bg-white shadow-[0_1px_2px_rgba(30,20,80,.04)]">
                <div className="flex items-center gap-4 border-b border-[#EEECF4] bg-[#FAFAFC] px-6 py-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
                            <path d="M8 15a6 6 0 1 0 12 0v-3" />
                            <circle cx="20" cy="10" r="2" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xl font-bold text-[#16141F]">הוספת איש מקצוע</div>
                        <div className="mt-0.5 text-[14px] text-[#6B6880]">אחרי ההוספה ניתן להגדיר שעות פעילות</div>
                    </div>
                </div>
                <form className="flex flex-col gap-5 px-6 py-6" onSubmit={handleSubmit(onSubmit)}>
                    <FormProviderFields register={register} errors={errors} />
                    {errors.root && <p className="rounded-[12px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">{errors.root.message}</p>}
                    <div className="flex items-center gap-3 border-t border-[#EEECF4] pt-5">
                        <button className="h-11 cursor-pointer rounded-[12px] bg-[#6C4CF4] px-8 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.25)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={mutation.isPending}>{mutation.isPending ? "מוסיף..." : "הוספת איש מקצוע"}</button>
                        <Link className="inline-flex h-11 items-center rounded-[12px] border border-[#E3E0EE] bg-white px-6 text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:text-[#6C4CF4]" to="/manage/providers">ביטול</Link>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
};

export default CreateNewProvider
