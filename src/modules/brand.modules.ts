import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from 'src/controllers/brand.controller';
import { Brand } from 'src/entities/brand.entity';
import { BrandService } from 'src/services/brand.service';
import { BrandFacade } from 'src/facade/brand.facade';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, BrandFacade],
  controllers: [BrandController],
  exports: [TypeOrmModule.forFeature([Brand]), BrandService]
})
export class BrandModule {}