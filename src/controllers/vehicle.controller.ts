import { Controller, UseGuards } from '@nestjs/common';
import { AuthorizerGuard } from '../auth/guards/cognito.guard'
import { VehicleFacade } from 'src/facade/vehicle.facade';
@Controller('vehicles')
@UseGuards(AuthorizerGuard)
export class VehicleController {
  constructor(private readonly facade: VehicleFacade) {}

}
