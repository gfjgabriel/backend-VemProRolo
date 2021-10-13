import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user.module';
import {Plan} from "../entities/Plan.entity";
import {PlanFacade} from "../facade/Plan.facade";
import {PlanService} from 'src/services/Plan.service';
import {PlanController} from "../controllers/Plan.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Plan]), UserModule],
    providers: [PlanService, PlanFacade],
    controllers: [PlanController],
    exports: [TypeOrmModule.forFeature([Plan]), PlanService]
})
export class PlanModule {
}