import {LikeType} from "../../types/like.type";
import {VehicleIdDto} from "../vehicle/vehicle-id.dto";

export class LikeCreateDto {
    
    like_id: number;

    type: LikeType;

    vehicle: VehicleIdDto;

    
}