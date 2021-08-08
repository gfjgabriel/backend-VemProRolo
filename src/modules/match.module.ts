import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from 'src/services/vehicle.service';
import { VehicleFacade } from 'src/facade/vehicle.facade';
import { VehicleController } from 'src/controllers/vehicle.controller';
import { Vehicle } from 'src/entities/vehicle.entity';
import { UserModule } from './user.module';
import { ImageModule } from './image.module';
import {Like} from "../entities/like.entity";
import {LikeService} from "../services/like.service";
import {LikeFacade} from "../facade/like.facade";
import {LikeController} from "../controllers/like.controller";
import {VehicleModule} from "./vehicle.module";
import {Match} from "../entities/match.entity";
import {MatchService} from "../services/match.service";

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
  controllers: [],
  exports: [TypeOrmModule.forFeature([Match]), MatchService]
})
export class MatchModule {}