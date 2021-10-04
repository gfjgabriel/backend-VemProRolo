import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {AuthorizerGuard} from '../auth/guards/cognito.guard'
import {VehicleFacade} from 'src/facade/vehicle.facade';
import {VehicleDto} from 'src/entities/dtos/vehicle/vehicle.dto';
import {VehicleUpdateDto} from 'src/entities/dtos/vehicle/vehicle-update.dto';
import {VehicleCreateDto} from 'src/entities/dtos/vehicle/vehicle-create.dto';
import {Report} from "../entities/report.entity";
import {ReportCreateDto} from "../entities/dtos/report/report-create.dto";
import {ReportFacade} from "../facade/report.facade";

@Controller('reports')
@UseGuards(AuthorizerGuard)
export class ReportController {
    constructor(private readonly facade: ReportFacade) {
    }

    @Post()
    create(@Body() dto: ReportCreateDto) {
        return this.facade.createReport(dto);
    }

    @Get()
    getAll() {
        return this.facade.getAll();
    }

}
