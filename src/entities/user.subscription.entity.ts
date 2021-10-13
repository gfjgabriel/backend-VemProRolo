import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import {Vehicle} from "./vehicle.entity";
import {Plan} from "./plan.entity";

@Entity()
export class UserSubscription extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'start_date', nullable: false})
    startDate: Date;

    @Column({name: 'end_date', nullable: false})
    endDate: Date;

    @Column({ name: 'active', default: true, nullable: false })
    active: Boolean;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({name : 'user_id', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Plan, { nullable: false })
    @JoinColumn({name : 'plan_id', referencedColumnName: 'id'})
    plan: Plan;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    updatedDate: Date;

}