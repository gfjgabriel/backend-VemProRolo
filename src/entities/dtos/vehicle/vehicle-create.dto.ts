import { Category } from "aws-sdk/clients/signer";
import { FuelType } from "src/entities/types/fuel.type";
import { TransmissionType } from "src/entities/types/transmission.type";
import { ImageCreateDto } from "../image/image-create.dto";

export class VehicleCreateDto {
    
    brand: string;

    year: number;

    color: string;

    model: string;

    fuelType: FuelType;

    transmissionType: TransmissionType; 

    category: Category;

    details: string;

    images: ImageCreateDto[];
    
}