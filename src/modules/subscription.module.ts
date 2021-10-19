import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user.module';
import {SubscriptionService} from "../services/subscription.service";
import {SubscriptionController} from "../controllers/subscription.controller";
import {SubscriptionFacade} from "../facade/subscription.facade";
import {Subscription} from "../entities/subscription.entity";
import {PlanModule} from "./plan.module";

@Module({
    imports: [TypeOrmModule.forFeature([Subscription]), UserModule, PlanModule],
    providers: [SubscriptionService, SubscriptionFacade],
    controllers: [SubscriptionController],
    exports: [TypeOrmModule.forFeature([Subscription]), SubscriptionService]
})
export class SubscriptionModule {
}