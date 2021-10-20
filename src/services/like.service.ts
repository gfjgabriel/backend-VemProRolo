import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Vehicle} from 'src/entities/vehicle.entity';
import {Between, Equal, Like as LikeTypeorm, Repository, MoreThan} from 'typeorm';
import {UserService} from './user.service';
import {Like} from "../entities/like.entity";
import {VehicleService} from "./vehicle.service";
import {LikeCreateDto} from "../entities/dtos/like/like-create.dto";
import {User} from "../entities/user.entity";
import {LikeType} from "../entities/types/like.type";
import {MatchService} from "./match.service";
import {ErrorConstants} from "../utils/error-constants.enum";
import {SubscriptionService} from "./subscription.service";

@Injectable()
export class LikeService {

  constructor(
      @InjectRepository(Like)
      private repository: Repository<Like>,
      private readonly userService: UserService,
      private readonly vehicleService: VehicleService,
      private readonly matchService: MatchService,
      private readonly subscriptionService: SubscriptionService,
  ) {}

  async createLike(dto: LikeCreateDto) {
    let userCanLike = await this.checkIfUserCanLike();
    if (dto.type == LikeType.INTERESTED && !userCanLike) {
      throw new HttpException(ErrorConstants.LIKE_LIMIT_REACHED, HttpStatus.FORBIDDEN);
    }
    let like = new Like();
    like.user = await this.userService.getCurrentUser();
    like.vehicle = await this.vehicleService.findOne(dto.vehicle.id);

    await this.verifyIfLikeExists(like.user.id, like.vehicle.id);

    like.type = dto.type;
    like.matched = false;

    if (dto.type == LikeType.INTERESTED) {
      let likePromise = await this.verifyIfIsAMatch(like.user, like.vehicle);

      if (likePromise != undefined) {
        like.matched = true;
        likePromise.matched = true;
        await this.repository.save(likePromise);

        let newLike = await this.repository.save(like);
        await this.matchService.createMatch(likePromise, newLike);

        return newLike;
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

  async verifyIfLikeExists(currentUserId: number, likedVehicleId: number) {
    await this.repository.findOne({
      vehicle: {
        id: likedVehicleId
      },
      user: {
        id: currentUserId
      }
    })
        .then(it => {
          if (it != undefined) {
            throw new HttpException(ErrorConstants.LIKE_HAS_ALREADY_BEEN_COMPUTED, HttpStatus.BAD_REQUEST);
          }
        });
  }

  async countNumberOfLikesFromToday() {
    let user = await this.userService.getCurrentUser();
    let currentUserId = user.id;
    let oneDayFromNow = new Date(new Date().setDate(new Date().getDate()-1));

    return this.repository.count({
      user: {
        id: currentUserId
      },
      type: Equal(LikeType.INTERESTED),
      createdDate: MoreThan(oneDayFromNow)
    })
  }

  async checkIfUserCanLike() {
    let userHasAnActiveSubscription = await this.subscriptionService.checkIfUserHasAnActiveSubscription();
    if (userHasAnActiveSubscription) {
        return true;
    }

    let count = await this.countNumberOfLikesFromToday();
    return count < 3;
  }

  async deleteLike(like_id: number) {
    await this.repository.delete({like_id})
  }

}