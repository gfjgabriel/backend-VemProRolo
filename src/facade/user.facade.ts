import { Injectable } from "@nestjs/common";
import { GetUserResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { plainToClass } from "class-transformer";
import { AuthDto } from "src/entities/dtos/auth/auth.dto";
import { UserCreateDto } from "src/entities/dtos/user/create-user.dto";
import { UserDto } from "src/entities/dtos/user/user.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";

@Injectable()
export class UserFacade {
    constructor(private readonly userService: UserService) {}

    findOneByEmailAndPassword(authDto: AuthDto) {
        return this.userService.findOneByEmailAndPassword(authDto)
        .then(it => plainToClass(UserDto, it));
    }

    findAll(): Promise<UserDto[]> {
        return this.userService.findAll()
        .then(it => it.map(item => plainToClass(UserDto, item)));
    }

    create(dto: AuthDto): Promise<UserDto> {
        return this.userService.createUser(dto)
        .then(it => plainToClass(UserDto, it));
    }

    getCurrentUser(): GetUserResponse {
        return this.userService.getCurrentUser();
    }

}