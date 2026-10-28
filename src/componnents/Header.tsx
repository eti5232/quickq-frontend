import { Link, NavLink } from "react-router"
import { UserContext } from "../context/userContext"
import { useContext } from "react"
import logo from "../assets/quickqLogo.png";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    "relative inline-flex h-10 items-center rounded-[12px] px-4 text-[15px] font-medium transition " +
    (isActive
        ? "font-semibold text-[#6C4CF4] after:absolute after:inset-x-4 after:-bottom-[13px] after:h-[3px] after:rounded-full after:bg-[#6C4CF4]"
        : "text-[#2B2937] hover:text-[#6C4CF4]");

const ctaLinkClass = ({ isActive }: { isActive: boolean }) =>
    "inline-flex h-10 items-center rounded-[12px] px-5 text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(108,76,244,.30)] transition " +
    (isActive ? "bg-[#5A3DDB] ring-4 ring-[#6C4CF4]/20" : "bg-[#6C4CF4] hover:bg-[#5A3DDB]");

const Header = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Header must be rendered inside UserProvider");
    }
    const { user, logout } = context;
    const initials = user?.fullName.split(" ").map(word => word[0]).slice(0, 2).join("");

    return (<header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-[#EEECF4] bg-white/90 px-6 backdrop-blur">
        <Link className="me-4 shrink-0" to="/">
            <img className="h-9 w-auto" src={logo} alt="לוגו האתר" />
        </Link>

        <nav className="flex items-center gap-1">
            <NavLink className={navLinkClass} to="/clinics">חיפוש קליניקות</NavLink>
            {user?.role === "CLIENT" && <NavLink className={navLinkClass} to="/profile">האיזור האישי</NavLink>}
            {user?.role === "CLINIC_MANAGER" && <>
                <NavLink className={navLinkClass} to="manage/providers">ניהול אנשי מקצוע</NavLink>
                <NavLink className={navLinkClass} to="manage/working-hours">ניהול שעות פעילות</NavLink>
                <NavLink className={navLinkClass} to="manage/queues">יומן תורים</NavLink>
                <NavLink className={navLinkClass} to="manage/alive-queue">תור היום</NavLink>
            </>}
        </nav>

        {user == null && <div className="ms-auto flex items-center gap-2">
            <NavLink className={navLinkClass} to="/login">התחברות</NavLink>
            <NavLink className={ctaLinkClass} to="/register">הרשמה</NavLink>
        </div>
        }
        {user && <div className="ms-auto flex items-center gap-3">
            <button className="h-10 cursor-pointer rounded-[12px] border border-[#EEECF4] bg-white px-5 text-[15px] font-medium text-[#2B2937] transition hover:border-[#6C4CF4] hover:text-[#6C4CF4]" onClick={logout}>יציאה</button>
            <Link className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#6C4CF4] to-[#8E73FF] text-[14px] font-bold text-white shadow-[0_6px_16px_rgba(108,76,244,.30)] ring-2 ring-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(108,76,244,.40)]" to={user.role === "CLIENT" ? "/profile" : "/manage/alive-queue"} title={user.fullName}>{initials}</Link>
        </div>}
    </header>

    )
}

export default Header
