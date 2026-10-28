import { useContext, type ReactNode } from "react"
import type { Role } from "../types/auth"
import { UserContext } from "../context/userContext"
import { Navigate } from "react-router"

interface ProtectedRouteProps {
    children: ReactNode
    roles?: Role[]
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const context = useContext(UserContext);

    if (!context)
        throw new Error("ProtectedRoute must be rendered inside UserProvider");

    const { user } = context;
    const token = localStorage.getItem("token");

    if (token && !user)
        return <p>טוען...</p>

    if (!user)
        return <Navigate to="/login" replace />

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/forbidden" replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute