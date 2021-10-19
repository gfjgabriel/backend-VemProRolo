import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import {PlanType} from "./types/plan.type";

@Entity()
export class Plan extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'price', precision: 10, scale: 2, nullable: false})
    price: number;

    @Column({name: 'plan_type', nullable: false})
    planType: PlanType;

}