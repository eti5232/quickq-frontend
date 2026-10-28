import { Outlet } from "react-router";
import useMe from "../hooks/useMe";
import mark from "../assets/quickqMark.png";

const AuthInitializer = () => {

    const query = useMe();
    const token = localStorage.getItem("token");

    if (token && query.isLoading) {
        return (<div className="grid min-h-screen place-items-center bg-[#FAFAFC]" role="status">
            <div className="flex flex-col items-center gap-5">
                <div className="relative grid h-24 w-24 place-items-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#6C4CF4]/15"></span>
                    <span className="absolute inset-2 rounded-full border border-[#6C4CF4]/20"></span>
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_14px_34px_rgba(108,76,244,.20)]">
                        <img className="h-8 w-auto" src={mark} alt="QuickQ" />
                    </span>
                </div>
                <p className="text-[15px] font-medium text-[#6B6880]">טוען...</p>
            </div>
        </div>);
    }

    return <Outlet />
}

export default AuthInitializer
