import { Link } from "react-router"

const Forbidden = () => {
    return <main className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-4 py-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6C4CF4]/10 blur-2xl"></div>
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#FF5D7A]/10 blur-2xl"></div>

        <div className="relative w-full max-w-md rounded-[28px] border border-[#EEECF4] bg-white p-10 text-center shadow-[0_18px_44px_rgba(30,20,80,.08)]">
            <div className="relative mx-auto mb-6 grid h-24 w-24 place-items-center">
                <span className="absolute inset-0 rounded-full border border-[#D23B47]/15"></span>
                <span className="absolute inset-2 rounded-full bg-[#FDEDEF]"></span>
                <svg className="relative text-[#D23B47]" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
            </div>
            <h1 className="mt-0! mb-2! text-[26px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">אין לך הרשאה להיכנס למסך הזה</h1>
            <p className="text-base leading-relaxed text-[#6B6880]">המשתמש מחובר, אבל התפקיד שלו אינו מורשה לצפות בתוכן.</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link className="inline-flex h-12 items-center rounded-[14px] bg-[#6C4CF4] px-8 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(108,76,244,.28)] transition hover:bg-[#5A3DDB]" to="/">חזרה לדף הבית</Link>
            </div>
        </div>
    </main>
}
export default Forbidden
