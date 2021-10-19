import {Injectable} from "@nestjs/common";
import {SubscriptionService} from "../services/subscription.service";
import {SubscriptionCreateDto} from "../entities/dtos/subscription/subscription-create.dto";

@Injectable()
export class SubscriptionFacade {
    constructor(private readonly userSubscriptionService: SubscriptionService) {
    }

    findOne(id: number) {
        return this.userSubscriptionService.findOne(id);
    }

    cancelCurrentUserSubscription(id: number) {
        return this.userSubscriptionService.cancelSubscription(id);
    }

    createSubscription(dto: SubscriptionCreateDto) {
        return this.userSubscriptionService.createSubscription(dto);
    }

    getCurrentUserSubscription() {
        return this.userSubscriptionService.getCurrentUserSubscription();
    }

}