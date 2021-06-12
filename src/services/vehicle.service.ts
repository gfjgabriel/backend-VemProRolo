import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from 'src/entities/dtos/user/user.dto';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
import { VehicleUpdateDto } from 'src/entities/dtos/vehicle/vehicle-update.dto';
import { Vehicle } from 'src/entities/vehicle.entity';
import { ErrorConstants } from 'src/utils/error-constants.enum';
import { Not, Repository } from 'typeorm';
import { UserService } from './user.service';

@Injectable()
export class VehicleService {
  
  constructor(
    @InjectRepository(Vehicle)
    private repository: Repository<Vehicle>,
    private readonly userService: UserService,
  ) {}

  async createVehicle(dto: VehicleCreateDto) {
    let currentUser = await this.userService.getCurrentUser();
    let user = plainToClass(UserDto, currentUser);
    dto.user = user;
    return this.repository.save(dto);
  }

  async updateVehicle(dto: VehicleUpdateDto) {
    const { id } = dto;
    await this.repository.findOne({
      where: {
        id
      }
    }).catch(
      () => {throw new HttpException(ErrorConstants.VEHICLE_NOT_FOUND, HttpStatus.NOT_FOUND);}
    );
    return this.repository.save(dto);
  }

  async getAllVehiclesCurrentUser() {
    let user = await this.userService.getCurrentUser();
    let userId = user.id;
    return (await this.repository.find({
      where: {user: {
        id: userId
      }}, 
      relations: ['images']}));
  }

  async getAllVehiclesToLike() {
    let user = await this.userService.getCurrentUser();
    let userId = user.id;
    return (await this.repository.find({
      where: {user: {
        id: Not(userId)
      }}, 
      relations: ['images']}));
  }

  getAll() {
    return this.repository.find();
  }

}