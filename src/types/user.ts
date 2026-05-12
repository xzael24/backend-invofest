export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    bio: string;
    event: string;
    createdAt: Date;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    bio: string;
    event: string;
}
