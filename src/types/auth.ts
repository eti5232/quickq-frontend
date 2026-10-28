export type Role = 'SUPER_ADMIN' | 'CLINIC_MANAGER' | 'CLIENT';

export interface User {
    id: number
    role: Role
    fullName: string
    email: string | null
    phone: string
    nationalId: string | null
    defaultTravelMinutes: number
    mustChangePassword: boolean
    isActive: boolean
    isRegistered: boolean
    clinicId: number | null
    createdAt: string
};

export interface LoginRequest {
    email: string
    password: string
};

export interface LoginResponse {
    token: string,
    expiresIn: string,
    user: User
};

export interface RegisterRequest {
    fullName: string,
    email: string,
    phone: string,
    nationalId: string,
    password: string,
};

export interface RegisterResponse extends LoginResponse{
    claimedExistingClient: boolean
};

export type UpdateMeRequest = { fullName: string; phone: string; defaultTravelMinutes: number };


