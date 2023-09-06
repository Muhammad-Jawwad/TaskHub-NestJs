import { IsEmail, IsNotEmpty, IsString, MinLength,  } from "class-validator";

export class authDTO {

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}

