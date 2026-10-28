import { useForm } from "react-hook-form";
import type { ManageProvider, ProviderFormValues } from "../types/manage";
import useUpdateProvider from "../hooks/useUpdateProvider";
import FormProviderFields from "./FormProviderFields";
import { useEffect, useState } from "react";

type EditProviderModalProps = {
    provider: ManageProvider;
    onClose: () => void;
};

const EditProviderModal = ({ provider, onClose }: EditProviderModalProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const mutation = useUpdateProvider();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ProviderFormValues>(
        {
            defaultValues: {
                fullName: provider.fullName,
                specialty: provider.specialty ?? "",
                slotMinutes: provider.slotMinutes
            }
        }
    );

    useEffect(() => {
        if (!showSuccess)
            return;
        const timer = setTimeout(() => {
            setShowSuccess(false);
            onClose();
        }, 3000)
        return () => clearTimeout(timer);
    }, [showSuccess, onClose])

    const onSubmit = (values: ProviderFormValues) => {
        mutation.mutate({
            id: provider.id,
            provider: {
                fullName: values.fullName,
                specialty: values.specialty || null,
                slotMinutes: values.slotMinutes
            }
        }, {
            onSuccess: () => {
                setShowSuccess(true);
            },
            onError: (e) => {
                setError("root", {
                    type: "server",
                    message: e.response?.data?.error?.message ?? "משהו השתבש"
                });
            }
        });
    };
    return (<>
        {showSuccess && (<div className="fixed left-1/2 top-6 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-[16px] border border-[#BFE5CD] bg-[#EAF7EF] py-3 pe-3 ps-4 shadow-[0_12px_30px_rgba(30,20,80,.18)]" dir="rtl">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1E9E5A] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
            </span>
            <div>
                <p className="text-[15px] font-semibold text-[#1E9E5A]">העדכון נשמר בהצלחה!</p>
                <p className="text-[13px] text-[#4E8F69]">הינך מועבר לרשימה...</p>
            </div>
            <button className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-sm font-semibold text-[#1E9E5A] transition hover:bg-white/70" onClick={onClose}>X</button>
        </div>
        )}
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#16141F]/45 p-4 backdrop-blur-sm" dir="rtl">
            <form className="w-full max-w-lg overflow-hidden rounded-[24px] border border-[#EEECF4] bg-white text-right shadow-[0_24px_60px_rgba(30,20,80,.25)]" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4 border-b border-[#EEECF4] bg-[#FAFAFC] px-6 py-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" /><path d="m13.5 6.5 4 4" /></svg>
                    </div>
                    <div>
                        <div className="text-xl font-bold text-[#16141F]">עריכת איש מקצוע</div>
                        <div className="mt-0.5 text-[14px] text-[#6B6880]">{provider.fullName}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 px-6 py-6">
                    <FormProviderFields register={register} errors={errors} />
                    {errors.root && <p className="rounded-[12px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">{errors.root.message}</p>}
                </div>

                <div className="flex items-center gap-3 border-t border-[#EEECF4] px-6 py-4">
                    <button className="h-11 cursor-pointer rounded-[12px] bg-[#6C4CF4] px-8 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.25)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={mutation.isPending}>{mutation.isPending ? "המערכת מעדכנת נתונים..." : "שמירת שינויים"}</button>
                    <button className="h-11 cursor-pointer rounded-[12px] border border-[#E3E0EE] bg-white px-6 text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:text-[#6C4CF4]" type="button" onClick={onClose}>ביטול</button>
                </div>
            </form>
        </div>
    </>)
};

export default EditProviderModal
