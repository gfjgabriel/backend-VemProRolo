import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/entities/dtos/user/user.dto";
import { VehicleCreateDto } from "src/entities/dtos/vehicle/vehicle-create.dto";
import { VehicleUpdateDto } from "src/entities/dtos/vehicle/vehicle-update.dto";
import { VehicleDto } from "src/entities/dtos/vehicle/vehicle.dto";
import { VehicleService } from "src/services/vehicle.service";

@Injectable()
export class VehicleFacade {
    constructor(private readonly vehicleService: VehicleService) {}

    createVehicle(dto: VehicleCreateDto) {
        return this.vehicleService.createVehicle(dto)
        .then(it => {
            var vehicleDto = plainToClass(VehicleDto, it);
            vehicleDto.user = plainToClass(UserDto, it.user);
            return vehicleDto;
        });
    }

    updateVehicle(dto: VehicleUpdateDto) {
        return this.vehicleService.updateVehicle(dto)
        .then(it => {
            var vehicleDto = plainToClass(VehicleDto, it);
            vehicleDto.user = plainToClass(UserDto, it.user);
            return vehicleDto;
        });
    }

    getAllVehiclesCurrentUser() {
        return this.vehicleService.getAllVehiclesCurrentUser()
        .then(it => 
            it.map(item => {
                var vehicleDto = plainToClass(VehicleDto, item);
                vehicleDto.user = plainToClass(UserDto, item.user);
                return vehicleDto;
            })
        );
    }

    getAllVehiclesToLike() {
        return this.vehicleService.getAllVehiclesToLike()
        .then(it => 
            it.map(item => {
                var vehicleDto = plainToClass(VehicleDto, item);
                vehicleDto.user = plainToClass(UserDto, item.user);
                return vehicleDto;
            })
        );
    }
    getAll() {
        return this.vehicleService.getAll();
    }
    
}