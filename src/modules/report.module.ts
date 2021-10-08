import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VehicleService} from 'src/services/vehicle.service';
import {VehicleFacade} from 'src/facade/vehicle.facade';
import {VehicleController} from 'src/controllers/vehicle.controller';
import {Vehicle} from 'src/entities/vehicle.entity';
import {UserModule} from './user.module';
import {ImageModule} from './image.module';
import {Report} from "../entities/report.entity";
import {ReportFacade} from "../facade/report.facade";
import {ReportService} from 'src/services/report.service';
import {ReportController} from "../controllers/report.controller";
import {VehicleModule} from "./vehicle.module";

@Module({
    imports: [TypeOrmModule.forFeature([Report]), UserModule, VehicleModule],
    providers: [ReportService, ReportFacade],
    controllers: [ReportController],
    exports: [TypeOrmModule.forFeature([Report]), ReportService]
})
export class ReportModule {
}