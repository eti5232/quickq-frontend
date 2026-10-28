import { useContext } from "react";
import { NavLink, Outlet } from "react-router"
import { UserContext } from "../context/userContext";

const tabClass = ({ isActive }: { isActive: boolean }) =>
    "-mb-px inline-flex h-12 items-center border-b-2 px-5 text-[15px] font-semibold transition " +
    (isActive ? "border-[#6C4CF4] text-[#6C4CF4]" : "border-transparent text-[#6B6880] hover:text-[#16141F]");

const Profile = () => {
    const context = useContext(UserContext);
    const user = context?.user;
    const initials = user?.fullName.split(" ").map(word => word[0]).slice(0, 2).join("");

    return (<div className="relative overflow-hidden">
        <div className="relative mx-auto w-full max-w-4xl px-5 pt-8 text-right">
            <div className="flex flex-wrap items-center gap-5 rounded-[20px] border border-[#EEECF4] bg-white p-6">
                <div className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-[#6C4CF4] text-[26px] font-bold text-white">{initials}</div>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#6C4CF4]">האיזור האישי</p>
                    <h1 className="m-0! mt-0.5! text-[28px]! font-bold! leading-tight! tracking-normal! text-[#16141F]!">{user?.fullName}</h1>
                    <p className="mt-1 text-[14px] text-[#6B6880]">{user?.email}</p>
                </div>
            </div>

            <div className="mt-6 flex gap-1 border-b border-[#EEECF4]">
                <NavLink className={tabClass} to="my-appointments">
                    התורים שלי
                </NavLink>
                <NavLink className={tabClass} to="profile-details">
                    פרטים אישיים
                </NavLink>
            </div>
        </div>
        <div className="relative">
            <Outlet />
        </div>
    </div>)
}

export default Profile
