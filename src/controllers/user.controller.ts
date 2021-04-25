import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserCreateDto } from 'src/entities/dtos/user/create-user.dto';
import { UserDto } from 'src/entities/dtos/user/user.dto';
import { UserFacade } from 'src/facade/user.facade';
import { AuthDto } from 'src/entities/dtos/user/auth.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  getAllUsers(): Promise<UserDto[]> {
    return this.userFacade.findAll();
  }

  @Post('auth')
  getUser(@Body() authDto: AuthDto): Promise<UserDto> {
    return this.userFacade.findOneByEmailAndPassword(authDto);
  }

  @Post()
  createUser(@Body() userCreateDto: UserCreateDto): Promise<UserDto> {
    return this.userFacade.create(userCreateDto);
  }

}
