import {LikeType} from "../../types/like.type";
import {VehicleIdDto} from "../vehicle/vehicle-id.dto";

export class LikeCreateDto {

    type: LikeType;

    vehicle: VehicleIdDto;

}