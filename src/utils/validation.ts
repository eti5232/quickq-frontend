export const isValidPhone = (value: string) => /^(\+972|0)\d{8,9}$/.test(value.replace(/[\s-]/g, ""));

export const isStrongPassword = (value: string) => /[A-Za-z]/.test(value) && /\d/.test(value);

export const isValidNationalId = (value: string) => {
    const id = value.trim().padStart(9, "0");
    if (!/^\d{9}$/.test(id))
        return false;
    const sum = [...id].reduce((acc, ch, i) => {
        const n = Number(ch) * (i % 2 === 0 ? 1 : 2);
        return acc + (n > 9 ? n - 9 : n);
    }, 0);
    return sum % 10 === 0;
};
