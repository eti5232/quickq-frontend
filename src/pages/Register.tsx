import AuthLayout from "../componnents/AuthLayout";
import { useForm } from "react-hook-form"
import type { RegisterRequest } from "../types/auth"
import useRegister from "../hooks/useRegister";
import { Link, Navigate, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { isStrongPassword, isValidNationalId, isValidPhone } from "../utils/validation";
import { getErrorMessages } from "../utils/apiErrors";

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
                const details = e.response?.data?.error?.details;
                const fields = ["fullName", "email", "phone", "nationalId", "password"];
                const fieldErrors = Array.isArray(details) ? details.filter((d: { field: string }) => fields.includes(d.field)) : [];
                if (fieldErrors.length > 0) {
                    fieldErrors.forEach((d: { field: string; message: string }) =>
                        setError(d.field as keyof RegisterRequest, { type: "server", message: d.message }));
                    return;
                }
                setError("root", {
                    type: "server",
                    message: getErrorMessages(e).join(" • ")
                });
            }
        });
    }

    return (
        <AuthLayout>
                <form
                    className="w-full max-w-[440px] rounded-[20px] border border-[#EEECF4] bg-white p-8 text-right"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-7">
                        <h1 className="m-0! text-[26px]! font-bold! tracking-normal! text-[#16141F]!">יוצרים חשבון</h1>
                        <div className="mt-1 text-[15px] text-[#6B6880]">כמה פרטים ואפשר לקבוע תור</div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="fullName">שם מלא</label>
                        <input
                            className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                            id="fullName"
                            type="text"
                            placeholder="שם מלא"
                            {...register("fullName", {
                                required: "שם מלא הוא שדה חובה",
                                minLength: { value: 2, message: "השם חייב להכיל לפחות 2 תווים" }
                            })}
                        />
                        {errors.fullName && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.fullName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="email">אימייל</label>
                        <input
                            className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                            id="email"
                            type="email"
                            placeholder="אימייל"
                            {...register("email", {
                                required: "אימייל הוא שדה חובה",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "כתובת מייל לא תקינה" }
                            })}
                        />
                        {errors.email && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4 flex flex-col gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="phone">פלאפון</label>
                            <input
                                className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                                id="phone"
                                type="text"
                                placeholder="פלאפון"
                                {...register("phone", {
                                    required: "פלאפון הוא שדה חובה",
                                    validate: v => isValidPhone(v) || "מספר טלפון לא תקין (לדוגמה 0501234567)"
                                })}
                            />
                            {errors.phone && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="nationalId">ת.ז.</label>
                            <input
                                className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                                id="nationalId"
                                type="text"
                                placeholder="ת.ז."
                                {...register("nationalId", {
                                    required: "ת.ז. היא שדה חובה",
                                    validate: v => isValidNationalId(v) || "מספר תעודת זהות לא תקין"
                                })}
                            />
                            {errors.nationalId && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.nationalId.message}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="password">סיסמה</label>
                        <input
                            className="h-12 w-full rounded-[12px] border border-[#EEECF4] bg-[#FAFAFC] px-4 text-base text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:bg-white focus:ring-4 focus:ring-[#6C4CF4]/10"
                            id="password"
                            type="password"
                            placeholder="סיסמה"
                            {...register("password", {
                                required: "סיסמה היא שדה חובה",
                                minLength: { value: 8, message: "הסיסמה חייבת להכיל לפחות 8 תווים" },
                                validate: v => isStrongPassword(v) || "הסיסמה חייבת להכיל אות באנגלית וספרה"
                            })}
                        />
                        {errors.password && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.password.message}</p>}
                    </div>

                    {errors.root && <p className="mb-4 rounded-[14px] bg-[#FDEDEF] px-4 py-3 text-sm text-[#D23B47]">{errors.root.message}</p>}

                    <button
                        className="mt-2 h-12 w-full cursor-pointer rounded-[12px] bg-[#6C4CF4] text-base font-semibold text-white shadow-[0_4px_12px_rgba(108,76,244,.22)] transition hover:bg-[#5A3DDB] disabled:cursor-not-allowed disabled:opacity-60"
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
