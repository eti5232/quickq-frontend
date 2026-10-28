import type { ReactNode } from "react";
import mark from "../assets/quickqMark.png";

type AuthLayoutProps = {
    children: ReactNode;
};

const features = [
    "קובעים תור בשלוש לחיצות",
    "רואים את התור מתקדם בזמן אמת",
    "מקבלים תזכורת בדיוק כשצריך לצאת",
];

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-8">
                <div className="w-full max-w-[420px] animate-fade-up">
                    {children}
                </div>
            </div>

            <aside className="relative m-4 hidden overflow-hidden rounded-[32px] bg-gradient-to-br from-[#6C4CF4] via-[#7B5CF6] to-[#9B83FF] p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10"></div>
                <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#FF5D7A]/25"></div>
                <div className="pointer-events-none absolute left-1/3 top-1/2 h-40 w-40 rounded-full border border-white/20"></div>

                <div className="relative grid h-16 w-16 place-items-center rounded-[20px] bg-white shadow-[0_14px_34px_rgba(30,20,80,.30)]">
                    <img className="h-9 w-auto" src={mark} alt="QuickQ" />
                </div>

                <div className="relative">
                    <h2 className="m-0 text-[44px] font-bold leading-[1.1] tracking-normal text-white">
                        מחכים פחות.
                        <br />
                        <span className="text-[#FFD3DC]">מגיעים בדיוק בזמן.</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-white/80">
                        מערכת תורים חכמה לקליניקות: הכל במקום אחד, בלי טלפונים ובלי חדרי המתנה מלאים.
                    </p>
                </div>

                <ul className="relative m-0 flex list-none flex-col gap-3 p-0">
                    {features.map(feature => (
                        <li className="flex items-center gap-3 text-[16px] font-medium" key={feature}>
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                            </span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default AuthLayout
