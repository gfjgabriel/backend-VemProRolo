import { Exclude,  } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";


export class UserUpdateDto {
    
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    phone: string;
    
}