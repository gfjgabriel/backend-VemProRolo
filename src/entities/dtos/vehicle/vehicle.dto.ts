import {IsEnum} from "class-validator";
import {Category} from "src/entities/types/category.type";
import {FuelType} from "src/entities/types/fuel.type";
import {TransmissionType} from "src/entities/types/transmission.type";
import {ImageCreateDto} from "../image/image-create.dto";
import {ModelDto} from "../model/model.dto";
import {UserDto} from "../user/user.dto";

export class VehicleDto {

    id: number;

    year: number;

    color: string;

    //@IsEnum(FuelType)
    fuelType: FuelType;

    //@IsEnum(TransmissionType)
    transmissionType: TransmissionType;

    //@IsEnum(Category)
    category: Category;

    details: string;

    images: ImageCreateDto[];

    user: UserDto;

    model: ModelDto;
}