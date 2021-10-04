import {Injectable} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {ModelDto} from "src/entities/dtos/model/model.dto";
import {UserDto} from "src/entities/dtos/user/user.dto";
import {VehicleCreateDto} from "src/entities/dtos/vehicle/vehicle-create.dto";
import {VehicleUpdateDto} from "src/entities/dtos/vehicle/vehicle-update.dto";
import {VehicleDto} from "src/entities/dtos/vehicle/vehicle.dto";
import {VehicleService} from "src/services/vehicle.service";
import {Report} from "../entities/report.entity";
import {ReportService} from "../services/report.service";
import {ReportCreateDto} from "../entities/dtos/report/report-create.dto";

@Injectable()
export class ReportFacade {
    constructor(private readonly reportService: ReportService) {
    }

    createReport(report: ReportCreateDto) {
        return this.reportService.createReport(report);
    }

    getAll() {
        return this.reportService.getAll();
    }

}