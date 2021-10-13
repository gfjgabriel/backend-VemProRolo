import {Injectable} from "@nestjs/common";
import {UserSubscriptionService} from "../services/user.subscription.service";
import {UserSubscriptionCreateDto} from "../entities/dtos/usersubscription/user-subscription-create.dto";

@Injectable()
export class UserSubscriptionFacade {
    constructor(private readonly userSubscriptionService: UserSubscriptionService) {
    }

    findOne(id: number) {
        return this.userSubscriptionService.findOne(id);
    }

    cancelCurrentUserSubscription(id: number) {
        return this.userSubscriptionService.cancelSubscription(id);
    }

    createSubscription(dto: UserSubscriptionCreateDto) {
        return this.userSubscriptionService.createSubscription(dto);
    }

    getCurrentUserSubscription() {
        return this.userSubscriptionService.getCurrentUserSubscription();
    }

}