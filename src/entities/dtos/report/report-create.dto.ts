import {IsEnum} from "class-validator";
import {Model} from "src/entities/model.entity";
import {Category} from "src/entities/types/category.type";
import {FuelType} from "src/entities/types/fuel.type";
import {TransmissionType} from "src/entities/types/transmission.type";
import {ImageCreateDto} from "../image/image-create.dto";
import {UserDto} from "../user/user.dto";
import {VehicleDto} from "../vehicle/vehicle.dto";

export class ReportCreateDto {

    description: string;

    user: UserDto;

    vehicle: VehicleDto;

}