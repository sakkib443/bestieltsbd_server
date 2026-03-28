export interface IUser {
    name: string;
    email: string;
    phone?: string;
    nid?: string;
    password: string;
    role: "user" | "admin" | "super-admin";
    googleId?: string;
    picture?: string;
    authProvider?: "local" | "google";
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}
