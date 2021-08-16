import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelController } from 'src/controllers/model.controller';
import { Model } from 'src/entities/model.entity';
import { ModelService } from 'src/services/model.service';
import { ModelFacade } from 'src/facade/model.facade';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelService, ModelFacade],
  controllers: [ModelController],
  exports: [TypeOrmModule.forFeature([Model]), ModelService]
})
export class ModelModule {}