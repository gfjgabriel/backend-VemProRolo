import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserService} from './user.service';
import {UserSubscription} from "../entities/user.subscription.entity";
import {PlanService} from "./plan.service";
import {UserSubscriptionCreateDto} from "../entities/dtos/usersubscription/user-subscription-create.dto";

@Injectable()
export class UserSubscriptionService {

    constructor(
        @InjectRepository(UserSubscription)
        private repository: Repository<UserSubscription>,
        private readonly userService: UserService,
        private readonly planService: PlanService
    ) {
    }

    async createSubscription(dto: UserSubscriptionCreateDto) {
        let currentUser = await this.userService.getCurrentUser();

        let currentUserSubscription = await this.getCurrentUserSubscription();
        if (currentUserSubscription) {
            this.cancelSubscription(currentUserSubscription.id);
        }

        let plan = await this.planService.findOne(dto.plan.id);

        let userSubscription = new UserSubscription();
        userSubscription.user = currentUser;
        userSubscription.plan = plan;
        userSubscription.startDate = new Date();
        userSubscription.endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        userSubscription.active = true;

        return this.repository.save(userSubscription);
    }

    async getCurrentUserSubscription() {
        let currentUser = await this.userService.getCurrentUser();
        let currentUserId = currentUser.id;
        return await this.repository.findOne({
            where: {
                user: {
                    id: currentUserId
                }
            }
        });
    }

    async findOne(userSubscriptionId: number): Promise<UserSubscription> {
        return (await this.repository.findOne({
            where: {
                id: userSubscriptionId
            }
        }));
    }

    cancelSubscription(userSubscriptionId: number): void {
        this.repository.delete(userSubscriptionId)
            .catch(error => console.log(error));
    }

}