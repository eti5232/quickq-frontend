export const appointmentStatusLabel: Record<string, string> = {
    BOOKED: "נקבע",
    ARRIVED: "הגיע",
    IN_PROGRESS: "בטיפול",
    COMPLETED: "הסתיים",
    NO_SHOW: "לא הגיע",
    CANCELLED_BY_CLIENT: "בוטל על ידי הלקוח",
    CANCELLED_BY_CLINIC: "בוטל על ידי הקליניקה",
};

export const categoryLabel: Record<string, string> = {
    DENTAL: "רפואת שיניים",
    GENERAL_MEDICINE: "רפואה כללית",
    PHYSIOTHERAPY: "פיזיותרפיה",
    CONSULTING: "ייעוץ",
    OTHER: "אחר",
};

export const dayStatusLabel: Record<string, string> = {
    NO_SERVICE_TODAY: "אין שירות היום",
    NOT_OPENED: "טרם נפתח",
    OPEN: "פתוח",
    PAUSED: "מושהה",
    CLOSED: "סגור",
};

export const paceLabel: Record<string, string> = {
    FASTER: "מהר מהצפוי",
    ON_TIME: "בזמן",
    SLOWER: "לאט מהצפוי",
};

export const myAppointmentsFilterLabel: Record<string, string> = {
    upcoming: "קרובים",
    past: "עבר",
    cancelled: "בוטלו",
    all: "הכל",
};

export const sortLabel: Record<string, string> = {
    name: "לפי שם",
    nextAvailable: "התור הפנוי הקרוב",
};