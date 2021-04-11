import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserCreateDto } from "src/dtos/user/create-user.dto";
import { UserDto } from "src/dtos/user/user.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";

@Injectable()
export class UserFacade {
    constructor(private readonly userService: UserService) {}

    create(userCreateDto: UserCreateDto): Promise<UserDto> {
        return this.userService.create(userCreateDto)
        .then(it => plainToClass(UserDto, it));
    }

}