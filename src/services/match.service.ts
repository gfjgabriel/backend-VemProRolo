import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
import { Not, Repository } from 'typeorm';
import {Match} from "../entities/match.entity";

@Injectable()
export class VehicleService {

  constructor(
    @InjectRepository(Match)
    private repository: Repository<Match>
  ) {}

  async createMatch(dto: VehicleCreateDto) {

  }

}