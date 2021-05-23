import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from 'src/services/vehicle.service';
import { VehicleFacade } from 'src/facade/vehicle.facade';
import { VehicleController } from 'src/controllers/vehicle.controller';
import { Vehicle } from 'src/entities/vehicle.entity';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), UserModule],
  providers: [VehicleService, VehicleFacade],
  controllers: [VehicleController],
  exports: [TypeOrmModule.forFeature([Vehicle]), VehicleService]
})
export class VehicleModule {}