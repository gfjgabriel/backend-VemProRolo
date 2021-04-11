import { Exclude,  } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";


export class UserCreateDto {
    
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
    phone: string;
    
}