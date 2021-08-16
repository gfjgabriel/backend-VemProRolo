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
import {MatchService} from "../services/match.service";
import {MatchDto} from "../entities/dtos/match/match.dto";

@Injectable()
export class MatchFacade {
    constructor(private matchService : MatchService) {}

    getAllCurrentUserMatches() {
        return this.matchService.getAllMatches()
        .then(it => {
            return plainToClass(MatchDto, it);
        });
    }

    deleteMatch(match_id: string) {
        this.matchService.deleteMatch(match_id);
    }

}