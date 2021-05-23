import { Injectable } from "@nestjs/common";
import { GetUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { plainToClass } from "class-transformer";
import { AuthDto } from "src/entities/dtos/auth/auth.dto";
import { UserCreateDto } from "src/entities/dtos/user/create-user.dto";
import { UserDto } from "src/entities/dtos/user/user.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";
import { VehicleService } from "src/services/vehicle.service";

@Injectable()
export class VehicleFacade {
    constructor(private readonly vehicleService: VehicleService) {}

}