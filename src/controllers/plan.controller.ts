import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {AuthorizerGuard} from '../auth/guards/cognito.guard'
import {PlanFacade} from "../facade/plan.facade";

@Controller('plans')
@UseGuards(AuthorizerGuard)
export class PlanController {
    constructor(private readonly facade: PlanFacade) {
    }

    @Get()
    getAll() {
        return this.facade.getAllPlans();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.facade.findOne(id);
    }

}
