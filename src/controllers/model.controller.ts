import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ModelFacade } from 'src/facade/model.facade';

@Controller('models')
export class ModelController {
  constructor(private readonly facade: ModelFacade) {}

  @Get('allModels')
  getAllModels(){
    return this.facade.getAllModels();
  }

  
}
