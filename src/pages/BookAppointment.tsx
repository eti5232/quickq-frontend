import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import { he } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { getProviderDates, getProviderDayAvailability } from "../api/providersApi";
import { format } from "date-fns";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [month, setMonth] = useState(new Date());
  const { providerId, clinicId } = useParams();
  const { state } = useLocation();
  const id = Number(providerId);
  const date = selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined;
  const monthString = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;

  const queryDates = useQuery({
    queryKey: ["providerDates", id, monthString],
    queryFn: () => getProviderDates(id, monthString),
    enabled: Number.isInteger(id) && id > 0
  });

  const queryHours = useQuery({
    queryKey: ["providerHours", id, date],
    queryFn: () => {
      if (!date)
        throw new Error("Date is required");
      return getProviderDayAvailability(id, date);
    },
    enabled: Number.isInteger(id) && id > 0 && !!date
  });


  if (queryDates.isPending) {
    return <p className="py-24 text-center text-[#6B6880]">טוען תאריכים פנויים...</p>;
  }

  if (queryDates.isError) {
    return <p className="mx-auto my-24 w-full max-w-md rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-center text-sm text-[#D23B47]">אירעה שגיאה בטעינת התאריכים.</p>;
  }

  const availableDates = new Set(
    queryDates.data.days
      .filter(day => day.status === "AVAILABLE")
      .map(day => day.date)
  );

  return (<div className="relative overflow-hidden">
    <div className="relative mx-auto w-full max-w-5xl px-5 pb-14 pt-6 text-right">
      <Link className="group mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6B6880] transition hover:text-[#6C4CF4]" to={`/clinics/${clinicId}`}>
        <svg className="transition group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        חזרה לקליניקה
      </Link>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1! mt-0! text-[32px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">קביעת תור</h1>
          <div className="text-[16px] text-[#6B6880]">בחר יום פנוי ואז שעה שנוחה לך</div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {state?.clinicName && <p className="inline-flex items-center gap-2 rounded-full border border-[#EEECF4] bg-white px-4 py-2 text-[13px] font-semibold text-[#2B2937]">
            <svg className="text-[#6C4CF4]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /></svg>
            {state.clinicName}
          </p>}
          {state?.providerName && <p className="inline-flex items-center gap-2 rounded-full border border-[#EEECF4] bg-white px-4 py-2 text-[13px] font-semibold text-[#2B2937]">
            <svg className="text-[#FF5D7A]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4H5a2 2 0 0 0-2 2v3.5a5.5 5.5 0 0 0 11 0V6a2 2 0 0 0-2-2h-1" /><path d="M8 15a6 6 0 1 0 12 0v-3" /><circle cx="20" cy="10" r="2" /></svg>
            {state.providerName}
          </p>}
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3 text-[13px] font-semibold">
        <span className="inline-flex items-center gap-2 text-[#6C4CF4]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#6C4CF4] text-white">1</span>
          בחירת יום
        </span>
        <span className="h-px w-10 bg-[#D9D5EA]"></span>
        <span className={selectedDate ? "inline-flex items-center gap-2 text-[#6C4CF4]" : "inline-flex items-center gap-2 text-[#A3A0B5]"}>
          <span className={selectedDate ? "grid h-7 w-7 place-items-center rounded-full bg-[#6C4CF4] text-white" : "grid h-7 w-7 place-items-center rounded-full bg-[#F1F0F6] text-[#A3A0B5]"}>2</span>
          בחירת שעה
        </span>
        <span className="h-px w-10 bg-[#D9D5EA]"></span>
        <span className="inline-flex items-center gap-2 text-[#A3A0B5]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F1F0F6]">3</span>
          אישור
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="flex flex-col items-center self-start rounded-[20px] border border-[#EEECF4] bg-white p-6 lg:col-span-3 [&_.rdp-day\_button]:rounded-[12px]![&_.rdp-root]:[--rdp-accent-background-color:#F4F1FF]! [&_.rdp-root]:[--rdp-accent-color:#6C4CF4]! [&_.rdp-root]:[--rdp-today-color:#6C4CF4]! [&_.rdp-root]:[--rdp-day-height:50px]! [&_.rdp-root]:[--rdp-day-width:50px]! [&_.rdp-root]:[--rdp-day_button-height:44px]! [&_.rdp-root]:[--rdp-day_button-width:44px]! [&_.rdp-day:not(.rdp-disabled):not(.rdp-outside):not(.rdp-selected)_.rdp-day\_button]:bg-[#E3F7EE]! [&_.rdp-day:not(.rdp-disabled):not(.rdp-outside):not(.rdp-selected)_.rdp-day\_button]:font-semibold! [&_.rdp-day:not(.rdp-disabled):not(.rdp-outside):not(.rdp-selected)_.rdp-day\_button]:text-[#1F9D6B]! [&_.rdp-day:not(.rdp-disabled):not(.rdp-outside):not(.rdp-selected)_.rdp-day\_button:hover]:bg-[#CDEFDD]! [&_.rdp-chevron]:fill-[#6C4CF4]! [&_.rdp-month\_caption]:font-semibold! [&_.rdp-month\_caption]:text-[#16141F]! [&_.rdp-selected_.rdp-day\_button]:border-[#6C4CF4]! [&_.rdp-selected_.rdp-day\_button]:bg-[#6C4CF4]! [&_.rdp-selected_.rdp-day\_button]:text-white!">
          <DayPicker
            locale={he}
            dir={"rtl"}
            month={month}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            onMonthChange={setMonth}
            disabled={(date) => !availableDates.has(format(date, "yyyy-MM-dd"))}
          />
          <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-[#6B6880]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#34C98E]"></span>
            ימים בירוק פתוחים לקביעת תור
          </p>
        </div>

        <div className="rounded-[20px] border border-[#EEECF4] bg-white p-6 lg:col-span-2">
          <h2 className="mb-3! mt-0! text-lg! font-bold! tracking-normal! text-[#16141F]!">שעות פנויות</h2>
          {!selectedDate && (
            <div className="grid place-items-center rounded-[16px] border border-dashed border-[#D9D5EA] bg-[#FAFAFC] px-6 py-12 text-center">
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#F4F1FF] text-[#6C4CF4]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              </div>
              <p className="text-[15px] font-semibold text-[#16141F]">בחר יום בלוח</p>
              <p className="mt-1 text-[13px] text-[#6B6880]">והשעות הפנויות יופיעו כאן</p>
            </div>
          )}
          {date && queryHours.isSuccess && queryHours.data?.slots.length === 0 && <p className="rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">אין תורים פנויים</p>}
          {selectedDate && (
            <p className="mb-4 inline-flex rounded-full bg-[#F4F1FF] px-3.5 py-1.5 text-[13px] font-semibold text-[#6C4CF4]">
              התאריך שנבחר: {selectedDate.toLocaleDateString("he-IL")}
            </p>
          )}
          <div className="grid max-h-[360px] grid-cols-3 content-start gap-2.5 overflow-y-auto pe-1">
            {queryHours.data?.slots.map(slot => <div key={slot.time}><Link className="inline-flex h-11 w-full items-center justify-center rounded-[12px] border border-[#EEECF4] bg-white px-3 text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:bg-[#6C4CF4] hover:text-white" to={"/booking-confirm"}
              state={{ providerId: id, startTime: slot.startTime, clinicId, clinicName: state?.clinicName, providerName: state?.providerName }}>{slot.time}</Link></div>)}
          </div>
          {date && queryHours.isPending && <p className="text-sm text-[#6B6880]">טוען שעות פנויות...</p>}
          {date && queryHours.isError && <p className="rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">אירעה שגיאה בטעינת השעות.</p>}
        </div>
      </div>
    </div>
  </div >)
}

export default BookAppointment
