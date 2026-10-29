import AuthLayout from "../componnents/AuthLayout";
import { useForm } from "react-hook-form"
import type { LoginRequest } from "../types/auth"
import useLogin from "../hooks/useLogin";
import { Link, Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginRequest>();

    const mutation = useLogin();
    const navigate = useNavigate();
    const user = useContext(UserContext)?.user;
    if (user) return <Navigate to={user.role === "CLIENT" ? "/clinics" : "/manage/alive-queue"} replace />

    const onSubmit = (loginData: LoginRequest) => {
        mutation.mutate(loginData,
            {
                onSuccess: (response) => {
                    if (response.user.role === "CLIENT")
                        navigate("/clinics");
                    if(response.user.role==="CLINIC_MANAGER")
                        navigate("/manage/alive-queue")
                },
                onError: (e) => {
                    setError("root", {
                        type: "server",
                        message: e.response?.data?.error?.message ?? "משהו השתבש"
                    });
                }
            });
    }

    return (
        <AuthLayout>
            <form
                className="w-full max-w-[400px] rounded-[20px] border border-[#EEECF4] bg-white p-8 text-right"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-7">
                    <h1 className="m-0! text-[26px]! font-bold! tracking-normal! text-[#16141F]!">ברוך הבא</h1>
                    <div className="mt-1 text-[15px] text-[#6B6880]">התחבר כדי לקבוע ולנהל תורים</div>
                </div>

                <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="email">אימייל</label>
                    <input
                        className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                        id="email"
                        type="email"
                        placeholder="אימייל"
                        {...register("email",
                            { required: "אימייל הוא שדה חובה" }
                        )}
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="password">סיסמה</label>
                    <input
                        className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                        id="password"
                        type="password"
                        placeholder="סיסמה"
                        {...register("password",
                            { required: "סיסמה היא שדה חובה" }
                        )}
                    />
                    {errors.password && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.password.message}</p>}
                </div>

                {errors.root && <p className="mb-4 rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">{errors.root.message}</p>}

                <button
                    className="mt-2 h-12 w-full cursor-pointer rounded-[12px] bg-[#6C4CF4] text-base font-semibold text-white shadow-[0_4px_12px_rgba(108,76,244,.22)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "מתחבר..." : "להתחברות"}
                </button>
                <div className="mt-6 border-t border-[#EEECF4] pt-5 text-center text-sm text-[#6B6880]">
                    עדיין אין לך חשבון?{" "}
                    <Link className="font-semibold text-[#6C4CF4] hover:underline" to="/register">להרשמה</Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Login
