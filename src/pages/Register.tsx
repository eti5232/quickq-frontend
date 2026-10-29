import AuthLayout from "../componnents/AuthLayout";
import { useForm } from "react-hook-form"
import type { RegisterRequest } from "../types/auth"
import useRegister from "../hooks/useRegister";
import { Link, Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Register = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterRequest>();

    const mutation = useRegister();
    const navigate = useNavigate();
    const user = useContext(UserContext)?.user;
    if (user) return <Navigate to={user.role === "CLIENT" ? "/clinics" : "/manage/alive-queue"} replace />

    const onSubmit = (registerData: RegisterRequest) => {
        mutation.mutate(registerData, {
            onSuccess:()=>{
                navigate("/clinics")
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
                    className="w-full max-w-[440px] rounded-[24px] border border-[#EEECF4] bg-white p-8 text-right shadow-[0_6px_20px_rgba(30,20,80,.05)]"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-7">
                        <h1 className="m-0! text-[26px]! font-bold! tracking-normal! text-[#16141F]!">יוצרים חשבון</h1>
                        <div className="mt-1 text-[15px] text-[#6B6880]">כמה פרטים ואפשר לקבוע תור</div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="fullName">שם מלא</label>
                        <input
                            className="h-[52px] w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                            id="fullName"
                            type="text"
                            placeholder="שם מלא"
                            {...register("fullName",
                                { required: "שם מלא הוא שדה חובה" }
                            )}
                        />
                        {errors.fullName && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.fullName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="email">אימייל</label>
                        <input
                            className="h-[52px] w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                            id="email"
                            type="email"
                            placeholder="אימייל"
                            {...register("email",
                                { required: "אימייל הוא שדה חובה" }
                            )}
                        />
                        {errors.email && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4 flex flex-col gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="phone">פלאפון</label>
                            <input
                                className="h-[52px] w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                                id="phone"
                                type="text"
                                placeholder="פלאפון"
                                {...register("phone",
                                    { required: "פלאפון הוא שדה חובה" }
                                )}
                            />
                            {errors.phone && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="nationalId">ת.ז.</label>
                            <input
                                className="h-[52px] w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                                id="nationalId"
                                type="text"
                                placeholder="ת.ז."
                                {...register("nationalId",
                                    { required: "ת.ז. היא שדה חובה" }
                                )}
                            />
                            {errors.nationalId && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.nationalId.message}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="password">סיסמה</label>
                        <input
                            className="h-[52px] w-full rounded-[14px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
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
                        className="mt-2 h-14 w-full cursor-pointer rounded-[16px] bg-[#6C4CF4] text-base font-semibold text-white shadow-[0_10px_24px_rgba(108,76,244,.30)] transition hover:bg-[#5A3DDB] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "המערכת שומרת נתונים..." : "להרשמה"}
                    </button>
                    <div className="mt-6 border-t border-[#EEECF4] pt-5 text-center text-sm text-[#6B6880]">
                        כבר יש לך חשבון?{" "}
                        <Link className="font-semibold text-[#6C4CF4] hover:underline" to="/login">להתחברות</Link>
                    </div>
                </form>
        </AuthLayout>
    )
}

export default Register
