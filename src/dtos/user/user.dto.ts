import { Exclude,  } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    
    name: string;
    
    email: string;

    @Exclude()
    password: string;
    
    phone: string;
    
}