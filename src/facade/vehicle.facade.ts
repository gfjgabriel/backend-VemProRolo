import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ModelDto } from "src/entities/dtos/model/model.dto";
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

    getAllVehiclesToLike(brandId: number, modelId:number) {
        let res = this.vehicleService.getAllVehiclesToLike(brandId,modelId)
        console.log(res)
        return res
        .then(it => 
            it.map(item => {
                var vehicleDto = plainToClass(VehicleDto, item);
                vehicleDto.user = plainToClass(UserDto, item.user);
                vehicleDto.model = plainToClass(ModelDto, item.model);
                return vehicleDto;
            })
        );
    }

    getAllVehiclesListedForSale(brandId: number,
                                modelId:number,
                                search: string,
                                minPrice: number,
                                maxPrice: number,
                                minKilometers: number,
                                maxKilometers: number,
                                doorsNumber: number) {
        let res = this.vehicleService.getAllVehiclesListedForSale(brandId, modelId, search, minPrice, maxPrice, minKilometers, maxKilometers, doorsNumber);
        return res
            .then(it =>
                it.map(item => {
                    var vehicleDto = plainToClass(VehicleDto, item);
                    vehicleDto.user = plainToClass(UserDto, item.user);
                    vehicleDto.model = plainToClass(ModelDto, item.model);
                    return vehicleDto;
                })
            );
    }

    getAll() {
        return this.vehicleService.getAll();
    }

    findOne(id: number): Promise<VehicleDto> {
        return this.vehicleService.findOne(id)
        .then(it => plainToClass(VehicleDto, it));
    }

    delete(id: number): void {
        this.vehicleService.delete(id);
    }
    
}