import type { Clinic } from "../types/clinic"

type ClinicFilters = {
    ProviderName?: string;
    city?: string;
    category?: string;
    isOpenNow?: boolean;
};

const FilterClinics = (clinics: Clinic[], filters: ClinicFilters)
    : Clinic[] => {
    return clinics.filter((clinic) => {
        (!filters.city||
            clinic.city.toLowerCase().includes(filters.city.trim().toLowerCase()))   
    })

}

export default FilterClinics

// import type { Clinic } from "../types/clinic";

// type ClinicFilters = {
//     city?: string;
//     category?: string;
//     isOpenNow?: boolean;
// };

// export const filterClinics = (
//     clinics: Clinic[],
//     filters: ClinicFilters
// ): Clinic[] => {
//     return clinics.filter((clinic) =>
//         (!filters.city ||
//             clinic.city.toLowerCase().includes(filters.city.trim().toLowerCase())) &&
//         (!filters.category ||
//             clinic.category === filters.category) &&
//         (filters.isOpenNow === undefined ||
//             clinic.isOpenNow === filters.isOpenNow)
//     );
// };