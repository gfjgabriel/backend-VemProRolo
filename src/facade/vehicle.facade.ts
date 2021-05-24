import { Injectable } from "@nestjs/common";
import { VehicleService } from "src/services/vehicle.service";

@Injectable()
export class VehicleFacade {
    constructor(private readonly vehicleService: VehicleService) {}

}