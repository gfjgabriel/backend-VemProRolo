import {LikeType} from "../../types/like.type";
import {VehicleDto} from "../vehicle/vehicle.dto";
import {UserDto} from "../user/user.dto";

export class LikeDto {
    
    like_id: number;

    matched: boolean;

    type: LikeType;

    user: UserDto;

    vehicle: VehicleDto;

    
}