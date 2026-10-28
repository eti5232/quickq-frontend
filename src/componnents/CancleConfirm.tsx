type CancelAppointmentProps = {
    onConfirm: () => void;
    onClose: () => void;
    isPending: boolean;
    title: string;
    message: string;
    cancelText: string;
    confirmText: string;
};

const CancleConfirm = ({ onConfirm, onClose, isPending, title, message, cancelText, confirmText }: CancelAppointmentProps) => {
    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#16141F]/45 p-4 backdrop-blur-sm" dir="rtl">
            <div className="w-full max-w-sm rounded-[28px] border border-[#EEECF4] bg-white p-7 text-center shadow-[0_24px_60px_rgba(30,20,80,.25)]">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#FDEDEF] text-[#D23B47]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 9v4M12 17h.01" />
                        <path d="M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3l-7.9-13.7a2 2 0 0 0-3.4 0z" />
                    </svg>
                </div>
                <h2 className="mb-2! mt-0! text-[22px]! font-bold! tracking-normal! text-[#16141F]!">{title}</h2>

                <p className="text-[15px] leading-relaxed text-[#6B6880]">{message}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        className="h-12 cursor-pointer rounded-[14px] border border-[#EEECF4] bg-white text-[15px] font-semibold text-[#2B2937] transition hover:border-[#6C4CF4] hover:text-[#6C4CF4] disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="h-12 cursor-pointer rounded-[14px] bg-[#D23B47] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(210,59,71,.28)] transition hover:bg-[#BC2F3B] disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={onConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "מעדכן..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CancleConfirm
