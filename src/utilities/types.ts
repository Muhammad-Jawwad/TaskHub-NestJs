import { UserRole } from "src/typeorm/entities/User";

export type CreateUserType = {
    username: string;
    email: string; 
    password: string;
    role: UserRole
}

export type ValidateUserType = {
    email: string; 
    password: string;
    role: UserRole
}

