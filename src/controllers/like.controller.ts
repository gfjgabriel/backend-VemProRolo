import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthorizerGuard } from '../auth/guards/cognito.guard'
import { VehicleFacade } from 'src/facade/vehicle.facade';
import { VehicleDto } from 'src/entities/dtos/vehicle/vehicle.dto';
import { VehicleUpdateDto } from 'src/entities/dtos/vehicle/vehicle-update.dto';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
import {LikeCreateDto} from "../entities/dtos/like/like-create.dto";
import {LikeFacade} from "../facade/like.facade";
@Controller('likes')
@UseGuards(AuthorizerGuard)
export class LikeController {
  constructor(private readonly facade: LikeFacade) {}

  @Post()
  create(@Body() dto: LikeCreateDto) {
    return this.facade.createLike(dto);
  }

}
