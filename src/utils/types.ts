export type CreateUserType = {
    username: string;
    email: string; 
    password: string;
    role: string
}

export type ValidateUserType = {
    email: string; 
    password: string;
    role: string
}

