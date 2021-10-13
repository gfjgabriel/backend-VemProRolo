import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user.module';
import {UserSubscriptionService} from "../services/user.subscription.service";
import {UserSubscriptionController} from "../controllers/user-subscription.controller";
import {UserSubscriptionFacade} from "../facade/user-subscription.facade";
import {UserSubscription} from "../entities/user.subscription.entity";
import {PlanModule} from "./plan.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserSubscription]), UserModule, PlanModule],
    providers: [UserSubscriptionService, UserSubscriptionFacade],
    controllers: [UserSubscriptionController],
    exports: [TypeOrmModule.forFeature([UserSubscription]), UserSubscriptionService]
})
export class UserSubscriptionModule {
}