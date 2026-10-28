import { Outlet } from "react-router"
import Header from "./Header"

const Layout = () => {
    return (<>
        <div className="fixed inset-0 overflow-y-auto bg-[#FAFAFC] font-['Heebo',sans-serif]" dir="rtl">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    </>)
}
export default Layout
