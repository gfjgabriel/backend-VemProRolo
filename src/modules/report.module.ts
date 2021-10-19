import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user.module';
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