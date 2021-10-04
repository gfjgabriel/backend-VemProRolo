import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import {UserDto} from 'src/entities/dtos/user/user.dto';
import {VehicleCreateDto} from 'src/entities/dtos/vehicle/vehicle-create.dto';
import {VehicleUpdateDto} from 'src/entities/dtos/vehicle/vehicle-update.dto';
import {Image} from 'src/entities/image.entity';
import {Vehicle} from 'src/entities/vehicle.entity';
import {ErrorConstants} from 'src/utils/error-constants.enum';
import {Repository} from 'typeorm';
import {ImageService} from './image.service';
import {UserService} from './user.service';
import {Model} from 'src/entities/model.entity';
import {Report} from "../entities/report.entity";
import {ReportCreateDto} from "../entities/dtos/report/report-create.dto";
import {VehicleService} from "./vehicle.service";
import {VehicleDto} from "../entities/dtos/vehicle/vehicle.dto";

@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Report)
        private repository: Repository<Report>,
        private readonly userService: UserService,
        private readonly vehicleService: VehicleService
    ) {
    }

    async createReport(report: ReportCreateDto) {
        let currentUser = await this.userService.getCurrentUser();
        let vehicle = this.vehicleService.findOne(report.vehicle.id);
        report.user = plainToClass(UserDto, currentUser);
        report.vehicle = plainToClass(VehicleDto, vehicle);
        return this.repository.save(report);
    }

    getAll() {
        return this.repository.find();
    }

}