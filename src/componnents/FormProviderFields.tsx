import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProviderFormValues } from "../types/manage";


type FormProviderProps = {
    register: UseFormRegister<ProviderFormValues>;
    errors: FieldErrors<ProviderFormValues>;
};

const FormProviderFields = ({ register, errors }: FormProviderProps) => {
    return (<>
        <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="provider">שם איש המקצוע</label>
            <input
                className="h-12 w-full rounded-[12px] border border-[#E3E0EE] bg-white px-4 text-[15px] text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10"
                placeholder="שם איש המקצוע"
                id="provider"
                {...register("fullName", {
                    minLength: {
                        value: 2,
                        message: "השם חייב להכיל לפחות 2 תווים"
                    },
                    maxLength: {
                        value: 100,
                        message: "השם יכול להכיל עד 100 תווים"
                    },
                    required: "שם איש המקצוע הינו שדה חובה"
                })}
            />
            {errors.fullName && <p className="mt-1.5 text-sm text-[#D23B47]">{errors.fullName.message}</p>}
        </div>

        <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="specialty">התמחות</label>
            <input
                className="h-12 w-full rounded-[12px] border border-[#E3E0EE] bg-white px-4 text-[15px] text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10"
                placeholder="לדוגמא: רפואת ילדים..."
                id="specialty"
                {...register("specialty")}
            />
        </div>

        <div>
            <label className="mb-1.5 block text-sm font-medium text-[#2B2937]" htmlFor="slotMinutes">משך התור</label>
            <input
                className="h-12 w-full rounded-[12px] border border-[#E3E0EE] bg-white px-4 text-[15px] text-[#2B2937] outline-none transition placeholder:text-[#A3A0B5] focus:border-[#6C4CF4] focus:ring-4 focus:ring-[#6C4CF4]/10"
                type="number"
                placeholder="משך התור"
                id="slotMinutes"
                {...register("slotMinutes", {
                    min: {
                        value: 5,
                        message: "התור חייב להיות מינימום 5 דקות"
                    },
                    max: {
                        value: 120,
                        message: "התור חייב להיות מקסימום 120 דקות"
                    },
                    valueAsNumber: true
                })}
            />
            <div className="mt-1.5 text-[13px] text-[#A3A0B5]">בדקות, בין 5 ל-120</div>
            {errors.slotMinutes && <p className="mt-1 text-sm text-[#D23B47]">{errors.slotMinutes.message}</p>}
        </div></>);

};

export default FormProviderFields