import { IsEnum } from "class-validator";
import { Category } from "src/entities/types/category.type";
import { FuelType } from "src/entities/types/fuel.type";
import { TransmissionType } from "src/entities/types/transmission.type";
import { ImageCreateDto } from "../image/image-create.dto";

export class VehicleCreateDto {
    
    brand: string;

    year: number;

    color: string;

    model: string;

    @IsEnum(FuelType)
    fuelType: FuelType;

    @IsEnum(TransmissionType)
    transmissionType: TransmissionType; 

    @IsEnum(Category)
    category: Category;

    details: string;

    images: ImageCreateDto[];
    
}