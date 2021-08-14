import {LikeType} from "../../types/like.type";
import {VehicleDto} from "../vehicle/vehicle.dto";
import {UserDto} from "../user/user.dto";
import {Like} from "../../like.entity";
import {LikeDto} from "../like/like.dto";

export class MatchDto {
    
    match_id: number;

    firstLike: LikeDto;

    secondLike: LikeDto;
    
}