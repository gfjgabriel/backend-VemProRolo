import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

@Injectable()
export class VehicleService {
  
  constructor(
    @InjectRepository(Vehicle)
    private repository: Repository<Vehicle>,
    private readonly userService: UserService
  ) {}

  async createVehicle(dto: VehicleCreateDto) {
    let currentUser = await this.userService.getCurrentUser();
    let vehicle = plainToClass(Vehicle, dto);
    vehicle.user = currentUser;
    return this.repository.save(vehicle);
  }

}