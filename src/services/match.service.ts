import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
import { Not, Repository } from 'typeorm';
import {Match} from "../entities/match.entity";
import {Like} from "../entities/like.entity";
import {ErrorConstants} from "../utils/error-constants.enum";

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private repository: Repository<Match>
  ) {}

  async createMatch(firstLike: Like, secondLike: Like) {
    let match = new Match();
    match.firstLike = firstLike;
    match.secondLike = secondLike;
    return await this.repository.save(match);
  }

}