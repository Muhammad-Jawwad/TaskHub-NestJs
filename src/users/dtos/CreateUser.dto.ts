import { IsEmail, IsNotEmpty, IsString, MinLength,  } from "class-validator";

export class createUserDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsEmail()
    // @EmailNotRegistered({ message: 'email already registered' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}

