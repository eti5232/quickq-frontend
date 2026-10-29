import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router";
import type { CreateAppointmentRequest, CreateAppointmentResponse } from "../types/appointment";
import { useForm } from "react-hook-form";
import { createAppointment } from "../api/appointmentsApi";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";
import { useEffect, useState } from "react";
import { getErrorMessages } from "../utils/apiErrors";


const BookingConfirm = () => {
  const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<CreateAppointmentRequest>();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [appointmentCreated, setAppointmentCreated] = useState(false);

  useEffect(() => {
    if (!state?.providerId || !state?.startTime || !state?.clinicId) {
      navigate("/clinics", { replace: true });
    }
  }, [state, navigate]);

  const mutation = useMutation<CreateAppointmentResponse, AxiosError<ApiError>, CreateAppointmentRequest>({
    mutationFn: (request: CreateAppointmentRequest) => createAppointment(request),
  });

  const reminderEnabled = watch("reminderEnabled");

  const onSubmit = (form: CreateAppointmentRequest) => {
    const { providerId, startTime } = state;
    const myAppointment = {
      providerId,
      startTime,
      reminderEnabled: form.reminderEnabled,
      travelMinutes: form.reminderEnabled ? form.travelMinutes : null,
      notes: form.notes
    }
    mutation.mutate(myAppointment,
      {
        onSuccess: () => {
          setAppointmentCreated(true);
          setTimeout(() => {
            navigate("/profile/my-appointments");
          }, 3000);
        },
        onError: (e) => {
          setError("root", {
            type: "server",
            message: getErrorMessages(e).join(" • ")
          });
        }
      });
  };

  const clinicIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    </svg>
  );
  const doctorIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" />
      <path d="M8 15a6 6 0 1 0 12 0v-3" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );

  if (appointmentCreated) {
    return (
      <div className="mx-auto my-10 w-full max-w-md px-5 text-right">
        <div className="overflow-hidden rounded-[20px] border border-[#EEECF4] bg-white">
          <div className="flex flex-col items-center bg-[#EAF7EF] px-6 pb-5 pt-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#1E9E5A] text-white">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5L20 7" />
              </svg>
            </span>
            <h2 className="mb-0! mt-4! text-2xl! font-bold! tracking-normal! text-[#16141F]!">התור נקבע בהצלחה!</h2>
          </div>
          <div className="flex flex-col gap-3 px-6 pb-6">
            <div className="flex items-center gap-3 rounded-[16px] bg-[#FAFAFC] px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#F4F1FF] text-[#6C4CF4]">{clinicIcon}</span>
              <p className="text-[15px] text-[#2B2937]">שם הקליניקה: <span className="font-semibold text-[#16141F]">{state.clinicName}</span></p>
            </div>
            <div className="flex items-center gap-3 rounded-[16px] bg-[#FAFAFC] px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#FFF2F4] text-[#FF5D7A]">{doctorIcon}</span>
              <p className="text-[15px] text-[#2B2937]">איש המקצוע: <span className="font-semibold text-[#16141F]">{state.providerName}</span></p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[16px] bg-[#F4F1FF] px-4 py-3 text-center">
                <div className="text-[12px] font-medium text-[#6C4CF4]">תאריך</div>
                <p className="mt-0.5 text-lg font-bold text-[#16141F]">{new Date(state.startTime).toLocaleDateString("he-IL")}</p>
              </div>
              <div className="rounded-[16px] bg-[#FFF2F4] px-4 py-3 text-center">
                <div className="text-[12px] font-medium text-[#FF5D7A]">שעה</div>
                <p className="mt-0.5 text-lg font-bold text-[#16141F]">{new Date(state.startTime).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
            <Link className="mt-2 flex h-12 items-center justify-center rounded-[14px] bg-[#6C4CF4] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB]" to="/profile/my-appointments">לתורים שלי</Link>
            <p className="text-center text-[13px] text-[#6B6880]">מעבירים אותך לתורים שלי...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!state?.providerId || !state?.startTime || !state?.clinicId) {
    return <p className="py-24 text-center text-[#6B6880]">פרטי התור חסרים, מעבירים אותך לבחירת תור מחדש...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-10 pt-6 text-right">
      <div className="mb-6 flex items-center justify-center gap-3 text-[13px] font-medium">
        <span className="flex items-center gap-2 text-[#1E9E5A]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1E9E5A] text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
          </span>
          בחירת מועד
        </span>
        <span className="h-px w-10 bg-[#D9D5EA]"></span>
        <span className="flex items-center gap-2 text-[#6C4CF4]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#6C4CF4] text-white">2</span>
          אישור התור
        </span>
        <span className="h-px w-10 bg-[#D9D5EA]"></span>
        <span className="flex items-center gap-2 text-[#A3A0B5]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EEECF4] text-[#A3A0B5]">3</span>
          סיום
        </span>
      </div>

      <h1 className="mb-1! mt-0! text-[28px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">אישור התור</h1>
      <div className="mb-6 text-[15px] text-[#6B6880]">בדקי את הפרטים לפני השמירה</div>

      <form className="grid items-start gap-6 md:grid-cols-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative overflow-hidden rounded-[20px] border border-[#EEECF4] bg-white md:col-span-2">
          <div className="bg-[#F4F1FF] px-6 pb-5 pt-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-white text-[#6C4CF4]">{clinicIcon}</span>
              <p className="text-[15px] text-[#6B6880]">שם הקליניקה: <span className="block text-lg font-bold leading-tight text-[#16141F]">{state.clinicName}</span></p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-white text-[#FF5D7A] shadow-[0_6px_16px_rgba(255,93,122,.15)]">{doctorIcon}</span>
              <p className="text-[15px] text-[#6B6880]">שם איש המקצוע: <span className="block text-lg font-bold leading-tight text-[#16141F]">{state.providerName}</span></p>
            </div>
          </div>

          <div className="relative">
            <div className="mx-6 border-t-2 border-dashed border-[#E3DEF7]"></div>
            <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full border border-[#EEECF4] bg-[#FAFAFC]"></span>
            <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-[#EEECF4] bg-[#FAFAFC]"></span>
          </div>

          <div className="grid grid-cols-2 gap-3 px-6 pb-6 pt-5">
            <div className="rounded-[18px] bg-[#F4F1FF] p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#6C4CF4]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>
                תאריך
              </div>
              <p className="mt-1.5 text-xl font-bold text-[#16141F]">{new Date(state.startTime).toLocaleDateString("he-IL")}</p>
            </div>
            <div className="rounded-[18px] bg-[#FFF2F4] p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#FF5D7A]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                שעה
              </div>
              <p className="mt-1.5 text-xl font-bold text-[#16141F]">{new Date(state.startTime).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:col-span-3">
          <div className="rounded-[20px] border border-[#EEECF4] bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#FFF2F4] text-[#FF5D7A]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                </span>
                <div>
                  <label className="block text-[15px] font-semibold text-[#16141F]" htmlFor="reminderEnabled">האם לשלוח תזכורת במייל</label>
                  <div className="mt-0.5 text-[13px] text-[#6B6880]">נשלח לך מייל בדיוק כשצריך לצאת</div>
                </div>
              </div>
              <label className="relative inline-flex shrink-0 cursor-pointer" htmlFor="reminderEnabled">
                <input
                  className="peer sr-only"
                  id="reminderEnabled"
                  type="checkbox"
                  {...register("reminderEnabled")}
                />
                <span className="h-7 w-12 rounded-full bg-[#D9D5EA] transition peer-checked:bg-[#6C4CF4] peer-focus-visible:ring-4 peer-focus-visible:ring-[#6C4CF4]/20 after:absolute after:right-0.5 after:top-0.5 after:h-6 after:w-6 after:rounded-full after:bg-white after:shadow-[0_2px_6px_rgba(30,20,80,.25)] after:transition peer-checked:after:-translate-x-5"></span>
              </label>
            </div>

            <div className={reminderEnabled ? "mt-5 transition" : "mt-5 opacity-50 transition"}>
              <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="travelMinutes">זמן הגעה לקליניקה בדקות</label>
              <input
                className="h-12 w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-[15px] text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                id="travelMinutes"
                type="number"
                min={0}
                {...register("travelMinutes", {
                  valueAsNumber: true,
                  validate: (value) => !reminderEnabled || (value !== undefined && Number.isFinite(value) && value! >= 0) || "יש להזין זמן הגעה תקין"
                })}
              />
              {errors.travelMinutes && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.travelMinutes.message}</p>}
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="notes">הערות</label>
              <textarea
                className="min-h-[96px] w-full resize-y rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 py-3 text-[15px] text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                id="notes"
                placeholder="...ניתן לכתוב הערה"
                maxLength={500}
                {...register("notes", { maxLength: 500 })}
              />
              {errors.notes && <p className="mt-1.5 text-sm text-[#D23B47]">ההערות מוגבלות ל־500 תווים</p>}
            </div>
          </div>

          {errors.root && <p className="rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">{errors.root.message}</p>}
          {errors.root && <Link className="text-sm font-semibold text-[#6C4CF4] hover:underline" to={`/clinics/${state.clinicId}/book-appointment/${state.providerId}`} state={{ clinicName: state.clinicName, providerName: state.providerName }}>בחירת שעה אחרת</Link>}

          <button className="h-12 w-full cursor-pointer rounded-[12px] bg-[#6C4CF4] text-base font-semibold text-white shadow-[0_4px_12px_rgba(108,76,244,.22)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "...הבקשה נשלחת" : "לשמירת התור"}
          </button>
        </div>
      </form >
    </div>
  )
}

export default BookingConfirm
