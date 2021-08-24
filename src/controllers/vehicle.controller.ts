import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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
  getAllVehiclesToLike(@Param('brandId') brandId: number, @Param('modelId') modelId: number) {
    console.log("RECEBIDOS = " + brandId + " " + modelId)
    let t = this.facade.getAllVehiclesToLike(1, null);
    console.log("VEICULOS: " + t);
    return t;

    
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
  
  @Get('allBrands')
  getAllBrands(){
    return this.facade.getAllBrands();
  }

  @Get('allModels')
  getAllModels(@Param() brandId: number){
    return this.facade.getAllModels(brandId);
  }
}
