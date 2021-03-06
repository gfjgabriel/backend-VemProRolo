import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {AuthorizerGuard} from '../auth/guards/cognito.guard'
import {VehicleFacade} from 'src/facade/vehicle.facade';
import {VehicleDto} from 'src/entities/dtos/vehicle/vehicle.dto';
import {VehicleUpdateDto} from 'src/entities/dtos/vehicle/vehicle-update.dto';
import {VehicleCreateDto} from 'src/entities/dtos/vehicle/vehicle-create.dto';

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
  getAllVehiclesToLike(@Query('modelId') modelId: number, @Query('brandId') brandId: number) {
    return this.facade.getAllVehiclesToLike(brandId, modelId);
  }

  @Get('for-sale')
  getAllVehiclesListedForSale(@Query('modelId') modelId: number,
                              @Query('brandId') brandId: number,
                              @Query('search') search: string,
                              @Query('minPrice') minPrice: number,
                              @Query('maxPrice') maxPrice: number,
                              @Query('minKilometers') minKilometers: number,
                              @Query('maxKilometers') maxKilometers: number,
                              @Query('doorsNumber') doorsNumber: number) {
    return this.facade.getAllVehiclesListedForSale(brandId, modelId, search, minPrice, maxPrice, minKilometers, maxKilometers, doorsNumber);
  }

  @Get()
  getAll() {
    return this.facade.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<VehicleDto> {
    return this.facade.findOne(id);
  }

  @Delete(':id')
  delete(@Param() id: number): void {
    this.facade.delete(id);
  }

}
