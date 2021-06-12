import { IsEnum } from "class-validator";
import { Category } from "src/entities/types/category.type";
import { FuelType } from "src/entities/types/fuel.type";
import { TransmissionType } from "src/entities/types/transmission.type";
import { ImageCreateDto } from "../image/image-create.dto";
import { UserDto } from "../user/user.dto";

export class VehicleCreateDto {
    
    brand: string;

    year: number;

    color: string;

    model: string;

    //@IsEnum(FuelType)
    fuelType: string;

    //@IsEnum(TransmissionType)
    transmissionType: string; 

    //@IsEnum(Category)
    category: string;

    details: string;

    doorsNumber: number;

    kilometers: number;

    images: ImageCreateDto[];

    user: UserDto;
    
}