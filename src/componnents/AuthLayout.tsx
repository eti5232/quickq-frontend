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

            <aside className="relative m-4 hidden overflow-hidden rounded-[20px] bg-[#6C4CF4] p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <div className="relative grid h-16 w-16 place-items-center rounded-[16px] bg-white">
                    <img className="h-9 w-auto" src={mark} alt="QuickQ" />
                </div>

                <div className="relative">
                    <h2 className="m-0 text-[40px] font-bold leading-[1.15] tracking-normal text-white">
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
