import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { ImageService } from 'src/services/image.service';
import { ImageFacade } from 'src/facade/image.facade';
import { ImageController } from 'src/controllers/image.controller';
import { VehicleModule } from './vehicle.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService, ImageFacade],
  controllers: [ImageController],
  exports: [TypeOrmModule.forFeature([Image]), ImageService]
})
export class ImageModule {}