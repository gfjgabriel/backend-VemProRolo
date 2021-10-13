import {Injectable} from "@nestjs/common";
import {PlanService} from "../services/plan.service";

@Injectable()
export class PlanFacade {
    constructor(private readonly planService: PlanService) {
    }

    getAllPlans() {
        return this.planService.getAll();
    }

    findOne(id: number) {
        return this.planService.findOne(id);
    }

}