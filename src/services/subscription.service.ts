import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserService} from './user.service';
import {Subscription} from "../entities/subscription.entity";
import {PlanService} from "./plan.service";
import {SubscriptionCreateDto} from "../entities/dtos/subscription/subscription-create.dto";

@Injectable()
export class SubscriptionService {

    constructor(
        @InjectRepository(Subscription)
        private repository: Repository<Subscription>,
        private readonly userService: UserService,
        private readonly planService: PlanService,
    ) {
    }

    async createSubscription(dto: SubscriptionCreateDto) {
        let currentUser = await this.userService.getCurrentUser();

        let currentUserSubscription = await this.getCurrentUserSubscription();
        if (currentUserSubscription) {
            this.cancelSubscription(currentUserSubscription.id);
        }

        let plan = await this.planService.findOne(dto.plan.id);

        let userSubscription = new Subscription();
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
            },
            relations: ['plan']
        });
    }

    async findOne(userSubscriptionId: number): Promise<Subscription> {
        return (await this.repository.findOne({
            where: {
                id: userSubscriptionId
            }
        }));
    }

    async checkIfUserHasAnActiveSubscription() {
        return await this.getCurrentUserSubscription()
            .then(result => {
                return result && result.active;
            })
    }


    cancelSubscription(userSubscriptionId: number): void {
        this.repository.delete(userSubscriptionId)
            .catch(error => console.log(error));
    }

}