import { Controller, Get, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserCreateDto } from 'src/entities/dtos/user/create-user.dto';
import { UserDto } from 'src/entities/dtos/user/user.dto';
import { UserFacade } from 'src/facade/user.facade';
import { AuthDto } from 'src/entities/dtos/auth/auth.dto';
import { AuthorizerGuard } from '../auth/guards/cognito.guard'
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { UserUpdateDto } from 'src/entities/dtos/user/update-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Get()
  @UseGuards(AuthorizerGuard)
  getAllUsers(): Promise<UserDto[]> {
    return this.userFacade.findAll();
  }

  @Post('auth')
  getUser(@Body() authDto: AuthDto): Promise<UserDto> {
    return this.userFacade.findOneByEmailAndPassword(authDto);
  }

  @Post()
  createUser(@Body() dto: UserCreateDto): Promise<UserDto> {
    return this.userFacade.create(dto);
  }

  @Put()
  @UseGuards(AuthorizerGuard)
  updateUser(@Body() dto: UserUpdateDto): Promise<UserDto> {
    return this.userFacade.update(dto);
  }

  @Get('current')
  @UseGuards(AuthorizerGuard)
  getCurrentUser(): Promise<UserDto> {
    return this.userFacade.getCurrentUser();
  }

}
