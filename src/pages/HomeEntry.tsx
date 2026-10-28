
import { Link } from "react-router"

const Home = () => {
    return (<>
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-10 pt-14 text-center">
            <span className="mb-5 inline-flex h-8 items-center gap-2 rounded-full bg-[#FFF2F4] px-4 text-[13px] font-semibold text-[#FF5D7A]">
                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                התור מתעדכן בזמן אמת
            </span>
            <h1 className="m-0! max-w-2xl text-[40px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">ברוך הבא למערכת הקליניקות</h1>;
            <p className="mt-4 max-w-xl text-lg text-[#6B6880]">קובעים תור, ורואים כמה אנשים לפנייך ומתי כדאי לצאת.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link className="inline-flex h-14 items-center rounded-[16px] bg-[#6C4CF4] px-8 text-base font-semibold text-white shadow-[0_10px_24px_rgba(108,76,244,.30)] transition hover:bg-[#5A3DDB]" to="/clinics">חיפוש קליניקות</Link>
                <Link className="inline-flex h-14 items-center rounded-[16px] border border-[#EEECF4] bg-white px-8 text-base font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:text-[#6C4CF4]" to="/register">הרשמה</Link>
            </div>

            <div className="mt-14 grid w-full gap-4 text-right sm:grid-cols-3">
                <div className="rounded-[20px] border border-[#EEECF4] bg-white p-5 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-[14px] bg-[#F4F1FF] text-[#6C4CF4]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M16 3v4M8 3v4M4 11h16" />
                        </svg>
                    </div>
                    <div className="text-base font-semibold text-[#16141F]">בוחרים שעה</div>
                    <div className="mt-1 text-sm text-[#6B6880]">רופא, יום ושעה פנויה. שלוש לחיצות.</div>
                </div>
                <div className="rounded-[20px] border border-[#EEECF4] bg-white p-5 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-[14px] bg-[#FFF2F4] text-[#FF5D7A]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                        </svg>
                    </div>
                    <div className="text-base font-semibold text-[#16141F]">עוקבים מהבית</div>
                    <div className="mt-1 text-sm text-[#6B6880]">רואים את התור מתקדם בזמן אמת.</div>
                </div>
                <div className="rounded-[20px] border border-[#EEECF4] bg-white p-5 shadow-[0_6px_20px_rgba(30,20,80,.05)]">
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-[14px] bg-[#EAF7EF] text-[#1E9E5A]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                        </svg>
                    </div>
                    <div className="text-base font-semibold text-[#16141F]">יוצאים בזמן</div>
                    <div className="mt-1 text-sm text-[#6B6880]">מקבלים מייל בדיוק כשצריך לצאת.</div>
                </div>
            </div>
        </div>
    </>)
}

export default Home
