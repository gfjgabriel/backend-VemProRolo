import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Plan} from "../entities/plan.entity";
import {PlanFacade} from "../facade/plan.facade";
import {PlanService} from 'src/services/plan.service';
import {PlanController} from "../controllers/plan.controller";
import {UserModule} from "./user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Plan]), UserModule],
    providers: [PlanService, PlanFacade],
    controllers: [PlanController],
    exports: [TypeOrmModule.forFeature([Plan]), PlanService]
})
export class PlanModule {
}