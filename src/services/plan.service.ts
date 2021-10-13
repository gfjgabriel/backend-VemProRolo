import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Plan} from "../entities/plan.entity";

@Injectable()
export class PlanService {

    constructor(
        @InjectRepository(Plan)
        private repository: Repository<Plan>
    ) {
    }

    getAll() {
        return this.repository.find();
    }

    async findOne(planId: number): Promise<Plan> {
        return (await this.repository.findOne({
                where: {
                    id: planId
                }
            })
        );
    }

}