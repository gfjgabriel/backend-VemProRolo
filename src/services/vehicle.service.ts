import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from 'src/entities/dtos/user/user.dto';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
import { VehicleUpdateDto } from 'src/entities/dtos/vehicle/vehicle-update.dto';
import { Image } from 'src/entities/image.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { ErrorConstants } from 'src/utils/error-constants.enum';
import {getManager, Not, Repository} from 'typeorm';
import { ImageService } from './image.service';
import { UserService } from './user.service';
import {MatchService} from "./match.service";
import { Model } from 'src/entities/model.entity';

@Injectable()
export class VehicleService {
  
  constructor(
    @InjectRepository(Vehicle)
    private repository: Repository<Vehicle>,
    private readonly userService: UserService,
    private readonly imageService: ImageService
  ) {}

  async createVehicle(dto: VehicleCreateDto) {
    let currentUser = await this.userService.getCurrentUser();
    let user = plainToClass(UserDto, currentUser);
    dto.user = user;
    return this.repository.save(dto);
  }

  async updateVehicle(dto: VehicleUpdateDto) {
    const { id } = dto;
    return await this.findOne(id)
    .then(vehicle => {
      vehicle.model = plainToClass(Model,dto.model);

      vehicle.year = dto.year;
      vehicle.transmissionType = dto.transmissionType;
      vehicle.color = dto.color;
      vehicle.fuelType = dto.fuelType;
      vehicle.details = dto.details;
      vehicle.doorsNumber = dto.doorsNumber;
      vehicle.category = dto.category;
      vehicle.kilometers = dto.kilometers;
      vehicle.isForSale = dto.isForSale;
      vehicle.isToLike = dto.isToLike;
      vehicle.price = dto.price;

      let oldImages = vehicle.images;
      let newImages = dto.images.map(it => plainToClass(Image, it)).filter(it => it.id != null).map(it => it.id);

      let difference = oldImages.map(it => it.id).filter(x => !newImages.includes(x));
      difference
          .forEach(it => {
            this.imageService.deleteImage(it);
          });

      vehicle.images = dto.images.filter(it => it.file != undefined && it.file != "").map(it => plainToClass(Image, it));

      return this.repository.save(vehicle);
    })
    .catch(
      () => {throw new HttpException(ErrorConstants.VEHICLE_NOT_FOUND, HttpStatus.NOT_FOUND);}
    );
  }

  async getAllVehiclesCurrentUser() {
    let user = await this.userService.getCurrentUser();
    let userId = user.id;
    return await this.repository.find({
      where: {user: {
        id: userId
      }},
      relations: ['images', 'model', 'model.brand']});
  }

  async getAllVehiclesToLike(brandId: number, modelId:number ): Promise<Vehicle[]> {

    let user = await this.userService.getCurrentUser();
    let userId = user.id;
    let rawIds = await this.repository.createQueryBuilder("vehicle")
        .select('vehicle.id', 'id')
        .leftJoin("vehicle.likes", "like")
        .leftJoin("like.user", "likeUser")
        .where("likeUser.id = :currentUserId", {currentUserId: userId})
        .getRawMany();
    let ids = rawIds.map(it => it.id);
    if (ids.length === 0) {
      ids.push(0);
    }
    let whereString = "vehicleUser.id != :currentUserId and vehicle.id NOT IN (:ids)"
    if (modelId != null) {
      whereString += " AND model.id = " + modelId
    }
    if (brandId != null) {
      whereString += " AND brand.id = " + brandId
    }

    let vehicles =  await this.repository.createQueryBuilder("vehicle")
        .leftJoinAndSelect("vehicle.likes", "like")
        .leftJoinAndSelect("vehicle.user", "vehicleUser")
        .leftJoinAndSelect("like.user", "likeUser")
        .leftJoinAndSelect("vehicle.images", "images")
        .leftJoinAndSelect("vehicle.model","model")
        .leftJoinAndSelect("model.brand","brand")
        .where(whereString, {currentUserId: userId, ids: ids})
        .getMany();
    return vehicles;
  }

  async getAllBrands() {
    
  }

  async getAllModels(brandId: number) {
    
  }

  getAll() {
    return this.repository.find();
  }

  async findOne(vehicleId: number): Promise<Vehicle> {
      return (await this.repository.findOne({
        where: {
          id: vehicleId
        },
        relations: ['images', 'user']}));
  }

  delete(vehicleId: number): void {
    this.repository.delete(vehicleId)
    .catch(error => console.log(error));
  }

}