import {Model} from "src/entities/model.entity";
import {ImageCreateDto} from "../image/image-create.dto";
import {UserDto} from "../user/user.dto";

export class VehicleCreateDto {

    brand: string;

    year: number;

    color: string;

    model: Model;

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

    price: number;

    isToLike: Boolean;

    isForSale: Boolean;

}