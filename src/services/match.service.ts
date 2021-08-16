import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Match} from "../entities/match.entity";
import {Like} from "../entities/like.entity";
import {UserService} from "./user.service";
import {LikeService} from "./like.service";

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private repository: Repository<Match>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private readonly userService: UserService
  ) {}

  async createMatch(firstLike: Like, secondLike: Like) {
    let match = new Match();
    match.firstLike = firstLike;
    match.secondLike = secondLike;
    return await this.repository.save(match);
  }

  async getAllMatches() {
    let currentUser = await this.userService.getCurrentUser();
    const currentUserId = currentUser.id;
    console.log(currentUserId);
    return this.repository.createQueryBuilder("match")
        .leftJoinAndSelect("match.firstLike", "firstLike")
        .leftJoinAndSelect("match.secondLike", "secondLike")
        .leftJoinAndSelect("firstLike.user", "firstLikeUser")
        .leftJoinAndSelect("secondLike.user", "secondLikeUser")
        .leftJoinAndSelect("firstLike.vehicle", "firstLikeVehicle")
        .leftJoinAndSelect("secondLike.vehicle", "secondLikeVehicle")
        .where("secondLikeUser.id = :currentUserId or firstLikeUser.id = :currentUserId", {currentUserId: currentUserId})
        .getMany();
  }

  async deleteMatch(match_id: string) {
    let match = await this.repository.findOne({
      where: {
        match_id
      },
      relations: ['firstLike', 'secondLike']
    });

    let matchFirstLikeResult = await this.repository.createQueryBuilder("match")
        .leftJoinAndSelect("match.firstLike", "firstLike")
        .leftJoinAndSelect("match.secondLike", "secondLike")
        .where("secondLike.like_id = :likeId or firstLike.like_id = :likeId", {likeId: match.firstLike.like_id})
        .getMany();

    let matchSecondLikeResult = await this.repository.createQueryBuilder("match")
        .leftJoinAndSelect("match.firstLike", "firstLike")
        .leftJoinAndSelect("match.secondLike", "secondLike")
        .where("secondLike.like_id = :likeId or firstLike.like_id = :likeId", {likeId: match.secondLike.like_id})
        .getMany();

    if (matchFirstLikeResult.length == 1) {
      await this.likeRepository.delete({like_id: match.firstLike.like_id});
    }

    if (matchSecondLikeResult.length == 1) {
      await this.likeRepository.delete({like_id: match.secondLike.like_id});
    }

    await this.repository.delete(match.match_id);

  }

}