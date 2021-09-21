import { IsEnum, IsNotEmpty } from "class-validator";
import { Category } from "src/entities/types/category.type";
import { FuelType } from "src/entities/types/fuel.type";
import { TransmissionType } from "src/entities/types/transmission.type";
import { ImageCreateDto } from "../image/image-create.dto";
import { ModelDto } from "../model/model.dto";

export class VehicleUpdateDto {
    
    @IsNotEmpty()
    id: number;

    brand: string;

    year: number;

    color: string;

    model: ModelDto;

    //@IsEnum(FuelType)
    fuelType: string;

    //@IsEnum(TransmissionType)
    transmissionType: string; 

    //@IsEnum(Category)
    category: string;

    details: string;

    images: ImageCreateDto[];

    doorsNumber: number;
    
    kilometers: number;

    price: number;

    isToLike: boolean;

    isForSale: boolean;
    
}