import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/entities/dtos/user/user.dto";
import { VehicleCreateDto } from "src/entities/dtos/vehicle/vehicle-create.dto";
import { VehicleUpdateDto } from "src/entities/dtos/vehicle/vehicle-update.dto";
import { VehicleDto } from "src/entities/dtos/vehicle/vehicle.dto";
import { VehicleService } from "src/services/vehicle.service";
import {LikeCreateDto} from "../entities/dtos/like/like-create.dto";
import {LikeService} from "../services/like.service";
import {LikeDto} from "../entities/dtos/like/like.dto";
import {VehicleFacade} from "./vehicle.facade";

@Injectable()
export class LikeFacade {
    constructor(private readonly likeService: LikeService) {}

    createLike(dto: LikeCreateDto) {
        return this.likeService.createLike(dto)
        .then(it => {
            const likeDto = plainToClass(LikeDto, it);
            likeDto.user = plainToClass(UserDto, it.user);
            likeDto.vehicle = plainToClass(VehicleDto, it.vehicle);
            return likeDto;
        });
    }

}