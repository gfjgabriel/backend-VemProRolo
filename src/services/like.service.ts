import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {VehicleUpdateDto} from 'src/entities/dtos/vehicle/vehicle-update.dto';
import {Image} from 'src/entities/image.entity';
import {Vehicle} from 'src/entities/vehicle.entity';
import {ErrorConstants} from 'src/utils/error-constants.enum';
import {Not, Repository} from 'typeorm';
import {UserService} from './user.service';
import {Like} from "../entities/like.entity";
import {VehicleService} from "./vehicle.service";
import {LikeCreateDto} from "../entities/dtos/like/like-create.dto";

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like)
    private repository: Repository<Like>,
    private readonly userService: UserService,
    private readonly vehicleService: VehicleService
  ) {}

  async createLike(dto: LikeCreateDto) {
    let like = new Like();
    like.user = await this.userService.getCurrentUser();
    like.vehicle = await this.vehicleService.findOne(dto.vehicle.id);
    like.type = dto.type;
    like.matched = false;
    return this.repository.save(like);
  }

  async updateVehicle(dto: VehicleUpdateDto) {
    const { id } = dto;
    return await this.repository.findOne(id)
    .then(vehicle => {
      console.log(vehicle.id);
      vehicle.brand = dto.brand;
      vehicle.model = dto.model;
      vehicle.year = dto.year;
      vehicle.transmissionType = dto.transmissionType;
      vehicle.color = dto.color;
      vehicle.fuelType = dto.fuelType;
      vehicle.details = dto.details;
      vehicle.doorsNumber = dto.doorsNumber;
      vehicle.category = dto.category;
      vehicle.kilometers = dto.kilometers;
      vehicle.images = dto.images.map(it => plainToClass(Image, it));
      return this.repository.save(vehicle);
    })
    .catch(
      () => {throw new HttpException(ErrorConstants.VEHICLE_NOT_FOUND, HttpStatus.NOT_FOUND);}
    );
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

  async findOne(vehicleId: number): Promise<Vehicle> {
      return (await this.repository.findOne({
        where: {
          id: vehicleId
        },
        relations: ['images']}));
  }

  delete(vehicleId: number): void {
    this.repository.delete(vehicleId)
    .catch(error => console.log(error));
  }

}