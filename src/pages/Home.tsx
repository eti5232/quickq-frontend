import { Link } from "react-router"
import mark from "../assets/quickqMark.png";

const Home = () => {
    return (<>
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-[#FAFAFC] px-4 py-6 text-center">
            <div className="relative flex h-[260px] w-[260px] items-center justify-center sm:h-[min(480px,48vh)] sm:w-[min(480px,48vh)] sm:min-h-[300px] sm:min-w-[300px]">
                <span className="absolute inset-[6%] rounded-full border border-[#6C4CF4]/20"></span>
                <span className="absolute inset-[12.5%] rounded-full border border-[#FF5D7A]/25"></span>
                <span className="absolute inset-[19%] rounded-full bg-gradient-to-br from-white to-[#F4F1FF] shadow-[0_20px_50px_rgba(108,76,244,.15)]"></span>
                <img className="relative h-[58%] w-auto translate-x-[3.8%] translate-y-[3.7%]" src={mark} alt="QuickQ" />
            </div>

            <h1 className="m-0! mt-6! text-[38px]! font-bold! leading-[1.1]! tracking-normal! text-[#16141F]!">
                מחכים פחות.
                <br />
                <span className="bg-gradient-to-l from-[#6C4CF4] to-[#FF5D7A] bg-clip-text text-transparent">מגיעים בדיוק בזמן.</span>
            </h1>
            <p className="mt-3 max-w-[380px] text-base leading-relaxed text-[#6B6880]">קובעים תור, ורואים כמה אנשים לפנייך ומתי כדאי לצאת.</p>

            <Link className="group mt-6 inline-flex h-14 items-center gap-3 rounded-full bg-gradient-to-l from-[#6C4CF4] to-[#8E73FF] py-0 pe-3 ps-9 text-base font-semibold text-white shadow-[0_12px_28px_rgba(108,76,244,.35)] transition hover:shadow-[0_16px_34px_rgba(108,76,244,.45)]" to="/clinics">
                לכניסה למערכת
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition group-hover:bg-white group-hover:text-[#6C4CF4]">
                    <svg className="transition group-hover:-translate-x-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                </span>
            </Link>
            <div className="mt-5 text-sm text-[#6B6880]">
                יש לך חשבון?{" "}
                <Link className="font-semibold text-[#6C4CF4] hover:underline" to="/login">התחברות</Link>
            </div>
        </div>
    </>)
}

export default Home