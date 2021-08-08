import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Vehicle} from 'src/entities/vehicle.entity';
import {Repository} from 'typeorm';
import {UserService} from './user.service';
import {Like} from "../entities/like.entity";
import {VehicleService} from "./vehicle.service";
import {LikeCreateDto} from "../entities/dtos/like/like-create.dto";
import {User} from "../entities/user.entity";
import {LikeType} from "../entities/types/like.type";

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
    if (dto.type == LikeType.INTERESTED) {
      let likePromise = await this.verifyIfIsAMatch(like.user, like.vehicle);
      if (likePromise != undefined) {
        like.matched = true;
        likePromise.matched = true;
        await this.repository.save(likePromise);
      }
    }
    return this.repository.save(like);
  }

  async verifyIfIsAMatch(currentUser: User, likedVehicle: Vehicle) {
    let likedVehicleOwner = likedVehicle.user;
    let likedVehicleOwnerId = likedVehicleOwner.id;
    let currentUserId = currentUser.id;
    let likes =  await this.repository.find({
      where: {
        user: {
          id: likedVehicleOwnerId
        }
      },
      relations: ['vehicle', 'vehicle.user']
    });
    for (let i = 0;i<likes.length;i++) {
      let like = likes[i];
      if (like.vehicle.user.id == currentUserId) {
        return likes[i];
      }
    }
    return undefined;
  }

}