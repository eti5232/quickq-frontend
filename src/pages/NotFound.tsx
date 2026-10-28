import { Link } from "react-router"
import mark from "../assets/quickqMark.png";

const Forbidden = () => {
    return <main className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-4 py-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6C4CF4]/10"></div>
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#FF5D7A]/10"></div>

        <div className="relative flex flex-col items-center text-center">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-[#6C4CF4]/20"></span>
                <span className="absolute inset-[12%] rounded-full border border-[#FF5D7A]/25"></span>
                <span className="absolute inset-[24%] rounded-full bg-gradient-to-br from-white to-[#F4F1FF] shadow-[0_16px_40px_rgba(108,76,244,.15)]"></span>
                <img className="relative h-[40%] w-auto translate-x-[3.8%] translate-y-[3.7%] opacity-90" src={mark} alt="QuickQ" />
            </div>

            <h2 className="m-0! mt-6! bg-gradient-to-l from-[#6C4CF4] to-[#FF5D7A] bg-clip-text text-[88px]! font-bold! leading-none! tracking-normal! text-transparent!">404</h2>
            <p className="mt-3 text-xl font-semibold text-[#16141F]">העמוד לא נמצא</p>
            <p className="mt-1 text-[15px] text-[#6B6880]">ייתכן שהכתובת שגויה או שהעמוד הוסר</p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link className="inline-flex h-12 items-center rounded-[14px] bg-[#6C4CF4] px-8 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB]" to="/">חזרה לדף הבית</Link>
                <Link className="inline-flex h-12 items-center rounded-[14px] border border-[#EEECF4] bg-white px-8 text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:text-[#6C4CF4]" to="/clinics">חיפוש קליניקות</Link>
            </div>
        </div>
    </main>
}
export default Forbidden
