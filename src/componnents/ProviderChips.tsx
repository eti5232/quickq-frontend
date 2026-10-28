import type { ManageProvider } from "../types/manage";

type ProviderChipsProps = {
    providers: ManageProvider[] | undefined;
    selectedId: number | null;
    onSelect: (id: number) => void;
};

const ProviderChips = ({ providers, selectedId, onSelect }: ProviderChipsProps) => {
    return (
        <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {providers?.map(provider => (
                <button key={provider.id}
                    className="group flex min-w-0 items-center gap-3 rounded-[14px] border border-[#EEECF4] bg-white p-2.5 text-right transition hover:border-[#D9D5EA] aria-pressed:border-[#6C4CF4] aria-pressed:bg-[#F4F1FF]"
                    type="button"
                    onClick={() => onSelect(provider.id)}
                    aria-pressed={selectedId === provider.id}
                >
                    <span className={"grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-bold transition group-aria-pressed:bg-[#6C4CF4] group-aria-pressed:text-white " + (provider.isActive ? "bg-[#F4F1FF] text-[#6C4CF4]" : "bg-[#F1F0F6] text-[#A3A0B5]")}>
                        {provider.fullName.replace('ד"ר', "").trim().split(/\s+/).map(word => word[0]).slice(0, 2).join("")}
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold text-[#16141F]">{provider.fullName.replace(/\s+/g, " ")}</span>
                        <span className={"block truncate text-[12px] " + (provider.isActive ? "text-[#A3A0B5]" : "font-semibold text-[#D23B47]")}>{provider.isActive ? (provider.specialty ?? "איש מקצוע") : "מושבת"}</span>
                    </span>
                </button>
            ))}
        </div>)

};

export default ProviderChips
