import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import {Vehicle} from "./vehicle.entity";

@Entity()
export class Report extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'description', length: 2000, nullable: true})
    description: string;

    @ManyToOne(() => User, user => user.vehicles, { nullable: false })
    @JoinColumn({name : 'user_id', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(() => Vehicle, { nullable: false })
    @JoinColumn({name : 'vehicle_id', referencedColumnName: 'id'})
    vehicle: Vehicle;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    updatedDate: Date;

}