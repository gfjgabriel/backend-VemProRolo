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
import {MatchModule} from "./match.module";
import {SubscriptionModule} from "./subscription.module";

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UserModule, VehicleModule, MatchModule, SubscriptionModule],
  providers: [LikeService, LikeFacade],
  controllers: [LikeController],
  exports: [TypeOrmModule.forFeature([Like]), LikeService]
})
export class LikeModule {}