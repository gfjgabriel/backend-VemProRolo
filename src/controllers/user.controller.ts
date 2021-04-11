import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserCreateDto } from 'src/dtos/user/create-user.dto';
import { UserDto } from 'src/dtos/user/user.dto';
import { UserFacade } from 'src/facade/user.facade';

@Controller('users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  /*@Get()
  getAllUsers(): Promise<User[]> {
    return this.userFacade.findAll();
  }*/

  @Post()
  createUser(@Body() userCreateDto: UserCreateDto): Promise<UserDto> {
    return this.userFacade.create(userCreateDto);
  }

}
