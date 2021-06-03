import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthorizerGuard } from '../auth/guards/cognito.guard'
import { VehicleFacade } from 'src/facade/vehicle.facade';
import { VehicleDto } from 'src/entities/dtos/vehicle/vehicle.dto';
import { VehicleUpdateDto } from 'src/entities/dtos/vehicle/vehicle-update.dto';
import { VehicleCreateDto } from 'src/entities/dtos/vehicle/vehicle-create.dto';
@Controller('vehicles')
@UseGuards(AuthorizerGuard)
export class VehicleController {
  constructor(private readonly facade: VehicleFacade) {}

  @Post()
  create(@Body() dto: VehicleCreateDto) {
    return this.facade.createVehicle(dto);
  }

  @Put()
  update(@Body() dto: VehicleUpdateDto) {
    return this.facade.updateVehicle(dto);
  }

  @Get('current-user')
  getAllVehiclesCurrentUser() {
    return this.facade.getAllVehiclesCurrentUser();
  }

  @Get('to-like')
  getAllVehiclesToLike() {
    return this.facade.getAllVehiclesToLike();
  }

  @Get()
  getAll() {
    return this.facade.getAll();
  }

}
